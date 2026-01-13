<template>
  <div>
    <h2 class="global-step-title">Step Six - Back Bracing Layout</h2>

    <div class="prose max-w-none space-y-6">
      <p class="paragraph-18px">
        Calculate the minimum number of back braces required.
      </p>

      <h3 class="text-xl font-semibold">
        Minimum number of back braces required
      </h3>

      <table class="w-full border-collapse text-center">
        <tbody>
          <tr class="border-b">
            <td class="py-3 px-2">
              <b>Total Ceiling Area (m<sup>2</sup>)</b>
              <span
                class="badge bg-green-500 text-white px-2 py-1 rounded text-xs ml-1"
                >Ca</span
              >
            </td>
            <td class="py-3 px-2" rowspan="2"><b>/</b></td>
            <td class="py-3 px-2">
              <b>Area per Brace (m<sup>2</sup>)</b>
              <span
                class="badge bg-yellow-500 text-white px-2 py-1 rounded text-xs ml-1"
                >Ab</span
              >
            </td>
            <td class="py-3 px-2" rowspan="2"><b>=</b></td>
            <td class="py-3 px-2">
              <b>Minimum Number of braces</b>
              <span
                class="badge bg-green-600 text-white px-2 py-1 rounded text-xs ml-1"
                >#b</span
              >
            </td>
          </tr>
          <tr class="border-b bg-green-50">
            <td class="py-3 px-2">
              <input
                type="number"
                step="0.1"
                v-model.number="ceilingArea"
                class="w-32 border border-gray-300 rounded px-3 py-2 text-center"
              />
            </td>
            <td class="py-3 px-2">{{ state.areaPerBrace.value.toFixed(1) }}</td>
            <td class="py-3 px-2 font-semibold text-lg">
              {{ state.minimumBraces.value }}
            </td>
          </tr>
        </tbody>
      </table>

      <p class="paragraph-18px mt-6">
        The plasterboard lining rigidly holds the grid together, creating a
        diaphragm that transfers the seismic load evenly through the system into
        the structure. Therefore the back braces are to be laid out evenly over
        the ceiling based on the allowable area per brace.
      </p>

      <p class="paragraph-18px">
        The number of braces calculated represents the minimum number of braces
        required to transfer the seismic load from the ceiling back to the
        structure. If the ceiling has many corners, discontinuities, breaks, or
        unique shape then it is likely that additional braces will be required.
        Following the brace placement guidelines should result in the ceiling
        being adequately braced.
      </p>

      <div class="bg-gray-100 p-4 rounded">
        <p class="font-semibold mb-2">Brace placement steps:</p>
        <ol class="list-decimal pl-6 space-y-1">
          <li>Place braces near ceiling corners.</li>
          <li>Place braces near discontinuities / breaks in the ceiling.</li>
          <li>Place braces near the ceiling edges.</li>
          <li>
            Evenly distribute the remaining number of braces throughout the
            ceiling.
          </li>
          <li>
            Check that the area that is supported by each brace does not exceed
            the maximum area per brace. If the area per brace is exceeded then
            additional braces must be added.
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject } from "vue";

  const state = inject("calculatorState");

  const { ceilingArea } = state;
</script>
