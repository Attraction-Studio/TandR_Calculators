<template>
  <div>
    <h2 class="global-step-title">Calculating Rigid Hanger suitability</h2>

    <div class="paragraph-18px mb-6 space-y-4">
      <p>
        This section calculates if rigid hangers are suitable for providing dead
        load, live load and seismic restraint of the ceiling.
      </p>
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p class="mb-2">
          <strong
            >Rigid Hangers are suitable in the following situations:</strong
          >
        </p>
        <ul class="list-disc list-inside ml-4 space-y-1 text-sm text-gray-700">
          <li>Low plenum height (less than 600mm)</li>
          <li>Purlins or timber joists above</li>
          <li>Edge restraining the ceiling is not suitable</li>
        </ul>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p class="mb-2"><strong>Rigid Hangers cannot be used if:</strong></p>
        <ul class="list-disc list-inside ml-4 space-y-1 text-sm text-gray-700">
          <li>The plenum height is larger than 600mm</li>
          <li>
            Concrete slab is above (back bracing is more suitable in this
            situation)
          </li>
        </ul>
      </div>
      <p>
        If rigid hangers are used, the suspended ceiling should have floating
        edges on all edges.
      </p>
      <img
        src="https://www.tris.co.nz/uploads/images/rigid-hanger.jpg"
        alt="rigid hanger"
        class="max-w-full h-auto rounded border border-gray-300"
      />
      <p>
        <a
          href="https://www.tris.co.nz/uploads/pdfs/TRIS-RigidHangerDetail.pdf"
          target="_blank"
          class="text-blue-600 hover:text-blue-800 underline"
        >
          Typical Rigid Hanger installation example (pdf)
        </a>
      </p>
    </div>

    <div class="mb-8 border-t border-gray-300 pt-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Inputs -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Connection Height (m)
          </label>
          <input
            type="number"
            v-model="connectionHeight"
            step="0.1"
            min="0"
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <p class="text-xs text-gray-500 mt-1">
            This is the maximum height of the rigid hanger connection to
            structure. Measure from the connection to overhead structure to the
            ground level.
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Maximum Plenum Height (mm)
          </label>
          <input
            type="number"
            v-model="maxPlenumHeight"
            step="10"
            min="0"
            max="999"
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            :class="{
              'border-red-500 focus:border-red-500 focus:ring-red-500':
                maxPlenumHeight > 999,
            }"
          />
          <p class="text-xs text-gray-500 mt-1">
            Specify the maximum plenum height so the seismic moment per hanger
            can be determined.
            <strong>This needs to be less than 600mm.</strong>
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Choose Hanger Spacing
          </label>
          <select
            v-model="hangerSpacing"
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option :value="1.2">1.2m</option>
            <option :value="2.4">2.4m</option>
          </select>
        </div>
      </div>

      <!-- Seismic Moment Table -->
      <div class="mb-8">
        <h3 class="text-lg font-bold text-gray-900 mb-2">Seismic Moment</h3>
        <p class="text-sm text-gray-700 mb-4">
          The maximum allowable plenum height for rigid hanger ceilings is
          600mmm. The seismic moment per hanger is then equal to the seismic
          load multiplied by the hanger spacing and the plenum height. Repeat
          this separately for ULS, SLS1 and SLS2 seismic forces.
        </p>
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 border border-gray-300 text-center text-sm"
          >
            <thead class="bg-gray-50">
              <tr>
                <th class="px-2 py-2 font-medium text-gray-500">Design</th>
                <th class="px-2 py-2 font-medium text-gray-500">
                  Hanger Span (m)
                </th>
                <th class="px-1 py-2 font-medium text-gray-500">x</th>
                <th class="px-2 py-2 font-medium text-gray-500">
                  Hanger Spacing (m)
                </th>
                <th class="px-1 py-2 font-medium text-gray-500">x</th>
                <th class="px-2 py-2 font-medium text-gray-500">
                  Seismic Force (kg)
                </th>
                <th class="px-1 py-2 font-medium text-gray-500">x</th>
                <th class="px-2 py-2 font-medium text-gray-500">
                  Plenum Height (m)
                </th>
                <th class="px-1 py-2 font-medium text-gray-500">=</th>
                <th class="px-2 py-2 font-medium text-gray-500">
                  Seismic Moment per Hanger (kgm)
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-2 py-2 font-medium">ULS</td>
                <td class="px-2 py-2">1.2</td>
                <td class="px-1 py-2">x</td>
                <td class="px-2 py-2">{{ hangerSpacing }}</td>
                <td class="px-1 py-2">x</td>
                <td class="px-2 py-2">
                  {{ rigidHangerCalculations.total2b_rh }}
                </td>
                <td class="px-1 py-2">x</td>
                <td class="px-2 py-2">{{ rigidHangerCalculations.maxph }}</td>
                <td class="px-1 py-2">=</td>
                <td class="px-2 py-2 font-bold">
                  {{ rigidHangerCalculations.smuls }}
                </td>
              </tr>
              <tr>
                <td class="px-2 py-2 font-medium">SLS2</td>
                <td class="px-2 py-2">1.2</td>
                <td class="px-1 py-2">x</td>
                <td class="px-2 py-2">{{ hangerSpacing }}</td>
                <td class="px-1 py-2">x</td>
                <td class="px-2 py-2">
                  {{ rigidHangerCalculations.total2a_rh }}
                </td>
                <td class="px-1 py-2">x</td>
                <td class="px-2 py-2">{{ rigidHangerCalculations.maxph }}</td>
                <td class="px-1 py-2">=</td>
                <td class="px-2 py-2 font-bold">
                  {{ rigidHangerCalculations.smsls2 }}
                </td>
              </tr>
              <tr>
                <td class="px-2 py-2 font-medium">SLS</td>
                <td class="px-2 py-2">1.2</td>
                <td class="px-1 py-2">x</td>
                <td class="px-2 py-2">{{ hangerSpacing }}</td>
                <td class="px-1 py-2">x</td>
                <td class="px-2 py-2">
                  {{ rigidHangerCalculations.total2_rh }}
                </td>
                <td class="px-1 py-2">x</td>
                <td class="px-2 py-2">{{ rigidHangerCalculations.maxph }}</td>
                <td class="px-1 py-2">=</td>
                <td class="px-2 py-2 font-bold">
                  {{ rigidHangerCalculations.smsls }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Hanger Type Table -->
      <div class="mb-8">
        <h3 class="text-lg font-bold text-gray-900 mb-2">Hanger Type</h3>
        <p class="text-sm text-gray-700 mb-4">
          As per AS/NZS 2785 3.2.2 (c), if the Dead and Live load per hanger is
          less than 50kg then 50kg shall be used as the design load. The
          allowable loads per hanger are shown in the Table below. If a hanger
          spacing of 2.4m is specified, hanger wires at 1200x1200mm spacing are
          required for static support of the ceiling.
        </p>
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 border border-gray-300 text-center text-sm"
          >
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 font-medium text-gray-500">Hanger Type</th>
                <th class="px-4 py-2 font-medium text-gray-500">
                  Tensile Capacity
                </th>
                <th class="px-4 py-2 font-medium text-gray-500">
                  Bending Capacity
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-4 py-2">40 x 40 x 1.15 BMT Equal Angle</td>
                <td class="px-4 py-2">412kg</td>
                <td class="px-4 py-2">4.5kgm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Hanger Suitability Check Table -->
      <div class="mb-8">
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          Hanger suitability check
        </h3>
        <p class="text-sm text-gray-700 mb-4">
          The suitability check is then carried out as follows.
        </p>
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 border border-gray-300 text-center text-sm"
          >
            <thead class="bg-gray-50">
              <tr>
                <th class="px-2 py-2 font-medium text-gray-500">
                  Dead and Live load per hanger
                </th>
                <th class="px-1 py-2 font-medium text-gray-500">/</th>
                <th class="px-2 py-2 font-medium text-gray-500">
                  Tensile Capacity
                </th>
                <th class="px-1 py-2 font-medium text-gray-500">+</th>
                <th class="px-2 py-2 font-medium text-gray-500">
                  Largest Seismic moment per hanger (kgm)
                </th>
                <th class="px-1 py-2 font-medium text-gray-500">/</th>
                <th class="px-2 py-2 font-medium text-gray-500">
                  Bending Capacity
                </th>
                <th class="px-1 py-2 font-medium text-gray-500">&lt;</th>
                <th class="px-2 py-2 font-medium text-gray-500">
                  Design Criteria
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-2 py-2">{{ rigidHangerCalculations.dllPerH }}</td>
                <td class="px-1 py-2">/</td>
                <td class="px-2 py-2">412</td>
                <td class="px-1 py-2">+</td>
                <td class="px-2 py-2">{{ rigidHangerCalculations.smBest }}</td>
                <td class="px-1 py-2">/</td>
                <td class="px-2 py-2">4.5</td>
                <td class="px-1 py-2">&lt;</td>
                <td
                  class="px-2 py-2 font-bold flex items-center justify-center gap-2"
                  :class="
                    rigidHangerCalculations.isSuitable
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  {{ rigidHangerCalculations.designTick }} &lt; 1
                  <span class="text-xl">{{
                    rigidHangerCalculations.isSuitable ? "✓" : "✗"
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Final Result Message -->
      <div
        class="p-4 rounded-md flex items-center justify-between border"
        :class="
          rigidHangerCalculations.isSuitable
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        "
      >
        <span class="font-bold text-lg">
          {{ rigidHangerCalculations.isSuitable ? "SUITABLE" : "NOT SUITABLE" }}
        </span>
        <span class="text-sm">
          {{
            rigidHangerCalculations.isSuitable
              ? "Design criteria met (< 1.0)"
              : "Design criteria not met (> 1.0)"
          }}
        </span>
      </div>

      <!-- Download Result Button (Placeholder) -->
      <div class="flex justify-center mt-8">
        <button
          type="button"
          class="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
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
    </div>
  </div>
</template>

<script setup>
  import { inject, toRefs } from "vue";

  const calculatorState = inject("calculatorState");
  const {
    connectionHeight,
    maxPlenumHeight,
    hangerSpacing,
    rigidHangerCalculations,
  } = toRefs(calculatorState);
</script>
