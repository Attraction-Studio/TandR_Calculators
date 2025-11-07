# Component Examples - Suspended Ceiling Calculator

## Visual Layout Examples

### Example 1: Multi-Step Question Flow

This shows how to create the left-right column layout you requested for better user guidance:

```vue
<template>
  <div class="w-full">
    <!-- Header -->
    <div class="mb-16">
      <h2 class="heading-style-h1 mb-6">Suspended Ceiling Seismic Calculator</h2>
      <p class="paragraph-18px max-w-3xl">
        This calculator helps you determine seismic requirements for suspended ceiling systems.
        Follow the steps below to complete your design.
      </p>
    </div>

    <!-- Step 1: Limit State Selection -->
    <StepCard
      :step-number="1"
      title="Limit State Selection"
      description="Select the appropriate limit state for your design"
      :is-complete="limitStateSelected"
    >
      <QuestionCard
        question-title="What limit state applies to your project?"
        info-title="About Limit States"
        info-variant="info"
      >
        <template #context>
          <p class="mb-4">
            A limit state is a condition beyond which a structure no longer meets 
            defined design criteria. Two basic limit states are defined:
          </p>
          <ul class="list-disc pl-5 space-y-2">
            <li>
              <strong>ULS (Ultimate Limit State):</strong> Concerned with strength 
              criteria. The structure may suffer damage but should not collapse.
            </li>
            <li>
              <strong>SLS (Serviceability Limit State):</strong> Related to deflection 
              criteria. The structure should have no or very minor damage.
            </li>
          </ul>
        </template>

        <template #info>
          <p>
            Either limit state can govern your design. You must satisfy both ULS 
            and SLS requirements where applicable.
          </p>
        </template>

        <template #answer>
          <RadioGroup
            id="limit-state"
            v-model="limitState"
            label="Select Limit State"
            :options="[
              { value: 'uls', label: 'ULS - Ultimate Limit State' },
              { value: 'sls', label: 'SLS - Serviceability Limit State' }
            ]"
            @update:model-value="onLimitStateChange"
          />
          
          <button
            v-if="limitState"
            class="mt-4 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
            @click="nextStep"
          >
            Continue to Step 2 →
          </button>
        </template>
      </QuestionCard>
    </StepCard>

    <!-- Step 2: Site Information (shown after Step 1) -->
    <ConditionalSection :show="currentStep >= 2">
      <StepCard
        :step-number="2"
        title="Site Information"
        description="Enter details about your project location and building"
        :is-complete="siteInfoComplete"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SelectField
            id="zone-factor"
            v-model="zoneFactor"
            label="Seismic Zone"
            :options="zoneOptions"
            placeholder="Select your location"
            required
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
            label="Floor Height"
            type="number"
            step="0.1"
            min="0"
            hint="Height from ground to floor level (m)"
          />

          <InputField
            id="ceiling-height"
            v-model.number="ceilingHeight"
            label="Ceiling Height"
            type="number"
            step="0.1"
            min="0"
            hint="Height from floor to ceiling (m)"
          />
        </div>
      </StepCard>
    </ConditionalSection>

    <!-- Step 3: Seismic Weight -->
    <ConditionalSection :show="currentStep >= 3">
      <StepCard
        :step-number="3"
        title="Seismic Weight Components"
        description="Enter the weight of all ceiling components"
        :is-complete="seismicWeightComplete"
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

            <TableSelect
              id="tile-mass"
              v-model="tileMass"
              label="Tile Type"
              :options="tileMassOptions"
              :columns="['type', 'mass']"
              :headers="['Tile Type', 'Mass (kg/m²)']"
            />

            <InputField
              id="luminaries"
              v-model.number="luminaries"
              label="Luminaries"
              type="number"
              step="0.1"
              min="0"
              hint="kg/m²"
            />

            <InputField
              id="insulation"
              v-model.number="insulation"
              label="Insulation"
              type="number"
              step="0.1"
              min="0"
              hint="kg/m²"
            />

            <InputField
              id="other-loads"
              v-model.number="otherLoads"
              label="Other Loads"
              type="number"
              step="0.1"
              min="0"
              hint="kg/m²"
            />
          </div>

          <!-- Right: Live Calculation -->
          <div class="lg:w-1/2 w-full">
            <div class="border border-brand-black p-6 sticky top-4">
              <h4 class="btn_12_text mb-4 border-b border-brand-black pb-2">
                Total Seismic Weight
              </h4>
              <div class="text-4xl font-bold mb-6">
                {{ seismicWeight.toFixed(1) }} kg/m²
              </div>

              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Grid Mass:</span>
                  <span class="font-semibold">{{ gridMass }} kg/m²</span>
                </div>
                <div class="flex justify-between">
                  <span>Tile Mass:</span>
                  <span class="font-semibold">{{ tileMass }} kg/m²</span>
                </div>
                <div class="flex justify-between">
                  <span>Luminaries:</span>
                  <span class="font-semibold">{{ luminaries }} kg/m²</span>
                </div>
                <div class="flex justify-between">
                  <span>Insulation:</span>
                  <span class="font-semibold">{{ insulation }} kg/m²</span>
                </div>
                <div class="flex justify-between">
                  <span>Other:</span>
                  <span class="font-semibold">{{ otherLoads }} kg/m²</span>
                </div>
              </div>

              <InfoBox
                v-if="seismicWeight > 24.78"
                variant="warning"
                title="Weight Limit Exceeded"
                class="mt-4"
              >
                Maximum seismic weight is 24.78 kg/m². Please reduce component weights.
              </InfoBox>
            </div>
          </div>
        </div>
      </StepCard>
    </ConditionalSection>

    <!-- Results Section -->
    <ConditionalSection :show="showResults">
      <div class="border-t border-brand-black pt-8 mt-12">
        <h2 class="btn_12_text mb-6">Calculation Results</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left: Key Results -->
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
                label="Seismic Force (ULS)"
                :value="seismicForceULS"
                unit="kgf/m²"
              />
              <CalculationResult
                label="Floor Factor"
                :value="floorFactor"
                :decimals="1"
              />
            </div>
          </div>

          <!-- Right: Limiting Lengths -->
          <div>
            <h3 class="text-2xl font-semibold mb-4">Limiting Lengths</h3>
            <div class="space-y-3">
              <CalculationResult
                label="Limiting Main Tee Length"
                :value="limitingMainTee"
                unit="m"
                :is-bold="true"
                description="Maximum allowable main tee length"
              />
              <CalculationResult
                label="Limiting Cross Tee Length"
                :value="limitingCrossTee"
                unit="m"
                :is-bold="true"
                description="Maximum allowable cross tee length"
              />
            </div>

            <InfoBox
              variant="info"
              title="Design Recommendation"
              class="mt-6"
            >
              {{ designRecommendation }}
            </InfoBox>
          </div>
        </div>
      </div>
    </ConditionalSection>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import StepCard from '../components/StepCard.vue';
import QuestionCard from '../components/QuestionCard.vue';
import ConditionalSection from '../components/ConditionalSection.vue';
import RadioGroup from '../components/RadioGroup.vue';
import SelectField from '../components/SelectField.vue';
import InputField from '../components/InputField.vue';
import TableSelect from '../components/TableSelect.vue';
import CalculationResult from '../components/CalculationResult.vue';
import InfoBox from '../components/InfoBox.vue';

// State
const currentStep = ref(1);
const limitState = ref('');
const zoneFactor = ref('');
const importanceLevel = ref('');
const floorHeight = ref(0);
const ceilingHeight = ref(0);
const gridMass = ref(0);
const tileMass = ref(0);
const luminaries = ref(0);
const insulation = ref(0);
const otherLoads = ref(3); // Default dead load

// Options data
const zoneOptions = [
  { value: 0.13, label: 'Auckland' },
  { value: 0.22, label: 'Wellington' },
  { value: 0.30, label: 'Christchurch' },
  // ... more zones
];

const gridMassOptions = [
  { value: 1.1, label: 'Exposed Grid 1200x600', note: 3 },
  { value: 1.8, label: 'Exposed Grid 600x600', note: 2 },
  // ... more options
];

const tileMassOptions = [
  { value: 3.5, type: 'Mineral Fibre 600x600x15mm', mass: 3.5 },
  { value: 7.0, type: 'Mineral Fibre 1200x600x15mm', mass: 7.0 },
  // ... more options
];

// Computed
const seismicWeight = computed(() => {
  return gridMass.value + tileMass.value + luminaries.value + 
         insulation.value + otherLoads.value;
});

const limitStateSelected = computed(() => !!limitState.value);
const siteInfoComplete = computed(() => 
  zoneFactor.value && importanceLevel.value && floorHeight.value && ceilingHeight.value
);
const seismicWeightComplete = computed(() => seismicWeight.value > 0);
const showResults = computed(() => currentStep.value >= 4);

// Methods
function nextStep() {
  currentStep.value++;
}

function onLimitStateChange() {
  // Auto-advance to next step
  setTimeout(() => nextStep(), 300);
}
</script>
```

---

## Key Features Demonstrated

### 1. **Progressive Disclosure**
Steps are revealed as the user completes previous steps using `ConditionalSection`.

### 2. **Left-Right Question Layout**
`QuestionCard` provides clear separation between:
- **Left**: Context, explanation, background information
- **Right**: The actual question/input in a highlighted box

### 3. **Visual Step Indicators**
`StepCard` shows numbered steps with completion states.

### 4. **Live Calculations**
Right column shows real-time calculation updates as user enters data.

### 5. **Validation Feedback**
`InfoBox` provides warnings when limits are exceeded.

### 6. **Accessible & Responsive**
All components work on mobile and desktop, with proper ARIA labels.

---

## Benefits Over Legacy Version

| Legacy (jQuery) | Modern (Vue 3) |
|----------------|----------------|
| DOM manipulation with `.show()/.hide()` | Reactive `ConditionalSection` |
| Global `var` state | Scoped `ref()` and `computed()` |
| Manual `.html()` updates | Automatic reactive updates |
| Inline styles and Bootstrap | Tailwind + Webflow classes |
| Scattered event handlers | Centralized component logic |
| Hard to test | Component-based testing |
| Poor mobile experience | Mobile-first responsive |
| Accessibility issues | Built-in ARIA support |
