<template>
  <div>
    <h2 class="global-step-title">Step Five - Back Bracing</h2>

    <div class="prose max-w-none space-y-6">
      <p class="paragraph-18px">
        Determine the maximum area of ceiling that each brace can support based
        on seismic force, brace type and the plenum height.
      </p>

      <!-- Brace Types Toggle -->
      <div>
        <button
          type="button"
          @click="showBraceTypes = !showBraceTypes"
          class="text-sm text-blue-600 hover:underline"
        >
          {{ showBraceTypes ? "Hide" : "Show" }} brace types
        </button>
      </div>

      <div
        v-if="showBraceTypes"
        class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6"
      >
        <div class="border rounded p-4">
          <h4 class="font-semibold mb-2">Type A Brace</h4>
          <img
            src="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/6966b3bc9251a20b1e9bea66_pbtypea.jpg"
            alt="Type A Brace"
            class="w-full rounded mb-2"
          />
          <p class="text-sm">
            <b>Figure 5.1: Installation arrangement of Type A brace.</b><br />
            The brace is constructed of 64 x 33 x 0.5mm steel stud compression
            post, with 2x 64 x 33 x 0.5mm steel studs at 45 degrees in each
            direction.
          </p>
        </div>
        <div class="border rounded p-4">
          <h4 class="font-semibold mb-2">Type B Brace</h4>
          <img
            src="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/6966b3ed898cc40e6054e7e6_BraceTypeC.PNG"
            alt="Type B Brace"
            class="w-full rounded mb-2"
          />
          <p class="text-sm">
            <b
              >Figure 5.2: Installation arrangement of StratoBrace (Type B) back
              brace.</b
            ><br />
            The brace is constructed of various steel stud compression posts
            with 2x steel studs at 45 degrees in each direction, depending on
            the plenum height. Instead of using the steel studs fastened
            directly onto the grid, a StratoBrace bracket is used.
          </p>
        </div>
      </div>

      <!-- Brace Capacity -->
      <h3 class="text-xl font-semibold">Brace Capacity</h3>
      <table class="w-full border-collapse text-center">
        <tbody>
          <tr class="border-b">
            <td class="py-3 px-4">
              <b>Brace Type</b>
            </td>
            <td class="py-3 px-4">
              <select
                v-model="braceType"
                class="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option
                  v-for="opt in braceTypeOptions"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>
            </td>
          </tr>
          <tr class="border-b">
            <td class="py-3 px-4">
              <b>Plenum Height (mm)</b>
              <span
                class="badge bg-green-600 text-white px-2 py-1 rounded text-xs ml-1"
                >Ph</span
              >
            </td>
            <td class="py-3 px-4">
              <input
                type="number"
                step="1"
                v-model.number="plenumHeight"
                class="w-full border border-gray-300 rounded px-3 py-2 text-center"
              />
            </td>
          </tr>
          <tr class="border-b">
            <td class="py-3 px-4">
              <b>Brace Capacity (kg)</b>
            </td>
            <td class="py-3 px-4 font-semibold">
              {{ state.braceCapacityResult.value.capacity }}
            </td>
          </tr>
          <tr class="border-b">
            <td class="py-3 px-4">
              <b>Bracing Requirement</b>
            </td>
            <td class="py-3 px-4">
              {{ state.braceCapacityResult.value.requirement }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Area Per Brace -->
      <h3 class="text-xl font-semibold mt-8">Area Per Brace</h3>
      <table class="w-full border-collapse text-center">
        <tbody>
          <tr class="border-b">
            <td class="py-3 px-2"><b>Motion limiting factor</b></td>
            <td class="py-3 px-2" rowspan="2"><b>×</b></td>
            <td class="py-3 px-2"><b>Brace Capacity (kg)</b></td>
            <td class="py-3 px-2" rowspan="2"><b>/</b></td>
            <td class="py-3 px-2"><b>Seismic Force (kg/m<sup>2</sup>)</b></td>
            <td class="py-3 px-2" rowspan="2"><b>=</b></td>
            <td class="py-3 px-2">
              <b>Area per Brace (m<sup>2</sup>)</b>
              <span
                class="badge bg-yellow-500 text-white px-2 py-1 rounded text-xs ml-1"
                >Ab</span
              >
            </td>
          </tr>
          <tr class="border-b bg-green-50">
            <td class="py-3 px-2">0.8</td>
            <td class="py-3 px-2">
              {{ state.braceCapacityResult.value.capacity }}
            </td>
            <td class="py-3 px-2">
              {{ state.governingSeismicForce.value.toFixed(1) }}
            </td>
            <td class="py-3 px-2 font-semibold">
              {{ state.areaPerBrace.value.toFixed(1) }}
            </td>
          </tr>
        </tbody>
      </table>

      <p class="text-sm mt-4">
        Note that for raked ceilings, StratoBrace back bracing cannot be used.
        Type A bracing can be specified or contact a suitably qualified
        consulting engineer if specific back bracing design is required. Note
        that these figures are based on the StratoBrace specifications, ensure
        that when StratoBrace is used the installation recommendations and
        guidelines are followed.
      </p>
      <p class="text-sm">
        If further refinements to the back bracing design are required or a
        greater capacity of back bracing needed, contact a suitably qualified
        consulting engineer.
      </p>

      <!-- Bracing Connection Details -->
      <div class="text-center mt-6">
        <button
          type="button"
          @click="showConnectionDetails = !showConnectionDetails"
          class="text-sm text-blue-600 hover:underline"
        >
          Bracing connection details
        </button>
      </div>
      <div v-if="showConnectionDetails" class="bg-gray-100 p-4 rounded mt-4">
        <p class="text-sm">
          All fasteners into the building structure are sufficient for the
          loadings imparted from the back bracing, as long as the manufacturers
          specifications are followed during the installation of the fastener.
        </p>
        <p class="text-sm mt-2">
          For connections into structure which are not detailed in the table
          please discuss with a suitably qualified consulting engineer.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref } from "vue";
  import { BRACE_TYPE_OPTIONS } from "../../data/plasterboardCeilingData.js";

  const state = inject("calculatorState");

  const { braceType, plenumHeight } = state;

  const braceTypeOptions = BRACE_TYPE_OPTIONS;

  const showBraceTypes = ref(false);
  const showConnectionDetails = ref(false);
</script>
