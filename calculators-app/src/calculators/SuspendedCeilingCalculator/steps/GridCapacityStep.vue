<template>
  <div>
    <h2 class="global-step-title">Calculating the Grid Capacity</h2>

    <!-- Introduction -->
    <div class="paragraph-18px mb-6 space-y-4">
      <p>
        This section calculates the limiting tee length using the seismic force
        and the capacity of the grid tees.
      </p>
      <p>
        Physical testing and calculations have given a capacity of the main and
        cross tees per metre. These limiting tee lengths will be used for both
        fixed two float two perimeter fixing and back bracing suspended ceiling
        seismic restraint.
      </p>
      <p>
        The following steps calculate the maximum allowable tee lengths based on
        the capacity of the tees. Firstly, select the type of trim used, type of
        connection and the corresponding capacity of the structural limit state.
      </p>
      <p>
        Rivets are to be 3.2mm steel rivets or 3.2mm grade 5056 aluminum rivets.
      </p>
      <p>
        <button
          type="button"
          @click="showClipDetail = true"
          class="text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1"
        >
          T&R Seismic Clip Detail
        </button>
      </p>
    </div>

    <!-- Grid Configuration -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4">Grid Configuration</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SelectField
          id="grid-type"
          :model-value="state.gridType.value"
          @update:model-value="(val) => (state.gridType.value = val)"
          label="Grid Type"
          :options="gridTypeOptions"
        />

        <div>
          <label class="block btn_12_text mb-2">
            Connection Type (wall angle)
          </label>
          <p class="text-xs text-gray-600 mb-3">
            If limiting tee length is not satisfactory, then increase the number
            of rivets to increase the allowable tee length. If none of these
            options work then seismic breaks or back bracing will be required.
            For riveted fixed edges, minimum trim thickness is 0.6mm BMT. Note
            that trim size doesn't matter for the seismic clips. Trim must be
            large enough to accommodate the required floating edge clearance.
          </p>
          <div class="space-y-3">
            <SelectField
              id="stud-type"
              :model-value="state.studType.value"
              @update:model-value="(val) => (state.studType.value = val)"
              label="Wall Construction Type"
              :options="studTypeOptions"
            />
            <SelectField
              id="connection-type"
              :model-value="state.connectionType.value"
              @update:model-value="(val) => (state.connectionType.value = val)"
              label="Connection Type"
              :options="connectionTypeOptions"
            />
            <div class="text-right">
              <span class="text-sm text-gray-600">Connection Capacity:</span>
              <span class="text-lg font-semibold ml-2">
                {{ connectionCapacity.toFixed(1) }}kg
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 p-4 bg-gray-50 border border-brand-black">
        <h4 class="btn_12_text mb-2">Grid Spacing</h4>
        <div class="flex gap-6">
          <div>
            <span class="text-sm">Main Tee:</span>
            <span class="font-semibold ml-2"
              >{{ state.gridSpacing.value.main }}m</span
            >
          </div>
          <div>
            <span class="text-sm">Cross Tee:</span>
            <span class="font-semibold ml-2"
              >{{ state.gridSpacing.value.cross }}m</span
            >
          </div>
        </div>
      </div>
    </div>

    <hr class="my-8 border-gray-300" />

    <!-- Connection Location -->
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <h3 class="text-lg font-semibold">Connection Location</h3>
        <button
          type="button"
          @click="showConnectionExplain = true"
          class="text-sm px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded"
        >
          explain
        </button>
      </div>

      <QuestionCard
        question-title="Specify the location of the first Main Tee connection?"
        info-title="Connection Location"
      >
        <template #context>
          <p class="text-sm text-gray-600 mb-3">
            Note: If the wall trim connection capacity above is less than the
            grid capacity, then this won't have any effect.
          </p>
        </template>
        <template #answer>
          <RadioGroup
            id="specify-connection"
            :model-value="state.specifyMainConnection.value"
            @update:model-value="handleSpecifyConnectionChange"
            label="Specify Connection Location?"
            :options="yesNoOptions"
          />
        </template>
      </QuestionCard>
    </div>

    <hr class="my-8 border-gray-300" />

    <!-- Grid Strengthening -->
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <h3 class="text-lg font-semibold">
          Limiting Main and Cross Tee Lengths with Grid Strengthening
        </h3>
        <button
          type="button"
          @click="showStrengtheningExample = true"
          class="text-sm px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded"
        >
          View Grid Strengthening Example
        </button>
      </div>

      <QuestionCard question-title="Grid Strengthening Options">
        <template #answer>
          <div class="space-y-4">
            <RadioGroup
              id="strengthen-main"
              :model-value="state.strengthenMain.value"
              @update:model-value="
                (val) => {
                  state.strengthenMain.value = val;
                }
              "
              label="Strengthen Main Tees?"
              :options="yesNoOptions"
            />
            <RadioGroup
              id="strengthen-cross"
              :model-value="state.strengthenCross.value"
              @update:model-value="
                (val) => {
                  state.strengthenCross.value = val;
                }
              "
              label="Strengthen Cross Tees?"
              :options="yesNoOptions"
            />
          </div>
        </template>
      </QuestionCard>
    </div>

    <hr class="my-8 border-gray-300" />

    <!-- Ceiling Rake -->
    <div class="mb-8">
      <QuestionCard question-title="Is the ceiling raked?">
        <template #context>
          <p class="mb-3">
            A raked ceiling is one that is angled from the horizontal. The
            maximum allowable rake is 20 degrees.
          </p>
        </template>
        <template #answer>
          <RadioGroup
            id="is-raked"
            :model-value="state.isRaked.value"
            @update:model-value="handleRakedChange"
            label="Ceiling Raked?"
            :options="yesNoOptions"
          />
          <ConditionalSection :show="state.isRaked.value === 'yes'">
            <InputField
              id="rake-angle"
              :model-value="state.rakeAngle.value"
              @update:model-value="handleRakeAngleChange"
              label="Rake Angle (degrees)"
              type="number"
              step="0.1"
              min="0"
              :max="20"
              :error="state.rakeAngleError.value"
              hint="Maximum 20 degrees"
              class="mt-4"
            />
          </ConditionalSection>
        </template>
      </QuestionCard>
    </div>

    <hr class="my-8 border-gray-300" />

    <!-- Limiting Lengths Table -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4">Limiting Lengths</h3>
      <div class="overflow-x-auto">
        <table
          class="min-w-full divide-y divide-gray-200 border border-gray-300"
        >
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300"
              >
                Limiting Tee Length
              </th>
              <th
                class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300"
              >
                SLS
              </th>
              <th
                class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ULS
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td
                class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300"
              >
                Limiting Main Tee Length (max)
              </td>
              <td
                class="px-4 py-3 text-center text-sm text-gray-700 border-r border-gray-300"
              >
                {{ state.adjustedLimitingLengths.value.sls.main.toFixed(1) }} m
              </td>
              <td
                class="px-4 py-3 text-center text-sm font-semibold text-gray-900"
              >
                {{ state.adjustedLimitingLengths.value.uls.main.toFixed(1) }} m
              </td>
            </tr>
            <tr>
              <td
                class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300"
              >
                Limiting Cross Tee Length (max)
              </td>
              <td
                class="px-4 py-3 text-center text-sm text-gray-700 border-r border-gray-300"
              >
                {{ state.adjustedLimitingLengths.value.sls.cross.toFixed(1) }} m
              </td>
              <td
                class="px-4 py-3 text-center text-sm font-semibold text-gray-900"
              >
                {{ state.adjustedLimitingLengths.value.uls.cross.toFixed(1) }} m
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <hr class="my-8 border-gray-300" />

    <!-- Measured Tee Lengths -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4">
        Enter the Maximum measured Tee Lengths as per plans supplied
      </h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <InputField
            id="max-main-tee"
            :model-value="state.maxMainTee.value"
            @update:model-value="(val) => (state.maxMainTee.value = val)"
            label="Max Main Tee (m)"
            type="number"
            step="0.1"
            min="0"
            required
          />
          <div class="mt-2 flex items-center gap-2">
            <span
              :class="[
                'w-6 h-6 flex items-center justify-center border-2 border-brand-black font-bold text-sm',
                state.designValidation.value.mainPass
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white',
              ]"
            >
              {{ state.designValidation.value.mainPass ? "✓" : "✗" }}
            </span>
            <span class="text-sm text-gray-600">
              {{
                state.maxMainTee.value > 0
                  ? state.maxMainTee.value.toFixed(1)
                  : "-"
              }}m
              {{
                state.maxMainTee.value > 0 &&
                state.designValidation.value.governingMain > 0
                  ? (state.designValidation.value.mainPass ? "≤" : ">") +
                    " " +
                    state.designValidation.value.governingMain.toFixed(1) +
                    "m"
                  : ""
              }}
            </span>
          </div>
        </div>

        <div>
          <InputField
            id="max-cross-tee"
            :model-value="state.maxCrossTee.value"
            @update:model-value="(val) => (state.maxCrossTee.value = val)"
            label="Max Cross Tee (m)"
            type="number"
            step="0.1"
            min="0"
            required
          />
          <div class="mt-2 flex items-center gap-2">
            <span
              :class="[
                'w-6 h-6 flex items-center justify-center border-2 border-brand-black font-bold text-sm',
                state.designValidation.value.crossPass
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white',
              ]"
            >
              {{ state.designValidation.value.crossPass ? "✓" : "✗" }}
            </span>
            <span class="text-sm text-gray-600">
              {{
                state.maxCrossTee.value > 0
                  ? state.maxCrossTee.value.toFixed(1)
                  : "-"
              }}m
              {{
                state.maxCrossTee.value > 0 &&
                state.designValidation.value.governingCross > 0
                  ? (state.designValidation.value.crossPass ? "≤" : ">") +
                    " " +
                    state.designValidation.value.governingCross.toFixed(1) +
                    "m"
                  : ""
              }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Design Recommendation Boxes (Always visible like legacy) -->
    <div class="space-y-4 mb-8">
      <!-- Warning Box - Always visible, content changes based on validation -->
      <InfoBox variant="warning" :title="''">
        {{ state.designValidation.value.recommendation }}
      </InfoBox>

      <!-- Success Box - Always visible -->
      <InfoBox variant="info" title="Design Complete">
        <p>
          If your allowable tee length is larger than the maximum tee length
          which you want to install, then the perimeter fixing method is
          appropriate and your seismic design for the suspended ceiling is
          complete.
          <a
            href="#"
            class="text-blue-600 hover:text-blue-800 underline"
            @click.prevent
          >
            Click here to learn more about perimeter fixing.
          </a>
        </p>
      </InfoBox>

      <!-- Info Box - Always visible with design options -->
      <InfoBox variant="info" title="Design Options">
        <div class="space-y-4">
          <p>
            If your allowable tee length is less than the maximum tee length
            which you want to install then several options are available to
            ensure the design is satisfactory.
          </p>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <p class="mb-2">
                The first option is to try and break the ceiling up through the
                use of <strong>Seismic Joints</strong> to ensure that the
                allowable tee length is not exceeded by the installation tee
                length.
              </p>
              <button
                type="button"
                class="px-4 py-2 bg-[#333] !text-white hover:bg-[#333]/80 transition-colors mt-4"
                @click="showSeismicJointsModal = true"
              >
                About seismic joints
              </button>
            </div>

            <div>
              <p class="mb-2">
                The second option is to try <strong>Rigid Hangers</strong>. This
                section calculates if rigid hangers are suitable for providing
                dead load, live load and seismic restraint of the ceiling.
              </p>
              <button
                type="button"
                @click="showRigidHanger = true"
                class="px-4 py-2 bg-[#333] !text-white hover:bg-[#333]/80 transition-colors flex items-center gap-2 mt-4"
              >
                <span>Rigid Hanger Suitability</span>
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div>
              <p class="mb-2">
                The third option is using <strong>Back Braces</strong> to
                transfer the seismic load of the ceiling to the structure, with
                floating edges around the sides of the ceiling.
              </p>
              <button
                type="button"
                @click="showBackBrace = true"
                class="px-4 py-2 bg-[#333] !text-white hover:bg-[#333]/80 transition-colors flex items-center gap-2 mt-4"
              >
                <span>Back Brace Requirements</span>
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </InfoBox>
    </div>

    <!-- Download Result Button -->
    <div class="flex justify-start mb-8 border-t border-gray-300 pt-8">
      <button
        v-if="state.step6Complete.value"
        type="button"
        class="px-8 py-4 bg-[#3C999B] !text-white font-semibold hover:bg-[#3C999B]/80 transition-colors flex items-center gap-2"
        @click="showExportDialog = true"
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

    <!-- Export Dialog -->
    <ExportDialog
      :is-open="showExportDialog"
      @close="showExportDialog = false"
      @export="handleExport"
    />

    <!-- Grid Strengthening Example Modal -->
    <Modal
      v-model="showStrengtheningExample"
      title="Grid Strengthening Example"
      size="lg"
    >
      <div class="space-y-4">
        <p>
          The T&R 4-way clip can be installed at main or cross tee connections,
          this allows the limiting tee length to be increased in some cases.
        </p>
        <img
          src="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/691bcb4de5af37993362275a_4wayclip.jpg"
          alt="4-way clip installed on cross tee connection"
          class="max-w-full h-auto rounded"
        />
      </div>
    </Modal>

    <!-- Connection Location Explain Modal -->
    <Modal
      v-model="showConnectionExplain"
      title="Connection Location"
      size="lg"
    >
      <div class="space-y-4">
        <p>
          If you wish to specify the location of the first tee connections, a
          note is to be added to the installation information stating that full
          lengths of main/cross tees are to be used around the fixed edges of
          the ceilings. Refer to the diagram below.
        </p>
        <img
          src="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/691bcb4d4d19d424fab719e5_specifyconnection.png"
          alt="Specify Connection"
          class="max-w-full h-auto rounded"
        />
        <ul class="list-disc pl-5 space-y-1">
          <li>
            When yes is selected for the main tee direction, the limiting
            lengths are increased by 3.0m
          </li>
        </ul>
      </div>
    </Modal>

    <!-- Seismic Clip Detail Modal -->
    <Modal v-model="showClipDetail" title="T&R Seismic Clip Detail" size="lg">
      <div>
        <img
          src="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/691bcae29bfa2a5724011c6b_SeismicClipDetail.png"
          alt="Seismic Clip Detail"
          class="max-w-full h-auto rounded"
        />
      </div>
    </Modal>

    <!-- Seismic Joints Modal -->
    <Modal v-model="showSeismicJointsModal" title="Seismic Joints" size="lg">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Seismic Joints</h3>
        <p>
          Seismic joints are used to break up the ceiling into smaller areas
          when the ceiling installation tee length exceeds that of the maximum
          allowable length based on tee capacity, connection capacity or the
          wall capacity.
        </p>
        <p>
          The seismic joint effectively creates a fixed / floating edge breaking
          up the tee lengths in the installation. This allows the ceiling to
          still use perimeter fixing with a seismic joint, rather than back
          bracing the ceiling - providing a cost effect solution for some
          installations.
        </p>
        <p>
          The other situation in which Seismic Joints are required is where a
          seismic joint already exists in the structure above the suspended
          ceiling.
        </p>
        <div class="mt-4">
          <img
            src="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/691ce63cd6d56bb52c09cf33_seismicpic3.jpg"
            alt="Seismic Joint Detail"
            class="max-w-full h-auto rounded"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
  import { inject, ref, computed, toRefs } from "vue";
  import SelectField from "../../../components/SelectField.vue";
  import InputField from "../../../components/InputField.vue";
  import RadioGroup from "../../../components/RadioGroup.vue";
  import QuestionCard from "../../../components/QuestionCard.vue";
  import ConditionalSection from "../../../components/ConditionalSection.vue";
  import InfoBox from "../../../components/InfoBox.vue";
  import Modal from "../../../components/Modal.vue";
  import ExportDialog from "../../../components/ExportDialog.vue";
  import { exportSuspendedCeilingPDF } from "../../utils/pdfExport.js";
  import {
    STUD_TYPES,
    CONNECTION_TYPES,
    GRID_TYPES,
    YES_NO_OPTIONS,
  } from "../../data/suspendedCeilingData.js";
  import {
    getConnectionCapacity,
    getGridCapacity,
  } from "../../data/suspendedCeilingData.js";

  const calculatorState = inject("calculatorState");
  const state = calculatorState;
  const { showRigidHanger, showBackBrace } = toRefs(state);

  const studTypeOptions = STUD_TYPES;
  const connectionTypeOptions = CONNECTION_TYPES;
  const gridTypeOptions = GRID_TYPES;
  const yesNoOptions = YES_NO_OPTIONS;

  // Toggle states
  const showClipDetail = ref(false);
  const showConnectionExplain = ref(false);
  const showStrengtheningExample = ref(false);
  const showSeismicJointsModal = ref(false);
  const showExportDialog = ref(false);

  // Connection capacity display
  const connectionCapacity = computed(() => {
    return getConnectionCapacity(
      Number(state.studType.value),
      Number(state.connectionType.value),
      "uls",
    );
  });

  // Explicit handler to ensure reactivity
  function handleSpecifyConnectionChange(val) {
    console.log("handleSpecifyConnectionChange called with:", val);
    console.log(
      "Before update - specifyMainConnection.value:",
      state.specifyMainConnection.value,
    );
    state.specifyMainConnection.value = val;
    console.log(
      "After update - specifyMainConnection.value:",
      state.specifyMainConnection.value,
    );
    console.log("limitingLengths.value:", state.limitingLengths.value);
    console.log(
      "limitingLengths.value.uls.main:",
      state.limitingLengths.value.uls.main,
    );
    console.log(
      "limitingLengths.value.uls.cross:",
      state.limitingLengths.value.uls.cross,
    );
    console.log(
      "adjustedLimitingLengths.value:",
      state.adjustedLimitingLengths.value,
    );
    console.log(
      "adjustedLimitingLengths.value.uls.main:",
      state.adjustedLimitingLengths.value.uls.main,
    );
    console.log(
      "adjustedLimitingLengths.value.uls.cross:",
      state.adjustedLimitingLengths.value.uls.cross,
    );
  }

  function handleRakedChange(val) {
    console.log("handleRakedChange called with:", val);
    state.isRaked.value = val;
    console.log("After update - isRaked.value:", state.isRaked.value);
    console.log(
      "adjustedLimitingLengths.value.uls.main:",
      state.adjustedLimitingLengths.value.uls.main,
    );
  }

  function handleRakeAngleChange(val) {
    console.log("handleRakeAngleChange called with:", val);
    state.rakeAngle.value = val;
    console.log("After update - rakeAngle.value:", state.rakeAngle.value);
    console.log(
      "adjustedLimitingLengths.value.uls.main:",
      state.adjustedLimitingLengths.value.uls.main,
    );
  }

  // PDF Export handler
  function handleExport(options) {
    try {
      // Use the calculatorState that was injected at the top level
      exportSuspendedCeilingPDF(calculatorState, options);
    } catch (error) {
      console.error("PDF Export Error:", error);
      throw new Error("Failed to generate PDF. Please try again.");
    }
  }
</script>
