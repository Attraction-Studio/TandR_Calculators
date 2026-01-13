<template>
  <div>
    <h2 class="global-step-title">Step Three - Seismic Actions</h2>

    <div class="prose max-w-none space-y-6">
      <p class="paragraph-18px">
        Calculate seismic force based on
        <a
          href="#"
          @click.prevent="showZoneMap = !showZoneMap"
          class="text-blue-600 hover:underline"
          >seismic zone</a
        >, height above ground level, and building importance level.
      </p>

      <div v-if="showZoneMap" class="bg-gray-100 p-4 rounded mb-4">
        <p class="text-sm mb-2">
          Locate the area for which the suspended ceiling will be installed.
          Find the Site Specific Zone Factor by locating the line closest to the
          area of installation, or the shaded area it is within, and tapping it
          to show the rating.
        </p>
        <div class="aspect-video bg-gray-200 flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=10bhne8TlErYtzZIwt3-e_dYP_yo&z=5"
            width="100%"
            height="100%"
            style="border: none; min-height: 400px"
          ></iframe>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <tbody>
            <!-- Zone Factor -->
            <tr class="border-b">
              <td class="py-3 pr-4">
                Zone Factor<br />
                <button
                  type="button"
                  @click="showZoneMap = !showZoneMap"
                  class="text-sm text-blue-600 hover:underline"
                >
                  {{ showZoneMap ? "Hide" : "Show" }} Zones
                </button>
              </td>
              <td class="py-3">
                <select
                  v-model.number="zoneFactor"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option
                    v-for="zone in zoneFactors"
                    :key="zone.label"
                    :value="zone.value"
                  >
                    {{ zone.label }}
                  </option>
                </select>
              </td>
              <td class="py-3 text-right font-semibold w-24">
                {{ zoneFactor }}
              </td>
            </tr>

            <!-- Importance Level -->
            <tr class="border-b">
              <td class="py-3 pr-4">
                Importance Level<br />
                <span class="text-sm italic text-gray-600"
                  >Anything above IL3 will require a design by an engineer</span
                ><br />
                <button
                  type="button"
                  @click="showImportanceInfo = !showImportanceInfo"
                  class="text-sm text-blue-600 hover:underline"
                >
                  more info
                </button>
              </td>
              <td class="py-3">
                <select
                  v-model.number="importanceLevel"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option
                    v-for="level in importanceLevels"
                    :key="level.value"
                    :value="level.value"
                  >
                    {{ level.label }}
                  </option>
                </select>
              </td>
              <td class="py-3 text-right font-semibold w-24">
                {{ importanceLevel }}
              </td>
            </tr>

            <!-- Height Factor -->
            <tr class="border-b">
              <td class="py-3 pr-4">
                Height Factor<br />
                <span class="text-sm italic text-gray-600"
                  >Ceiling connection height above ground floor</span
                ><br />
                <button
                  type="button"
                  @click="showHeightInfo = !showHeightInfo"
                  class="text-sm text-blue-600 hover:underline"
                >
                  more info
                </button>
              </td>
              <td class="py-3">
                <select
                  v-model.number="heightFactor"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option
                    v-for="height in heightFactors"
                    :key="height.value"
                    :value="height.value"
                  >
                    {{ height.label }}
                  </option>
                </select>
              </td>
              <td class="py-3 text-right font-semibold w-24">
                {{ heightFactor }}
              </td>
            </tr>

            <!-- Seismic Weight -->
            <tr class="border-b">
              <td class="py-3 pr-4 text-right" colspan="2">
                Seismic Weight
                <span
                  class="badge bg-teal-500 text-white px-2 py-1 rounded text-xs ml-2"
                  >Sw</span
                >
              </td>
              <td class="py-3 text-right font-semibold w-24">
                {{ state.seismicWeight.value.toFixed(2) }}
              </td>
            </tr>

            <!-- Total Seismic Force -->
            <tr class="bg-green-50">
              <td class="py-3 pr-4 text-right" colspan="2">
                Total Seismic Force
                <span
                  class="badge bg-teal-600 text-white px-2 py-1 rounded text-xs ml-2"
                  >Sf</span
                ><br />
                <span class="text-sm">kg/m<sup>2</sup></span>
              </td>
              <td class="py-3 text-right w-24">
                <div class="font-semibold">
                  SLS = {{ state.seismicForces.value.sls }}<br />
                  <span v-if="state.limitStateLogic.showSLS2Calculations.value">
                    SLS2 = {{ state.seismicForces.value.sls2 }}<br />
                  </span>
                  ULS = {{ state.seismicForces.value.uls }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Importance Level Modal Content -->
      <div v-if="showImportanceInfo" class="bg-gray-100 p-4 rounded mt-4">
        <h4 class="text-lg font-semibold mb-3">Importance Level Details</h4>
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="border-b">
              <th class="py-2 text-left">Level</th>
              <th class="py-2 text-left">Comment</th>
              <th class="py-2 text-left">Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="py-2">1</td>
              <td class="py-2">Structures presenting a low degree of hazard</td>
              <td class="py-2">Farm buildings, isolated structures, fences</td>
            </tr>
            <tr class="border-b">
              <td class="py-2">2</td>
              <td class="py-2">Normal structures</td>
              <td class="py-2">
                Typical residential, commercial and industrial buildings
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-2">3</td>
              <td class="py-2">
                Structures containing crowds or high value contents
              </td>
              <td class="py-2">
                Schools >250 students, hospitals, public assembly buildings
              </td>
            </tr>
            <tr class="border-b bg-gray-200">
              <td class="py-2">4*</td>
              <td class="py-2">Post-disaster functions</td>
              <td class="py-2">Emergency services, medical facilities</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="py-2">5*</td>
              <td class="py-2">Special functions or catastrophic risk</td>
              <td class="py-2">Major dams, extreme hazard facilities</td>
            </tr>
          </tbody>
        </table>
        <p class="text-sm mt-2 italic">
          * These Importance Levels are not within the scope of this seismic
          guide, please contact a suitably qualified consulting engineer.
        </p>
      </div>

      <!-- Height Factor Info -->
      <div v-if="showHeightInfo" class="bg-gray-100 p-4 rounded mt-4">
        <h4 class="text-lg font-semibold mb-3">Height Factor</h4>
        <p class="text-sm">
          The height to be used is the height where the ceiling connects to the
          structure from the soil level, which is generally the ground floor.
          For a back braced design the connection height is the height at which
          the ceiling connects to the structure above.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref } from "vue";
  import {
    ZONE_FACTORS,
    IMPORTANCE_LEVELS,
    HEIGHT_FACTOR_OPTIONS,
  } from "../../data/plasterboardCeilingData.js";

  const state = inject("calculatorState");

  const { zoneFactor, importanceLevel, heightFactor } = state;

  const zoneFactors = ZONE_FACTORS;
  const importanceLevels = IMPORTANCE_LEVELS;
  const heightFactors = HEIGHT_FACTOR_OPTIONS;

  const showZoneMap = ref(false);
  const showImportanceInfo = ref(false);
  const showHeightInfo = ref(false);
</script>
