# Suspended Ceiling Calculator Refactoring Plan

## Problem
The `SuspendedCeilingCalculator.vue` file has grown to ~1500 lines, making it:
- Hard to debug
- Difficult to maintain
- Challenging to navigate
- Prone to merge conflicts

## Solution
Break the monolithic component into:
1. **Main orchestrator** (~200 lines)
2. **Shared state composable** (centralized logic)
3. **Step components** (9 separate files, ~100-150 lines each)

---

## New Structure

```
calculators/SuspendedCeilingCalculator/
├── SuspendedCeilingCalculator.vue          # Main orchestrator (NEXT)
├── composables/
│   └── useCalculatorState.js               # ✅ CREATED - Shared state & calculations
└── steps/
    ├── IntroductionStep.vue                # ✅ CREATED - Step 1
    ├── DesignMethodsStep.vue               # ✅ CREATED - Step 2
    ├── LimitStateStep.vue                  # ✅ CREATED - Step 3
    ├── SiteInformationStep.vue             # ✅ CREATED - Step 4
    ├── SeismicWeightStep.vue               # ✅ CREATED - Step 5
    ├── GridConfigurationStep.vue           # ✅ CREATED - Step 6
    ├── DesignOptionsStep.vue               # ✅ CREATED - Step 7
    ├── ValidationStep.vue                  # ✅ CREATED - Step 8
    └── ResultsStep.vue                     # ✅ CREATED - Step 9
```

---

## Main Orchestrator Pattern

```vue
<!-- SuspendedCeilingCalculator.vue -->
<template>
  <div class="w-full">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="heading-style-h1 mb-4">Suspended Ceiling Seismic Calculator</h2>
      <p class="paragraph-18px max-w-3xl">...</p>
    </div>

    <!-- Wizard Progress -->
    <WizardProgress :steps="wizardSteps" :current-step="currentStep" />

    <!-- Dynamic Step Component -->
    <div class="min-h-[600px]">
      <component :is="currentStepComponent" />
    </div>

    <!-- Navigation -->
    <div class="flex justify-between items-center mt-8 pt-6 border-t border-brand-black">
      <button v-if="currentStep > 1" @click="previousStep">← Previous</button>
      <button @click="resetCalculator">Reset</button>
      <button :disabled="!canProceed" @click="nextStep">Next →</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCalculatorState } from './composables/useCalculatorState.js';

// Step components
import IntroductionStep from './steps/IntroductionStep.vue';
import DesignMethodsStep from './steps/DesignMethodsStep.vue';
// ... import other steps

const currentStep = ref(1);
const totalSteps = 9;

// Shared state from composable
const state = useCalculatorState();

// Dynamic component based on current step
const currentStepComponent = computed(() => {
  const steps = [
    IntroductionStep,
    DesignMethodsStep,
    LimitStateStep,
    // ... etc
  ];
  return steps[currentStep.value - 1];
});

// Navigation logic
const canProceed = computed(() => {
  // Simple switch based on step completion
});

function nextStep() { ... }
function previousStep() { ... }
function resetCalculator() {
  state.resetState();
  currentStep.value = 1;
}
</script>
```

---

## Step Component Pattern

Each step component is self-contained:

```vue
<!-- steps/SiteInformationStep.vue -->
<template>
  <StepCard
    :step-number="2"
    title="Site Information"
    description="Enter details about your project location and building"
    :is-complete="state.step2Complete"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SelectField
        id="zone-factor"
        v-model="state.zoneFactor"
        label="Seismic Zone"
        :options="zoneFactorOptions"
        required
      />
      <!-- More fields... -->
    </div>
  </StepCard>
</template>

<script setup>
import { inject } from 'vue';
import StepCard from '../../../components/StepCard.vue';
import SelectField from '../../../components/SelectField.vue';
import { ZONE_FACTORS } from '../../data/suspendedCeilingData.js';

// Inject shared state from parent
const state = inject('calculatorState');

const zoneFactorOptions = ZONE_FACTORS;
</script>
```

---

## Benefits

### 1. **Maintainability**
- Each step: 100-150 lines (easy to understand)
- Clear separation of concerns
- Easy to locate bugs

### 2. **Debugging**
- Isolate issues to specific steps
- Smaller files = faster IDE performance
- Cleaner stack traces

### 3. **Collaboration**
- Multiple developers can work on different steps
- Reduced merge conflicts
- Easier code reviews

### 4. **Reusability**
- Composable can be used in tests
- Steps can be reused or duplicated
- Shared logic in one place

### 5. **Testing**
- Test each step in isolation
- Mock shared state easily
- Unit test composable separately

---

## Migration Steps

### Phase 1: Setup ✅
- [x] Create directory structure
- [x] Create `useCalculatorState.js` composable
- [x] Create `IntroductionStep.vue` (example)

### Phase 2: Extract Steps ✅
- [x] Create `DesignMethodsStep.vue`
- [x] Create `LimitStateStep.vue`
- [x] Create `SiteInformationStep.vue`
- [x] Create `SeismicWeightStep.vue`
- [x] Create `GridConfigurationStep.vue`
- [x] Create `DesignOptionsStep.vue`
- [x] Create `ValidationStep.vue`
- [x] Create `ResultsStep.vue`

### Phase 3: Refactor Main Component
- [ ] Update `SuspendedCeilingCalculator.vue` to use dynamic components
- [ ] Provide state via `provide/inject`
- [ ] Remove old step templates
- [ ] Test navigation flow

### Phase 4: Cleanup
- [ ] Move old file to `SuspendedCeilingCalculator.old.vue` (backup)
- [ ] Update imports in `App.vue`
- [ ] Test all functionality
- [ ] Update documentation

---

## File Size Comparison

### Before:
```
SuspendedCeilingCalculator.vue: ~1500 lines ❌
```

### After:
```
SuspendedCeilingCalculator.vue:      ~200 lines ✅
useCalculatorState.js:               ~350 lines ✅
IntroductionStep.vue:                ~130 lines ✅
DesignMethodsStep.vue:               ~120 lines ✅
LimitStateStep.vue:                  ~150 lines ✅
SiteInformationStep.vue:             ~100 lines ✅
SeismicWeightStep.vue:               ~150 lines ✅
GridConfigurationStep.vue:           ~100 lines ✅
DesignOptionsStep.vue:               ~180 lines ✅
ValidationStep.vue:                  ~80 lines ✅
ResultsStep.vue:                     ~140 lines ✅
─────────────────────────────────────────────
Total: ~1700 lines (distributed across 11 files)
```

**Average file size: ~155 lines** 🎉

---

## Next Steps

Would you like me to:
1. **Complete all step components** (extract remaining 8 steps)
2. **Refactor the main orchestrator** (update SuspendedCeilingCalculator.vue)
3. **Test the refactored version** (ensure everything works)

This will make the codebase much more maintainable! 🚀
