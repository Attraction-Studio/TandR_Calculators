import { computed } from "vue";

/**
 * Composable for baffle ceiling limit state logic
 * Determines the limit state based on user answers to questions
 */
export function useBaffleLimitStateLogic(answers) {
  const { q0Answer, q1Answer, q2Answer, q3Answer, q4Answer } = answers;

  // SLS2 is triggered by Q0 = Yes (operational state required)
  // However, SLS2 is only USED when main limit state is ULS
  const isSLS2Triggered = computed(() => {
    return q0Answer.value === "yes";
  });

  // Main limit state determination (matches reference HTML logic)
  // ULS if any of Q1, Q2, Q3 are Yes - result shows IMMEDIATELY
  // SLS if Q1, Q2, Q3 are all No AND Q4 (assumptions) is Yes
  const limitStateMain = computed(() => {
    // ULS is determined as soon as any of Q1/Q2/Q3 = Yes
    if (q1Answer.value === "yes") {
      return "ULS";
    }
    if (q2Answer.value === "yes") {
      return "ULS";
    }
    if (q3Answer.value === "yes") {
      return "ULS";
    }
    // SLS requires all Q1/Q2/Q3 = No AND Q4 = Yes
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

  // SLS2 display in limit state label - ONLY when Q0 = Yes (per reference: $(".total0a").html("+SLS2"))
  const liveCalcSLS2Display = computed(() => {
    if (isSLS2Triggered.value) {
      return "+SLS2";
    }
    return "";
  });

  // SLS2 display for footer result - ONLY when Q0 = Yes
  const footerSLS2Display = computed(() => {
    if (isSLS2Triggered.value) {
      return "+SLS2";
    }
    return "";
  });

  // Show footer result when a valid limit state is determined
  const showFooterResult = computed(() => {
    return limitStateMain.value !== "";
  });

  // Show multi-state note when Q0 = Yes (SLS2 triggered)
  const showMultiStateNote = computed(() => {
    return isSLS2Triggered.value;
  });

  // Show SLS2 note - only when Q0 = Yes
  const showSLS2Note = computed(() => {
    return isSLS2Triggered.value;
  });

  // Show error when Q4 (assumptions) is No AND Q1/Q2/Q3 are all No
  const showError = computed(() => {
    return (
      q1Answer.value === "no" &&
      q2Answer.value === "no" &&
      q3Answer.value === "no" &&
      q4Answer.value === "no"
    );
  });

  // Should show SLS2 calculations - only when ULS (per reference calc function)
  const showSLS2Calculations = computed(() => {
    return limitStateMain.value === "ULS";
  });

  // Is SLS2 required - only when ULS
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
