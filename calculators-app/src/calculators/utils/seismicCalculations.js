/**
 * Suspended Ceiling Seismic Calculator - Calculation Functions
 * Pure functions for all seismic calculations
 * All formulas preserved from legacy calculator
 */

import { CONSTANTS, RETURN_PERIOD_FACTORS, getFloorFactor } from '../data/suspendedCeilingData.js';

// ============================================================================
// SEISMIC WEIGHT CALCULATIONS
// ============================================================================

/**
 * Calculate total seismic weight
 * @param {object} components - Weight components
 * @param {number} components.gridMass - Grid mass (kg/m²)
 * @param {number} components.tileMass - Tile mass (kg/m²)
 * @param {number} components.luminaries - Luminaries weight (kg/m²)
 * @param {number} components.insulation - Insulation weight (kg/m²)
 * @param {number} components.other - Other loads (kg/m²)
 * @param {number} components.deadLoad - Dead load (kg/m²)
 * @returns {number} Total seismic weight (kg/m²)
 */
export function calculateSeismicWeight(components) {
  const {
    gridMass = 0,
    tileMass = 0,
    luminaries = 0,
    insulation = 0,
    other = 0,
    deadLoad = CONSTANTS.DEFAULT_DEAD_LOAD,
  } = components;

  return gridMass + tileMass + luminaries + insulation + other + deadLoad;
}

/**
 * Validate seismic weight against maximum
 * @param {number} weight - Seismic weight (kg/m²)
 * @returns {object} { isValid, error }
 */
export function validateSeismicWeight(weight) {
  if (weight > CONSTANTS.MAX_SEISMIC_WEIGHT) {
    return {
      isValid: false,
      error: `Seismic weight (${weight.toFixed(1)} kg/m²) exceeds maximum (${CONSTANTS.MAX_SEISMIC_WEIGHT} kg/m²)`,
    };
  }
  return { isValid: true, error: null };
}

// ============================================================================
// RETURN PERIOD FACTOR CALCULATIONS
// ============================================================================

/**
 * Get return period factor based on limit state and importance level
 * @param {string} limitState - 'SLS', 'SLS2', or 'ULS'
 * @param {number} importanceLevel - Importance level (2 or 3)
 * @returns {number} Return period factor
 */
export function getReturnPeriodFactor(limitState, importanceLevel) {
  if (limitState === 'SLS') {
    return RETURN_PERIOD_FACTORS.SLS;
  }
  
  if (limitState === 'SLS2') {
    return importanceLevel === 2 
      ? RETURN_PERIOD_FACTORS.SLS2.IL2 
      : RETURN_PERIOD_FACTORS.SLS2.IL3;
  }
  
  if (limitState === 'ULS') {
    return importanceLevel === 2 
      ? RETURN_PERIOD_FACTORS.ULS.IL2 
      : RETURN_PERIOD_FACTORS.ULS.IL3;
  }
  
  return RETURN_PERIOD_FACTORS.SLS;
}

// ============================================================================
// SEISMIC FORCE CALCULATIONS
// ============================================================================

/**
 * Calculate seismic force
 * Formula: Sf = Z × R(T,U) × C(h) × Sp × Sw
 * Where:
 *   Z = Zone factor
 *   R(T,U) = Return period factor
 *   C(h) = Floor factor
 *   Sp = Part factor (ductility)
 *   Sw = Seismic weight
 * 
 * @param {object} params - Calculation parameters
 * @param {number} params.zoneFactor - Seismic zone factor
 * @param {number} params.returnFactor - Return period factor
 * @param {number} params.floorFactor - Floor factor based on height
 * @param {number} params.partFactor - Part factor (ductility)
 * @param {number} params.seismicWeight - Total seismic weight (kg/m²)
 * @returns {number} Seismic force (kgf/m²)
 */
export function calculateSeismicForce(params) {
  const {
    zoneFactor,
    returnFactor,
    floorFactor,
    partFactor,
    seismicWeight,
  } = params;

  // Apply maximum limit to zone × return factor product
  let zfrf = zoneFactor * returnFactor;
  if (zfrf > CONSTANTS.MAX_RETURN_FACTOR) {
    zfrf = CONSTANTS.MAX_RETURN_FACTOR;
  }

  return zfrf * floorFactor * partFactor * seismicWeight;
}

/**
 * Calculate all seismic forces (SLS, SLS2, ULS)
 * @param {object} params - Calculation parameters
 * @returns {object} { sls, sls2, uls }
 */
export function calculateAllSeismicForces(params) {
  const {
    zoneFactor,
    importanceLevel,
    floorHeight,
    ceilingHeight,
    partFactorULS,
    seismicWeight,
  } = params;

  const totalHeight = floorHeight + ceilingHeight;
  const floorFactor = getFloorFactor(totalHeight);
  const partFactorSLS = 1; // Always 1 for SLS

  const slsFactor = getReturnPeriodFactor('SLS', importanceLevel);
  const sls2Factor = getReturnPeriodFactor('SLS2', importanceLevel);
  const ulsFactor = getReturnPeriodFactor('ULS', importanceLevel);

  return {
    sls: calculateSeismicForce({
      zoneFactor,
      returnFactor: slsFactor,
      floorFactor,
      partFactor: partFactorSLS,
      seismicWeight,
    }),
    sls2: calculateSeismicForce({
      zoneFactor,
      returnFactor: sls2Factor,
      floorFactor,
      partFactor: partFactorSLS,
      seismicWeight,
    }),
    uls: calculateSeismicForce({
      zoneFactor,
      returnFactor: ulsFactor,
      floorFactor,
      partFactor: partFactorULS,
      seismicWeight,
    }),
  };
}

// ============================================================================
// LIMITING TEE LENGTH CALCULATIONS
// ============================================================================

/**
 * Calculate limiting tee length
 * Formula: L = Capacity / (Spacing × Seismic Force)
 * 
 * @param {number} capacity - Tee or connection capacity
 * @param {number} spacing - Tee spacing (m)
 * @param {number} seismicForce - Seismic force (kgf/m²)
 * @param {number} additionalLength - Additional length from connection location (m)
 * @returns {number} Limiting length (m)
 */
export function calculateLimitingLength(capacity, spacing, seismicForce, additionalLength = 0) {
  if (seismicForce === 0 || spacing === 0) return 0;
  return (capacity / spacing / seismicForce) + additionalLength;
}

/**
 * Calculate limiting lengths with grid strengthening
 * Returns minimum of: tee capacity, connection capacity, wall capacity
 * 
 * @param {object} params - Calculation parameters
 * @returns {object} Limiting lengths for main and cross tees
 */
export function calculateLimitingLengths(params) {
  const {
    // Capacities
    teeCapacityMain,
    teeCapacityCross,
    connectionCapacity,
    wallCapacity,
    gridCapacityMain,
    gridCapacityCross,
    
    // Spacing
    mainTeeSpacing,
    crossTeeSpacing,
    
    // Seismic forces
    seismicForceSLS,
    seismicForceSLS2,
    seismicForceULS,
    
    // Options
    strengthenMain = false,
    strengthenCross = false,
    additionalMainLength = 0,
    additionalCrossLength = 0,
  } = params;

  // Calculate for each limit state
  const calculateForState = (force) => {
    // Main tee calculations
    const mainFromTee = calculateLimitingLength(
      teeCapacityMain,
      mainTeeSpacing,
      force
    );
    
    const mainFromConnection = calculateLimitingLength(
      connectionCapacity,
      mainTeeSpacing,
      force,
      additionalMainLength
    );
    
    const mainFromWall = calculateLimitingLength(
      wallCapacity,
      mainTeeSpacing,
      force
    );
    
    const mainFromGrid = calculateLimitingLength(
      gridCapacityMain,
      mainTeeSpacing,
      force,
      additionalMainLength
    );

    // Cross tee calculations
    const crossFromTee = calculateLimitingLength(
      teeCapacityCross,
      crossTeeSpacing,
      force
    );
    
    const crossFromConnection = calculateLimitingLength(
      connectionCapacity,
      crossTeeSpacing,
      force,
      additionalCrossLength
    );
    
    const crossFromWall = calculateLimitingLength(
      wallCapacity,
      crossTeeSpacing,
      force
    );
    
    const crossFromGrid = calculateLimitingLength(
      gridCapacityCross,
      crossTeeSpacing,
      force,
      additionalCrossLength
    );

    // Determine limiting values
    let limitingMain, limitingCross;
    
    if (strengthenMain) {
      // Only limited by tee capacity when strengthened
      limitingMain = mainFromTee;
    } else {
      limitingMain = Math.min(mainFromTee, mainFromConnection, mainFromWall, mainFromGrid);
    }
    
    if (strengthenCross) {
      // Only limited by tee capacity when strengthened
      limitingCross = crossFromTee;
    } else {
      limitingCross = Math.min(crossFromTee, crossFromConnection, crossFromWall, crossFromGrid);
    }

    return {
      main: limitingMain,
      cross: limitingCross,
    };
  };

  return {
    sls: calculateForState(seismicForceSLS),
    sls2: calculateForState(seismicForceSLS2),
    uls: calculateForState(seismicForceULS),
  };
}

// ============================================================================
// RAKE ANGLE ADJUSTMENTS
// ============================================================================

/**
 * Adjust tee length for rake angle
 * Formula: Adjusted Length = Length / cos(angle)
 * 
 * @param {number} length - Original tee length (m)
 * @param {number} rakeAngle - Rake angle (degrees)
 * @returns {number} Adjusted length (m)
 */
export function adjustForRakeAngle(length, rakeAngle) {
  if (rakeAngle === 0) return length;
  
  const rakeRadians = (rakeAngle * Math.PI) / 180;
  const rakeCos = Math.cos(rakeRadians);
  const rakeMultiplier = 1 / rakeCos;
  
  return length / rakeMultiplier;
}

/**
 * Validate rake angle
 * @param {number} angle - Rake angle (degrees)
 * @returns {object} { isValid, error }
 */
export function validateRakeAngle(angle) {
  if (angle > CONSTANTS.MAX_RAKE_ANGLE) {
    return {
      isValid: false,
      error: `Maximum allowable ceiling rake is ${CONSTANTS.MAX_RAKE_ANGLE}° from horizontal. Specific design by qualified engineer required.`,
    };
  }
  return { isValid: true, error: null };
}

// ============================================================================
// GRID STRENGTHENING CALCULATIONS
// ============================================================================

/**
 * Calculate required grid strengthening distance
 * Distance from fixed edge where strengthening is needed
 * 
 * @param {number} maxLength - Maximum measured tee length
 * @param {number} limitWithoutStrength - Limiting length without strengthening
 * @returns {number} Required strengthening distance (m)
 */
export function calculateStrengtheningDistance(maxLength, limitWithoutStrength) {
  const distance = maxLength - limitWithoutStrength;
  return distance > 0 ? distance : 0;
}

// ============================================================================
// BACK BRACE CALCULATIONS
// ============================================================================

/**
 * Calculate area per brace
 * Formula: Area = Brace Capacity / Seismic Force
 * 
 * @param {number} braceCapacity - Brace capacity
 * @param {number} seismicForce - Seismic force (kgf/m²)
 * @returns {number} Area per brace (m²)
 */
export function calculateBraceArea(braceCapacity, seismicForce) {
  if (seismicForce === 0) return 0;
  return braceCapacity / seismicForce;
}

/**
 * Calculate number of braces required
 * @param {number} ceilingArea - Total ceiling area (m²)
 * @param {number} areaPerBrace - Area covered by one brace (m²)
 * @returns {number} Number of braces (rounded up)
 */
export function calculateBraceCount(ceilingArea, areaPerBrace) {
  if (areaPerBrace === 0) return 0;
  return Math.ceil(ceilingArea / areaPerBrace);
}

/**
 * Calculate maximum brace spacing
 * Ensures braces are spaced on tee grid
 * 
 * @param {number} areaPerBrace - Area per brace (m²)
 * @param {number} mainTeeSpacing - Main tee spacing (m)
 * @param {number} crossTeeSpacing - Cross tee spacing (m)
 * @param {number} maxSpacing - Maximum allowable spacing (m)
 * @returns {object} { main, cross } spacing in meters
 */
export function calculateBraceSpacing(areaPerBrace, mainTeeSpacing, crossTeeSpacing, maxSpacing = 6) {
  // Calculate ideal spacing as square root of area
  const idealSpacing = Math.sqrt(areaPerBrace);
  
  // Round down to nearest tee spacing
  let mainSpacing = idealSpacing - (idealSpacing % mainTeeSpacing);
  let crossSpacing = areaPerBrace / mainSpacing;
  crossSpacing = crossSpacing - (crossSpacing % crossTeeSpacing);
  
  // Apply maximum spacing limit
  const finalMainSpacing = Math.min(maxSpacing, mainSpacing);
  const finalCrossSpacing = Math.min(maxSpacing, crossSpacing);
  
  return {
    main: finalMainSpacing,
    cross: finalCrossSpacing,
  };
}

// ============================================================================
// DESIGN VALIDATION
// ============================================================================

/**
 * Validate design against measured tee lengths
 * @param {object} params - Validation parameters
 * @returns {object} Validation results with recommendations
 */
export function validateDesign(params) {
  const {
    maxMainTee,
    maxCrossTee,
    limitingMainSLS,
    limitingMainSLS2,
    limitingMainULS,
    limitingCrossSLS,
    limitingCrossSLS2,
    limitingCrossULS,
  } = params;

  // Find governing (minimum) limiting lengths
  const governingMain = Math.min(limitingMainSLS, limitingMainSLS2, limitingMainULS);
  const governingCross = Math.min(limitingCrossSLS, limitingCrossSLS2, limitingCrossULS);

  const mainPass = maxMainTee <= governingMain;
  const crossPass = maxCrossTee <= governingCross;
  
  const mainSeismicJoint = maxMainTee <= governingMain * 2;
  const crossSeismicJoint = maxCrossTee <= governingCross * 2;

  let recommendation = '';
  let requiresBackBrace = false;

  if (mainPass && crossPass) {
    recommendation = 'An edge restrained design may be used. Alternatively, a rigid hanger/back braced design may be explored.';
  } else if (mainSeismicJoint && crossPass) {
    recommendation = 'The main tee length is exceeded, a seismic joint may be used to break the main tees and allow an edge restrained design. Alternatively, a rigid hanger/back braced design may be explored.';
  } else if (mainPass && crossSeismicJoint) {
    recommendation = 'The cross tee length is exceeded, a seismic joint must be used to break the cross tees and allow an edge restrained design. Alternatively, a rigid hanger/back braced design may be explored.';
  } else if (mainSeismicJoint && crossSeismicJoint) {
    recommendation = 'The main tee and cross tee lengths are both exceeded, seismic joints must be used to break the main tees and cross tees to allow an edge restrained design. Alternatively, a rigid hanger/back braced design may be explored.';
  } else {
    recommendation = 'An edge restrained design is not suitable and a rigid hanger or back braced design must be explored.';
    requiresBackBrace = true;
  }

  return {
    mainPass,
    crossPass,
    mainSeismicJoint,
    crossSeismicJoint,
    governingMain,
    governingCross,
    recommendation,
    requiresBackBrace,
  };
}

// ============================================================================
// LOAD COMBINATION CALCULATIONS
// ============================================================================

/**
 * Calculate load combination for back brace design
 * Formula: 1.4 × DL + 1.7 × LL
 * 
 * @param {number} deadLoad - Dead load (kg/m²)
 * @param {number} liveLoad - Live load (kg/m²)
 * @returns {number} Combined load (kg/m²)
 */
export function calculateLoadCombination(deadLoad, liveLoad) {
  return 1.4 * deadLoad + 1.7 * liveLoad;
}

/**
 * Calculate dead load per hanger
 * @param {number} hangerSpacing - Hanger spacing (m)
 * @param {number} loadCombination - Load combination (kg/m²)
 * @param {number} minLoad - Minimum load (kg)
 * @returns {number} Dead load per hanger (kg)
 */
export function calculateDeadLoadPerHanger(hangerSpacing, loadCombination, minLoad = 50) {
  const load = 1.2 * hangerSpacing * loadCombination;
  return Math.max(load, minLoad);
}

/**
 * Calculate seismic moment per hanger
 * @param {number} hangerSpacing - Hanger spacing (m)
 * @param {number} seismicForce - Seismic force (kgf/m²)
 * @param {number} pendantHeight - Pendant height (m)
 * @returns {number} Seismic moment (kgf·m)
 */
export function calculateSeismicMoment(hangerSpacing, seismicForce, pendantHeight) {
  return 1.2 * hangerSpacing * seismicForce * pendantHeight;
}

/**
 * Calculate design check value
 * Formula: (DL / 412) + (SM / 4.5)
 * Must be ≤ 1.0 to pass
 * 
 * @param {number} deadLoadPerHanger - Dead load per hanger (kg)
 * @param {number} seismicMoment - Seismic moment (kgf·m)
 * @returns {number} Design check value
 */
export function calculateDesignCheck(deadLoadPerHanger, seismicMoment) {
  return (deadLoadPerHanger / 412) + (seismicMoment / 4.5);
}
