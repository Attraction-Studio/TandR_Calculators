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
                  @click="showLiningOptions = !showLiningOptions"
                  class="text-sm text-blue-600 hover:underline mb-2"
                >
                  {{ showLiningOptions ? "Hide" : "Show" }} Common Linings
                </button>
                <div
                  v-if="showLiningOptions"
                  class="mb-3 border rounded overflow-hidden"
                >
                  <table class="w-full text-sm">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="px-3 py-2 text-left">Lining</th>
                        <th class="px-3 py-2 text-right">Weight kg/m²</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="lining in liningOptions"
                        :key="lining.label"
                        @click="selectLining(lining.value)"
                        class="cursor-pointer hover:bg-blue-50 border-t"
                        :class="{
                          'bg-green-100': liningWeight == lining.value,
                        }"
                      >
                        <td class="px-3 py-2">{{ lining.label }}</td>
                        <td class="px-3 py-2 text-right">{{ lining.value }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
  </div>
</template>

<script setup>
  import { inject, ref } from "vue";
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
  }
</script>
