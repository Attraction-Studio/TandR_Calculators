import { ref, computed, watch } from "vue";
import {
  calculateGridMass,
  calculatePlasterboardSeismicForces,
  calculateEdgeConnectionTeeLength,
  calculateDiaphragmTeeLength,
  calculateMaxAllowableTeeLength,
  getBraceCapacity,
  calculateAreaPerBrace,
  calculateMinBraces,
  calculateSeismicClearance,
  getFloorFactor,
  getReturnPeriodFactor,
  CONSTANTS,
  PLASTERBOARD_FIXING_SPACING_OPTIONS,
} from "../../data/plasterboardCeilingData.js";
import { usePlasterboardLimitStateLogic } from "./useLimitStateLogic.js";

/**
 * Shared calculator state and computed properties
 * for the Plasterboard Ceiling Seismic Calculator
 */
export function useCalculatorState() {
  // ============================================================================
  // STATE - Step 1: Limit State (Question Answers)
  // ============================================================================
  const q1Answer = ref("");
  const q2Answer = ref("");
  const q3Answer = ref("");
  const q4Answer = ref("");
  const q5Answer = ref("");

  // ============================================================================
  // COMPUTED - Limit State Logic
  // ============================================================================
  const limitStateLogic = usePlasterboardLimitStateLogic({
    q1Answer,
    q2Answer,
    q3Answer,
    q4Answer,
    q5Answer,
  });

  // ============================================================================
  // STATE - Step 2: Ceiling Weight
  // ============================================================================
  const mainTeeSpacing = ref(1200);
  const crossTeeSpacing = ref(600);
  const liningWeight = ref(0.1);
  const liningThickness = ref(20);
  const luminaries = ref(0);
  const insulation = ref(0);
  const otherLoads = ref(0);
  const deadLoad = ref(CONSTANTS.DEFAULT_DEAD_LOAD);

  watch(deadLoad, (newValue) => {
    if (newValue < CONSTANTS.MIN_DEAD_LOAD) {
      deadLoad.value = CONSTANTS.MIN_DEAD_LOAD;
    }
  });

  // ============================================================================
  // STATE - Step 3: Seismic Actions
  // ============================================================================
  const zoneFactor = ref(0.1);
  const importanceLevel = ref(2);
  const heightFactor = ref(3);

  // ============================================================================
  // STATE - Step 4: Overall Ceiling Capacity
  // ============================================================================
  const wallFastenerSpacing = ref(0.6);
  const plasterboardFixingSpacing = ref(202);

  // ============================================================================
  // STATE - Step 5: Back Bracing
  // ============================================================================
  const braceType = ref("A");
  const plenumHeight = ref(200);

  // ============================================================================
  // STATE - Step 6: Back Bracing Layout
  // ============================================================================
  const ceilingArea = ref(20);

  // ============================================================================
  // STATE - PDF/Download fields
  // ============================================================================
  const maxMainTeeSupplied = ref(0);
  const maxCrossTeeSupplied = ref(0);

  // ============================================================================
  // STATE - Optional Steps Visibility
  // ============================================================================
  const showBackBrace = ref(false);

  // ============================================================================
  // COMPUTED - Grid Mass
  // ============================================================================
  const gridMassResult = computed(() => {
    return calculateGridMass(mainTeeSpacing.value, crossTeeSpacing.value);
  });

  const gridMass = computed(() => {
    return gridMassResult.value.gridMass;
  });

  const crossTeeError = computed(() => {
    if (liningThickness.value < 13 && !gridMassResult.value.requiresCT400) {
      return "ERROR: The cross tee grid spacing exceeds the manufacturers recommendations for plasterboard thicknesses of less than 13mm. Reduce cross tee spacing to 400mm";
    }
    return "";
  });

  // ============================================================================
  // COMPUTED - Seismic Weight
  // ============================================================================
  const seismicWeight = computed(() => {
    const gm = gridMass.value || 0;
    const lw = Number(liningWeight.value) || 0;
    const lum = Number(luminaries.value) || 0;
    const ins = Number(insulation.value) || 0;
    const other = Number(otherLoads.value) || 0;
    const dd = Number(deadLoad.value) || CONSTANTS.MIN_DEAD_LOAD;
    return gm + lw + lum + ins + other + dd;
  });

  // ============================================================================
  // COMPUTED - Seismic Forces
  // ============================================================================
  const seismicForces = computed(() => {
    const zf = Number(zoneFactor.value);
    const il = Number(importanceLevel.value);
    const ff = Number(heightFactor.value);
    const sw = seismicWeight.value;

    if (!zf || !il || !ff || sw <= 0) {
      return { sls: 0, sls2: 0, uls: 0 };
    }

    return calculatePlasterboardSeismicForces({
      zoneFactor: zf,
      importanceLevel: il,
      floorFactor: ff,
      seismicWeight: sw,
    });
  });

  // ============================================================================
  // COMPUTED - Edge Connection Tee Lengths (Section 4.1)
  // ============================================================================
  const edgeConnectionTeeLengths = computed(() => {
    const wsfs = Number(wallFastenerSpacing.value);
    const { sls, sls2, uls } = seismicForces.value;

    return {
      sls: calculateEdgeConnectionTeeLength(wsfs, sls),
      sls2: calculateEdgeConnectionTeeLength(wsfs, sls2),
      uls: calculateEdgeConnectionTeeLength(wsfs, uls),
    };
  });

  // ============================================================================
  // COMPUTED - Diaphragm Capacity Tee Lengths (Section 4.2)
  // ============================================================================
  const diaphragmTeeLengths = computed(() => {
    const pfs = Number(plasterboardFixingSpacing.value);
    const pfsOption = PLASTERBOARD_FIXING_SPACING_OPTIONS.find(
      (opt) => opt.value === pfs
    );
    const crossTeeCapacity = pfsOption ? pfsOption.crossTeeCapacity : 181;

    const { sls, sls2, uls } = seismicForces.value;

    return {
      main: {
        sls: calculateDiaphragmTeeLength(pfs, sls),
        sls2: calculateDiaphragmTeeLength(pfs, sls2),
        uls: calculateDiaphragmTeeLength(pfs, uls),
      },
      cross: {
        sls: calculateDiaphragmTeeLength(crossTeeCapacity, sls),
        sls2: calculateDiaphragmTeeLength(crossTeeCapacity, sls2),
        uls: calculateDiaphragmTeeLength(crossTeeCapacity, uls),
      },
    };
  });

  // ============================================================================
  // COMPUTED - Maximum Allowable Tee Lengths (Section 4.3)
  // ============================================================================
  const maxAllowableTeeLengths = computed(() => {
    const edge = edgeConnectionTeeLengths.value;
    const diaphragm = diaphragmTeeLengths.value;

    return {
      main: {
        sls: calculateMaxAllowableTeeLength(edge.sls, diaphragm.main.sls),
        sls2: calculateMaxAllowableTeeLength(edge.sls2, diaphragm.main.sls2),
        uls: calculateMaxAllowableTeeLength(edge.uls, diaphragm.main.uls),
      },
      cross: {
        sls: calculateMaxAllowableTeeLength(edge.sls, diaphragm.cross.sls),
        sls2: calculateMaxAllowableTeeLength(edge.sls2, diaphragm.cross.sls2),
        uls: calculateMaxAllowableTeeLength(edge.uls, diaphragm.cross.uls),
      },
    };
  });

  // ============================================================================
  // COMPUTED - Back Brace Calculations
  // ============================================================================
  const braceCapacityResult = computed(() => {
    return getBraceCapacity(braceType.value, Number(plenumHeight.value));
  });

  const governingSeismicForce = computed(() => {
    const { sls, sls2, uls } = seismicForces.value;
    if (limitStateLogic.isSLS2Required.value) {
      return Math.max(sls, sls2, uls);
    }
    return Math.max(sls, uls);
  });

  const areaPerBrace = computed(() => {
    const capacity = braceCapacityResult.value.capacity;
    const force = governingSeismicForce.value;
    return calculateAreaPerBrace(capacity, force);
  });

  const minimumBraces = computed(() => {
    return calculateMinBraces(ceilingArea.value, areaPerBrace.value);
  });

  // ============================================================================
  // COMPUTED - Seismic Clearance (Step 7)
  // ============================================================================
  const seismicClearance = computed(() => {
    return calculateSeismicClearance(Number(plenumHeight.value));
  });

  // ============================================================================
  // COMPUTED - Step Completion
  // ============================================================================
  const step1Complete = computed(() => {
    return limitStateLogic.canProceed.value;
  });

  const step2Complete = computed(() => {
    return seismicWeight.value > 0 && liningWeight.value > 0;
  });

  const step3Complete = computed(() => {
    return zoneFactor.value > 0 && importanceLevel.value > 0;
  });

  const step4Complete = computed(() => {
    return seismicForces.value.uls > 0;
  });

  const step5Complete = computed(() => {
    return braceCapacityResult.value.capacity > 0;
  });

  const step6Complete = computed(() => {
    return ceilingArea.value > 0 && minimumBraces.value >= 2;
  });

  // ============================================================================
  // METHODS
  // ============================================================================
  function resetState() {
    q1Answer.value = "";
    q2Answer.value = "";
    q3Answer.value = "";
    q4Answer.value = "";
    q5Answer.value = "";
    mainTeeSpacing.value = 1200;
    crossTeeSpacing.value = 600;
    liningWeight.value = 0.1;
    liningThickness.value = 20;
    luminaries.value = 0;
    insulation.value = 0;
    otherLoads.value = 0;
    deadLoad.value = CONSTANTS.DEFAULT_DEAD_LOAD;
    zoneFactor.value = 0.1;
    importanceLevel.value = 2;
    heightFactor.value = 3;
    wallFastenerSpacing.value = 0.6;
    plasterboardFixingSpacing.value = 202;
    braceType.value = "A";
    plenumHeight.value = 200;
    ceilingArea.value = 20;
    maxMainTeeSupplied.value = 0;
    maxCrossTeeSupplied.value = 0;
    showBackBrace.value = false;
  }

  return {
    // State - Limit State Questions
    q1Answer,
    q2Answer,
    q3Answer,
    q4Answer,
    q5Answer,

    // Limit State Logic
    limitStateLogic,

    // State - Ceiling Weight
    mainTeeSpacing,
    crossTeeSpacing,
    liningWeight,
    liningThickness,
    luminaries,
    insulation,
    otherLoads,
    deadLoad,

    // State - Seismic Actions
    zoneFactor,
    importanceLevel,
    heightFactor,

    // State - Ceiling Capacity
    wallFastenerSpacing,
    plasterboardFixingSpacing,

    // State - Back Bracing
    braceType,
    plenumHeight,
    ceilingArea,

    // State - PDF fields
    maxMainTeeSupplied,
    maxCrossTeeSupplied,

    // State - Optional Steps
    showBackBrace,

    // Computed - Grid
    gridMass,
    gridMassResult,
    crossTeeError,

    // Computed - Weight
    seismicWeight,

    // Computed - Forces
    seismicForces,

    // Computed - Tee Lengths
    edgeConnectionTeeLengths,
    diaphragmTeeLengths,
    maxAllowableTeeLengths,

    // Computed - Back Brace
    braceCapacityResult,
    governingSeismicForce,
    areaPerBrace,
    minimumBraces,
    seismicClearance,

    // Computed - Step Completion
    step1Complete,
    step2Complete,
    step3Complete,
    step4Complete,
    step5Complete,
    step6Complete,

    // Methods
    resetState,
  };
}
