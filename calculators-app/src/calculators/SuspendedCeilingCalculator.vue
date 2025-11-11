<template>
  <div class="w-full p-8 md:p-12 bg-white">
    <!-- Wizard Progress -->
    <WizardProgress :steps="wizardSteps" :current-step="currentStep" />

    <!-- Dynamic Step Component -->
    <div class="min-h-[600px]">
      <component :is="currentStepComponent" />
    </div>

    <!-- Wizard Navigation -->
    <div
      class="flex justify-between items-center mt-8 pt-6 border-t border-brand-black"
    >
      <button
        v-if="currentStep > 1"
        @click="previousStep"
        class="px-6 py-3 border-2 border-brand-black hover:bg-gray-100 transition-colors btn_12_text"
      >
        ← Previous
      </button>
      <div v-else></div>

      <button
        @click="resetCalculator"
        class="px-6 py-3 border border-brand-black hover:bg-gray-100 transition-colors text-sm"
      >
        Reset
      </button>

      <button
        v-if="currentStep < totalSteps"
        @click="nextStep"
        :disabled="!canProceed"
        :class="[
          'px-6 py-3 border-2 border-brand-black transition-colors btn_12_text',
          canProceed
            ? 'bg-brand-black text-white hover:bg-gray-800'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed',
        ]"
      >
        Next →
      </button>
      <button
        v-else-if="currentStep === totalSteps && state.step6Complete"
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
    { number: 4, label: "Site Info" },
    { number: 5, label: "Weight" },
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
    SiteInformationStep,
    SeismicWeightStep,
    GridConfigurationStep,
    DesignOptionsStep,
    ValidationStep,
    ResultsStep,
  ];

  const currentStepComponent = computed(() => {
    return stepComponents[currentStep.value - 1];
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
      case 4: // Site info
        return state.step2Complete.value;
      case 5: // Weight
        return state.step3Complete.value;
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
</script>
