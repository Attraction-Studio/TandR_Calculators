<template>
  <div>
    <h2 class="global-step-title">Step Four - Selecting Back Bracing</h2>

    <div class="prose max-w-none space-y-6">
      <p class="paragraph-18px">
        Determine the maximum area of ceiling that each brace can support based
        on seismic force, brace type and the plenum height.
      </p>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <tbody>
            <!-- Maximum Plenum Height -->
            <tr class="border-b">
              <td class="py-3 pr-4">
                <b>Maximum Plenum Height (m)</b>
                <span
                  class="badge bg-green-600 text-white px-2 py-1 rounded text-xs ml-1"
                  >Ph</span
                >
              </td>
              <td class="py-3">
                <select
                  v-model.number="plenumHeight"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option
                    v-for="opt in plenumHeightOptions"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </option>
                </select>
              </td>
            </tr>

            <!-- 45° Stud Length -->
            <tr class="border-b">
              <td class="py-3 pr-4">
                <b>45° stud length (m)</b>
              </td>
              <td class="py-3 text-right font-semibold">
                {{ state.studLength45.value }} m
              </td>
            </tr>

            <!-- StratoBrace Capacity -->
            <tr class="border-b">
              <td class="py-3 pr-4">
                <b>StratoBrace Capacity (kg)</b>
              </td>
              <td class="py-3 text-right font-semibold">250 kg</td>
            </tr>

            <!-- Brace Arm Size -->
            <tr class="border-b">
              <td class="py-3 pr-4">
                <b>Brace Arm Size</b>
              </td>
              <td class="py-3 text-right">
                {{ state.braceArmType.value }}
              </td>
            </tr>

            <!-- Area Per Brace -->
            <tr class="bg-green-50">
              <td class="py-3 pr-4">
                <b>Area per Brace (m<sup>2</sup>)</b>
              </td>
              <td class="py-3 text-right font-semibold">
                {{ state.areaPerBrace.value.toFixed(1) }}
                <span
                  class="badge bg-yellow-500 text-white px-2 py-1 rounded text-xs ml-1"
                  >Ab</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="text-sm text-gray-600">
        Note that figures above are based on the T&R StratoBrace specifications.
        For further information please contact your local T&R representative.
      </p>

      <p class="text-sm text-gray-600">
        If further refinements to the back bracing design is required or a
        greater capacity of back bracing needed contact a suitably qualified
        chartered professional engineer.
      </p>

      <!-- Bracing Diagram Toggle -->
      <div class="text-center">
        <button
          type="button"
          @click="showBracingDiagram = !showBracingDiagram"
          class="text-sm text-blue-600 hover:underline"
        >
          {{ showBracingDiagram ? "Hide" : "Show" }} Bracing Diagram
        </button>
      </div>

      <div v-if="showBracingDiagram" class="bg-gray-100 p-4 rounded">
        <img
          src="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/6966ea719c75e19fd9e54c6a_BracingDiagram.png"
          alt="Bracing Diagram"
          class="w-full max-w-md mx-auto rounded mb-4"
        />
        <p class="text-sm text-center">
          Installation arrangement of StratoBrace. The brace is constructed of
          various steel stud compression posts with 2x steel studs at 45 degrees
          in each direction, depending on the plenum height.
        </p>
      </div>

      <!-- Connection Details Toggle -->
      <div class="text-center">
        <button
          type="button"
          @click="showConnectionDetails = !showConnectionDetails"
          class="text-sm text-blue-600 hover:underline"
        >
          {{ showConnectionDetails ? "Hide" : "Show" }} Connection Details
        </button>
      </div>

      <div v-if="showConnectionDetails" class="bg-gray-100 p-4 rounded">
        <p class="text-sm">
          All fasteners into the building structure are sufficient for the
          loadings imparted from the back bracing, as long as the manufacturers
          specifications are followed during the installation of the fastener.
        </p>
        <p class="text-sm mt-2">
          For connections into structure which are not detailed in the table
          please refer to our T&R representatives or a qualified chartered
          professional engineer.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref } from "vue";
  import { PLENUM_HEIGHT_OPTIONS } from "../../data/baffleCeilingData.js";

  const state = inject("calculatorState");

  const { plenumHeight } = state;

  const plenumHeightOptions = PLENUM_HEIGHT_OPTIONS;

  const showBracingDiagram = ref(false);
  const showConnectionDetails = ref(false);
</script>
