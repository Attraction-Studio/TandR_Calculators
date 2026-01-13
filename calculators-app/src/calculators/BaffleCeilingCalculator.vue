<template>
  <div class="w-full p-8 md:p-24 bg-white">
    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-5 global-gap mb-16">
      <!-- Left Column: Main Content (3/5) -->
      <div class="lg:col-span-3">
        <!-- Wizard Progress -->
        <WizardProgress :steps="wizardSteps" :current-step="currentStep" />

        <component :is="currentStepComponent" />
      </div>

      <!-- Right Column: Sidebar (2/5) -->
      <div class="lg:col-span-2">
        <!-- Introduction Sidebar (Step 1) -->
        <div v-if="currentStep === 1">
          <div class="border border-brand-black p-6 bg-white sticky top-4">
            <h3
              class="text-xl font-semibold mb-4 pb-3 border-b border-brand-black"
            >
              You Will Need...
            </h3>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span>Building Location</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span>Ceiling Height</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span>Baffle Profile and Spacing</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span>Luminaire Weight and Layout</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span>Reflected Ceiling Plans</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span>Plenum Depth Information</span>
              </li>
            </ul>
            <p class="mt-4 text-sm text-gray-600">
              This design is for T&R Baffle Ceiling Systems only and cannot be
              used with other manufacturer's ceiling products.
            </p>
          </div>
          <InfoBox class="mt-12" variant="info">
            <p class="text-sm">
              © The T&R Seismic System has been developed in conjunction with
              JSK Consulting Engineers and T&R Interior Systems. It remains the
              intellectual property of T&R Interior Systems and may not be used
              with other products.
            </p>
          </InfoBox>

          <!-- Navigation Buttons for Step 1 -->
          <div class="mt-8 space-y-4">
            <button
              @click="nextStep"
              class="w-full px-6 py-4 border-2 border-brand-black bg-[#333] !text-white hover:bg-[#333]/90 transition-colors btn_12_text"
            >
              Get Started →
            </button>

            <div class="text-center text-sm text-gray-600 pt-2">
              Step {{ currentStep }} of {{ totalSteps }}
            </div>
          </div>
        </div>

        <!-- Calculation Sidebar (Steps 2+) -->
        <CalculationSidebar v-else>
          <div class="space-y-4 text-sm">
            <div>
              <div class="font-semibold mb-1">Limit State Type</div>
              <div class="text-lg">
                <template v-if="state.limitStateLogic.limitStateMain.value">
                  {{ state.limitStateLogic.limitStateMain.value }}
                  {{ state.limitStateLogic.liveCalcSLS2Display.value }}
                </template>
                <span v-else>-</span>
              </div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="font-semibold mb-1">Seismic Weight</div>
              <div class="text-lg">
                {{
                  state.seismicWeight.value > 0
                    ? state.seismicWeight.value.toFixed(2)
                    : "-"
                }}
                kg/m²
              </div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="font-semibold mb-1">Seismic Force</div>
              <div class="text-lg">
                <span
                  >SLS =
                  {{
                    state.seismicForces.value.sls > 0
                      ? state.seismicForces.value.sls
                      : "-"
                  }}<br
                /></span>
                <span v-if="state.limitStateLogic.showSLS2Calculations.value">
                  SLS2 =
                  {{
                    state.seismicForces.value.sls2 > 0
                      ? state.seismicForces.value.sls2
                      : "-"
                  }}<br />
                </span>
                <span
                  >ULS =
                  {{
                    state.seismicForces.value.uls > 0
                      ? state.seismicForces.value.uls
                      : "-"
                  }}</span
                >
              </div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="font-semibold mb-1">Area per Brace</div>
              <div class="text-lg">
                {{
                  state.areaPerBrace.value > 0
                    ? state.areaPerBrace.value.toFixed(1)
                    : "-"
                }}
                m²
              </div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="font-semibold mb-1">Ceiling Area</div>
              <div class="text-lg">{{ state.ceilingArea.value }} m²</div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="font-semibold mb-1">Minimum Braces</div>
              <div class="text-lg">{{ state.minimumBraces.value }}</div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="font-semibold mb-1">Max Brace Spacing</div>
              <div class="text-lg">
                {{
                  state.maxBraceSpacing.value > 0
                    ? state.maxBraceSpacing.value.toFixed(1)
                    : "-"
                }}
                m
              </div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="font-semibold mb-1">Required Seismic Clearance</div>
              <div class="text-lg">
                SLS = {{ state.seismicClearance.value.sls }}mm<br />
                ULS = {{ state.seismicClearance.value.uls }}mm
              </div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="text-xs text-gray-500">
                Values update as you progress through steps
              </div>
            </div>

            <!-- Navigation Buttons Inside Sidebar -->
            <div class="border-t border-gray-300 pt-6 mt-6 space-y-4">
              <button
                v-if="currentStep < totalSteps"
                @click="nextStep"
                :disabled="!canProceed"
                :class="[
                  'w-full px-6 py-4 border-2 border-brand-black transition-colors btn_12_text',
                  canProceed
                    ? 'bg-[#333] !text-white hover:bg-[#333]/90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300',
                ]"
              >
                Next Step →
              </button>

              <div
                v-if="currentStep === totalSteps"
                class="text-center text-sm text-gray-600 py-2"
              >
                Final Step - Complete
              </div>

              <div class="flex gap-4">
                <button
                  v-if="currentStep > 1"
                  @click="previousStep"
                  class="flex-1 px-6 py-3 border border-brand-black hover:bg-gray-100 transition-colors text-sm"
                >
                  ← Previous
                </button>

                <button
                  @click="resetCalculator"
                  class="flex-1 px-6 py-3 border border-brand-black hover:bg-gray-100 transition-colors text-sm"
                >
                  Reset
                </button>
              </div>

              <div class="text-center text-sm text-gray-600 pt-2">
                Step {{ currentStep }} of {{ totalSteps }}
              </div>
            </div>
          </div>
        </CalculationSidebar>
      </div>
    </div>

    <!-- Bottom Navigation (Final Step Only) -->
    <div
      v-if="currentStep === totalSteps"
      class="flex justify-between items-center mt-8 pt-6 border-t border-brand-black"
    >
      <button
        @click="previousStep"
        class="px-6 py-3 border-2 border-brand-black hover:bg-gray-100 transition-colors btn_12_text"
      >
        ← Previous
      </button>

      <button
        @click="resetCalculator"
        class="px-6 py-3 border-2 border-brand-black hover:bg-gray-100 transition-colors btn_12_text"
      >
        Start New Calculation
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, provide } from "vue";
  import WizardProgress from "../components/WizardProgress.vue";
  import CalculationSidebar from "../components/CalculationSidebar.vue";
  import InfoBox from "../components/InfoBox.vue";
  import { useCalculatorState } from "./BaffleCeilingCalculator/composables/useCalculatorState.js";

  // Step components
  import IntroductionStep from "./BaffleCeilingCalculator/steps/IntroductionStep.vue";
  import LimitStateStep from "./BaffleCeilingCalculator/steps/LimitStateStep.vue";
  import SeismicWeightStep from "./BaffleCeilingCalculator/steps/SeismicWeightStep.vue";
  import SeismicActionsStep from "./BaffleCeilingCalculator/steps/SeismicActionsStep.vue";
  import BackBraceStep from "./BaffleCeilingCalculator/steps/BackBraceStep.vue";
  import BackBraceLayoutStep from "./BaffleCeilingCalculator/steps/BackBraceLayoutStep.vue";
  import SeismicClearanceStep from "./BaffleCeilingCalculator/steps/SeismicClearanceStep.vue";
  import DownloadStep from "./BaffleCeilingCalculator/steps/DownloadStep.vue";

  // ============================================================================
  // WIZARD STATE
  // ============================================================================
  const currentStep = ref(1);

  const wizardSteps = [
    { number: 1, label: "Introduction" },
    { number: 2, label: "Limit State" },
    { number: 3, label: "Weight" },
    { number: 4, label: "Seismic Actions" },
    { number: 5, label: "Back Brace" },
    { number: 6, label: "Brace Layout" },
    { number: 7, label: "Clearance" },
    { number: 8, label: "Download" },
  ];

  const totalSteps = computed(() => wizardSteps.length);

  // ============================================================================
  // SHARED STATE
  // ============================================================================
  const state = useCalculatorState();

  provide("calculatorState", state);

  // ============================================================================
  // DYNAMIC COMPONENT RENDERING
  // ============================================================================
  const stepComponents = [
    IntroductionStep,
    LimitStateStep,
    SeismicWeightStep,
    SeismicActionsStep,
    BackBraceStep,
    BackBraceLayoutStep,
    SeismicClearanceStep,
    DownloadStep,
  ];

  const currentStepComponent = computed(() => {
    return stepComponents[currentStep.value - 1];
  });

  // ============================================================================
  // NAVIGATION LOGIC
  // ============================================================================
  const canProceed = computed(() => {
    switch (currentStep.value) {
      case 1:
        return true;
      case 2:
        return state.step1Complete.value;
      case 3:
        return state.step2Complete.value;
      case 4:
        return state.step3Complete.value;
      case 5:
        return state.step4Complete.value;
      case 6:
        return state.step5Complete.value;
      default:
        return true;
    }
  });

  function nextStep() {
    if (canProceed.value && currentStep.value < totalSteps.value) {
      currentStep.value++;
      scrollToTop();
    }
  }

  function previousStep() {
    if (currentStep.value > 1) {
      currentStep.value--;
      scrollToTop();
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetCalculator() {
    state.resetState();
    currentStep.value = 1;
    scrollToTop();
  }
</script>
