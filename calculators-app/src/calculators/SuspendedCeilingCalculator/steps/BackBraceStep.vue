<template>
  <div>
    <h2 class="global-step-title">Back Brace Requirements</h2>

    <div class="paragraph-18px mb-6 space-y-4">
      <p>
        Determine the maximum area of ceiling that each brace can support based
        on seismic force, brace type and the plenum height.
      </p>
    </div>

    <div class="mb-8 border-t border-gray-300 pt-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">
        Back Brace Calculations
      </h3>

      <div class="bg-gray-50 p-6 rounded-lg space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Inputs -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Connection Height (m)
            </label>
            <input
              type="number"
              v-model="connectionHeight2"
              step="0.1"
              min="0"
              class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <p class="text-xs text-gray-500 mt-1">
              Maximum height of back brace connection to overhead structure
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Brace Type
            </label>
            <select
              v-model="braceType"
              class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option
                v-for="option in BACK_BRACE_OPTIONS"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Plenum Height (mm)
            </label>
            <select
              v-model="pendantHeight"
              class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <template
                v-for="option in BACK_BRACE_OPTIONS"
                :key="option.value"
              >
                <template v-if="option.value === Number(braceType)">
                  <option
                    v-for="height in option.heights"
                    :key="height.height"
                    :value="height.height"
                  >
                    {{ height.height }}mm -
                    {{ height.description || height.requirement }} (Capacity:
                    {{ height.capacity }}kg)
                  </option>
                </template>
              </template>
            </select>
          </div>
        </div>

        <!-- Brace Capacity Results -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded border">
            <div class="text-sm text-gray-500">Brace Capacity</div>
            <div class="text-xl font-bold text-gray-900">
              {{
                BACK_BRACE_OPTIONS.find(
                  (b) => b.value === Number(braceType),
                )?.heights.find((h) => h.height === Number(pendantHeight))
                  ?.capacity || 0
              }}
              kg
            </div>
          </div>
          <div class="bg-white p-4 rounded border">
            <div class="text-sm text-gray-500">Area per Brace</div>
            <div class="text-xl font-bold text-gray-900">
              {{ braceArea.toFixed(2) }} m²
            </div>
          </div>
        </div>

        <!-- Layout Section -->
        <div class="border-t pt-4 mt-4">
          <h4 class="font-medium text-gray-900 mb-4">Back Bracing Layout</h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Ceiling Area (m²)
              </label>
              <input
                type="number"
                v-model="ceilingArea"
                step="1"
                min="0"
                class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div
              class="bg-blue-50 p-4 rounded border border-blue-100 flex items-center"
            >
              <div>
                <div class="text-sm text-blue-700 font-medium">
                  Number of Braces Required
                </div>
                <div class="text-2xl font-bold text-blue-900">
                  {{ numberOfBraces }}
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg border overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Parameter
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Max Main Tee Space
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
                  >
                    {{ maxTeeSpace.main.toFixed(2) }} m
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Max Cross Tee Space
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
                  >
                    {{ maxTeeSpace.cross.toFixed(2) }} m
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Clearance Required
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
                  >
                    {{ backBraceClearance.min }}mm -
                    {{ backBraceClearance.max }}mm
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Download Result Button -->
    <div class="flex justify-center mt-8 mb-8">
      <button
        type="button"
        class="px-8 py-4 bg-[#3C999B] !text-white font-semibold hover:bg-[#3C999B]/80 transition-colors flex items-center justify-center gap-2"
        @click="showExportDialog = true"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Download Result
      </button>
    </div>

    <!-- Export Dialog -->
    <ExportDialog
      :is-open="showExportDialog"
      @close="showExportDialog = false"
      @export="handleExport"
    />
  </div>
</template>

<script setup>
  import { inject, toRefs, ref } from "vue";
  import ExportDialog from "../../../components/ExportDialog.vue";
  import { exportSuspendedCeilingPDF } from "../../utils/pdfExport.js";
  import { BACK_BRACE_OPTIONS } from "../../data/suspendedCeilingData.js";

  const calculatorState = inject("calculatorState");
  const {
    connectionHeight2,
    braceType,
    pendantHeight,
    ceilingArea,
    braceArea,
    numberOfBraces,
    maxTeeSpace,
    backBraceClearance,
  } = toRefs(calculatorState);

  const showExportDialog = ref(false);

  function handleExport(options) {
    try {
      // Use the calculatorState that was already injected at the top level
      exportSuspendedCeilingPDF(calculatorState, options);
    } catch (error) {
      console.error("PDF Export Error:", error);
      throw new Error("Failed to generate PDF. Please try again.");
    }
  }
</script>
