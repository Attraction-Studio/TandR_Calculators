<template>
  <div>
    <h2 class="global-step-title">Step Four - Overall Ceiling Capacity</h2>

    <div class="prose max-w-none space-y-6">
      <!-- Section 4.1: Edge Connection Capacity -->
      <div>
        <h3 class="text-xl font-semibold mb-3">
          4.1 Limiting Tee Length Based on Edge Connection Capacity
        </h3>
        <p class="paragraph-18px">
          The following steps calculate the maximum allowable tee lengths based
          on the capacity of the connection between the edge trim and the wall
          substrate. The allowable line load is based on the spacing between
          fasteners around the perimeter of the ceiling. For spacings below
          600mm, a continuous dwang will be required around the perimeter of the
          ceiling.
        </p>
        <p class="text-sm mb-4">
          For additional information, refer to the
          <a
            href="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/6966b40a22b6179339172162_TandR_Plasterboard_Edge_Connections.pdf"
            target="_blank"
            class="text-blue-600 hover:underline"
            >T&R Suspended Plasterboard Typical Edge Details</a
          >.
        </p>

        <table class="w-full border-collapse mb-6">
          <tbody>
            <tr class="border-b">
              <td class="py-3 pr-4">
                <b>Wall Substrate Fastener Spacing (mm)</b>
              </td>
              <td class="py-3" colspan="2">
                <select
                  v-model.number="wallFastenerSpacing"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option
                    v-for="opt in wallFastenerOptions"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </option>
                </select>
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-3 pr-4">
                <b>Maximum Length of Main and Cross Tees (m)</b>
              </td>
              <td class="py-3">
                SLS<br />
                <span v-if="state.limitStateLogic.showSLS2Calculations.value"
                  >SLS2<br
                /></span>
                ULS
              </td>
              <td class="py-3 text-right">
                {{ state.edgeConnectionTeeLengths.value.sls.toFixed(2) }}<br />
                <span v-if="state.limitStateLogic.showSLS2Calculations.value">
                  {{ state.edgeConnectionTeeLengths.value.sls2.toFixed(2)
                  }}<br />
                </span>
                {{ state.edgeConnectionTeeLengths.value.uls.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Section 4.2: Diaphragm Capacity -->
      <div>
        <h3 class="text-xl font-semibold mb-3">
          4.2 Overall Ceiling Capacity Based on Diaphragm Capacity
        </h3>
        <p class="paragraph-18px">
          This section calculates the capacity of the grid based on the
          diaphragm capacity of the plasterboard ceiling. The lining
          manufacturer's recommendations should be followed however if the
          recommended fastener spacings around the perimeter of each sheet are
          less than those required below, additional fasteners may be required
          for a specific seismic design.
        </p>
        <p class="text-sm mb-4">
          For additional information, refer to the
          <a
            href="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/6966b409d9878696980d1fed_TandR_Plasterboard_Layout.pdf"
            target="_blank"
            class="text-blue-600 hover:underline"
            >T&R Suspended Plasterboard Ceiling Layout Drawing</a
          >.
        </p>

        <table class="w-full border-collapse mb-6">
          <tbody>
            <tr class="border-b">
              <td class="py-3 pr-4">
                <b>Plasterboard fixing spacing around sheet perimeter (mm)</b>
              </td>
              <td class="py-3" colspan="3">
                <select
                  v-model.number="plasterboardFixingSpacing"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option
                    v-for="opt in plasterboardFixingOptions"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </option>
                </select>
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-3 pr-4" rowspan="2">
                <b>Maximum Length Tees (m)</b>
              </td>
              <td class="py-3"></td>
              <td class="py-3 text-right font-semibold">Main Tee</td>
              <td class="py-3 text-right font-semibold">Cross Tee</td>
            </tr>
            <tr class="border-b">
              <td class="py-3">
                SLS<br />
                <span v-if="state.limitStateLogic.showSLS2Calculations.value"
                  >SLS2<br
                /></span>
                ULS
              </td>
              <td class="py-3 text-right">
                {{ state.diaphragmTeeLengths.value.main.sls.toFixed(2) }}<br />
                <span v-if="state.limitStateLogic.showSLS2Calculations.value">
                  {{ state.diaphragmTeeLengths.value.main.sls2.toFixed(2)
                  }}<br />
                </span>
                {{ state.diaphragmTeeLengths.value.main.uls.toFixed(2) }}
              </td>
              <td class="py-3 text-right">
                {{ state.diaphragmTeeLengths.value.cross.sls.toFixed(2) }}<br />
                <span v-if="state.limitStateLogic.showSLS2Calculations.value">
                  {{ state.diaphragmTeeLengths.value.cross.sls2.toFixed(2)
                  }}<br />
                </span>
                {{ state.diaphragmTeeLengths.value.cross.uls.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Section 4.3: Limiting Tee Lengths -->
      <div>
        <h3 class="text-xl font-semibold mb-3">
          4.3 Selecting the Limiting Main and Cross Tee Lengths
        </h3>
        <p class="paragraph-18px">
          This section selects the limiting tee lengths for ULS, SLS and SLS2.
          The limiting tee length for the main and cross tees should be the
          smallest of the tee lengths calculated above in sections 4.1 and 4.2.
          Additionally all plasterboard ceilings are limited to a maximum
          allowable tee length of 12m due to the installation of control joints.
        </p>

        <table class="w-full border-collapse mb-6">
          <tbody>
            <tr class="border-b">
              <td class="py-3 pr-4">
                <b>Maximum allowable tee length for perimeter fixing (m)</b>
              </td>
              <td class="py-3 text-right font-semibold">
                Cross Tee Length
                <span
                  class="badge bg-orange-500 text-white px-2 py-1 rounded text-xs ml-1"
                  >Ct</span
                >
              </td>
              <td class="py-3 text-right font-semibold">
                Main Tee Length
                <span
                  class="badge bg-red-500 text-white px-2 py-1 rounded text-xs ml-1"
                  >Mt</span
                >
              </td>
            </tr>
            <tr class="border-b bg-green-50">
              <td class="py-3 pr-4">
                SLS<br />
                <span v-if="state.limitStateLogic.showSLS2Calculations.value"
                  >SLS2<br
                /></span>
                ULS
              </td>
              <td class="py-3 text-right font-semibold">
                {{ state.maxAllowableTeeLengths.value.cross.sls.toFixed(2)
                }}<br />
                <span v-if="state.limitStateLogic.showSLS2Calculations.value">
                  {{ state.maxAllowableTeeLengths.value.cross.sls2.toFixed(2)
                  }}<br />
                </span>
                {{ state.maxAllowableTeeLengths.value.cross.uls.toFixed(2) }}
              </td>
              <td class="py-3 text-right font-semibold">
                {{ state.maxAllowableTeeLengths.value.main.sls.toFixed(2)
                }}<br />
                <span v-if="state.limitStateLogic.showSLS2Calculations.value">
                  {{ state.maxAllowableTeeLengths.value.main.sls2.toFixed(2)
                  }}<br />
                </span>
                {{ state.maxAllowableTeeLengths.value.main.uls.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Links -->
      <div class="text-center space-y-2">
        <a
          href="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/6966b40a22b6179339172162_TandR_Plasterboard_Edge_Connections.pdf"
          target="_blank"
          class="text-blue-600 hover:underline block"
          >T&R Suspended Plasterboard Typical Edge Details</a
        >
        <a
          href="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/6966b409d9878696980d1fed_TandR_Plasterboard_Layout.pdf"
          target="_blank"
          class="text-blue-600 hover:underline block"
          >T&R Suspended Plasterboard Ceiling Layout Drawing</a
        >
      </div>

      <!-- Success Message -->
      <div class="alert alert-success mt-6">
        <p>
          If your allowable tee length is larger than the maximum tee length
          which you want to install, then your seismic design for the ceiling is
          complete.
        </p>
        <p class="text-center mt-4">
          <button
            @click="downloadResult"
            class="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <span class="mr-2">💾</span> Download Result
          </button>
        </p>
      </div>

      <!-- Info Message -->
      <div class="alert alert-info mt-4">
        <p>
          If your allowable tee length is less than the maximum tee length which
          you want to install then back bracing options are available to ensure
          the design is satisfactory.
        </p>
        <div class="mt-4">
          <p class="mb-2">
            Use <b>Back Braces</b> to transfer the seismic load of the ceiling
            to the structure, with floating edges around the sides of the
            ceiling.
          </p>
          <button
            @click="goToBackBrace"
            class="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Back Brace Requirements →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject } from "vue";
  import {
    WALL_FASTENER_SPACING_OPTIONS,
    PLASTERBOARD_FIXING_SPACING_OPTIONS,
  } from "../../data/plasterboardCeilingData.js";

  const state = inject("calculatorState");

  const { wallFastenerSpacing, plasterboardFixingSpacing } = state;

  const wallFastenerOptions = WALL_FASTENER_SPACING_OPTIONS;
  const plasterboardFixingOptions = PLASTERBOARD_FIXING_SPACING_OPTIONS;

  function downloadResult() {
    // TODO: Implement PDF download
    alert("Download functionality will be implemented");
  }

  function goToBackBrace() {
    state.showBackBrace.value = true;
  }
</script>
