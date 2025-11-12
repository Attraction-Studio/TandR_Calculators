/**
 * Suspended Ceiling Seismic Calculator - Data Structures
 * All dropdown options, lookup tables, and constants
 */

// ============================================================================
// SEISMIC ZONE FACTORS
// ============================================================================

export const ZONE_FACTORS = [
  { value: 0.1, label: 'Kaitaia' },
  { value: 0.1, label: 'Paihia/Russell' },
  { value: 0.1, label: 'Kaikohe' },
  { value: 0.1, label: 'Whangarei' },
  { value: 0.1, label: 'Dargaville' },
  { value: 0.13, label: 'Warkworth' },
  { value: 0.13, label: 'Auckland' },
  { value: 0.13, label: 'Manukau City' },
  { value: 0.13, label: 'Waiuku' },
  { value: 0.13, label: 'Pukekohe' },
  { value: 0.16, label: 'Thames' },
  { value: 0.18, label: 'Paeroa' },
  { value: 0.18, label: 'Waihi' },
  { value: 0.15, label: 'Huntly' },
  { value: 0.15, label: 'Ngaruawahia' },
  { value: 0.18, label: 'Morrinsville' },
  { value: 0.18, label: 'Te Aroha' },
  { value: 0.2, label: 'Tauranga' },
  { value: 0.2, label: 'Mount Maunganui' },
  { value: 0.16, label: 'Hamilton' },
  { value: 0.18, label: 'Cambridge' },
  { value: 0.17, label: 'Te Awamutu' },
  { value: 0.19, label: 'Matamata' },
  { value: 0.22, label: 'Te Puke' },
  { value: 0.21, label: 'Putaruru' },
  { value: 0.21, label: 'Tokoroa' },
  { value: 0.17, label: 'Otorohanga' },
  { value: 0.18, label: 'Te Kuiti' },
  { value: 0.21, label: 'Mangakino' },
  { value: 0.24, label: 'Rotorua' },
  { value: 0.29, label: 'Kawerau' },
  { value: 0.3, label: 'Whakatane' },
  { value: 0.3, label: 'Opotiki' },
  { value: 0.33, label: 'Ruatoria' },
  { value: 0.3, label: 'Murupara' },
  { value: 0.28, label: 'Taupo' },
  { value: 0.21, label: 'Taumarunui' },
  { value: 0.27, label: 'Turangi' },
  { value: 0.36, label: 'Gisborne' },
  { value: 0.37, label: 'Wairoa' },
  { value: 0.18, label: 'Waitara' },
  { value: 0.18, label: 'New Plymouth' },
  { value: 0.18, label: 'Inglewood' },
  { value: 0.18, label: 'Stratford' },
  { value: 0.18, label: 'Opunake' },
  { value: 0.18, label: 'Hawera' },
  { value: 0.19, label: 'Patea' },
  { value: 0.26, label: 'Raetihi' },
  { value: 0.27, label: 'Ohakune' },
  { value: 0.29, label: 'Waiouru' },
  { value: 0.38, label: 'Napier' },
  { value: 0.39, label: 'Hastings' },
  { value: 0.25, label: 'Wanganui' },
  { value: 0.41, label: 'Waipawa' },
  { value: 0.41, label: 'Waipukurau' },
  { value: 0.33, label: 'Taihape' },
  { value: 0.3, label: 'Marton' },
  { value: 0.31, label: 'Bulls' },
  { value: 0.37, label: 'Feilding' },
  { value: 0.38, label: 'Palmerston North' },
  { value: 0.42, label: 'Dannevirke' },
  { value: 0.41, label: 'Woodville' },
  { value: 0.42, label: 'Pahiatua' },
  { value: 0.36, label: 'Foxton/Foxton Beach' },
  { value: 0.4, label: 'Levin' },
  { value: 0.4, label: 'Otaki' },
  { value: 0.4, label: 'Waikanae' },
  { value: 0.4, label: 'Paraparaumu' },
  { value: 0.42, label: 'Masterton' },
  { value: 0.4, label: 'Porirua' },
  { value: 0.4, label: 'Wellington CBD (North of Basin Reserve)' },
  { value: 0.4, label: 'Wellington' },
  { value: 0.4, label: 'Hutt Valley (South of Taita Gorge)' },
  { value: 0.42, label: 'Upper Hutt' },
  { value: 0.4, label: 'Eastborne - Point Howard' },
  { value: 0.4, label: 'Wainuiomata' },
  { value: 0.23, label: 'Takaka' },
  { value: 0.26, label: 'Motueka' },
  { value: 0.27, label: 'Nelson' },
  { value: 0.3, label: 'Picton' },
  { value: 0.33, label: 'Blenheim' },
  { value: 0.36, label: 'St Arnaud' },
  { value: 0.3, label: 'Westport' },
  { value: 0.37, label: 'Reefton' },
  { value: 0.34, label: 'Murchison' },
  { value: 0.45, label: 'Springs Junction' },
  { value: 0.55, label: 'Hanmer Springs' },
  { value: 0.4, label: 'Seddon' },
  { value: 0.4, label: 'Ward' },
  { value: 0.4, label: 'Cheviot' },
  { value: 0.37, label: 'Greymouth' },
  { value: 0.42, label: 'Kaikoura' },
  { value: 0.46, label: 'Harihari' },
  { value: 0.45, label: 'Hokitika' },
  { value: 0.44, label: 'Fox Glacier' },
  { value: 0.44, label: 'Franz Josef' },
  { value: 0.6, label: 'Otira' },
  { value: 0.6, label: 'Arthurs Pass' },
  { value: 0.33, label: 'Rangiora' },
  { value: 0.3, label: 'Darfield' },
  { value: 0.3, label: 'Akaroa' },
  { value: 0.3, label: 'Christchurch' },
  { value: 0.19, label: 'Geraldine' },
  { value: 0.2, label: 'Ashburton' },
  { value: 0.24, label: 'Fairlie' },
  { value: 0.17, label: 'Temuka' },
  { value: 0.15, label: 'Timaru' },
  { value: 0.38, label: 'Mt Cook' },
  { value: 0.27, label: 'Twizel' },
  { value: 0.14, label: 'Waimate' },
  { value: 0.24, label: 'Cromwell' },
  { value: 0.3, label: 'Wanaka' },
  { value: 0.3, label: 'Arrowtown' },
  { value: 0.21, label: 'Alexandra' },
  { value: 0.32, label: 'Queenstown' },
  { value: 0.54, label: 'Milford Sound' },
  { value: 0.13, label: 'Palmerston' },
  { value: 0.13, label: 'Oamaru' },
  { value: 0.13, label: 'Dunedin' },
  { value: 0.13, label: 'Mosgiel' },
  { value: 0.2, label: 'Riverton' },
  { value: 0.36, label: 'Te Anau' },
  { value: 0.18, label: 'Gore' },
  { value: 0.2, label: 'Winton' },
  { value: 0.13, label: 'Balclutha' },
  { value: 0.17, label: 'Mataura' },
  { value: 0.15, label: 'Bluff' },
  { value: 0.17, label: 'Invercargill' },
  { value: 0.14, label: 'Oban' },
];

// ============================================================================
// IMPORTANCE LEVELS
// ============================================================================

export const IMPORTANCE_LEVELS = [
  {
    value: 1,
    label: 'Importance Level 1',
    description: 'Structures presenting a low degree of hazard to life and other property',
    examples: 'Structures with total floor area < 30m², farm buildings, isolated structures, fences, masts, walls',
    disabled: true, // Not commonly used
  },
  {
    value: 2,
    label: 'Importance Level 2',
    description: 'Normal structures and structures not in other importance levels',
    examples: 'Typical residential, commercial and industrial buildings',
    disabled: false,
  },
  {
    value: 3,
    label: 'Importance Level 3',
    description: 'Structures that may contain people in crowds or contents of high value',
    examples: 'Schools, hospitals, public assembly buildings, emergency facilities',
    disabled: false,
  },
  // Note: IL4 and IL5 require engineer design - not in calculator scope
];

// ============================================================================
// GRID MASS OPTIONS
// ============================================================================

export const GRID_MASS_OPTIONS = [
  {
    value: 1.1,
    label: 'Main Tee @ 1200 | Cross Tee @ 600',
    note: 3,
    spacing: { main: 1.2, cross: 0.6 },
    image: '/uploads/images/step2image1.jpg',
    description: 'Standard 1200x600 grid layout',
  },
  {
    value: 1.6,
    label: 'Main Tee @ 1200 | Cross Tee @ 600 + additional Cross Tee @ 600',
    note: 1,
    spacing: { main: 1.2, cross: 0.6 },
    image: '/uploads/images/step2image3.jpg',
    description: '600x600 grid with main tees at 1200mm and additional cross tees',
    warning: 'This 600x600 grid is selected when the main tee spacing remains at 1200mm and an additional cross tee is used for creating the 600x600 grid.',
  },
  {
    value: 1.8,
    label: 'Main Tee @ 600 | Cross Tee @ 600',
    note: 2,
    spacing: { main: 0.6, cross: 0.6 },
    image: '/uploads/images/step2image4.jpg',
    description: '600x600 grid with main tees at 600mm',
    warning: 'This 600x600 grid is used when the Main Tee is at 600mm spacing. Not to be selected when 600x600 grid is required with Main Tees at 1200.',
  },
  {
    value: 1.4,
    label: 'Main Tee @ 600 | Cross Tee @ 1200',
    note: 4,
    spacing: { main: 0.6, cross: 1.2 },
    image: '/uploads/images/step2image2.jpg',
    description: 'Reverse grid layout',
  },
];

// ============================================================================
// TILE MASS OPTIONS
// ============================================================================

export const TILE_MASS_OPTIONS = [
  { value: 1.5, type: 'Phonic Absorb (15mm)', mass: 1.5 },
  { value: 7.5, type: 'Phonic Combo Plus (35mm)', mass: 7.5 },
  { value: 2, type: 'Phonic Tech (20mm)', mass: 2 },
  { value: 4, type: 'Phonic Impact Sport (40mm)', mass: 4 },
  { value: 4, type: 'Phonic Tech (40mm)', mass: 4 },
  { value: 5.3, type: 'Phonic Harmony (19mm)', mass: 5.3 },
  { value: 4.2, type: 'Daiken Plain', mass: 4.2 },
  { value: 4.2, type: 'Phonic New NDF', mass: 4.2 },
  { value: 4.2, type: 'Phonic Fine Fissured', mass: 4.2 },
  { value: 6.9, type: 'Fenta', mass: 6.9 },
  { value: 7.9, type: 'Phonic Gypsum Vinyl (9mm)', mass: 7.9 },
  { value: 1.9, type: 'Focus Polyester (9mm)', mass: 1.9 },
  { value: 2, type: 'Phonic Clean', mass: 2 },
  { value: 8.3, type: 'Bosk Panel 12mm (max)', mass: 8.3 },
];

// ============================================================================
// STUD TYPES
// ============================================================================

export const STUD_TYPES = [
  {
    value: 1,
    label: 'Concrete/Masonry',
    description: 'Concrete or masonry wall construction',
  },
  {
    value: 2,
    label: 'Steel Stud',
    description: 'Steel stud wall construction',
  },
];

// ============================================================================
// CONNECTION TYPES
// ============================================================================

export const CONNECTION_TYPES = [
  {
    value: 1,
    label: '31 x 19 x 0.6mm BMT',
    capacities: {
      concrete: { uls: 73.1, sls: 73.1 },
      steel: { uls: 110.1, sls: 92.5 },
    },
  },
  {
    value: 2,
    label: '40 x 20 x 0.6mm BMT',
    capacities: {
      concrete: { uls: 55.1, sls: 55.1 },
      steel: { uls: 55.1, sls: 55.1 },
    },
  },
  {
    value: 3,
    label: 'Z Rail',
    capacities: {
      concrete: { uls: 57.4, sls: 57.4 },
      steel: { uls: 80, sls: 80 },
    },
  },
];

// ============================================================================
// GRID TYPES
// ============================================================================

export const GRID_TYPES = [
  {
    value: 1,
    label: 'Standard Grid',
    capacities: {
      mainTee: 88,
      crossTee1200: 80,
      crossTee600: 43,
    },
  },
  {
    value: 2,
    label: 'Heavy Duty Grid',
    capacities: {
      mainTee: 120,
      crossTee1200: 80,
      crossTee600: 42,
    },
  },
];

// ============================================================================
// DUCTILITY FACTORS
// ============================================================================

export const DUCTILITY_OPTIONS = [
  {
    value: 1,
    label: 'Ductile (μ = 1.0)',
    partULS: 1.0,
    description: 'Standard ductility factor',
  },
  {
    value: 2,
    label: 'Limited Ductility (μ = 0.85)',
    partULS: 0.85,
    description: 'Reduced ductility factor',
  },
];

// ============================================================================
// RETURN PERIOD FACTORS
// ============================================================================

export const RETURN_PERIOD_FACTORS = {
  SLS: 0.3325,
  SLS2: {
    IL2: 0.665,
    IL3: 0.9975,
  },
  ULS: {
    IL2: 1.33,
    IL3: 1.729,
  },
};

// ============================================================================
// CONSTANTS
// ============================================================================

export const CONSTANTS = {
  MAX_SEISMIC_WEIGHT: 24.78, // kg/m²
  MAX_RAKE_ANGLE: 20, // degrees
  MIN_DEAD_LOAD: 3, // kg/m²
  DEFAULT_DEAD_LOAD: 3, // kg/m²
  MAX_FLOOR_FACTOR: 6,
  MAX_RETURN_FACTOR: 0.7,
  SEISMIC_CLEARANCE: 20, // mm
};

// ============================================================================
// FLOOR FACTOR LOOKUP TABLE
// ============================================================================

/**
 * Calculates floor factor based on height
 * Stepped lookup table as per seismic standards
 * @param {number} height - Height in meters
 * @returns {number} Floor factor
 */
export function getFloorFactor(height) {
  if (height <= 3) return 3;
  if (height <= 4.5) return 3.5;
  if (height <= 6) return 4;
  if (height <= 7.5) return 4.5;
  if (height <= 9) return 5;
  if (height <= 10.5) return 5.5;
  return 6;
}

// ============================================================================
// YES/NO OPTIONS (Reusable)
// ============================================================================

export const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

// ============================================================================
// LIMIT STATE OPTIONS
// ============================================================================

export const LIMIT_STATE_OPTIONS = [
  {
    value: 'uls',
    label: 'ULS - Ultimate Limit State',
    description: 'Concerned with strength criteria. Structure may suffer damage but should not collapse.',
  },
  {
    value: 'sls',
    label: 'SLS - Serviceability Limit State',
    description: 'Related to deflection criteria. Structure should have no or very minor damage.',
  },
];

// ============================================================================
// BACK BRACE OPTIONS
// ============================================================================

export const BACK_BRACE_OPTIONS = [
  {
    value: 1,
    label: 'Type A Brace',
    heights: [
      { height: 1.5, capacity: 45, requirement: '1 x M8 bolt' },
      { height: 2.0, capacity: 40, requirement: '1 x M8 bolt' },
      { height: 2.5, capacity: 35, requirement: '1 x M8 bolt' },
      { height: 3.0, capacity: 30, requirement: '1 x M8 bolt' },
    ],
  },
  {
    value: 2,
    label: 'Type B Brace',
    heights: [
      { height: 2.0, capacity: 60, requirement: '2 x M8 bolts' },
      { height: 2.5, capacity: 55, requirement: '2 x M8 bolts' },
      { height: 3.0, capacity: 50, requirement: '2 x M8 bolts' },
      { height: 3.5, capacity: 45, requirement: '2 x M8 bolts' },
    ],
  },
  {
    value: 3,
    label: 'Type C Brace',
    heights: [
      { height: 3.0, capacity: 75, requirement: '3 x M8 bolts' },
      { height: 3.5, capacity: 70, requirement: '3 x M8 bolts' },
      { height: 4.0, capacity: 65, requirement: '3 x M8 bolts' },
      { height: 4.5, capacity: 60, requirement: '3 x M8 bolts' },
    ],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get grid spacing based on grid mass selection
 * @param {number} gridMassValue - Selected grid mass value
 * @returns {object} { main, cross } spacing in meters
 */
export function getGridSpacing(gridMassValue) {
  const option = GRID_MASS_OPTIONS.find(opt => opt.value === gridMassValue);
  return option ? option.spacing : { main: 1.2, cross: 0.6 };
}

/**
 * Get connection capacity based on stud type and connection type
 * @param {number} studType - Stud type value
 * @param {number} connectionType - Connection type value
 * @param {string} limitState - 'uls' or 'sls'
 * @returns {number} Capacity value
 */
export function getConnectionCapacity(studType, connectionType, limitState) {
  const connection = CONNECTION_TYPES.find(c => c.value === connectionType);
  if (!connection) return 0;
  
  const studKey = studType === 1 ? 'concrete' : 'steel';
  const stateKey = limitState.toLowerCase();
  
  return connection.capacities[studKey]?.[stateKey] || 0;
}

/**
 * Get grid capacity based on grid type
 * @param {number} gridType - Grid type value
 * @returns {object} Capacity values for main and cross tees
 */
export function getGridCapacity(gridType) {
  const grid = GRID_TYPES.find(g => g.value === gridType);
  return grid ? grid.capacities : GRID_TYPES[0].capacities;
}
