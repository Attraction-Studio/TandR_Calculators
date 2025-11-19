<template>
  <div>
    <h2 class="global-step-title">Step Seven - Rigid Hanger Suitability</h2>

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
      <h3 class="text-lg font-bold text-gray-900 mb-4">
        Rigid Hanger Calculations
      </h3>

      <div class="bg-gray-50 p-6 rounded-lg space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              Height from connection to overhead structure to ground level
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Max Plenum Height (mm)
            </label>
            <input
              type="number"
              v-model="maxPlenumHeight"
              step="10"
              min="0"
              class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Hanger Spacing
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

        <!-- Results Table -->
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
                  Seismic Moment ULS
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
                >
                  {{ rigidHangerCalculations.smuls.toFixed(2) }} kgm
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Seismic Moment SLS2
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
                >
                  {{ rigidHangerCalculations.smsls2.toFixed(2) }} kgm
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Seismic Moment SLS
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
                >
                  {{ rigidHangerCalculations.smsls.toFixed(2) }} kgm
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Dead & Live Load per Hanger
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
                >
                  {{ rigidHangerCalculations.dllPerH.toFixed(2) }} kg
                </td>
              </tr>
              <tr class="bg-gray-50 font-medium">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Suitability Check (Interaction Equation)
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
                >
                  {{ rigidHangerCalculations.designTick.toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Suitability Result -->
        <div
          class="p-4 rounded-md flex items-center justify-between"
          :class="
            rigidHangerCalculations.isSuitable
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          "
        >
          <span class="font-bold text-lg">
            {{
              rigidHangerCalculations.isSuitable ? "SUITABLE" : "NOT SUITABLE"
            }}
          </span>
          <span class="text-sm">
            {{
              rigidHangerCalculations.isSuitable
                ? "Design criteria met (< 1.0)"
                : "Design criteria not met (> 1.0)"
            }}
          </span>
        </div>

        <div class="text-sm text-gray-500">
          <p>
            <strong>Note:</strong> Hanger Type assumed: 40 x 40 x 1.15 BMT Equal
            Angle
          </p>
        </div>
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
