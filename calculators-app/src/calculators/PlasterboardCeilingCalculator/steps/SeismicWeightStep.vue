<template>
  <div>
    <h2 class="global-step-title">Step Two - Suspended Ceiling Weight</h2>

    <div class="prose max-w-none space-y-6">
      <p class="paragraph-18px">
        Calculate the total seismic weight based on the ceiling and service
        weights.
      </p>
      <p class="paragraph-18px">
        Enter or select the corresponding values and sum all the component
        weights to get a total seismic weight. This value will be used in the
        following steps of this worksheet.
      </p>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <tbody>
            <!-- Grid Weight -->
            <tr class="border-b">
              <td class="py-3 pr-4">Grid Weight (kg/m<sup>2</sup>)</td>
              <td class="py-3">
                <div class="space-y-2">
                  <div>
                    <label class="text-sm text-gray-600">Main Tee (mm)</label>
                    <select
                      v-model="mainTeeSpacing"
                      class="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option
                        v-for="opt in mainTeeOptions"
                        :key="opt.value"
                        :value="opt.value"
                      >
                        {{ opt.label }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="text-sm text-gray-600">Cross Tee (mm)</label>
                    <select
                      v-model="crossTeeSpacing"
                      class="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option
                        v-for="opt in crossTeeOptions"
                        :key="opt.value"
                        :value="opt.value"
                      >
                        {{ opt.label }}
                      </option>
                    </select>
                  </div>
                </div>
              </td>
              <td class="py-3 text-right font-semibold w-24">
                {{ state.gridMass.value.toFixed(2) }}
              </td>
            </tr>

            <!-- Lining Weight -->
            <tr class="border-b">
              <td class="py-3 pr-4">Lining Weight (kg/m<sup>2</sup>)</td>
              <td class="py-3">
                <button
                  type="button"
                  @click="showLiningOptions = true"
                  class="calc-button calc-button-primary"
                >
                  Select Common Lining
                </button>
              </td>
              <td class="py-3 text-right w-24">
                <input
                  type="number"
                  step="0.1"
                  v-model.number="liningWeight"
                  class="w-full border border-gray-300 rounded px-3 py-2 text-right"
                />
              </td>
            </tr>

            <!-- Lining Thickness -->
            <tr class="border-b">
              <td class="py-3 pr-4">
                Lining Thickness (mm)
                <div
                  v-if="state.crossTeeError.value"
                  class="alert alert-danger mt-2 text-sm"
                >
                  {{ state.crossTeeError.value }}
                </div>
              </td>
              <td class="py-3"></td>
              <td class="py-3 text-right w-24">
                <input
                  type="number"
                  step="0.1"
                  v-model.number="liningThickness"
                  class="w-full border border-gray-300 rounded px-3 py-2 text-right"
                />
              </td>
            </tr>

            <!-- Services -->
            <tr class="border-b">
              <td class="py-3 pr-4" rowspan="4">Services (kg/m<sup>2</sup>)</td>
              <td class="py-3">Luminaires</td>
              <td class="py-3 text-right w-24">
                <input
                  type="number"
                  step="0.1"
                  v-model.number="luminaries"
                  class="w-full border border-gray-300 rounded px-3 py-2 text-right"
                />
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-3">Insulation</td>
              <td class="py-3 text-right w-24">
                <input
                  type="number"
                  step="0.1"
                  v-model.number="insulation"
                  class="w-full border border-gray-300 rounded px-3 py-2 text-right"
                />
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-3">Other</td>
              <td class="py-3 text-right w-24">
                <input
                  type="number"
                  step="0.1"
                  v-model.number="otherLoads"
                  class="w-full border border-gray-300 rounded px-3 py-2 text-right"
                />
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-3">
                Design Distributed Load (min. 3 kg/m<sup>2</sup>)
              </td>
              <td class="py-3 text-right w-24">
                <input
                  type="number"
                  step="0.1"
                  min="3"
                  v-model.number="deadLoad"
                  class="w-full border border-gray-300 rounded px-3 py-2 text-right"
                />
              </td>
            </tr>

            <!-- Total -->
            <tr class="bg-green-50">
              <td class="py-3 pr-4 text-right font-semibold" colspan="2">
                Total Seismic Weight
                <span
                  class="badge bg-teal-500 text-white px-2 py-1 rounded text-xs ml-2"
                  >Sw</span
                >
              </td>
              <td class="py-3 text-right font-bold w-24">
                {{ state.seismicWeight.value.toFixed(2) }} kg/m<sup>2</sup>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="text-sm text-gray-600">
        Note: If the selected plasterboard thickness is 12mm or less then the
        cross tee spacing of 400mm should be used.
      </p>
    </div>

    <!-- Common Linings Modal -->
    <Modal v-model="showLiningOptions" title="Select Common Lining" size="lg">
      <div class="space-y-3">
        <p class="text-sm text-gray-600 mb-4">
          Click on a lining to select it. The weight will be applied to your
          calculation.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            v-for="lining in liningOptions"
            :key="lining.label"
            type="button"
            @click="selectLining(lining.value)"
            class="p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="
              liningWeight == lining.value
                ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 bg-white'
            "
          >
            <div class="flex justify-between items-center">
              <span class="font-medium">{{ lining.label }}</span>
              <span
                class="text-lg font-bold"
                :class="
                  liningWeight == lining.value
                    ? 'text-blue-600'
                    : 'text-gray-900'
                "
              >
                {{ lining.value }} kg/m²
              </span>
            </div>
            <div
              v-if="liningWeight == lining.value"
              class="mt-2 text-sm text-blue-600 font-medium"
            >
              ✓ Selected
            </div>
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
  import { inject, ref } from "vue";
  import Modal from "../../../components/Modal.vue";
  import {
    MAIN_TEE_SPACING_OPTIONS,
    CROSS_TEE_SPACING_OPTIONS,
    LINING_WEIGHT_OPTIONS,
  } from "../../data/plasterboardCeilingData.js";

  const state = inject("calculatorState");

  const {
    mainTeeSpacing,
    crossTeeSpacing,
    liningWeight,
    liningThickness,
    luminaries,
    insulation,
    otherLoads,
    deadLoad,
  } = state;

  const mainTeeOptions = MAIN_TEE_SPACING_OPTIONS;
  const crossTeeOptions = CROSS_TEE_SPACING_OPTIONS;
  const liningOptions = LINING_WEIGHT_OPTIONS;

  const showLiningOptions = ref(false);

  function selectLining(value) {
    liningWeight.value = value;
    // Keep modal open briefly to show selection feedback
    setTimeout(() => {
      showLiningOptions.value = false;
    }, 300);
  }
</script>
