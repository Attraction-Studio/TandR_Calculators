/**
 * Baffle Ceiling Seismic Calculator Data
 * Constants, options, and helper functions for the baffle ceiling calculator
 * Ported from legacy reference HTML
 */

// Zone factors - same as other calculators
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

// Importance levels
export const IMPORTANCE_LEVELS = [
  { value: 1, label: "Importance Level 1" },
  { value: 2, label: "Importance Level 2" },
  { value: 3, label: "Importance Level 3" },
];

// Height factor options (ceiling connection height above ground floor)
export const HEIGHT_FACTOR_OPTIONS = [
  { value: 3, label: "0 - 3m" },
  { value: 4, label: "3.1 - 6m" },
  { value: 5, label: "6.1 - 9m" },
  { value: 6, label: "9.1m +" },
];

// Baffle profile options
export const BAFFLE_PROFILE_OPTIONS = [
  { value: 1.3, label: "100mm by 30mm (Gridlux compatible)" },
  { value: 1.7, label: "135mm by 30mm", note: 1 },
  { value: 1.8, label: "150mm by 25mm", note: 2 },
  { value: 2.4, label: "150mm by 30mm (Gridlux compatible)" },
];

// Plenum height options with 45-degree stud length and brace arm type
export const PLENUM_HEIGHT_OPTIONS = [
  { value: 0.2, label: "0.20", d45: 0.28, braceType: 1 },
  { value: 0.4, label: "0.40", d45: 0.57, braceType: 1 },
  { value: 0.6, label: "0.60", d45: 0.85, braceType: 1 },
  { value: 0.8, label: "0.80", d45: 1.13, braceType: 1 },
  { value: 1.0, label: "1.00", d45: 1.41, braceType: 1 },
  { value: 1.2, label: "1.20", d45: 1.7, braceType: 1 },
  { value: 1.4, label: "1.40", d45: 1.98, braceType: 1 },
  { value: 1.6, label: "1.60", d45: 2.26, braceType: 2 },
  { value: 1.8, label: "1.80", d45: 2.55, braceType: 2 },
  { value: 2.0, label: "2.00", d45: 2.83, braceType: 3 },
  { value: 2.2, label: "2.20", d45: 3.11, braceType: 3 },
  { value: 2.4, label: "2.40", d45: 3.39, braceType: 3 },
  { value: 2.6, label: "2.60", d45: 3.68, braceType: 4 },
  { value: 2.8, label: "2.80", d45: 3.96, braceType: 5 },
];

// Brace arm type descriptions
export const BRACE_ARM_TYPES = {
  1: "64x35x0.55mm or 92x35x0.55mm Steel Stud",
  2: "92x35x0.75mm Steel Stud",
  3: "Boxed 64x35x0.75mm Steel Stud or Boxed 92x35x0.75mm Steel Stud",
  4: "Boxed 92x35x0.75mm Steel Stud",
  5: "Boxed 92x35x0.75mm Steel Stud",
};

// Constants
export const CONSTANTS = {
  STRONGBACK_MASS: 1.27, // 41x21x1.2 PST Channel kg/m²
  STRONGBACK_SPACING: 1.2, // m (hanger rod spacing)
  STRONGBACK_BRACE_SPACING: 2.4, // m (used for max brace spacing calculation)
  STRATOBRACE_CAPACITY: 250, // kg
  MOTION_LIMITING_FACTOR: 0.7,
  MIN_BAFFLE_SPACING: 0.1, // m
  MAX_BAFFLE_SPACING: 1.0, // m
  DEFAULT_LUMINARIES: 0.2, // kg/m²
  DEFAULT_SERVICES: 3, // kg/m²
  DEFAULT_BAFFLE_SPACING: 0.1, // m
  SLS_DRIFT_FACTOR: 0.0075,
  ULS_DRIFT_FACTOR: 0.025,
};

// Return period factors based on importance level
export const RETURN_PERIOD_FACTORS = {
  1: { sls: 0.3325, sls2: 0.3325, uls: 0.3325 },
  2: { sls: 0.3325, sls2: 0.665, uls: 1.33 },
  3: { sls: 0.3325, sls2: 0.9975, uls: 1.729 },
};

// Part factors
export const PART_FACTORS = {
  sls: 1,
  uls: 0.55,
};

/**
 * Get return period factors based on importance level
 */
export function getReturnPeriodFactors(importanceLevel) {
  return RETURN_PERIOD_FACTORS[importanceLevel] || RETURN_PERIOD_FACTORS[2];
}

/**
 * Calculate baffle mass from profile mass and spacing
 * @param {number} profileMass - Profile mass in kg/m
 * @param {number} baffleSpacing - Baffle spacing in meters
 * @returns {number} Baffle mass in kg/m²
 */
export function calculateBaffleMass(profileMass, baffleSpacing) {
  if (baffleSpacing <= 0) return 0;
  return profileMass / baffleSpacing;
}

/**
 * Calculate seismic weight for baffle ceiling
 * @param {object} components - Weight components
 * @returns {number} Total seismic weight in kg/m²
 */
export function calculateSeismicWeight(components) {
  const {
    baffleMass = 0,
    strongbackMass = CONSTANTS.STRONGBACK_MASS,
    luminaries = 0,
    services = 0,
    other = 0,
  } = components;

  return baffleMass + strongbackMass + luminaries + services + other;
}

/**
 * Calculate seismic force
 * @param {object} params - Calculation parameters
 * @returns {number} Seismic force in kg/m²
 */
export function calculateSeismicForce(params) {
  const { zoneFactor, returnFactor, heightFactor, partFactor, seismicWeight } =
    params;

  return zoneFactor * returnFactor * heightFactor * partFactor * seismicWeight;
}

/**
 * Calculate all seismic forces (SLS, SLS2, ULS)
 * @param {object} params - Calculation parameters
 * @returns {object} Object with sls, sls2, and uls forces
 */
export function calculateAllSeismicForces(params) {
  const { zoneFactor, importanceLevel, heightFactor, seismicWeight } = params;

  const returnFactors = getReturnPeriodFactors(importanceLevel);

  const sls = calculateSeismicForce({
    zoneFactor,
    returnFactor: returnFactors.sls,
    heightFactor,
    partFactor: PART_FACTORS.sls,
    seismicWeight,
  });

  const sls2 = calculateSeismicForce({
    zoneFactor,
    returnFactor: returnFactors.sls2,
    heightFactor,
    partFactor: PART_FACTORS.sls,
    seismicWeight,
  });

  const uls = calculateSeismicForce({
    zoneFactor,
    returnFactor: returnFactors.uls,
    heightFactor,
    partFactor: PART_FACTORS.uls,
    seismicWeight,
  });

  return {
    sls: Number(sls.toFixed(1)),
    sls2: Number(sls2.toFixed(1)),
    uls: Number(uls.toFixed(1)),
  };
}

/**
 * Calculate area per brace
 * @param {number} braceCapacity - Brace capacity in kg
 * @param {number} seismicForce - Governing seismic force in kg/m²
 * @returns {number} Area per brace in m²
 */
export function calculateAreaPerBrace(braceCapacity, seismicForce) {
  if (seismicForce <= 0) return 0;
  return (braceCapacity * CONSTANTS.MOTION_LIMITING_FACTOR) / seismicForce;
}

/**
 * Calculate minimum number of braces
 * @param {number} ceilingArea - Total ceiling area in m²
 * @param {number} areaPerBrace - Area per brace in m²
 * @returns {number} Minimum number of braces (rounded up)
 */
export function calculateMinimumBraces(ceilingArea, areaPerBrace) {
  if (areaPerBrace <= 0) return 0;
  return Math.ceil(ceilingArea / areaPerBrace);
}

/**
 * Calculate maximum brace spacing along strongback
 * @param {number} areaPerBrace - Area per brace in m²
 * @returns {number} Maximum brace spacing in m
 */
export function calculateBraceSpacing(areaPerBrace) {
  return areaPerBrace / CONSTANTS.STRONGBACK_BRACE_SPACING;
}

/**
 * Calculate seismic clearance
 * @param {number} plenumHeight - Plenum height in meters
 * @param {string} limitState - Limit state type (SLS or ULS)
 * @returns {number} Required clearance in mm
 */
export function calculateSeismicClearance(plenumHeight, limitState) {
  const driftFactor =
    limitState === "ULS"
      ? CONSTANTS.ULS_DRIFT_FACTOR
      : CONSTANTS.SLS_DRIFT_FACTOR;
  return plenumHeight * driftFactor * 1000; // Convert to mm
}

/**
 * Get brace arm type description based on plenum height option
 * @param {number} braceType - Brace type number (1-5)
 * @returns {string} Brace arm description
 */
export function getBraceArmType(braceType) {
  return BRACE_ARM_TYPES[braceType] || BRACE_ARM_TYPES[1];
}

/**
 * Get plenum height option details
 * @param {number} plenumHeight - Plenum height value
 * @returns {object|null} Plenum height option details
 */
export function getPlenumHeightDetails(plenumHeight) {
  return (
    PLENUM_HEIGHT_OPTIONS.find((opt) => opt.value === plenumHeight) || null
  );
}

/**
 * Validate baffle spacing
 * @param {number} spacing - Baffle spacing in meters
 * @returns {boolean} True if valid
 */
export function validateBaffleSpacing(spacing) {
  return (
    spacing >= CONSTANTS.MIN_BAFFLE_SPACING &&
    spacing <= CONSTANTS.MAX_BAFFLE_SPACING
  );
}
