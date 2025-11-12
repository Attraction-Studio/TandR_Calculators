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

      <!-- Right Column: Sidebar (2/5) - Conditional -->
      <div v-if="showSidebar" class="lg:col-span-2">
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
                <span>Tile Weight</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span>Reflected ceiling plans</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span>A section showing plenum depths</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span
                  >This design is for 2 way exposed 24mm CBI grid only and
                  cannot be used with any other manufacturer's grid</span
                >
              </li>
            </ul>
          </div>
          <InfoBox class="mt-12" variant="info">
            <p class="text-sm">
              © The T&R Seismic System has been developed in conjunction with
              JSK Consulting Engineers, the University of Canterbury and T&R
              Interior Systems. It remains the intellectual property of T&R
              Interior Systems and may not be used with other products.
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

        <!-- Calculation Sidebar (Steps 2-8) -->
        <CalculationSidebar v-else>
          <div class="space-y-4 text-sm">
            <div>
              <div class="font-semibold mb-1">Limit State Type</div>
              <div class="text-lg">
                <template
                  v-if="state.limitStateLogic.liveCalcSLS2Display.value"
                >
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
                  state.step3Complete.value
                    ? state.seismicWeight.value.toFixed(1)
                    : "-"
                }}
                kg/m²
              </div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="font-semibold mb-1">Seismic Force</div>
              <div class="text-lg">
                <span v-if="state.limitStateLogic.showSLS2Calculations.value">
                  SLS2 =
                  {{
                    state.seismicForces.value.sls2 > 0
                      ? state.seismicForces.value.sls2.toFixed(2)
                      : "-"
                  }}
                  kgf/m²<br />
                </span>
                ULS =
                {{
                  state.seismicForces.value.uls > 0
                    ? state.seismicForces.value.uls.toFixed(2)
                    : "-"
                }}
                kgf/m²
              </div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="font-semibold mb-1">
                Limiting Main Tee Length (max)
              </div>
              <div class="text-lg">
                <span v-if="state.limitStateLogic.showSLS2Calculations.value">
                  SLS2 =
                  {{
                    state.adjustedLimitingLengths.value.sls2.main > 0
                      ? state.adjustedLimitingLengths.value.sls2.main.toFixed(1)
                      : "-"
                  }}
                  m<br />
                </span>
                ULS =
                {{
                  state.adjustedLimitingLengths.value.uls.main > 0
                    ? state.adjustedLimitingLengths.value.uls.main.toFixed(1)
                    : "-"
                }}
                m
              </div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="font-semibold mb-1">
                Limiting Cross Tee Length (max)
              </div>
              <div class="text-lg">
                <span v-if="state.limitStateLogic.showSLS2Calculations.value">
                  SLS2 =
                  {{
                    state.adjustedLimitingLengths.value.sls2.cross > 0
                      ? state.adjustedLimitingLengths.value.sls2.cross.toFixed(
                          1
                        )
                      : "-"
                  }}
                  m<br />
                </span>
                ULS =
                {{
                  state.adjustedLimitingLengths.value.uls.cross > 0
                    ? state.adjustedLimitingLengths.value.uls.cross.toFixed(1)
                    : "-"
                }}
                m
              </div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="font-semibold mb-1">Area per Brace</div>
              <div class="text-lg">-</div>
            </div>

            <div class="border-t border-gray-300 pt-4">
              <div class="font-semibold mb-1">Max Tee Spacing</div>
              <div class="text-lg">
                <template v-if="state.gridMass.value">
                  Main: {{ state.gridSpacing.value.main }}m<br />
                  Cross: {{ state.gridSpacing.value.cross }}m
                </template>
                <template v-else>
                  Main: - m<br />
                  Cross: - m
                </template>
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
                    : 'bg-gray-200 text-gray-400 cursor-not-alowed border-gray-300',
                ]"
              >
                Next Step →
              </button>

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

    <!-- Bottom Navigation (Results Page Only) -->
    <div
      v-if="currentStep === 9"
      class="flex justify-between items-center mt-8 pt-6 border-t border-brand-black"
    >
      <button
        @click="previousStep"
        class="px-6 py-3 border-2 border-brand-black hover:bg-gray-100 transition-colors btn_12_text"
      >
        ← Previous
      </button>

      <button
        v-if="state.step6Complete"
        @click="resetCalculator"
        class="px-6 py-3 border-2 border-brand-black hover:bg-gray-100 transition-colors btn_12_text"
      >
        Start New Calculation
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, provide, watch } from "vue";
  import WizardProgress from "../components/WizardProgress.vue";
  import CalculationSidebar from "../components/CalculationSidebar.vue";
  import InfoBox from "../components/InfoBox.vue";
  import { useCalculatorState } from "./SuspendedCeilingCalculator/composables/useCalculatorState.js";

  // Step components
  import IntroductionStep from "./SuspendedCeilingCalculator/steps/IntroductionStep.vue";
  import DesignMethodsStep from "./SuspendedCeilingCalculator/steps/DesignMethodsStep.vue";
  import LimitStateStep from "./SuspendedCeilingCalculator/steps/LimitStateStep.vue";
  import SiteInformationStep from "./SuspendedCeilingCalculator/steps/SiteInformationStep.vue";
  import SeismicWeightStep from "./SuspendedCeilingCalculator/steps/SeismicWeightStep.vue";
  import GridConfigurationStep from "./SuspendedCeilingCalculator/steps/GridConfigurationStep.vue";
  import DesignOptionsStep from "./SuspendedCeilingCalculator/steps/DesignOptionsStep.vue";
  import ValidationStep from "./SuspendedCeilingCalculator/steps/ValidationStep.vue";
  import ResultsStep from "./SuspendedCeilingCalculator/steps/ResultsStep.vue";

  // ============================================================================
  // WIZARD STATE
  // ============================================================================
  const currentStep = ref(1);
  const totalSteps = 9;

  const wizardSteps = [
    { number: 1, label: "Introduction" },
    { number: 2, label: "Design Methods" },
    { number: 3, label: "Limit State" },
    { number: 4, label: "Weight" },
    { number: 5, label: "Seismic Actions" },
    { number: 6, label: "Grid Config" },
    { number: 7, label: "Options" },
    { number: 8, label: "Validation" },
    { number: 9, label: "Results" },
  ];

  // ============================================================================
  // SHARED STATE (via composable)
  // ============================================================================
  const state = useCalculatorState();

  // Provide state to all child components
  provide("calculatorState", state);

  // ============================================================================
  // DYNAMIC COMPONENT RENDERING
  // ============================================================================
  const stepComponents = [
    IntroductionStep,
    DesignMethodsStep,
    LimitStateStep,
    SeismicWeightStep,
    SiteInformationStep,
    GridConfigurationStep,
    DesignOptionsStep,
    ValidationStep,
    ResultsStep,
  ];

  const currentStepComponent = computed(() => {
    return stepComponents[currentStep.value - 1];
  });

  // ============================================================================
  // SIDEBAR VISIBILITY
  // ============================================================================
  const showSidebar = computed(() => {
    // Show sidebar on all steps except results (step 9)
    return currentStep.value < 9;
  });

  // ============================================================================
  // NAVIGATION LOGIC
  // ============================================================================
  const canProceed = computed(() => {
    switch (currentStep.value) {
      case 1: // Introduction page
        return true;
      case 2: // Design methods page
        return true;
      case 3: // Limit state
        return state.step1Complete.value;
      case 4: // Weight
        return state.step3Complete.value;
      case 5: // Seismic Actions (Site info)
        return state.step2Complete.value;
      case 6: // Grid config
        return state.step4Complete.value;
      case 7: // Options
        return state.step5Complete.value;
      case 8: // Validation
        return state.step6Complete.value;
      case 9: // Results
        return true;
      default:
        return false;
    }
  });

  function nextStep() {
    if (canProceed.value && currentStep.value < totalSteps) {
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

  // Debug watchers
  watch(() => state.zoneFactor.value, (val) => {
    console.log('zoneFactor changed:', val);
  });
  
  watch(() => state.seismicWeight.value, (val) => {
    console.log('seismicWeight changed:', val);
  });
  
  watch(() => state.seismicForces.value, (val) => {
    console.log('seismicForces changed:', val);
  });
  
  watch(() => state.step2Complete.value, (val) => {
    console.log('step2Complete changed:', val);
  });
</script>
