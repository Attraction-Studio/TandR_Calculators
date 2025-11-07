<template>
  <div class="w-full max-w-7xl mx-auto px-4">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="heading-style-h1 mb-4">Suspended Ceiling Seismic Calculator</h2>
      <p class="paragraph-18px max-w-3xl">
        This calculator helps you determine seismic requirements for suspended ceiling systems
        in accordance with NZ seismic standards.
      </p>
    </div>

    <!-- Wizard Progress -->
    <WizardProgress
      :steps="wizardSteps"
      :current-step="currentStep"
    />

    <!-- Wizard Content -->
    <div class="min-h-[600px]">
      <!-- Step 1: Limit State Selection -->
      <div v-show="currentStep === 1">
        <StepCard
          :step-number="1"
          title="Limit State Selection"
          description="Select the appropriate limit state for your design"
          :is-complete="step1Complete"
        >
      <QuestionCard
        question-title="What limit state applies to your project?"
        info-title="About Limit States"
      >
        <template #context>
          <p class="mb-4">
            A limit state is a condition beyond which a structure no longer meets defined design criteria.
          </p>
          <ul class="list-disc pl-5 space-y-2">
            <li>
              <strong>ULS (Ultimate Limit State):</strong> Concerned with strength criteria.
              The structure may suffer damage but should not collapse.
            </li>
            <li>
              <strong>SLS (Serviceability Limit State):</strong> Related to deflection criteria.
              The structure should have no or very minor damage.
            </li>
          </ul>
        </template>

        <template #info>
          Either limit state can govern your design. You must satisfy both ULS and SLS
          requirements where applicable.
        </template>

        <template #answer>
          <RadioGroup
            id="limit-state"
            v-model="limitState"
            label="Select Limit State"
            :options="limitStateOptions"
          />
        </template>
        </QuestionCard>
      </StepCard>
    </div>

    <!-- Step 2: Site Information -->
    <div v-show="currentStep === 2">
      <StepCard
        :step-number="2"
        title="Site Information"
        description="Enter details about your project location and building"
        :is-complete="step2Complete"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SelectField
            id="zone-factor"
            v-model="zoneFactor"
            label="Seismic Zone"
            :options="zoneFactorOptions"
            placeholder="Select your location"
            required
            hint="Select the closest location to your project"
          />

          <SelectField
            id="importance-level"
            v-model="importanceLevel"
            label="Importance Level"
            :options="importanceLevelOptions"
            required
          />

          <InputField
            id="floor-height"
            v-model.number="floorHeight"
            label="Floor Height (m)"
            type="number"
            step="0.1"
            min="0"
            hint="Height from ground to floor level"
          />

          <InputField
            id="ceiling-height"
            v-model.number="ceilingHeight"
            label="Ceiling Height (m)"
            type="number"
            step="0.1"
            min="0"
            hint="Height from floor to ceiling"
          />
        </div>
      </StepCard>
    </div>

    <!-- Step 3: Seismic Weight -->
    <div v-show="currentStep === 3">
      <StepCard
        :step-number="3"
        title="Seismic Weight Components"
        description="Enter the weight of all ceiling components"
        :is-complete="step3Complete"
      >
        <div class="flex lg:flex-row flex-col gap-6">
          <!-- Left: Inputs -->
          <div class="lg:w-1/2 w-full space-y-6">
            <SelectField
              id="grid-mass"
              v-model="gridMass"
              label="Grid Type"
              :options="gridMassOptions"
              @update:model-value="onGridMassChange"
            />

            <ConditionalSection :show="gridMassNote">
              <InfoBox variant="warning" :title="gridMassNote.title">
                {{ gridMassNote.text }}
              </InfoBox>
            </ConditionalSection>

            <TableSelect
              id="tile-mass"
              v-model="tileMass"
              label="Tile Type"
              :options="tileMassOptions"
              :columns="['type', 'mass']"
              :headers="['Tile Type', 'Mass (kg/m²)']"
              hint="Click a row to select"
            />

            <InputField
              id="luminaries"
              v-model.number="luminaries"
              label="Luminaries (kg/m²)"
              type="number"
              step="0.1"
              min="0"
            />

            <InputField
              id="insulation"
              v-model.number="insulation"
              label="Insulation (kg/m²)"
              type="number"
              step="0.1"
              min="0"
            />

            <InputField
              id="other-loads"
              v-model.number="otherLoads"
              label="Other Loads (kg/m²)"
              type="number"
              step="0.1"
              min="0"
            />
          </div>

          <!-- Right: Live Calculation -->
          <div class="lg:w-1/2 w-full">
            <div class="border border-brand-black p-6 sticky top-4">
              <h4 class="btn_12_text mb-4 border-b border-brand-black pb-2">
                Total Seismic Weight
              </h4>
              <div class="text-4xl font-bold mb-6">
                {{ seismicWeight.toFixed(1) }} <span class="text-2xl">kg/m²</span>
              </div>

              <div class="space-y-2 text-sm mb-4">
                <div class="flex justify-between">
                  <span>Grid Mass:</span>
                  <span class="font-semibold">{{ Number(gridMass || 0).toFixed(1) }} kg/m²</span>
                </div>
                <div class="flex justify-between">
                  <span>Tile Mass:</span>
                  <span class="font-semibold">{{ Number(tileMass || 0).toFixed(1) }} kg/m²</span>
                </div>
                <div class="flex justify-between">
                  <span>Luminaries:</span>
                  <span class="font-semibold">{{ luminaries.toFixed(1) }} kg/m²</span>
                </div>
                <div class="flex justify-between">
                  <span>Insulation:</span>
                  <span class="font-semibold">{{ insulation.toFixed(1) }} kg/m²</span>
                </div>
                <div class="flex justify-between">
                  <span>Other:</span>
                  <span class="font-semibold">{{ otherLoads.toFixed(1) }} kg/m²</span>
                </div>
                <div class="flex justify-between border-t border-brand-black pt-2">
                  <span>Dead Load:</span>
                  <span class="font-semibold">{{ deadLoad.toFixed(1) }} kg/m²</span>
                </div>
              </div>

              <InfoBox
                v-if="weightValidation.error"
                variant="warning"
                title="Weight Limit Exceeded"
              >
                {{ weightValidation.error }}
              </InfoBox>
            </div>
          </div>
        </div>
      </StepCard>
    </div>

    <!-- Step 4: Grid Configuration -->
    <div v-show="currentStep === 4">
      <StepCard
        :step-number="4"
        title="Grid Configuration"
        description="Select your ceiling grid and connection details"
        :is-complete="step4Complete"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SelectField
            id="stud-type"
            v-model="studType"
            label="Wall Construction Type"
            :options="studTypeOptions"
          />

          <SelectField
            id="connection-type"
            v-model="connectionType"
            label="Connection Type"
            :options="connectionTypeOptions"
          />

          <SelectField
            id="grid-type"
            v-model="gridType"
            label="Grid Type"
            :options="gridTypeOptions"
          />
        </div>

        <div class="mt-6 p-4 bg-gray-50 border border-brand-black">
          <h4 class="btn_12_text mb-2">Grid Spacing</h4>
          <div class="flex gap-6">
            <div>
              <span class="text-sm">Main Tee:</span>
              <span class="font-semibold ml-2">{{ gridSpacing.main }}m</span>
            </div>
            <div>
              <span class="text-sm">Cross Tee:</span>
              <span class="font-semibold ml-2">{{ gridSpacing.cross }}m</span>
            </div>
          </div>
        </div>
      </StepCard>
    </div>

    <!-- Step 5: Design Options -->
    <div v-show="currentStep === 5">
      <StepCard
        :step-number="5"
        title="Design Options"
        description="Configure grid strengthening and special conditions"
        :is-complete="step5Complete"
      >
        <div class="space-y-8">
          <QuestionCard
            question-title="Specify the location of the first Main Tee connection?"
            info-title="Connection Location"
          >
            <template #context>
              <p class="mb-3">
                If you wish to specify the location of the first tee connections, full lengths
                of main tees are to be used around the fixed edges of the ceilings.
              </p>
              <p class="text-sm text-gray-600">
                When yes is selected, the limiting lengths are increased by 3.0m.
              </p>
            </template>

            <template #answer>
              <RadioGroup
                id="specify-connection"
                v-model="specifyMainConnection"
                label="Specify Connection Location?"
                :options="yesNoOptions"
              />
            </template>
          </QuestionCard>

          <QuestionCard
            question-title="Grid Strengthening Options"
            info-title="About Grid Strengthening"
          >
            <template #context>
              <p class="mb-3">
                The T&R 4-way clip can be installed at main or cross tee connections,
                allowing the limiting tee length to be increased in some cases.
              </p>
            </template>

            <template #info>
              <p>
                Grid strengthening is used when tee lengths exceed capacity limits.
                Clips are installed at connection points to increase strength.
              </p>
            </template>

            <template #answer>
              <div class="space-y-4">
                <RadioGroup
                  id="strengthen-main"
                  v-model="strengthenMain"
                  label="Strengthen Main Tees?"
                  :options="yesNoOptions"
                />

                <RadioGroup
                  id="strengthen-cross"
                  v-model="strengthenCross"
                  label="Strengthen Cross Tees?"
                  :options="yesNoOptions"
                />
              </div>
            </template>
          </QuestionCard>

          <QuestionCard
            question-title="Is the ceiling raked?"
            info-title="Rake Angle Information"
          >
            <template #context>
              <p class="mb-3">
                A raked ceiling is one that is angled from the horizontal.
                The maximum allowable rake is 20 degrees.
              </p>
            </template>

            <template #info>
              <p>
                Rake angles affect seismic calculations by modifying the effective tee lengths.
                Specific design by a qualified engineer is required for angles exceeding 20°.
              </p>
            </template>

            <template #answer>
              <RadioGroup
                id="is-raked"
                v-model="isRaked"
                label="Ceiling Raked?"
                :options="yesNoOptions"
              />

              <ConditionalSection :show="isRaked === 'yes'">
                <InputField
                  id="rake-angle"
                  v-model.number="rakeAngle"
                  label="Rake Angle (degrees)"
                  type="number"
                  step="0.1"
                  min="0"
                  :max="20"
                  :error="rakeAngleError"
                  hint="Maximum 20 degrees"
                  class="mt-4"
                />
              </ConditionalSection>
            </template>
          </QuestionCard>
        </div>
      </StepCard>
    </div>

    <!-- Step 6: Validation -->
    <div v-show="currentStep === 6">
      <StepCard
        :step-number="6"
        title="Measured Tee Lengths"
        description="Enter the maximum measured tee lengths as per plans supplied"
        :is-complete="step6Complete"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputField
            id="max-main-tee"
            v-model.number="maxMainTee"
            label="Max Main Tee Length (m)"
            type="number"
            step="0.1"
            min="0"
            required
          />

          <InputField
            id="max-cross-tee"
            v-model.number="maxCrossTee"
            label="Max Cross Tee Length (m)"
            type="number"
            step="0.1"
            min="0"
            required
          />
        </div>
      </StepCard>
    </div>

    <!-- Step 7: Results -->
    <div v-show="currentStep === 7">
      <div class="border-t border-brand-black pt-8 mt-12">
        <h2 class="btn_12_text mb-6">Calculation Results</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Left: Key Values -->
          <div>
            <h3 class="text-2xl font-semibold mb-4">Key Values</h3>
            <div class="space-y-3">
              <CalculationResult
                label="Seismic Weight"
                :value="seismicWeight"
                unit="kg/m²"
                :is-bold="true"
              />
              <CalculationResult
                label="Floor Factor"
                :value="floorFactorValue"
                :decimals="1"
              />
              <CalculationResult
                label="Seismic Force (SLS)"
                :value="seismicForces.sls"
                unit="kgf/m²"
              />
              <CalculationResult
                label="Seismic Force (ULS)"
                :value="seismicForces.uls"
                unit="kgf/m²"
                :is-bold="true"
              />
            </div>
          </div>

          <!-- Right: Limiting Lengths -->
          <div>
            <h3 class="text-2xl font-semibold mb-4">Limiting Lengths</h3>
            <div class="space-y-3">
              <CalculationResult
                label="Limiting Main Tee Length (ULS)"
                :value="adjustedLimitingLengths.uls.main"
                unit="m"
                :is-bold="true"
                description="Maximum allowable main tee length"
              />
              <CalculationResult
                label="Limiting Cross Tee Length (ULS)"
                :value="adjustedLimitingLengths.uls.cross"
                unit="m"
                :is-bold="true"
                description="Maximum allowable cross tee length"
              />
            </div>

            <div class="mt-6 space-y-3">
              <div class="flex items-center gap-2">
                <span :class="[
                  'w-6 h-6 flex items-center justify-center border-2 border-brand-black font-bold',
                  designValidation.mainPass ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                ]">
                  {{ designValidation.mainPass ? '✓' : '✗' }}
                </span>
                <span class="text-sm">
                  Main Tee: {{ maxMainTee.toFixed(1) }}m
                  {{ designValidation.mainPass ? '≤' : '>' }}
                  {{ designValidation.governingMain.toFixed(1) }}m
                </span>
              </div>

              <div class="flex items-center gap-2">
                <span :class="[
                  'w-6 h-6 flex items-center justify-center border-2 border-brand-black font-bold',
                  designValidation.crossPass ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                ]">
                  {{ designValidation.crossPass ? '✓' : '✗' }}
                </span>
                <span class="text-sm">
                  Cross Tee: {{ maxCrossTee.toFixed(1) }}m
                  {{ designValidation.crossPass ? '≤' : '>' }}
                  {{ designValidation.governingCross.toFixed(1) }}m
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Design Recommendation -->
        <InfoBox
          :variant="designValidation.mainPass && designValidation.crossPass ? 'info' : 'warning'"
          title="Design Recommendation"
        >
          {{ designValidation.recommendation }}
        </InfoBox>

        <!-- Grid Strengthening Notes -->
        <ConditionalSection :show="strengtheningDistances && (strengtheningDistances.main > 0 || strengtheningDistances.cross > 0)">
          <div class="mt-6">
            <h4 class="btn_12_text mb-3">Grid Strengthening Requirements</h4>
            <div class="space-y-2">
              <p v-if="strengtheningDistances.main > 0" class="text-sm">
                <strong>Main Tee:</strong> Grid strengthening required for
                {{ strengtheningDistances.main.toFixed(1) }}m from the fixed edge
              </p>
              <p v-if="strengtheningDistances.cross > 0" class="text-sm">
                <strong>Cross Tee:</strong> Grid strengthening required for
                {{ strengtheningDistances.cross.toFixed(1) }}m from the fixed edge
              </p>
            </div>
          </div>
        </ConditionalSection>
      </div>
    </div>
    </div>

    <!-- Wizard Navigation -->
    <div class="flex justify-between items-center mt-8 pt-6 border-t border-brand-black">
      <button
        v-if="currentStep > 1"
        @click="previousStep"
        class="px-6 py-3 border-2 border-brand-black hover:bg-gray-100 transition-colors btn_12_text"
      >
        ← Previous
      </button>
      <div v-else></div>

      <div class="text-sm text-gray-600">
        Step {{ currentStep }} of {{ totalSteps }}
      </div>

      <button
        v-if="currentStep < totalSteps"
        @click="nextStep"
        :disabled="!canProceed"
        :class="[
          'px-6 py-3 border-2 border-brand-black transition-colors btn_12_text',
          canProceed
            ? 'bg-brand-black text-white hover:bg-gray-800'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        ]"
      >
        Next →
      </button>
      <button
        v-else-if="currentStep === totalSteps && step6Complete"
        @click="resetCalculator"
        class="px-6 py-3 border-2 border-brand-black hover:bg-gray-100 transition-colors btn_12_text"
      >
        Start New Calculation
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import WizardProgress from '../components/WizardProgress.vue';
import StepCard from '../components/StepCard.vue';
import QuestionCard from '../components/QuestionCard.vue';
import ConditionalSection from '../components/ConditionalSection.vue';
import RadioGroup from '../components/RadioGroup.vue';
import SelectField from '../components/SelectField.vue';
import InputField from '../components/InputField.vue';
import TableSelect from '../components/TableSelect.vue';
import InfoBox from '../components/InfoBox.vue';
import CalculationResult from '../components/CalculationResult.vue';

import {
  LIMIT_STATE_OPTIONS,
  ZONE_FACTORS,
  IMPORTANCE_LEVELS,
  GRID_MASS_OPTIONS,
  TILE_MASS_OPTIONS,
  STUD_TYPES,
  CONNECTION_TYPES,
  GRID_TYPES,
  DUCTILITY_OPTIONS,
  YES_NO_OPTIONS,
  CONSTANTS,
  getGridSpacing,
  getConnectionCapacity,
  getGridCapacity,
  getFloorFactor,
} from './data/suspendedCeilingData.js';

import {
  calculateSeismicWeight,
  validateSeismicWeight,
  calculateAllSeismicForces,
  calculateLimitingLengths,
  adjustForRakeAngle,
  validateRakeAngle,
  calculateStrengtheningDistance,
  validateDesign,
} from './utils/seismicCalculations.js';

// ============================================================================
// WIZARD STATE
// ============================================================================
const currentStep = ref(1);
const totalSteps = 7;

const wizardSteps = [
  { number: 1, label: 'Limit State' },
  { number: 2, label: 'Site Info' },
  { number: 3, label: 'Weight' },
  { number: 4, label: 'Grid Config' },
  { number: 5, label: 'Options' },
  { number: 6, label: 'Validation' },
  { number: 7, label: 'Results' },
];

// ============================================================================
// STATE - Step 1: Limit State
// ============================================================================
const limitState = ref('uls');

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
const gridMass = ref('');
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
const step1Complete = computed(() => !!limitState.value);

const step2Complete = computed(() => 
  zoneFactor.value && importanceLevel.value && floorHeight.value > 0 && ceilingHeight.value > 0
);

const step3Complete = computed(() => 
  gridMass.value && tileMass.value && seismicWeight.value > 0
);

const step4Complete = computed(() => 
  studType.value && connectionType.value && gridType.value
);

const step5Complete = computed(() => true); // Always complete

const step6Complete = computed(() => 
  maxMainTee.value > 0 && maxCrossTee.value > 0
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

const gridMassNote = computed(() => {
  const option = GRID_MASS_OPTIONS.find(opt => opt.value === Number(gridMass.value));
  if (option?.warning) {
    return {
      title: 'Grid Configuration Note',
      text: option.warning,
    };
  }
  return null;
});

// ============================================================================
// COMPUTED - Seismic Forces
// ============================================================================
const ductilityFactor = computed(() => {
  const option = DUCTILITY_OPTIONS.find(opt => opt.value === 1);
  return option?.partULS || 1;
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

// Apply rake angle adjustment
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

// Grid strengthening distances
const strengtheningDistances = computed(() => {
  if (strengthenMain.value !== 'yes' && strengthenCross.value !== 'yes') {
    return null;
  }

  // Calculate distance without strengthening
  const withoutStrengthening = calculateLimitingLengths({
    teeCapacityMain: getGridCapacity(Number(gridType.value)).mainTee,
    teeCapacityCross: getGridCapacity(Number(gridType.value)).crossTee1200,
    connectionCapacity: getConnectionCapacity(Number(studType.value), Number(connectionType.value), 'uls'),
    wallCapacity: getConnectionCapacity(Number(studType.value), Number(connectionType.value), 'uls'),
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
    main: strengthenMain.value === 'yes'
      ? calculateStrengtheningDistance(maxMainTee.value, withoutStrengthening.uls.main)
      : 0,
    cross: strengthenCross.value === 'yes'
      ? calculateStrengtheningDistance(maxCrossTee.value, withoutStrengthening.uls.cross)
      : 0,
  };
});

// Rake angle validation
const rakeAngleError = computed(() => {
  if (isRaked.value !== 'yes' || rakeAngle.value === 0) return '';
  const validation = validateRakeAngle(rakeAngle.value);
  return validation.error || '';
});

// ============================================================================
// OPTIONS
// ============================================================================
const limitStateOptions = LIMIT_STATE_OPTIONS;
const zoneFactorOptions = ZONE_FACTORS;
const importanceLevelOptions = IMPORTANCE_LEVELS.filter(il => !il.disabled);
const gridMassOptions = GRID_MASS_OPTIONS;
const tileMassOptions = TILE_MASS_OPTIONS;
const studTypeOptions = STUD_TYPES;
const connectionTypeOptions = CONNECTION_TYPES;
const gridTypeOptions = GRID_TYPES;
const yesNoOptions = YES_NO_OPTIONS;

// ============================================================================
// COMPUTED - Wizard Navigation
// ============================================================================
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return step1Complete.value;
    case 2:
      return step2Complete.value;
    case 3:
      return step3Complete.value;
    case 4:
      return step4Complete.value;
    case 5:
      return step5Complete.value;
    case 6:
      return step6Complete.value;
    case 7:
      return true;
    default:
      return false;
  }
});

// ============================================================================
// METHODS - Wizard Navigation
// ============================================================================
function nextStep() {
  if (canProceed.value && currentStep.value < totalSteps) {
    currentStep.value++;
    scrollToTop();
  }
}

function previousStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
    scrollToTop();
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetCalculator() {
  // Reset all state
  currentStep.value = 1;
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
  scrollToTop();
}

function onGridMassChange() {
  // Grid spacing is automatically computed
}
</script>
