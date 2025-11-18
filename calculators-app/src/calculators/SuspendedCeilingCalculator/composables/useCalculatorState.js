import { ref, computed, watch } from 'vue';
import {
  calculateSeismicWeight,
  validateSeismicWeight,
  calculateAllSeismicForces,
  calculateLimitingLengths,
  calculateStrengtheningDistance,
  validateDesign,
  adjustForRakeAngle,
  validateRakeAngle,
  getReturnPeriodFactor,
} from '../../utils/seismicCalculations.js';
import {
  getFloorFactor,
  getConnectionCapacity,
  getGridCapacity,
  getGridSpacing,
  BACK_BRACE_OPTIONS,
  CONSTANTS,
} from '../../data/suspendedCeilingData.js';
import { useLimitStateLogic } from './useLimitStateLogic.js';

/**
 * Shared calculator state and computed properties
 * This composable manages all state and calculations for the Suspended Ceiling Calculator
 */
export function useCalculatorState() {
  // ============================================================================
  // STATE - Step 1: Limit State (Question Answers)
  // ============================================================================
  const q1Answer = ref(''); // Life safety hazard
  const q2Answer = ref(''); // Part weight > 7.5kg
  const q3Answer = ref(''); // Height >= 3m
  const q4Answer = ref(''); // Blocks emergency egress
  const q5Answer = ref(''); // Complies with assumptions

  // ============================================================================
  // COMPUTED - Limit State Logic
  // ============================================================================
  const limitStateLogic = useLimitStateLogic({
    q1Answer,
    q2Answer,
    q3Answer,
    q4Answer,
    q5Answer,
  });

  // ============================================================================
  // STATE - Step 2: Site Information
  // ============================================================================
  const zoneFactor = ref(0.1); // Legacy default: first option (Kaitaia) - value must match option value type (number)
  const importanceLevel = ref(2); // Legacy default: <option value="2" selected="">Importance Level 2</option> - value must match option value type (number)
  const floorHeight = ref(0); // Default to ground floor
  const ceilingHeight = ref(2.4); // Default ceiling height
  const ductility = ref(1); // Legacy default: <option value="1" selected="">1</option>

  // ============================================================================
  // STATE - Step 3: Seismic Weight
  // ============================================================================
  const gridMass = ref(1.1); // Default to first option: Main Tee @ 1200 | Cross Tee @ 600
  const tileMass = ref('');
  const luminaries = ref(1.5); // Legacy default: value="1.5"
  const insulation = ref(0);
  const otherLoads = ref(0);
  const deadLoad = ref(CONSTANTS.DEFAULT_DEAD_LOAD);
  
  // Enforce dead load minimum (legacy: if (ddload < 3) { ddload = 3; })
  watch(deadLoad, (newValue) => {
    if (newValue < CONSTANTS.MIN_DEAD_LOAD) {
      deadLoad.value = CONSTANTS.MIN_DEAD_LOAD;
    }
  });

  // ============================================================================
  // STATE - Step 4: Grid Configuration
  // ============================================================================
  const studType = ref('2'); // Legacy default: <option value="2" selected="">Min 0.75mm BMT steel, or timber studs</option>
  const connectionType = ref('1'); // Legacy default: <option value="1" selected="">Double Rivet</option>
  const gridType = ref('1'); // Legacy default: <option value="1" selected="">CBI</option>

  // ============================================================================
  // STATE - Step 5: Design Options
  // ============================================================================
  const strengthenMain = ref('no');
  const strengthenCross = ref('no');
  const specifyMainConnection = ref('no');
  const isRaked = ref('no');
  const rakeAngle = ref(0);

  // ============================================================================
  // STATE - Step 6: Validation
  // ============================================================================
  const maxMainTee = ref(0);
  const maxCrossTee = ref(0);
  
  // ============================================================================
  // STATE - Connection Heights (for back brace calculations)
  // ============================================================================
  const connectionHeight = ref(0); // Legacy: connectionheight - for rigid hanger
  const connectionHeight2 = ref(0); // Legacy: connectionheight2 - for back brace
  
  // ============================================================================
  // STATE - Back Brace (for area per brace and max tee space calculations)
  // ============================================================================
  const braceType = ref(3); // Legacy default: <option value="3" selected="">StratoBrace (recommended)</option>
  const pendantHeight = ref(250); // Legacy default: pheightC value="250" selected="" (200mm height)

  // ============================================================================
  // COMPUTED - Step Completion
  // ============================================================================
  const step1Complete = computed(() => {
    // Must have a limit state result
    if (!limitStateLogic.limitStateMain.value) return false;
    
    // If Q1=Yes, must also answer Q5
    if (q1Answer.value === 'yes' && !q5Answer.value) return false;
    
    // If Q1=No, must answer subsequent questions until a Yes is reached
    if (q1Answer.value === 'no') {
      return !!(q2Answer.value === 'yes' || q3Answer.value === 'yes' || q4Answer.value === 'yes' || q5Answer.value === 'yes');
    }
    
    return true;
  });

  const step2Complete = computed(
    () =>
      zoneFactor.value &&
      importanceLevel.value &&
      floorHeight.value >= 0 &&
      ceilingHeight.value > 0
  );

  const step3Complete = computed(
    () => gridMass.value && tileMass.value && seismicWeight.value > 0
  );

  const step4Complete = computed(
    () => studType.value && connectionType.value && gridType.value
  );

  const step5Complete = computed(() => true);

  const step6Complete = computed(
    // Legacy: 0 is a valid value, so check for >= 0 (not null/undefined)
    () => (maxMainTee.value !== null && maxMainTee.value !== undefined && maxMainTee.value >= 0) &&
          (maxCrossTee.value !== null && maxCrossTee.value !== undefined && maxCrossTee.value >= 0)
  );

  // ============================================================================
  // COMPUTED - Seismic Weight
  // ============================================================================
  const seismicWeight = computed(() => {
    return calculateSeismicWeight({
      gridMass: Number(gridMass.value) || 0,
      tileMass: Number(tileMass.value) || 0,
      luminaries: Number(luminaries.value) || 0,
      insulation: Number(insulation.value) || 0,
      other: Number(otherLoads.value) || 0,
      deadLoad: Number(deadLoad.value) || 0,
    });
  });

  const weightValidation = computed(() => {
    return validateSeismicWeight(seismicWeight.value);
  });

  // ============================================================================
  // COMPUTED - Grid Spacing
  // ============================================================================
  const gridSpacing = computed(() => {
    return getGridSpacing(Number(gridMass.value));
  });

  // ============================================================================
  // COMPUTED - Seismic Forces
  // ============================================================================
  const ductilityFactor = computed(() => {
    // Legacy JS (suspended_ceiling_calculator.js:419-426):
    // var partSLS = 1;
    // if (ductility == 1) {
    //   var partULS = 1;
    // } else {
    //   var partULS = 0.85;
    // }
    // Legacy HTML shows: <option value="1">1</option> and <option value="1.25">1.25</option>
    // But the JS logic treats it as binary: 1 = 1.0, else = 0.85
    // The HTML option "1.25" would be treated as "else" and return 0.85
    // This seems like a bug in the legacy code, but we must match it exactly
    if (Number(ductility.value) === 1) {
      return 1.0;
    } else {
      return 0.85; // Limited ductility (anything other than 1)
    }
  });

  const seismicForces = computed(() => {
    // Calculate if we have the necessary data
    const zf = Number(zoneFactor.value);
    const il = Number(importanceLevel.value);
    const ch = Number(ceilingHeight.value);
    const sw = Number(seismicWeight.value);
    
    if (!zf || !il || ch <= 0 || sw <= 0) {
      return { sls: 0, sls2: 0, uls: 0 };
    }

    const forces = calculateAllSeismicForces({
      zoneFactor: zf,
      importanceLevel: il,
      floorHeight: Number(floorHeight.value),
      ceilingHeight: ch,
      partFactorULS: ductilityFactor.value,
      seismicWeight: sw,
    });
    
    // Legacy rounds seismic forces to 1 decimal place before using in calculations
    // (suspended_ceiling_calculator.js:449-451)
    return {
      sls: Number(forces.sls.toFixed(1)),
      sls2: Number(forces.sls2.toFixed(1)),
      uls: Number(forces.uls.toFixed(1)),
    };
  });

  const floorFactorValue = computed(() => {
    // Legacy logic (suspended_ceiling_calculator.js:740-750):
    // if (connectionheight2 != 0) {
    //   var floorfactorx = connectionheight2;
    // } else if (connectionheight != 0) {
    //   var floorfactorx = connectionheight;
    // } else {
    //   var floorfactorx = ceilheight + floorheight;
    // }
    let heightToUse;
    if (connectionHeight2.value > 0) {
      heightToUse = connectionHeight2.value;
    } else if (connectionHeight.value > 0) {
      heightToUse = connectionHeight.value;
    } else {
      heightToUse = floorHeight.value + ceilingHeight.value;
    }
    return getFloorFactor(heightToUse);
  });

  // ============================================================================
  // COMPUTED - Limiting Lengths
  // ============================================================================
  const limitingLengths = computed(() => {
    if (!step4Complete.value) {
      return {
        sls: { main: 0, cross: 0 },
        sls2: { main: 0, cross: 0 },
        uls: { main: 0, cross: 0 },
      };
    }

    // Legacy: SLS uses slscap, ULS uses ulscap (can be different)
    const connectionCapULS = getConnectionCapacity(
      Number(studType.value),
      Number(connectionType.value),
      'uls'
    );
    const connectionCapSLS = getConnectionCapacity(
      Number(studType.value),
      Number(connectionType.value),
      'sls'
    );

    const gridCap = getGridCapacity(Number(gridType.value));

    // Legacy: if connectionheight2 > 0 (back bracing), addmt = 0
    // Otherwise, addmt = 3.0 if specifyMainConnection is 'yes', else 0
    // Force reactivity by explicitly reading the value
    const connectionHeight2Val = connectionHeight2.value;
    const specifyMainConnectionVal = specifyMainConnection.value;
    
    console.log('limitingLengths computed - specifyMainConnectionVal:', specifyMainConnectionVal);
    console.log('limitingLengths computed - connectionHeight2Val:', connectionHeight2Val);
    
    let additionalMainLength = 0;
    if (connectionHeight2Val > 0) {
      additionalMainLength = 0; // Back bracing overrides
    } else {
      additionalMainLength = specifyMainConnectionVal === 'yes' ? 3.0 : 0;
    }
    
    console.log('limitingLengths computed - additionalMainLength:', additionalMainLength);

    const result = calculateLimitingLengths({
      teeCapacityMain: gridCap.mainTee,
      teeCapacityCross: gridCap.crossTee1200,
      connectionCapacity: connectionCapULS,
      connectionCapacitySLS: connectionCapSLS,
      wallCapacity: connectionCapULS,
      gridCapacityMain: gridCap.mainTee,
      gridCapacityCross: gridCap.crossTee1200,
      mainTeeSpacing: gridSpacing.value.main,
      crossTeeSpacing: gridSpacing.value.cross,
      seismicForceSLS: seismicForces.value.sls,
      seismicForceSLS2: seismicForces.value.sls2,
      seismicForceULS: seismicForces.value.uls,
      strengthenMain: strengthenMain.value === 'yes',
      strengthenCross: strengthenCross.value === 'yes',
      additionalMainLength: additionalMainLength,
      additionalCrossLength: 0,
    });
    
    console.log('limitingLengths computed - result.uls.main:', result.uls.main);
    console.log('limitingLengths computed - result.uls.cross:', result.uls.cross);
    
    return result;
  });

  const adjustedLimitingLengths = computed(() => {
    console.log('adjustedLimitingLengths computed - isRaked.value:', isRaked.value, 'rakeAngle.value:', rakeAngle.value);
    if (isRaked.value !== 'yes' || rakeAngle.value === 0) {
      console.log('adjustedLimitingLengths - no adjustment needed, returning limitingLengths.value');
      return limitingLengths.value;
    }

    const adjusted = {
      sls: {
        main: adjustForRakeAngle(limitingLengths.value.sls.main, rakeAngle.value),
        cross: limitingLengths.value.sls.cross,
      },
      sls2: {
        main: adjustForRakeAngle(limitingLengths.value.sls2.main, rakeAngle.value),
        cross: limitingLengths.value.sls2.cross,
      },
      uls: {
        main: adjustForRakeAngle(limitingLengths.value.uls.main, rakeAngle.value),
        cross: limitingLengths.value.uls.cross,
      },
    };
    console.log('adjustedLimitingLengths - adjusted.uls.main:', adjusted.uls.main, 'from', limitingLengths.value.uls.main);
    return adjusted;
  });

  // ============================================================================
  // COMPUTED - Design Validation
  // ============================================================================
  const designValidation = computed(() => {
    if (!step6Complete.value) {
      return {
        recommendation: '',
        mainPass: false,
        crossPass: false,
        governingMain: 0,
        governingCross: 0,
      };
    }

    return validateDesign({
      maxMainTee: maxMainTee.value,
      maxCrossTee: maxCrossTee.value,
      limitingMainSLS: adjustedLimitingLengths.value.sls.main,
      limitingMainSLS2: adjustedLimitingLengths.value.sls2.main,
      limitingMainULS: adjustedLimitingLengths.value.uls.main,
      limitingCrossSLS: adjustedLimitingLengths.value.sls.cross,
      limitingCrossSLS2: adjustedLimitingLengths.value.sls2.cross,
      limitingCrossULS: adjustedLimitingLengths.value.uls.cross,
    });
  });

  const strengtheningDistances = computed(() => {
    if (strengthenMain.value !== 'yes' && strengthenCross.value !== 'yes') {
      return null;
    }

    const withoutStrengthening = calculateLimitingLengths({
      teeCapacityMain: getGridCapacity(Number(gridType.value)).mainTee,
      teeCapacityCross: getGridCapacity(Number(gridType.value)).crossTee1200,
      connectionCapacity: getConnectionCapacity(
        Number(studType.value),
        Number(connectionType.value),
        'uls'
      ),
      wallCapacity: getConnectionCapacity(
        Number(studType.value),
        Number(connectionType.value),
        'uls'
      ),
      gridCapacityMain: getGridCapacity(Number(gridType.value)).mainTee,
      gridCapacityCross: getGridCapacity(Number(gridType.value)).crossTee1200,
      mainTeeSpacing: gridSpacing.value.main,
      crossTeeSpacing: gridSpacing.value.cross,
      seismicForceSLS: seismicForces.value.sls,
      seismicForceSLS2: seismicForces.value.sls2,
      seismicForceULS: seismicForces.value.uls,
      strengthenMain: false,
      strengthenCross: false,
      additionalMainLength: 0,
      additionalCrossLength: 0,
    });

    return {
      main:
        strengthenMain.value === 'yes'
          ? calculateStrengtheningDistance(
              maxMainTee.value,
              withoutStrengthening.uls.main
            )
          : 0,
      cross:
        strengthenCross.value === 'yes'
          ? calculateStrengtheningDistance(
              maxCrossTee.value,
              withoutStrengthening.uls.cross
            )
          : 0,
    };
  });

  const rakeAngleError = computed(() => {
    if (isRaked.value !== 'yes' || rakeAngle.value === 0) return '';
    const validation = validateRakeAngle(rakeAngle.value);
    return validation.error || '';
  });

  // ============================================================================
  // COMPUTED - Back Brace Calculations (for area per brace and max tee space)
  // ============================================================================
  const braceArea = computed(() => {
    // Legacy: bracearea = bracecap / total2b_bb (suspended_ceiling_calculator.js:813)
    // total2b_bb uses connectionheight2 if set, otherwise connectionheight, otherwise floor+ceiling height
    // Uses the back brace seismic force calculation
    if (!step2Complete.value || !step3Complete.value) return 0;
    
    // Legacy: var bracecap = blookup.val(); where blookup is pheightC (default)
    // The select value IS the capacity (e.g., value="250" = 250kg capacity)
    const braceCapacity = Number(pendantHeight.value);
    if (braceCapacity === 0) return 0;
    
    // Calculate back brace seismic force (uses connectionheight2 or connectionheight if set)
    // Legacy: if (connectionheight2 != 0) { floorfactorx = connectionheight2; } else if (connectionheight != 0) { floorfactorx = connectionheight; } else { floorfactorx = ceilheight + floorheight; }
    const heightForBB = connectionHeight2.value > 0 
      ? connectionHeight2.value 
      : (connectionHeight.value > 0 ? connectionHeight.value : (floorHeight.value + ceilingHeight.value));
    const floorFactorBB = getFloorFactor(heightForBB);
    
    const zf = Number(zoneFactor.value);
    const il = Number(importanceLevel.value);
    const returnFactorULS = getReturnPeriodFactor('ULS', il);
    let zfrfb = zf * returnFactorULS;
    if (zfrfb > CONSTANTS.MAX_RETURN_FACTOR) {
      zfrfb = CONSTANTS.MAX_RETURN_FACTOR;
    }
    
    // Legacy: total2b_bb = (zfrfb * floorfactor_bb * partULS * total1).toFixed(1)
    // Note: total1 is the seismic weight (gridmass + tilemass + luminaries + insulation + other + ddload)
    const total1 = seismicWeight.value;
    const partULS = ductilityFactor.value;
    const total2b_bb = Number((zfrfb * floorFactorBB * partULS * total1).toFixed(1));
    
    // Legacy: bracearea = bracecap / total2b_bb
    if (total2b_bb === 0) return 0;
    return braceCapacity / total2b_bb;
  });

  const maxTeeSpace = computed(() => {
    // Legacy: teespace1 = Math.min(bsum, bspace) where bsum = 6
    // bspace = Math.sqrt(bracearea) - (Math.sqrt(bracearea) % tspace)
    // bspace2 = bracearea / bspace - ((bracearea / bspace) % tspace2)
    if (braceArea.value === 0) {
      return { main: gridSpacing.value.main, cross: gridSpacing.value.cross };
    }
    
    const bsum = 6; // Legacy constant
    const tspace = gridSpacing.value.main;
    const tspace2 = gridSpacing.value.cross;
    
    const idealSpacing = Math.sqrt(braceArea.value);
    let bspace = idealSpacing - (idealSpacing % tspace); // modulus operation
    
    const bspace2 = braceArea.value / bspace;
    const bspace2Rounded = bspace2 - (bspace2 % tspace2);
    
    const teespace1 = Math.min(bsum, bspace);
    const teespace2 = Math.min(bsum, bspace2Rounded);
    
    return {
      main: teespace1,
      cross: teespace2,
    };
  });

  // ============================================================================
  // METHODS
  // ============================================================================
  function resetState() {
    q1Answer.value = '';
    q2Answer.value = '';
    q3Answer.value = '';
    q4Answer.value = '';
    q5Answer.value = '';
    zoneFactor.value = 0.1; // Legacy default: first option (Kaitaia)
    importanceLevel.value = 2; // Legacy default: Importance Level 2
    floorHeight.value = 0;
    ceilingHeight.value = 2.4;
    ductility.value = 1;
    connectionHeight.value = 0;
    connectionHeight2.value = 0;
    braceType.value = 3; // Legacy default: StratoBrace
    pendantHeight.value = 250; // Legacy default: pheightC value="250"
    gridMass.value = 1.1;
    tileMass.value = '';
    luminaries.value = 1.5; // Legacy default
    insulation.value = 0;
    otherLoads.value = 0;
    deadLoad.value = CONSTANTS.DEFAULT_DEAD_LOAD;
    studType.value = '2'; // Legacy default: Steel Stud
    connectionType.value = '1'; // Legacy default: Double Rivet
    gridType.value = '1'; // Legacy default: CBI
    strengthenMain.value = 'no';
    strengthenCross.value = 'no';
    specifyMainConnection.value = 'no';
    isRaked.value = 'no';
    rakeAngle.value = 0;
    maxMainTee.value = 0;
    maxCrossTee.value = 0;
  }

  return {
    // State - Limit State Questions
    q1Answer,
    q2Answer,
    q3Answer,
    q4Answer,
    q5Answer,
    
    // Limit State Logic (computed)
    limitStateLogic,
    
    // State - Site Info
    zoneFactor,
    importanceLevel,
    floorHeight,
    ceilingHeight,
    ductility,
    connectionHeight,
    connectionHeight2,
    braceType,
    pendantHeight,
    gridMass,
    tileMass,
    luminaries,
    insulation,
    otherLoads,
    deadLoad,
    studType,
    connectionType,
    gridType,
    strengthenMain,
    strengthenCross,
    specifyMainConnection,
    isRaked,
    rakeAngle,
    maxMainTee,
    maxCrossTee,
    
    // Computed
    step1Complete,
    step2Complete,
    step3Complete,
    step4Complete,
    step5Complete,
    step6Complete,
    seismicWeight,
    weightValidation,
    gridSpacing,
    seismicForces,
    floorFactorValue,
    limitingLengths,
    adjustedLimitingLengths,
    designValidation,
    strengtheningDistances,
    rakeAngleError,
    braceArea,
    maxTeeSpace,
    
    // Methods
    resetState,
  };
}
