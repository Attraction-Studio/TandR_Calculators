<template>
  <div>
    <h2 class="global-step-title">Site Information</h2>
    <p class="paragraph-18px mb-6">
      Enter details about your project location and building
    </p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <SelectField
          id="zone-factor"
          :model-value="state.zoneFactor.value"
          @update:model-value="(val) => (state.zoneFactor.value = val)"
          label="Seismic Zone"
          :options="zoneFactorOptions"
          placeholder="Select your location"
          required
          hint="Select the closest location to your project"
        />
        <div class="mt-1">
          <button
            type="button"
            @click="showZonesModal = true"
            class="text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1"
          >
            Show Zones
          </button>
        </div>
      </div>

      <div>
        <SelectField
          id="importance-level"
          :model-value="state.importanceLevel.value"
          @update:model-value="(val) => (state.importanceLevel.value = val)"
          label="Importance Level"
          :options="importanceLevelOptions"
          required
        />
        <div class="mt-1">
          <p class="text-xs text-gray-600 italic mb-1">
            Anything above IL3 will require a design by an engineer
          </p>
          <button
            type="button"
            @click="showImportanceModal = true"
            class="text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1"
          >
            more info
          </button>
        </div>
      </div>

      <InputField
        id="floor-height"
        :model-value="state.floorHeight.value"
        @update:model-value="(val) => (state.floorHeight.value = val)"
        label="Floor Height (m)"
        type="number"
        step="0.1"
        min="0"
        hint="Height from ground to floor level"
      />

      <InputField
        id="ceiling-height"
        :model-value="state.ceilingHeight.value"
        @update:model-value="(val) => (state.ceilingHeight.value = val)"
        label="Ceiling Height (m)"
        type="number"
        step="0.1"
        min="0"
        hint="Height from floor to ceiling"
      />

      <div>
        <SelectField
          id="ductility"
          :model-value="state.ductility.value"
          @update:model-value="(val) => (state.ductility.value = val)"
          label="Ductility"
          :options="ductilityOptions"
          hint="Ductility factor for ULS calculations"
        />
        <div class="mt-1">
          <button
            type="button"
            @click="showDuctilityModal = true"
            class="text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1"
          >
            more info
          </button>
        </div>
      </div>
    </div>

    <!-- Importance Level Modal -->
    <Modal v-model="showImportanceModal" title="Importance Level" size="lg">
      <div>
        <h3 class="text-lg font-semibold mb-4">Importance Level Details</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Importance Level
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Comment
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Examples
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td
                  class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  1
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  Structures presenting a low degree of hazard to life and other
                  property
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  Structures with a total floor area of &lt; 30m<sup>2</sup
                  ><br />
                  Farm buildings, isolated structures, towers in rural
                  situations<br />
                  Fences, masts, walls, in-ground swimming pools
                </td>
              </tr>
              <tr>
                <td
                  class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  2
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  Normal structures and structures not in other importance
                  levels
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  Buildings not included in Importance Levels 1, 3 or 4<br /><br />
                  Included in this section is buildings posing a normal risk to
                  human life or the environment or a normal economic cost should
                  the building fail. These are typical residential, commercial
                  and industrial buildings.
                </td>
              </tr>
              <tr>
                <td
                  class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  3
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  Structures that as a whole may contain people in crowds or
                  contents of high value to the community or pose risks to
                  people in crowds
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  Buildings and facilities as follows:
                  <ul class="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      Where more than 300 people can congregate in one area
                    </li>
                    <li>
                      Day care facilities with a capacity of greater than 150
                    </li>
                    <li>
                      Primary school or secondary school facilities with a
                      capacity greater than 250
                    </li>
                    <li>
                      Colleges or adult education facilities with a capacity
                      greater than 500
                    </li>
                    <li>
                      Health care facilities with a capacity of 50 or more
                      resident patients but not having surgery or emergency
                      treatment facilities
                    </li>
                    <li>
                      Airport terminals, principal railway stations with a
                      capacity of greater than 250
                    </li>
                    <li>Correctional institutions</li>
                    <li>
                      Multi-occupancy residential, commercial (including shops),
                      industrial, office and retailing buildings designed to
                      accommodate more than 5000 people and with a gross area of
                      more than 10,000m<sup>2</sup>
                    </li>
                    <li>
                      Public assembly buildings, theatres and cinemas greater
                      than 1000m<sup>2</sup>
                    </li>
                  </ul>
                  <p class="mt-2">
                    Emergency medical and other emergency facilities not
                    designated as post disaster<br />
                    Power-generating facilities, water treatment and waste-water
                    treatment facilities and other public utilities not
                    designated as post-disaster<br />
                    Buildings and facilities not designated as post-disaster
                    containing hazardous materials capable of causing hazardous
                    conditions that do not extend beyond the property boundaries
                  </p>
                </td>
              </tr>
              <tr class="bg-gray-50">
                <td
                  class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  4 <span class="text-red-600">*</span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  Structures with special post-disaster functions
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  Buildings and facilities designated as essential facilities<br />
                  Buildings and facilities with special post-disaster
                  function<br />
                  Medical emergency or surgical facilities<br />
                  Emergency service facilities such as fire, police stations and
                  emergency vehicle garages<br />
                  Utilities or emergency supplies or installations required as
                  backup for buildings and facilities of Importance Level 4<br />
                  Designated emergency shelters, designated emergency centres
                  and ancillary facilities<br />
                  Buildings and facilities containing hazardous material capable
                  of causing hazardous conditions that extend beyond the
                  property boundaries
                </td>
              </tr>
              <tr class="bg-gray-50">
                <td
                  class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  5 <span class="text-red-600">*</span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  Structures that have special functions or whose failure poses
                  catastrophic risk to a large area (eg 100km<sup>2</sup>) or a
                  large number of people (e.g., 100,000)
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  Major dams<br />
                  Extreme hazard facilities
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p class="text-sm text-gray-700">
            <span class="text-red-600 font-semibold">*</span> Note: These
            Importance Levels are not within the scope of this seismic guide,
            please contact a suitably qualified consulting engineer for further
            information.
          </p>
        </div>
      </div>
    </Modal>

    <!-- Zones Modal -->
    <Modal v-model="showZonesModal" title="Seismic Zone Map" size="xl">
      <div>
        <p class="text-sm mb-4">
          Locate the area for which the suspended ceiling will be installed.
          Find the Site Specific Zone Factor by locating the line closest to the
          area of installation, or the shaded area it is within, and tapping it
          to show the rating.
        </p>
        <div class="w-full" style="min-height: 480px">
          <iframe
            :src="mapUrl"
            width="100%"
            height="480"
            style="border: none; width: 100%"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </Modal>

    <!-- Ductility Modal -->
    <Modal v-model="showDuctilityModal" title="Ductility" size="md">
      <div class="space-y-4">
        <p>
          The ductility of a ceiling relates to the capability of the ceiling
          and it's connections to absorb and dissipate energy during an
          earthquake without failure.
        </p>
        <p>
          A higher ductility allows for a greater ability to absorb earthquake
          energy, and therefore results in larger limiting lengths. Using a
          ductility of 1.0 is the more conservative approach.
        </p>
        <div>
          <p class="font-semibold mb-2">Standards guidance:</p>
          <ul class="list-disc pl-5 space-y-2">
            <li>
              <b>NZS2785:2020</b>, Suspended ceilings - Design and installation.
              - This standard gives a maximum ductility of 1.0 for ultimate
              limit state.
            </li>
            <li>
              <b>NZS4600:2018</b>, Cold-formed steel structures. - This standard
              gives a maximum ductility of 1.25 for ultimate limit state.
            </li>
          </ul>
        </div>
        <div class="p-3 bg-gray-50 border border-gray-200 rounded">
          <p class="text-sm italic text-gray-700">
            Both standards are referenced by B1 of the NZ building code (NZS2785
            is indirectly referenced), in general the most current standard
            should be used.
          </p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
  import { inject, ref } from "vue";
  import StepCard from "../../../components/StepCard.vue";
  import SelectField from "../../../components/SelectField.vue";
  import InputField from "../../../components/InputField.vue";
  import Modal from "../../../components/Modal.vue";
  import {
    ZONE_FACTORS,
    IMPORTANCE_LEVELS,
  } from "../../data/suspendedCeilingData.js";

  const state = inject("calculatorState");
  const zoneFactorOptions = ZONE_FACTORS;
  const importanceLevelOptions = IMPORTANCE_LEVELS.filter((il) => !il.disabled);

  // Ductility options (legacy: <option value="1">1</option> and <option value="1.25">1.25</option>)
  const ductilityOptions = [
    { value: 1, label: "1.0 (Standard)" },
    { value: 1.25, label: "1.25 (NZS4600:2018)" },
  ];

  // Modal state
  const showZonesModal = ref(false);
  const showImportanceModal = ref(false);
  const showDuctilityModal = ref(false);

  // Google Maps embed URL (legacy: suspended_ceiling_calculator.js:109)
  const mapUrl =
    "https://www.google.com/maps/d/embed?mid=10bhne8TlErYtzZIwt3-e_dYP_yo&z=5";
</script>
