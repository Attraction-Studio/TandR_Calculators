/**
 * Plasterboard Ceiling Seismic Calculator - Data Structures
 * All dropdown options, lookup tables, and constants
 * Based on legacy seismic-calculator-suspended-plasterboard-grid-system.html
 */

// ============================================================================
// SEISMIC ZONE FACTORS (Same as suspended ceiling)
// ============================================================================

export const ZONE_FACTORS = [
  { value: 0.1, label: "Kaitaia" },
  { value: 0.1, label: "Paihia/Russell" },
  { value: 0.1, label: "Kaikohe" },
  { value: 0.1, label: "Whangarei" },
  { value: 0.1, label: "Dargaville" },
  { value: 0.13, label: "Warkworth" },
  { value: 0.13, label: "Auckland" },
  { value: 0.13, label: "Manukau City" },
  { value: 0.13, label: "Waiuku" },
  { value: 0.13, label: "Pukekohe" },
  { value: 0.16, label: "Thames" },
  { value: 0.18, label: "Paeroa" },
  { value: 0.18, label: "Waihi" },
  { value: 0.15, label: "Huntly" },
  { value: 0.15, label: "Ngaruawahia" },
  { value: 0.18, label: "Morrinsville" },
  { value: 0.18, label: "Te Aroha" },
  { value: 0.2, label: "Tauranga" },
  { value: 0.2, label: "Mount Maunganui" },
  { value: 0.16, label: "Hamilton" },
  { value: 0.18, label: "Cambridge" },
  { value: 0.17, label: "Te Awamutu" },
  { value: 0.19, label: "Matamata" },
  { value: 0.22, label: "Te Puke" },
  { value: 0.21, label: "Putaruru" },
  { value: 0.21, label: "Tokoroa" },
  { value: 0.17, label: "Otorohanga" },
  { value: 0.18, label: "Te Kuiti" },
  { value: 0.21, label: "Mangakino" },
  { value: 0.24, label: "Rotorua" },
  { value: 0.29, label: "Kawerau" },
  { value: 0.3, label: "Whakatane" },
  { value: 0.3, label: "Opotiki" },
  { value: 0.33, label: "Ruatoria" },
  { value: 0.3, label: "Murupara" },
  { value: 0.28, label: "Taupo" },
  { value: 0.21, label: "Taumarunui" },
  { value: 0.27, label: "Turangi" },
  { value: 0.36, label: "Gisborne" },
  { value: 0.37, label: "Wairoa" },
  { value: 0.18, label: "Waitara" },
  { value: 0.18, label: "New Plymouth" },
  { value: 0.18, label: "Inglewood" },
  { value: 0.18, label: "Stratford" },
  { value: 0.18, label: "Opunake" },
  { value: 0.18, label: "Hawera" },
  { value: 0.19, label: "Patea" },
  { value: 0.26, label: "Raetihi" },
  { value: 0.27, label: "Ohakune" },
  { value: 0.29, label: "Waiouru" },
  { value: 0.38, label: "Napier" },
  { value: 0.39, label: "Hastings" },
  { value: 0.25, label: "Wanganui" },
  { value: 0.41, label: "Waipawa" },
  { value: 0.41, label: "Waipukurau" },
  { value: 0.33, label: "Taihape" },
  { value: 0.3, label: "Marton" },
  { value: 0.31, label: "Bulls" },
  { value: 0.37, label: "Feilding" },
  { value: 0.38, label: "Palmerston North" },
  { value: 0.42, label: "Dannevirke" },
  { value: 0.41, label: "Woodville" },
  { value: 0.42, label: "Pahiatua" },
  { value: 0.36, label: "Foxton/Foxton Beach" },
  { value: 0.4, label: "Levin" },
  { value: 0.4, label: "Otaki" },
  { value: 0.4, label: "Waikanae" },
  { value: 0.4, label: "Paraparaumu" },
  { value: 0.42, label: "Masterton" },
  { value: 0.4, label: "Porirua" },
  { value: 0.4, label: "Wellington CBD (North of Basin Reserve)" },
  { value: 0.4, label: "Wellington" },
  { value: 0.4, label: "Hutt Valley (South of Taita Gorge)" },
  { value: 0.42, label: "Upper Hutt" },
  { value: 0.4, label: "Eastborne - Point Howard" },
  { value: 0.4, label: "Wainuiomata" },
  { value: 0.23, label: "Takaka" },
  { value: 0.26, label: "Motueka" },
  { value: 0.27, label: "Nelson" },
  { value: 0.3, label: "Picton" },
  { value: 0.33, label: "Blenheim" },
  { value: 0.36, label: "St Arnaud" },
  { value: 0.3, label: "Westport" },
  { value: 0.37, label: "Reefton" },
  { value: 0.34, label: "Murchison" },
  { value: 0.45, label: "Springs Junction" },
  { value: 0.55, label: "Hanmer Springs" },
  { value: 0.4, label: "Seddon" },
  { value: 0.4, label: "Ward" },
  { value: 0.4, label: "Cheviot" },
  { value: 0.37, label: "Greymouth" },
  { value: 0.42, label: "Kaikoura" },
  { value: 0.46, label: "Harihari" },
  { value: 0.45, label: "Hokitika" },
  { value: 0.44, label: "Fox Glacier" },
  { value: 0.44, label: "Franz Josef" },
  { value: 0.6, label: "Otira" },
  { value: 0.6, label: "Arthurs Pass" },
  { value: 0.33, label: "Rangiora" },
  { value: 0.3, label: "Darfield" },
  { value: 0.3, label: "Akaroa" },
  { value: 0.3, label: "Christchurch" },
  { value: 0.19, label: "Geraldine" },
  { value: 0.2, label: "Ashburton" },
  { value: 0.24, label: "Fairlie" },
  { value: 0.17, label: "Temuka" },
  { value: 0.15, label: "Timaru" },
  { value: 0.38, label: "Mt Cook" },
  { value: 0.27, label: "Twizel" },
  { value: 0.14, label: "Waimate" },
  { value: 0.24, label: "Cromwell" },
  { value: 0.3, label: "Wanaka" },
  { value: 0.3, label: "Arrowtown" },
  { value: 0.21, label: "Alexandra" },
  { value: 0.32, label: "Queenstown" },
  { value: 0.54, label: "Milford Sound" },
  { value: 0.13, label: "Palmerston" },
  { value: 0.13, label: "Oamaru" },
  { value: 0.13, label: "Dunedin" },
  { value: 0.13, label: "Mosgiel" },
  { value: 0.2, label: "Riverton" },
  { value: 0.36, label: "Te Anau" },
  { value: 0.18, label: "Gore" },
  { value: 0.2, label: "Winton" },
  { value: 0.13, label: "Balclutha" },
  { value: 0.17, label: "Mataura" },
  { value: 0.15, label: "Bluff" },
  { value: 0.17, label: "Invercargill" },
  { value: 0.14, label: "Oban" },
];

// ============================================================================
// IMPORTANCE LEVELS
// ============================================================================

export const IMPORTANCE_LEVELS = [
  {
    value: 1,
    label: "Importance Level 1",
    description:
      "Structures presenting a low degree of hazard to life and other property",
    examples:
      "Structures with total floor area < 30m², farm buildings, isolated structures, fences, masts, walls",
    disabled: false,
  },
  {
    value: 2,
    label: "Importance Level 2",
    description:
      "Normal structures and structures not in other importance levels",
    examples: "Typical residential, commercial and industrial buildings",
    disabled: false,
  },
  {
    value: 3,
    label: "Importance Level 3",
    description:
      "Structures that may contain people in crowds or contents of high value",
    examples:
      "Schools, hospitals, public assembly buildings, emergency facilities",
    disabled: false,
  },
];

// ============================================================================
// GRID MASS OPTIONS - Plasterboard specific
// Legacy: gridmass calculation based on Main Tee (gridmassM) and Cross Tee (gridmassC)
// ============================================================================

export const MAIN_TEE_SPACING_OPTIONS = [
  { value: 1200, label: "1200" },
  { value: 600, label: "600" },
];

export const CROSS_TEE_SPACING_OPTIONS = [
  { value: 600, label: "600" },
  { value: 500, label: "500" },
  { value: 400, label: "400" },
];

/**
 * Calculate grid mass based on main and cross tee spacing
 * Legacy JS:
 * if (gridmassM==1200) {
 *   if (gridmassC==600) { gridmass=1.03; ct=0; }
 *   else if (gridmassC==500) { gridmass=1.17; ct=0; }
 *   else  { gridmass=1.38; ct=1; }
 * } else {
 *   if (gridmassC==600) { gridmass=1.37; ct=0; }
 *   else if (gridmassC==500) { gridmass=1.51; ct=0; }
 *   else  { gridmass=1.71; ct=1; }
 * }
 */
export function calculateGridMass(mainTeeSpacing, crossTeeSpacing) {
  if (mainTeeSpacing === 1200) {
    if (crossTeeSpacing === 600)
      return { gridMass: 1.03, requiresCT400: false };
    if (crossTeeSpacing === 500)
      return { gridMass: 1.17, requiresCT400: false };
    return { gridMass: 1.38, requiresCT400: true }; // 400mm
  } else {
    // 600mm main tee
    if (crossTeeSpacing === 600)
      return { gridMass: 1.37, requiresCT400: false };
    if (crossTeeSpacing === 500)
      return { gridMass: 1.51, requiresCT400: false };
    return { gridMass: 1.71, requiresCT400: true }; // 400mm
  }
}

// ============================================================================
// LINING (PLASTERBOARD) WEIGHT OPTIONS
// Legacy: Common linings table with weights
// ============================================================================

export const LINING_WEIGHT_OPTIONS = [
  { value: 9, label: "13mm Standard GIB", mass: 9 },
  { value: 12.5, label: "13mm GIB Noiseline", mass: 12.5 },
  { value: 12.5, label: "13mm GIB Braceline", mass: 12.5 },
  { value: 11, label: "13mm GIB Fyreline", mass: 11 },
  { value: 11, label: "13mm Quietline", mass: 11 },
  { value: 11, label: "13mm GIB Aqualine", mass: 11 },
  { value: 15.3, label: "16mm GIB Fyreline", mass: 15.3 },
  { value: 18, label: "2 layers of 13mm Standard", mass: 18 },
  { value: 25, label: "2 layers of 13mm Noiseline", mass: 25 },
  { value: 22, label: "2 layers of 13mm Fyreline", mass: 22 },
];

// ============================================================================
// HEIGHT FACTOR OPTIONS
// Legacy: floorweight select options
// ============================================================================

export const HEIGHT_FACTOR_OPTIONS = [
  { value: 3, label: "0 - 3m", factor: 3 },
  { value: 4, label: "3.1 - 6m", factor: 4 },
  { value: 5, label: "6.1 - 9m", factor: 5 },
  { value: 6, label: "9.1m +", factor: 6 },
];

// ============================================================================
// WALL SUBSTRATE FASTENER SPACING OPTIONS
// Legacy: wsfs select - Wall Substrate Fastener Spacing
// ============================================================================

export const WALL_FASTENER_SPACING_OPTIONS = [
  { value: 0.2, label: "200" },
  { value: 0.3, label: "300" },
  { value: 0.4, label: "400" },
  { value: 0.6, label: "600" },
  { value: 1.2, label: "1200" },
];

// ============================================================================
// PLASTERBOARD FIXING SPACING OPTIONS
// Legacy: pfs select - Plasterboard fixing spacing around sheet perimeter
// ============================================================================

export const PLASTERBOARD_FIXING_SPACING_OPTIONS = [
  { value: 202, label: "300", crossTeeCapacity: 181 },
  { value: 121, label: "600", crossTeeCapacity: 101 },
];

// ============================================================================
// BACK BRACE OPTIONS - Plasterboard specific
// Legacy: Type A and Type B braces
// ============================================================================

export const BRACE_TYPE_OPTIONS = [
  { value: "A", label: "Type A Brace" },
  { value: "B", label: "Type B Brace (StratoBrace)" },
];

/**
 * Get brace capacity and requirement based on type and plenum height
 * Legacy JS calculation for Type A and Type B braces
 */
export function getBraceCapacity(braceType, plenumHeight) {
  const breq1 = "64mm 0.5 BMT";
  const breq2 = "92mm 0.55 BMT";
  const breq3 = "64mm 0.75 BMT";

  if (braceType === "A") {
    if (plenumHeight <= 250) return { capacity: 290, requirement: breq1 };
    if (plenumHeight <= 500) return { capacity: 270, requirement: breq1 };
    if (plenumHeight <= 750) return { capacity: 250, requirement: breq1 };
    if (plenumHeight <= 1000) return { capacity: 230, requirement: breq1 };
    if (plenumHeight <= 1250) return { capacity: 215, requirement: breq2 };
    if (plenumHeight <= 1500) return { capacity: 195, requirement: breq2 };
    if (plenumHeight <= 1750) return { capacity: 155, requirement: breq2 };
    if (plenumHeight <= 2000) return { capacity: 130, requirement: breq2 };
    if (plenumHeight <= 2250) return { capacity: 125, requirement: breq3 };
    if (plenumHeight <= 2500) return { capacity: 115, requirement: breq3 };
    if (plenumHeight <= 2750) return { capacity: 105, requirement: breq3 };
    return { capacity: 90, requirement: breq3 };
  } else {
    // Type B (StratoBrace)
    const capacity = 210;
    let requirement;
    if (plenumHeight <= 600) requirement = "64mm 0.5 BMT or 92mm 0.55 BMT";
    else if (plenumHeight <= 800)
      requirement = "64mm 0.75 BMT or 92mm 0.55 BMT";
    else if (plenumHeight <= 1000)
      requirement = "64mm 0.75 BMT or 92mm 0.75 BMT";
    else if (plenumHeight <= 1400)
      requirement = "Boxed 64mm 0.75 BMT or 92mm 0.55 BMT";
    else if (plenumHeight <= 1800)
      requirement = "Boxed 64mm 0.75 BMT or 92mm 0.75 BMT";
    else if (plenumHeight <= 2400)
      requirement = "Boxed 64mm 1.15 BMT or 92mm 1.15 BMT";
    else requirement = "Boxed 92mm 1.15 BMT";

    return { capacity, requirement };
  }
}

// ============================================================================
// RETURN PERIOD FACTORS - Plasterboard specific
// Legacy JS:
// if (insttype==2) { returnfactorSLS2 = 0.665; returnfactorULS = 1.33; }
// else if (insttype==3) { returnfactorSLS2 = 0.9975; returnfactorULS = 1.729; }
// ============================================================================

export const RETURN_PERIOD_FACTORS = {
  SLS: 0.3325,
  SLS2: {
    IL1: 0.3325,
    IL2: 0.665,
    IL3: 0.9975,
  },
  ULS: {
    IL1: 0.3325,
    IL2: 1.33,
    IL3: 1.729,
  },
};

/**
 * Get return period factor
 */
export function getReturnPeriodFactor(limitState, importanceLevel) {
  if (limitState === "SLS") {
    return RETURN_PERIOD_FACTORS.SLS;
  }
  if (limitState === "SLS2") {
    return (
      RETURN_PERIOD_FACTORS.SLS2[`IL${importanceLevel}`] ||
      RETURN_PERIOD_FACTORS.SLS
    );
  }
  if (limitState === "ULS") {
    return (
      RETURN_PERIOD_FACTORS.ULS[`IL${importanceLevel}`] ||
      RETURN_PERIOD_FACTORS.SLS
    );
  }
  return RETURN_PERIOD_FACTORS.SLS;
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const CONSTANTS = {
  MIN_DEAD_LOAD: 3, // kg/m² - Design Distributed Load minimum
  DEFAULT_DEAD_LOAD: 3, // kg/m²
  MAX_RETURN_FACTOR: 0.7, // Maximum zone × return factor
  PART_FACTOR_SLS: 1, // partSLS always 1
  PART_FACTOR_ULS: 0.55, // partULS for plasterboard
  EDGE_CONNECTION_CAPACITY: 70, // kgf/m for edge connection calculation
  MAX_TEE_LENGTH: 12, // meters - max allowable tee length due to control joints
  MOTION_LIMITING_FACTOR: 0.8, // For area per brace calculation
  MIN_BRACES: 2, // Minimum number of braces
  SEISMIC_CLEARANCE_SLS: 0.0075, // SLS clearance factor
  SEISMIC_CLEARANCE_ULS: 0.025, // ULS clearance factor
  PERIMETER_CLEARANCE: 10, // mm - for perimeter fixing
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get floor factor (height factor) value
 */
export function getFloorFactor(heightValue) {
  const option = HEIGHT_FACTOR_OPTIONS.find((opt) => opt.value === heightValue);
  return option ? option.factor : 3;
}

/**
 * Calculate seismic forces for plasterboard ceiling
 * Legacy JS formulas from reference HTML
 */
export function calculatePlasterboardSeismicForces(params) {
  const { zoneFactor, importanceLevel, floorFactor, seismicWeight } = params;

  const returnfactorSLS = RETURN_PERIOD_FACTORS.SLS;
  const returnfactorSLS2 = getReturnPeriodFactor("SLS2", importanceLevel);
  const returnfactorULS = getReturnPeriodFactor("ULS", importanceLevel);

  const partSLS = CONSTANTS.PART_FACTOR_SLS;
  const partULS = CONSTANTS.PART_FACTOR_ULS;

  // Legacy: total2 = (zonefactor * returnfactorSLS * floorfactor * partSLS * total1).toFixed(1)
  const total2 =
    zoneFactor * returnfactorSLS * floorFactor * partSLS * seismicWeight;
  const total2a =
    zoneFactor * returnfactorSLS2 * floorFactor * partSLS * seismicWeight;
  const total2b =
    zoneFactor * returnfactorULS * floorFactor * partULS * seismicWeight;

  return {
    sls: Number(total2.toFixed(1)),
    sls2: Number(total2a.toFixed(1)),
    uls: Number(total2b.toFixed(1)),
  };
}

/**
 * Calculate maximum tee length based on edge connection capacity
 * Legacy: mlmt = (70/wsfs/total2)
 * @param {number} wallFastenerSpacing - Wall substrate fastener spacing (m)
 * @param {number} seismicForce - Seismic force (kg/m²)
 */
export function calculateEdgeConnectionTeeLength(
  wallFastenerSpacing,
  seismicForce
) {
  if (seismicForce === 0 || wallFastenerSpacing === 0) return 0;
  return (
    CONSTANTS.EDGE_CONNECTION_CAPACITY / wallFastenerSpacing / seismicForce
  );
}

/**
 * Calculate maximum tee length based on diaphragm capacity
 * Legacy: pf1 = (pfs/total2)
 * @param {number} diaphragmCapacity - Plasterboard diaphragm capacity
 * @param {number} seismicForce - Seismic force (kg/m²)
 */
export function calculateDiaphragmTeeLength(diaphragmCapacity, seismicForce) {
  if (seismicForce === 0) return 0;
  return diaphragmCapacity / seismicForce;
}

/**
 * Calculate final maximum allowable tee length
 * Legacy: mal = Math.min(mlmt, pf, 12)
 */
export function calculateMaxAllowableTeeLength(edgeLength, diaphragmLength) {
  return Math.min(edgeLength, diaphragmLength, CONSTANTS.MAX_TEE_LENGTH);
}

/**
 * Calculate area per brace
 * Legacy: apb = (0.8*bcap/high1)
 * @param {number} braceCapacity - Brace capacity (kg)
 * @param {number} seismicForce - Governing seismic force (kg/m²)
 */
export function calculateAreaPerBrace(braceCapacity, seismicForce) {
  if (seismicForce === 0) return 0;
  return (CONSTANTS.MOTION_LIMITING_FACTOR * braceCapacity) / seismicForce;
}

/**
 * Calculate minimum number of braces
 * Legacy: minbraces = Math.ceil(carea/apb); if (minbraces<2) { minbraces=2; }
 */
export function calculateMinBraces(ceilingArea, areaPerBrace) {
  if (areaPerBrace === 0) return CONSTANTS.MIN_BRACES;
  const braces = Math.ceil(ceilingArea / areaPerBrace);
  return Math.max(braces, CONSTANTS.MIN_BRACES);
}

/**
 * Calculate seismic clearance
 * Legacy:
 * rclearance = (pheight*0.0075)
 * rclearance2 = (pheight*0.025)
 */
export function calculateSeismicClearance(plenumHeight) {
  return {
    sls: Number((plenumHeight * CONSTANTS.SEISMIC_CLEARANCE_SLS).toFixed(1)),
    uls: Number((plenumHeight * CONSTANTS.SEISMIC_CLEARANCE_ULS).toFixed(1)),
  };
}

// ============================================================================
// YES/NO OPTIONS (Reusable)
// ============================================================================

export const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];
