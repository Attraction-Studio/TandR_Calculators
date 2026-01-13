import { computed } from "vue";

/**
 * Composable for baffle ceiling limit state logic
 * Determines the limit state based on user answers to questions
 */
export function useBaffleLimitStateLogic(answers) {
  const { q1Answer, q2Answer, q3Answer, q4Answer } = answers;

  // Main limit state determination
  // ULS if any of Q1, Q2, Q3 are Yes
  // SLS if all are No and Q4 (assumptions) is Yes
  const limitStateMain = computed(() => {
    if (
      q1Answer.value === "yes" ||
      q2Answer.value === "yes" ||
      q3Answer.value === "yes"
    ) {
      return "ULS";
    }
    if (
      q1Answer.value === "no" &&
      q2Answer.value === "no" &&
      q3Answer.value === "no" &&
      q4Answer.value === "yes"
    ) {
      return "SLS";
    }
    return "";
  });

  // SLS2 display for live calculations
  const liveCalcSLS2Display = computed(() => {
    if (limitStateMain.value === "ULS") {
      return "+SLS2";
    }
    return "";
  });

  // SLS2 display for footer result
  const footerSLS2Display = computed(() => {
    if (limitStateMain.value === "ULS") {
      return "+SLS2";
    }
    return "";
  });

  // Show footer result when a valid limit state is determined
  const showFooterResult = computed(() => {
    return limitStateMain.value !== "";
  });

  // Show multi-state note when ULS is selected (includes SLS2)
  const showMultiStateNote = computed(() => {
    return limitStateMain.value === "ULS";
  });

  // Show SLS2 note
  const showSLS2Note = computed(() => {
    return limitStateMain.value === "ULS";
  });

  // Show error when Q4 (assumptions) is No
  const showError = computed(() => {
    return q4Answer.value === "no";
  });

  // Should show SLS2 calculations
  const showSLS2Calculations = computed(() => {
    return limitStateMain.value === "ULS";
  });

  // Is SLS2 required
  const isSLS2Required = computed(() => {
    return limitStateMain.value === "ULS";
  });

  return {
    limitStateMain,
    liveCalcSLS2Display,
    footerSLS2Display,
    showFooterResult,
    showMultiStateNote,
    showSLS2Note,
    showError,
    showSLS2Calculations,
    isSLS2Required,
  };
}
