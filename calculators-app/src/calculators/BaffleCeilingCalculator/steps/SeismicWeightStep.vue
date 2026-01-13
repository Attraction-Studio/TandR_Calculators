<template>
  <div>
    <h2 class="global-step-title">
      Step Two - Suspended Baffle Ceiling Weight
    </h2>

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
            <!-- Profile -->
            <tr class="border-b">
              <td class="py-3 pr-4">Profile</td>
              <td class="py-3">
                <select
                  v-model.number="profileMass"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option
                    v-for="opt in profileOptions"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </option>
                </select>
              </td>
              <td class="py-3 text-right font-semibold w-24">
                {{ profileMass.toFixed(1) }}
              </td>
            </tr>

            <!-- Baffle Spacing -->
            <tr class="border-b">
              <td class="py-3 pr-4">
                Baffle Spacing (m)<br />
                <small class="text-gray-600">Minimum 0.1m - Maximum 1.0m</small>
                <div
                  v-if="state.baffleSpacingError.value"
                  class="text-red-600 text-sm mt-1"
                >
                  {{ state.baffleSpacingError.value }}
                </div>
              </td>
              <td class="py-3"></td>
              <td class="py-3 text-right w-24">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="1"
                  v-model.number="baffleSpacing"
                  class="w-full border border-gray-300 rounded px-3 py-2 text-right"
                  :class="{
                    'border-red-500 bg-red-50': state.baffleSpacingError.value,
                  }"
                />
              </td>
            </tr>

            <!-- Baffle Mass (calculated) -->
            <tr class="border-b">
              <td class="py-3 pr-4">Baffle Mass (kg/m<sup>2</sup>)</td>
              <td class="py-3"></td>
              <td class="py-3 text-right font-semibold w-24">
                {{ state.baffleMass.value.toFixed(2) }}
              </td>
            </tr>

            <!-- Strongback Mass (fixed) -->
            <tr class="border-b">
              <td class="py-3 pr-4">Strongback Mass (kg/m<sup>2</sup>)</td>
              <td class="py-3 text-sm text-gray-600">41x21x1.2 PST Channel</td>
              <td class="py-3 text-right font-semibold w-24">1.27</td>
            </tr>

            <!-- Services -->
            <tr class="border-b">
              <td class="py-3 pr-4" rowspan="3">Services</td>
              <td class="py-3">Luminaires incl. Gridlux (kg/m<sup>2</sup>)</td>
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
              <td class="py-3">Services Allowance (kg/m<sup>2</sup>)</td>
              <td class="py-3 text-right w-24">
                <input
                  type="number"
                  step="0.1"
                  v-model.number="services"
                  class="w-full border border-gray-300 rounded px-3 py-2 text-right"
                />
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-3">Other (kg/m<sup>2</sup>)</td>
              <td class="py-3 text-right w-24">
                <input
                  type="number"
                  step="0.1"
                  v-model.number="otherLoads"
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
        Strongback and hanger rod spacing for M10 Hanger Rod or 41x21x1.2 PST
        Channel is 1.2m
      </p>

      <p class="text-sm text-gray-600">
        <b>Note:</b> If Gridlux is to be used as the primary lighting, allow 1
        kg per 1200mm unit and 0.5 kg per 600mm unit. An average Gridlux layout
        would have a 1200mm unit every 5m², resulting in a luminaire allowance
        of 0.2kg/m². Note that Gridlux is only compatible with the 150x30mm
        aluminium baffle.
      </p>
    </div>
  </div>
</template>

<script setup>
  import { inject } from "vue";
  import { BAFFLE_PROFILE_OPTIONS } from "../../data/baffleCeilingData.js";

  const state = inject("calculatorState");

  const { profileMass, baffleSpacing, luminaries, services, otherLoads } =
    state;

  const profileOptions = BAFFLE_PROFILE_OPTIONS;
</script>
