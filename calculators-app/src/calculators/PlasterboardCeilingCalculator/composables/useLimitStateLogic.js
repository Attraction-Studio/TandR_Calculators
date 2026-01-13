import { computed } from "vue";

/**
 * Limit State Logic for Plasterboard Ceiling Calculator
 * Based on legacy plasterboard calculator reference HTML
 *
 * Plasterboard limit state flow:
 * - Q1 (st1d/st2d): Is the ceiling required to be operational post-event? Yes=SLS2, No=continue
 * - Q2 (st1a/st2a): Weight > 7.5kg? Yes=ULS, No=continue
 * - Q3 (st1b/st2b): Height >= 3m? Yes=ULS, No=continue
 * - Q4 (st1c/st2c): Blocks emergency egress? Yes=ULS, No=continue
 * - Q5 (st1e/st2e): Complies with assumptions? Yes=SLS, No=engineer required
 *
 * Legacy JS:
 * - tt = main limit state ("ULS" or "SLS")
 * - tt2 = secondary state ("SLS2" or "")
 * - When Q1=Yes: tt2='SLS2', show SLS2 calculations
 * - When Q1=No: hide SLS2 calculations
 * - Q2/Q3/Q4 Yes: tt='ULS'
 * - Q5 Yes: tt='SLS'
 */
export function usePlasterboardLimitStateLogic(answers) {
  const { q1Answer, q2Answer, q3Answer, q4Answer, q5Answer } = answers;

  /**
   * Is SLS2 required (Q1=Yes)
   * Legacy: st1d sets tt2='SLS2'
   */
  const isSLS2Required = computed(() => {
    return q1Answer.value === "yes";
  });

  /**
   * Main limit state value
   * Legacy:
   * - st1a/st1b/st1c (Q2/3/4=Yes): tt='ULS'
   * - st1e (Q5=Yes): tt='SLS'
   */
  const limitStateMain = computed(() => {
    // Q2, Q3, or Q4 Yes = ULS
    if (
      q2Answer.value === "yes" ||
      q3Answer.value === "yes" ||
      q4Answer.value === "yes"
    ) {
      return "ULS";
    }
    // Q5=Yes = SLS (only if all previous answers were No)
    if (q5Answer.value === "yes") {
      return "SLS";
    }
    return "";
  });

  /**
   * Secondary limit state display (tt2 in reference)
   * Shows "+SLS2" when Q1=Yes and a main state is determined
   */
  const liveCalcSLS2Display = computed(() => {
    if (isSLS2Required.value && limitStateMain.value) {
      return "+SLS2";
    }
    return "";
  });

  /**
   * Footer SLS2 display
   */
  const footerSLS2Display = computed(() => {
    return liveCalcSLS2Display.value;
  });

  /**
   * Show footer result
   * Displayed when a Yes answer determines the limit state
   */
  const showFooterResult = computed(() => {
    return (
      q2Answer.value === "yes" ||
      q3Answer.value === "yes" ||
      q4Answer.value === "yes" ||
      q5Answer.value === "yes"
    );
  });

  /**
   * Show multistate note
   * Legacy: #multistate shown when both limit states apply
   */
  const showMultiStateNote = computed(() => {
    return isSLS2Required.value && showFooterResult.value;
  });

  /**
   * Show error message (Q5=No)
   */
  const showError = computed(() => {
    return q5Answer.value === "no";
  });

  /**
   * Show SLS2 calculations in the UI
   * Legacy: .sls2 elements shown when Q1=Yes
   */
  const showSLS2Calculations = computed(() => {
    return isSLS2Required.value;
  });

  /**
   * Can proceed with design (not requiring engineer)
   */
  const canProceed = computed(() => {
    return showFooterResult.value && q5Answer.value !== "no";
  });

  return {
    // Main values
    limitStateMain,
    isSLS2Required,

    // Display values
    liveCalcSLS2Display,
    footerSLS2Display,

    // Visibility flags
    showFooterResult,
    showMultiStateNote,
    showError,
    showSLS2Calculations,
    canProceed,
  };
}
