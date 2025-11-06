<template>
  <div class="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
    <div>
      <h2 class="text-7xl font-bold mb-6 text-gray-800">
        Ceiling Components Estimator
      </h2>
      <p class="text-lg text-gray-600 max-w-xl mb-12">
        Quantities are approximate and based on the area being square. Room
        shape/area variances must be taken into consideration.
      </p>

      <!-- Input Form -->
      <div class="mb-6 space-y-4">
        <div class="flex flex-col gap-4">
          <div>
            <label
              for="length"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Length (m)
            </label>
            <input
              id="length"
              v-model.number="length"
              type="number"
              step="0.01"
              class="w-full px-4 py-2 border border-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @input="onInputChange"
            />
          </div>

          <div>
            <label
              for="width"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Width (m)
            </label>
            <input
              id="width"
              v-model.number="width"
              type="number"
              step="0.01"
              class="w-full px-4 py-2 border border-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @input="onInputChange"
            />
          </div>
        </div>

        <!-- Tile Size Selection -->
        <div>
          <label class="block text-lg font-medium mb-2"> Tile Size </label>
          <div class="flex gap-4 mb-6">
            <label class="flex items-center">
              <input
                v-model="tileSize"
                type="radio"
                value="1"
                class="mr-2 accent-black w-5 h-5 rounded-none"
                @change="onInputChange"
              />
              <span>1200mm x 600mm</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="tileSize"
                type="radio"
                value="2"
                class="mr-2 accent-black w-5 h-5 rounded-none"
                @change="onInputChange"
              />
              <span>600mm x 600mm</span>
            </label>
          </div>
        </div>

        <button
          @click="calculate"
          class="w-full md:w-auto px-6 py-3 bg-black text-white font-light text-lg hover:bg-gray-800 transition-colors"
        >
          Calculate
        </button>
      </div>
    </div>

    <!-- Results Section -->
    <div class="mt-8 space-y-4">
      <div class="space-y-4 p-4 bg-gray-50">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Results</h3>

        <!-- Area Display -->
        <div class="mb-4 p-4 bg-white">
          <p class="text-sm text-gray-600">Area</p>
          <p class="text-2xl font-bold text-gray-800">
            {{ area.toFixed(2) }} m²
          </p>
        </div>

        <!-- Variance Control -->
        <div class="mb-6 p-4 bg-blue-50">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Variance Adjustment (%)
          </label>
          <div class="flex items-center gap-4">
            <button
              @click="decreaseVariance"
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              :disabled="variance <= 0"
            >
              -
            </button>
            <input
              v-model.number="variance"
              type="number"
              min="0"
              max="5"
              readonly
              class="w-20 px-3 py-2 text-center border border-gray-300 rounded-md bg-white"
            />
            <button
              @click="increaseVariance"
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              :disabled="variance >= 5"
            >
              +
            </button>
          </div>
        </div>

        <!-- Results Table -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 px-4 py-2 text-left">
                  Component
                </th>
                <th class="border border-gray-300 px-4 py-2 text-right">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 font-medium">
                  {{ tileTypeText }}
                </td>
                <td class="border border-gray-300 px-4 py-2 text-right">
                  {{ adjustedR2 }}
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">
                  Suspension Fastener
                </td>
                <td class="border border-gray-300 px-4 py-2 text-right">
                  {{ adjustedR3 }}
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">
                  Suspension Wire (2.5mm)
                </td>
                <td class="border border-gray-300 px-4 py-2 text-right">
                  {{ adjustedR4 }}
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Main Tee</td>
                <td class="border border-gray-300 px-4 py-2 text-right">
                  {{ adjustedR6 }}
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">
                  Cross Tee (1200mm)
                </td>
                <td class="border border-gray-300 px-4 py-2 text-right">
                  {{ adjustedR7 }}
                </td>
              </tr>
              <tr v-if="tileSize === '2'">
                <td class="border border-gray-300 px-4 py-2">
                  Cross Tee (600mm)
                </td>
                <td class="border border-gray-300 px-4 py-2 text-right">
                  {{ adjustedR7a }}
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Wall Angle</td>
                <td class="border border-gray-300 px-4 py-2 text-right">
                  {{ adjustedR8 }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from "vue";

  // Reactive state
  const length = ref(0);
  const width = ref(0);
  const tileSize = ref("1");
  const variance = ref(0);

  // Base calculated values (stored for variance calculations)
  const baseValues = ref({
    r1: "",
    r2: 0,
    r3: 0,
    r4: 0,
    r6: 0,
    r7: 0,
    r7a: 0,
    r8: 0,
  });

  // Computed area
  const area = computed(() => {
    return (length.value || 0) * (width.value || 0);
  });

  // Computed tile type text
  const tileTypeText = computed(() => {
    return tileSize.value === "1"
      ? "Ceiling Tiles (1200mm x 600mm)"
      : "Ceiling Tiles (600mm x 600mm)";
  });

  // Calculate base values
  function calculateBaseValues() {
    const areaValue = area.value;

    if (tileSize.value === "1") {
      // 1200mm x 600mm tiles
      baseValues.value.r1 = "Ceiling Tiles (1200mm x 600mm)";
      baseValues.value.r2 = Math.ceil(areaValue / 0.72);
      baseValues.value.r3 = Math.ceil(areaValue * 0.694);
      baseValues.value.r4 = Math.ceil(areaValue * 0.694);
      baseValues.value.r6 = Math.ceil((areaValue * 0.833) / 3.6);
      baseValues.value.r7 = Math.ceil((areaValue * 1.666) / 1.2);
      baseValues.value.r7a = 0;
      baseValues.value.r8 = Math.ceil((width.value * 2 + length.value * 2) / 3);
    } else {
      // 600mm x 600mm tiles
      baseValues.value.r1 = "Ceiling Tiles (600mm x 600mm)";
      baseValues.value.r2 = Math.ceil(areaValue / 0.36);
      baseValues.value.r3 = Math.ceil(areaValue * 0.694);
      baseValues.value.r4 = Math.ceil(areaValue * 0.694);
      baseValues.value.r6 = Math.ceil((areaValue * 0.833) / 3.6);
      baseValues.value.r7 = Math.ceil((areaValue * 1.666) / 1.2);
      baseValues.value.r7a = Math.ceil((areaValue * 0.833) / 0.6);
      baseValues.value.r8 = Math.ceil((width.value * 2 + length.value * 2) / 3);
    }
  }

  // Calculate function - auto-calculates when inputs change
  function calculate() {
    if (length.value > 0 && width.value > 0) {
      calculateBaseValues();
      // Reset variance when inputs change
      if (variance.value === 0) {
        variance.value = 0;
      }
    }
  }

  // Variance adjustment
  function increaseVariance() {
    if (variance.value < 5) {
      variance.value++;
    }
  }

  function decreaseVariance() {
    if (variance.value > 0) {
      variance.value--;
    }
  }

  // Computed adjusted values with variance
  const adjustedR2 = computed(() => {
    return Math.round(
      (baseValues.value.r2 / 100) * variance.value + baseValues.value.r2
    );
  });

  const adjustedR3 = computed(() => {
    return Math.round(
      (baseValues.value.r3 / 100) * variance.value + baseValues.value.r3
    );
  });

  const adjustedR4 = computed(() => {
    return Math.round(
      (baseValues.value.r4 / 100) * variance.value + baseValues.value.r4
    );
  });

  const adjustedR6 = computed(() => {
    return Math.round(
      (baseValues.value.r6 / 100) * variance.value + baseValues.value.r6
    );
  });

  const adjustedR7 = computed(() => {
    return Math.round(
      (baseValues.value.r7 / 100) * variance.value + baseValues.value.r7
    );
  });

  const adjustedR7a = computed(() => {
    return Math.round(
      (baseValues.value.r7a / 100) * variance.value + baseValues.value.r7a
    );
  });

  const adjustedR8 = computed(() => {
    return Math.round(
      (baseValues.value.r8 / 100) * variance.value + baseValues.value.r8
    );
  });

  // Recalculate when inputs change
  function onInputChange() {
    calculate();
  }

  // Watch for changes and auto-calculate
  watch([length, width, tileSize], () => {
    calculate();
  });

  // Initialize calculations on mount
  onMounted(() => {
    calculate();
  });
</script>
