import { ref, computed } from 'vue';
import {
  calculateSeismicWeight,
  validateSeismicWeight,
  calculateAllSeismicForces,
  calculateLimitingLengths,
  calculateStrengtheningDistance,
  validateDesign,
} from '../../utils/seismicCalculations.js';
import {
  getFloorFactor,
  getConnectionCapacity,
  getGridCapacity,
  getGridSpacing,
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
  const zoneFactor = ref('');
  const importanceLevel = ref('2');
  const floorHeight = ref(0);
  const ceilingHeight = ref(0);

  // ============================================================================
  // STATE - Step 3: Seismic Weight
  // ============================================================================
  const gridMass = ref(1.1); // Default to first option: Main Tee @ 1200 | Cross Tee @ 600
  const tileMass = ref('');
  const luminaries = ref(0);
  const insulation = ref(0);
  const otherLoads = ref(0);
  const deadLoad = ref(CONSTANTS.DEFAULT_DEAD_LOAD);

  // ============================================================================
  // STATE - Step 4: Grid Configuration
  // ============================================================================
  const studType = ref('1');
  const connectionType = ref('1');
  const gridType = ref('1');

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
  // COMPUTED - Step Completion
  // ============================================================================
  const step1Complete = computed(() => !!limitStateLogic.limitStateMain.value);

  const step2Complete = computed(
    () =>
      zoneFactor.value &&
      importanceLevel.value &&
      floorHeight.value > 0 &&
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
    () => maxMainTee.value > 0 && maxCrossTee.value > 0
  );

  // ============================================================================
  // COMPUTED - Seismic Weight
  // ============================================================================
  const seismicWeight = computed(() => {
    return calculateSeismicWeight({
      gridMass: Number(gridMass.value) || 0,
      tileMass: Number(tileMass.value) || 0,
      luminaries: luminaries.value,
      insulation: insulation.value,
      other: otherLoads.value,
      deadLoad: deadLoad.value,
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
    // Default ductility factor for ULS
    return 1;
  });

  const seismicForces = computed(() => {
    if (!step2Complete.value || !step3Complete.value) {
      return { sls: 0, sls2: 0, uls: 0 };
    }

    return calculateAllSeismicForces({
      zoneFactor: Number(zoneFactor.value),
      importanceLevel: Number(importanceLevel.value),
      floorHeight: floorHeight.value,
      ceilingHeight: ceilingHeight.value,
      partFactorULS: ductilityFactor.value,
      seismicWeight: seismicWeight.value,
    });
  });

  const floorFactorValue = computed(() => {
    return getFloorFactor(floorHeight.value + ceilingHeight.value);
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

    const connectionCap = getConnectionCapacity(
      Number(studType.value),
      Number(connectionType.value),
      'uls'
    );

    const gridCap = getGridCapacity(Number(gridType.value));

    return calculateLimitingLengths({
      teeCapacityMain: gridCap.mainTee,
      teeCapacityCross: gridCap.crossTee1200,
      connectionCapacity: connectionCap,
      wallCapacity: connectionCap,
      gridCapacityMain: gridCap.mainTee,
      gridCapacityCross: gridCap.crossTee1200,
      mainTeeSpacing: gridSpacing.value.main,
      crossTeeSpacing: gridSpacing.value.cross,
      seismicForceSLS: seismicForces.value.sls,
      seismicForceSLS2: seismicForces.value.sls2,
      seismicForceULS: seismicForces.value.uls,
      strengthenMain: strengthenMain.value === 'yes',
      strengthenCross: strengthenCross.value === 'yes',
      additionalMainLength: specifyMainConnection.value === 'yes' ? 3.0 : 0,
      additionalCrossLength: 0,
    });
  });

  const adjustedLimitingLengths = computed(() => {
    if (isRaked.value !== 'yes' || rakeAngle.value === 0) {
      return limitingLengths.value;
    }

    return {
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
  // METHODS
  // ============================================================================
  function resetState() {
    limitState.value = 'uls';
    zoneFactor.value = '';
    importanceLevel.value = '2';
    floorHeight.value = 0;
    ceilingHeight.value = 0;
    gridMass.value = '';
    tileMass.value = '';
    luminaries.value = 0;
    insulation.value = 0;
    otherLoads.value = 0;
    studType.value = '1';
    connectionType.value = '1';
    gridType.value = '1';
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
    
    // Methods
    resetState,
  };
}
