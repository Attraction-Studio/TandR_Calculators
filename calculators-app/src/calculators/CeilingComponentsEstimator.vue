<template>
  <div class="w-full">
    <div class="mb-16 flex lg:flex-row flex-col justify-between gap-6">
      <h2 class="heading-style-h2 mb-6">Ceiling Components Estimator</h2>
      <p class="paragraph-18px max-w-xl">
        Quantities are approximate and based on the area being square. Room
        shape/area variances must be taken into consideration.
      </p>
    </div>
    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 global-gap mb-8">
      <!-- Left Column: Inputs -->
      <div>
        <!-- Input Form -->
        <div class="space-y-6">
          <InputField
            id="length"
            v-model.number="length"
            label="Length"
            type="number"
            step="0.01"
            min="0"
            @update:modelValue="onInputChange"
          />

          <InputField
            id="width"
            v-model.number="width"
            label="Width"
            type="number"
            step="0.01"
            min="0"
            @update:modelValue="onInputChange"
          />

          <RadioGroup
            id="tile-size"
            v-model="tileSize"
            label="Option"
            :options="tileOptions"
            @update:modelValue="onInputChange"
          />
        </div>
      </div>

      <!-- Right Column: Info & Total Area -->
      <div class="space-y-6 flex flex-col gap-6 justify-end">
        <InfoBox variant="warning" title="Important Note">
          Quantities are approximate and based on the area being square. Room
          shape/area variances must be taken into consideration.
        </InfoBox>

        <div>
          <p class="text-sm mb-2 border-b border-brand-black pb-2">
            Total Area
          </p>
          <p class="text-4xl md:text-5xl font-bold">{{ area.toFixed(2) }} m²</p>
        </div>
      </div>
    </div>

    <div class="border-t border-brand-black pt-4 mt-24 mb-12">
      <h2 class="btn_12_text">Results</h2>
    </div>

    <!-- Bottom Section: Results -->
    <div class="grid grid-cols-1 md:grid-cols-2 global-gap">
      <!-- Left Column: Tiles -->
      <div>
        <h3 class="text-4xl mb- font-semibold mb-6">Tiles</h3>
        <div class="flex flex-col gap-2">
          <p class="text-gray-600">
            {{ tileTypeText }}
          </p>
          <p class="text-2xl font-bold">
            {{ adjustedR2 }}
            <span class="text-lg font-normal ml-1">pc(s)</span>
          </p>
        </div>
      </div>

      <!-- Right Column: Metal Components -->
      <div>
        <h3 class="text-4xl mb- font-semibold mb-6">Metal Components</h3>
        <div class="space-y-3">
          <div
            v-for="component in metalComponents"
            :key="component.key"
            class="flex justify-between items-center py-3 border-b border-brand-black"
          >
            <span class="text-sm">{{ component.label }}</span>
            <span class="text-lg font-bold">
              {{ component.value }}
              <span class="text-lg font-normal text-gray-600 ml-1">pc(s)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from "vue";
  import InputField from "../components/InputField.vue";
  import RadioGroup from "../components/RadioGroup.vue";
  import InfoBox from "../components/InfoBox.vue";

  // Reactive state
  const length = ref(0);
  const width = ref(0);
  const tileSize = ref("1");
  const variance = ref(0);

  // Tile options
  const tileOptions = [
    { value: "1", label: "Exposed 12x6" },
    { value: "2", label: "Exposed 6x6" },
  ];

  // Base calculated values
  const baseValues = ref({
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
      baseValues.value.r2 = Math.ceil(areaValue / 0.72);
      baseValues.value.r3 = Math.ceil(areaValue * 0.694);
      baseValues.value.r4 = Math.ceil(areaValue * 0.694);
      baseValues.value.r6 = Math.ceil((areaValue * 0.833) / 3.6);
      baseValues.value.r7 = Math.ceil((areaValue * 1.666) / 1.2);
      baseValues.value.r7a = 0;
      baseValues.value.r8 = Math.ceil((width.value * 2 + length.value * 2) / 3);
    } else {
      // 600mm x 600mm tiles
      baseValues.value.r2 = Math.ceil(areaValue / 0.36);
      baseValues.value.r3 = Math.ceil(areaValue * 0.694);
      baseValues.value.r4 = Math.ceil(areaValue * 0.694);
      baseValues.value.r6 = Math.ceil((areaValue * 0.833) / 3.6);
      baseValues.value.r7 = Math.ceil((areaValue * 1.666) / 1.2);
      baseValues.value.r7a = Math.ceil((areaValue * 0.833) / 0.6);
      baseValues.value.r8 = Math.ceil((width.value * 2 + length.value * 2) / 3);
    }
  }

  // Calculate function
  function calculate() {
    if (length.value > 0 && width.value > 0) {
      calculateBaseValues();
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

  // Metal components list
  const metalComponents = computed(() => {
    const components = [
      { key: "r3", label: "Suspension Fastener", value: adjustedR3.value },
      { key: "r4", label: "Suspension Wire (2.5mm)", value: adjustedR4.value },
      { key: "r6", label: "Main Tee", value: adjustedR6.value },
      { key: "r7", label: "Cross Tee (1200mm)", value: adjustedR7.value },
    ];

    if (tileSize.value === "2") {
      components.push({
        key: "r7a",
        label: "Cross Tee (600mm)",
        value: adjustedR7a.value,
      });
    }

    components.push({
      key: "r8",
      label: "Wall Angle",
      value: adjustedR8.value,
    });

    return components;
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
