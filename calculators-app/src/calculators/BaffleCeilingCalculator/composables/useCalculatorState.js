import { ref, computed, watch } from "vue";
import {
  CONSTANTS,
  BAFFLE_PROFILE_OPTIONS,
  PLENUM_HEIGHT_OPTIONS,
  calculateBaffleMass,
  calculateSeismicWeight,
  calculateAllSeismicForces,
  calculateAreaPerBrace,
  calculateMinimumBraces,
  calculateBraceSpacing,
  calculateSeismicClearance,
  getBraceArmType,
  getPlenumHeightDetails,
  validateBaffleSpacing,
} from "../../data/baffleCeilingData.js";
import { useBaffleLimitStateLogic } from "./useLimitStateLogic.js";

export function useCalculatorState() {
  // ============================================================================
  // STATE - Step 1: Limit State (Question Answers)
  // ============================================================================
  const q1Answer = ref(""); // Part weight > 7.5kg
  const q2Answer = ref(""); // Height >= 3m
  const q3Answer = ref(""); // Blocks emergency egress
  const q4Answer = ref(""); // Complies with assumptions

  // ============================================================================
  // COMPUTED - Limit State Logic
  // ============================================================================
  const limitStateLogic = useBaffleLimitStateLogic({
    q1Answer,
    q2Answer,
    q3Answer,
    q4Answer,
  });

  // ============================================================================
  // STATE - Step 2: Seismic Weight
  // ============================================================================
  const profileMass = ref(1.3); // Default: 100mm by 30mm
  const baffleSpacing = ref(0.1); // Default: 0.1m (minimum)
  const luminaries = ref(0.2); // Default: 0.2 kg/m²
  const services = ref(3); // Services allowance - Default: 3 kg/m²
  const otherLoads = ref(0);

  // ============================================================================
  // STATE - Step 3: Seismic Actions
  // ============================================================================
  const zoneFactor = ref(0.13); // Default: Auckland
  const importanceLevel = ref(2); // Default: IL2
  const heightFactor = ref(3); // Default: 0-3m

  // ============================================================================
  // STATE - Step 4: Back Bracing
  // ============================================================================
  const plenumHeight = ref(0.2); // Default: 0.20m

  // ============================================================================
  // STATE - Step 5: Back Bracing Layout
  // ============================================================================
  const ceilingArea = ref(100); // Default: 100 m²

  // ============================================================================
  // COMPUTED - Baffle Spacing Validation
  // ============================================================================
  const baffleSpacingError = computed(() => {
    if (!validateBaffleSpacing(baffleSpacing.value)) {
      return "Baffle spacing must be between 0.1m and 1.0m. Alternatively contact a suitably qualified chartered professional engineer for specific design.";
    }
    return "";
  });

  // ============================================================================
  // COMPUTED - Baffle Mass
  // ============================================================================
  const baffleMass = computed(() => {
    return calculateBaffleMass(profileMass.value, baffleSpacing.value);
  });

  // ============================================================================
  // COMPUTED - Seismic Weight
  // ============================================================================
  const seismicWeight = computed(() => {
    return calculateSeismicWeight({
      baffleMass: baffleMass.value,
      strongbackMass: CONSTANTS.STRONGBACK_MASS,
      luminaries: luminaries.value,
      services: services.value,
      other: otherLoads.value,
    });
  });

  // ============================================================================
  // COMPUTED - Seismic Forces
  // ============================================================================
  const seismicForces = computed(() => {
    return calculateAllSeismicForces({
      zoneFactor: zoneFactor.value,
      importanceLevel: importanceLevel.value,
      heightFactor: heightFactor.value,
      seismicWeight: seismicWeight.value,
    });
  });

  // ============================================================================
  // COMPUTED - Governing Seismic Force
  // ============================================================================
  const governingSeismicForce = computed(() => {
    const forces = seismicForces.value;
    if (limitStateLogic.limitStateMain.value === "ULS") {
      return Math.max(forces.sls, forces.sls2, forces.uls);
    }
    return Math.max(forces.sls, forces.uls);
  });

  // ============================================================================
  // COMPUTED - Plenum Height Details
  // ============================================================================
  const plenumHeightDetails = computed(() => {
    return getPlenumHeightDetails(plenumHeight.value);
  });

  const studLength45 = computed(() => {
    return plenumHeightDetails.value?.d45 || 0;
  });

  const braceArmType = computed(() => {
    const braceType = plenumHeightDetails.value?.braceType || 1;
    return getBraceArmType(braceType);
  });

  // ============================================================================
  // COMPUTED - Area Per Brace
  // ============================================================================
  const areaPerBrace = computed(() => {
    return calculateAreaPerBrace(
      CONSTANTS.STRATOBRACE_CAPACITY,
      governingSeismicForce.value
    );
  });

  // ============================================================================
  // COMPUTED - Minimum Braces
  // ============================================================================
  const minimumBraces = computed(() => {
    return calculateMinimumBraces(ceilingArea.value, areaPerBrace.value);
  });

  // ============================================================================
  // COMPUTED - Maximum Brace Spacing
  // ============================================================================
  const maxBraceSpacing = computed(() => {
    return calculateBraceSpacing(areaPerBrace.value);
  });

  // ============================================================================
  // COMPUTED - Seismic Clearance
  // ============================================================================
  const seismicClearance = computed(() => {
    const plenumHeightM = plenumHeight.value;
    return {
      sls: Number(calculateSeismicClearance(plenumHeightM, "SLS").toFixed(1)),
      uls: Number(calculateSeismicClearance(plenumHeightM, "ULS").toFixed(1)),
    };
  });

  // ============================================================================
  // COMPUTED - Step Completion Flags
  // ============================================================================
  const step1Complete = computed(() => {
    return limitStateLogic.showFooterResult.value;
  });

  const step2Complete = computed(() => {
    return (
      seismicWeight.value > 0 &&
      !baffleSpacingError.value &&
      baffleSpacing.value > 0
    );
  });

  const step3Complete = computed(() => {
    return (
      zoneFactor.value > 0 &&
      importanceLevel.value > 0 &&
      heightFactor.value > 0 &&
      seismicForces.value.uls > 0
    );
  });

  const step4Complete = computed(() => {
    return plenumHeight.value > 0 && areaPerBrace.value > 0;
  });

  const step5Complete = computed(() => {
    return ceilingArea.value > 0 && minimumBraces.value > 0;
  });

  // ============================================================================
  // METHODS
  // ============================================================================
  function resetState() {
    // Reset limit state questions
    q1Answer.value = "";
    q2Answer.value = "";
    q3Answer.value = "";
    q4Answer.value = "";

    // Reset seismic weight inputs
    profileMass.value = 1.3;
    baffleSpacing.value = 0.1;
    luminaries.value = 0.2;
    services.value = 3;
    otherLoads.value = 0;

    // Reset seismic actions
    zoneFactor.value = 0.13;
    importanceLevel.value = 2;
    heightFactor.value = 3;

    // Reset back bracing
    plenumHeight.value = 0.2;

    // Reset layout
    ceilingArea.value = 100;
  }

  // ============================================================================
  // RETURN
  // ============================================================================
  return {
    // Limit state questions
    q1Answer,
    q2Answer,
    q3Answer,
    q4Answer,
    limitStateLogic,

    // Seismic weight inputs
    profileMass,
    baffleSpacing,
    luminaries,
    services,
    otherLoads,

    // Seismic actions inputs
    zoneFactor,
    importanceLevel,
    heightFactor,

    // Back bracing inputs
    plenumHeight,

    // Layout inputs
    ceilingArea,

    // Computed values
    baffleSpacingError,
    baffleMass,
    seismicWeight,
    seismicForces,
    governingSeismicForce,
    plenumHeightDetails,
    studLength45,
    braceArmType,
    areaPerBrace,
    minimumBraces,
    maxBraceSpacing,
    seismicClearance,

    // Step completion
    step1Complete,
    step2Complete,
    step3Complete,
    step4Complete,
    step5Complete,

    // Methods
    resetState,
  };
}
