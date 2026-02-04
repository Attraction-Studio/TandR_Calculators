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
            class="text-link"
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
            class="text-link"
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
            <tr class="bg-green-50">
              <td class="py-3 px-4">
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

      <!-- Success Message -->
      <div class="border-t pt-6 border-color">
        <p class="max-w-[600px]">
          If your allowable tee length is larger than the maximum tee length
          which you want to install, then your seismic design for the ceiling is
          complete.
        </p>
        <p class="text-center mt-4">
          <button
            @click="downloadResult"
            class="px-6 py-4 bg-[#3C999B] !text-white font-semibold hover:bg-[#3C999B]/80 transition-colors flex items-center gap-2"
          >
            Download Result
          </button>
        </p>
      </div>

      <!-- Info Message -->
      <div class="mt-4">
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
            class="px-6 py-3 bg-gray-800 !text-white font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            Back Brace Requirements →
          </button>
        </div>
      </div>
    </div>

    <!-- Download Modal -->
    <div
      v-if="showDownloadModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showDownloadModal = false"
    >
      <div
        class="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">Download PDF</h3>
          <button
            @click="showDownloadModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Job Name</label>
            <input
              type="text"
              v-model="projectName"
              placeholder="My Project"
              class="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Prepared For</label>
            <input
              type="text"
              v-model="preparedFor"
              placeholder="Client Name"
              class="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1"
              >Add a note on your document</label
            >
            <textarea
              v-model="notes"
              rows="3"
              class="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>

          <h4 class="text-lg font-semibold mt-6">
            Enter the Maximum measured Tee Lengths as per plans supplied
          </h4>

          <div>
            <label class="block text-sm font-medium mb-1"
              >Max Main Tee (m)</label
            >
            <input
              type="number"
              step="0.1"
              v-model.number="maxMainTeeSupplied"
              class="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1"
              >Max Cross Tee (m)</label
            >
            <input
              type="number"
              step="0.1"
              v-model.number="maxCrossTeeSupplied"
              class="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            @click="buildPDF"
            class="w-full px-8 py-4 bg-[#3C999B] !text-white font-semibold hover:bg-[#3C999B]/80 transition-colors flex items-center justify-center gap-2"
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
            Download PDF
          </button>
        </div>

        <div class="mt-4 pt-4 border-t">
          <button
            @click="showDownloadModal = false"
            class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref } from "vue";
  import {
    WALL_FASTENER_SPACING_OPTIONS,
    PLASTERBOARD_FIXING_SPACING_OPTIONS,
  } from "../../data/plasterboardCeilingData.js";
  import { exportPlasterboardCeilingPDF } from "../../utils/pdfExport.js";

  const state = inject("calculatorState");

  const { wallFastenerSpacing, plasterboardFixingSpacing } = state;

  const wallFastenerOptions = WALL_FASTENER_SPACING_OPTIONS;
  const plasterboardFixingOptions = PLASTERBOARD_FIXING_SPACING_OPTIONS;

  // Download modal state
  const showDownloadModal = ref(false);
  const projectName = ref("");
  const preparedFor = ref("");
  const notes = ref("");
  const maxMainTeeSupplied = ref(0);
  const maxCrossTeeSupplied = ref(0);

  function downloadResult() {
    showDownloadModal.value = true;
  }

  function buildPDF() {
    try {
      exportPlasterboardCeilingPDF(state, {
        jobName: projectName.value || "Untitled Project",
        preparedFor: preparedFor.value,
        notes: notes.value,
        maxMainTeeSupplied: maxMainTeeSupplied.value || 0,
        maxCrossTeeSupplied: maxCrossTeeSupplied.value || 0,
      });
      showDownloadModal.value = false;
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  }

  function goToBackBrace() {
    state.showBackBrace.value = true;
  }
</script>
