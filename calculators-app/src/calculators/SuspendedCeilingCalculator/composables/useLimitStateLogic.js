import { computed } from 'vue';

/**
 * Limit State Logic - Modernized from reference calculator
 * 
 * This encapsulates the exact logic from the original calculator:
 * - tt = main limit state ("ULS" or "SLS2")
 * - tt2 = secondary state ("SLS2" or "")
 * - .total0 = shows tt in footer
 * - .total0a = shows tt2 in live calc and footer
 * 
 * @param {Object} answers - Question answers (q1-q5)
 * @returns {Object} Computed properties for limit state display
 */
export function useLimitStateLogic(answers) {
  const { q1Answer, q2Answer, q3Answer, q4Answer, q5Answer } = answers;

  /**
   * Main limit state value (tt in reference)
   * Always "ULS" when any Yes is clicked
   */
  const limitStateMain = computed(() => {
    if (
      q1Answer.value === 'yes' ||
      q2Answer.value === 'yes' ||
      q3Answer.value === 'yes' ||
      q4Answer.value === 'yes' ||
      q5Answer.value === 'yes'
    ) {
      return 'ULS';
    }
    return '';
  });

  /**
   * Secondary limit state value (tt2 in reference)
   * "SLS2" when Q1=No and no subsequent answer yet
   * "" otherwise
   */
  const limitStateSecondary = computed(() => {
    // st2d (Q1=No): tt2 = "SLS2"
    if (q1Answer.value === 'no' && !q2Answer.value) {
      return 'SLS2';
    }
    // All other cases: tt2 = ""
    return '';
  });

  /**
   * Live calc display value (.total0a in reference)
   * 
   * Reference logic:
   * - st1d (Q1=Yes): .total0a.html("") - clears it
   * - st2d (Q1=No): .total0a.html("+SLS2") - sets it
   * - st1a/st1b/st1c (Q2/3/4=Yes after Q1=No): .total0a.html("+SLS2") - keeps it
   * - st1e (Q5=Yes): .total0a.html("+SLS2") - sets it (even if Q1=Yes!)
   */
  const liveCalcSLS2Display = computed(() => {
    // Q1=No path: always shows "+SLS2"
    if (q1Answer.value === 'no') {
      return '+SLS2';
    }
    // Q1=Yes path: shows "+SLS2" ONLY if Q5=Yes
    if (q1Answer.value === 'yes' && q5Answer.value === 'yes') {
      return '+SLS2';
    }
    return '';
  });

  /**
   * Footer display value (.total0a in reference)
   * Same as live calc - shows "+SLS2" when Q1=No
   */
  const footerSLS2Display = computed(() => {
    return liveCalcSLS2Display.value;
  });

  /**
   * Show footer result (div1-6, div1-7 in reference)
   * Shown by yesclick() which is called by Q2/Q3/Q4/Q5 Yes buttons
   * NOT shown by Q1=Yes (it just shows next question)
   */
  const showFooterResult = computed(() => {
    return (
      q2Answer.value === 'yes' ||
      q3Answer.value === 'yes' ||
      q4Answer.value === 'yes' ||
      q5Answer.value === 'yes'
    );
  });

  /**
   * Show multistate paragraph (#multistate in reference)
   * Controlled by: if (tt2 == "SLS2") in yesclick()
   * Since all Yes buttons set tt2="", this is never shown
   */
  const showMultiStateNote = computed(() => {
    // In yesclick(), this checks if tt2 == "SLS2"
    // But all Yes buttons set tt2="" before calling yesclick()
    // So this is always false
    return limitStateSecondary.value === 'SLS2';
  });

  /**
   * Show SLS2 note (#sls2note in reference)
   * Shown when Q1=No (st2d sets it)
   * Hidden by yesclick() when tt2 != "SLS2"
   */
  const showSLS2Note = computed(() => {
    // st2d (Q1=No): shows it
    // yesclick() with tt2="": hides it
    // So it's only shown when Q1=No and no subsequent answer
    return q1Answer.value === 'no' && !showFooterResult.value;
  });

  /**
   * Show error message (Q5=No)
   */
  const showError = computed(() => {
    return q5Answer.value === 'no';
  });

  /**
   * Show SLS2 values in calculations (.sls2 elements in reference)
   * Controlled by st2d (Q1=No) showing them
   * st1d (Q1=Yes) hides them
   */
  const showSLS2Calculations = computed(() => {
    return q1Answer.value === 'no';
  });

  return {
    // Main values
    limitStateMain,
    limitStateSecondary,
    
    // Display values
    liveCalcSLS2Display,
    footerSLS2Display,
    
    // Visibility flags
    showFooterResult,
    showMultiStateNote,
    showSLS2Note,
    showError,
    showSLS2Calculations,
  };
}
