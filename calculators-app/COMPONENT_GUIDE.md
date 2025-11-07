# Component Usage Guide

## New Components for Suspended Ceiling Calculator

### 1. SelectField.vue
**Purpose:** Dropdown select input with consistent styling and validation.

**Props:**
- `id` (String, required) - Unique identifier
- `label` (String, required) - Label text
- `modelValue` (String/Number) - Selected value (v-model)
- `options` (Array, required) - Array of `{ value, label, note? }` objects
- `placeholder` (String) - Placeholder text for empty state
- `required` (Boolean) - Show required indicator
- `error` (String) - Error message to display
- `hint` (String) - Helper text

**Usage:**
```vue
<SelectField
  id="zone-factor"
  v-model="zoneFactor"
  label="Zone Factor"
  :options="zoneOptions"
  placeholder="Select a zone"
  hint="Select your seismic zone"
/>
```

---

### 2. ConditionalSection.vue
**Purpose:** Smooth show/hide transitions for conditional content.

**Props:**
- `show` (Boolean, required) - Controls visibility

**Usage:**
```vue
<ConditionalSection :show="isRaked">
  <InputField
    id="rake-angle"
    v-model.number="rakeAngle"
    label="Rake Angle"
    type="number"
  />
</ConditionalSection>
```

---

### 3. CalculationResult.vue
**Purpose:** Display calculation results with consistent formatting.

**Props:**
- `label` (String, required) - Result label
- `value` (Number/String, required) - Result value
- `unit` (String) - Unit of measurement
- `decimals` (Number, default: 1) - Decimal places
- `description` (String) - Additional description
- `isBold` (Boolean) - Bold the value
- `secondaryLabel` (String) - Label for secondary value
- `secondaryValue` (Number/String) - Secondary value
- `secondaryUnit` (String) - Unit for secondary value

**Usage:**
```vue
<CalculationResult
  label="Seismic Weight"
  :value="seismicWeight"
  unit="kg/m²"
  :decimals="1"
  :is-bold="true"
/>

<!-- With secondary value -->
<CalculationResult
  label="Limiting Main Tee Length"
  :value="limitingMainTee"
  unit="m"
  secondary-label="SLS2"
  :secondary-value="limitingMainTeeSLS2"
  secondary-unit="m"
/>
```

---

### 4. StepCard.vue
**Purpose:** Visual container for multi-step workflow steps.

**Props:**
- `stepNumber` (Number, required) - Step number
- `title` (String, required) - Step title
- `description` (String) - Step description
- `isActive` (Boolean, default: true) - Active state styling
- `isComplete` (Boolean, default: false) - Completion indicator

**Usage:**
```vue
<StepCard
  :step-number="1"
  title="Select Limit State"
  description="Choose the appropriate limit state for your design"
  :is-complete="limitStateSelected"
>
  <RadioGroup
    id="limit-state"
    v-model="limitState"
    label="Limit State Type"
    :options="limitStateOptions"
  />
</StepCard>
```

---

### 5. QuestionCard.vue
**Purpose:** Two-column layout for question/answer pattern (context left, input right).

**Props:**
- `questionTitle` (String) - Question title
- `infoTitle` (String) - Info box title
- `infoVariant` (String, default: 'info') - Info box variant
- `highlightAnswer` (Boolean) - Highlight the answer section

**Slots:**
- `context` - Left column content (information/explanation)
- `info` - Info box content (optional)
- `answer` - Right column content (input/selection)

**Usage:**
```vue
<QuestionCard
  question-title="Is the ceiling raked?"
  info-title="About Rake Angles"
  info-variant="info"
>
  <template #context>
    <p>
      A raked ceiling is one that is angled from the horizontal.
      The maximum allowable rake is 20 degrees.
    </p>
  </template>

  <template #info>
    <p>
      Rake angles affect the seismic calculations by modifying
      the effective tee lengths.
    </p>
  </template>

  <template #answer>
    <RadioGroup
      id="is-raked"
      v-model="isRaked"
      label="Ceiling Raked?"
      :options="[
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]"
    />
  </template>
</QuestionCard>
```

---

### 6. TableSelect.vue
**Purpose:** Selectable table rows for choosing from tabular data (e.g., tile types).

**Props:**
- `id` (String) - Unique identifier
- `label` (String) - Label text
- `modelValue` (String/Number) - Selected value (v-model)
- `options` (Array, required) - Array of row objects
- `columns` (Array, required) - Array of column keys to display
- `headers` (Array) - Array of header labels
- `showHeaders` (Boolean, default: true) - Show table headers
- `required` (Boolean) - Show required indicator
- `hint` (String) - Helper text

**Usage:**
```vue
<TableSelect
  id="tile-mass"
  v-model="selectedTileMass"
  label="Select Tile Type"
  :options="tileMassOptions"
  :columns="['type', 'mass']"
  :headers="['Tile Type', 'Mass (kg/m²)']"
  hint="Click a row to select"
/>

<!-- Where tileMassOptions is: -->
const tileMassOptions = [
  { value: 3.5, type: 'Mineral Fibre 600x600x15mm', mass: 3.5 },
  { value: 7.0, type: 'Mineral Fibre 1200x600x15mm', mass: 7.0 },
  // ...
];
```

---

## Existing Components (Reused)

### InputField.vue ✅
Already exists - use for numeric and text inputs.

### RadioGroup.vue ✅
Already exists - use for yes/no and option selections.

### InfoBox.vue ✅
Already exists - use for warnings, notes, and information.

### ResultCard.vue ✅
Already exists - can be used for simple result displays.

---

## Component Composition Examples

### Multi-Step Wizard Pattern
```vue
<template>
  <div>
    <StepCard
      :step-number="1"
      title="Limit State Selection"
      :is-complete="step1Complete"
    >
      <QuestionCard question-title="Select Limit State Type">
        <template #context>
          <p>Choose the appropriate limit state...</p>
        </template>
        <template #answer>
          <RadioGroup v-model="limitState" :options="limitStateOptions" />
        </template>
      </QuestionCard>
    </StepCard>

    <ConditionalSection :show="step1Complete">
      <StepCard
        :step-number="2"
        title="Site Information"
        :is-complete="step2Complete"
      >
        <!-- Step 2 content -->
      </StepCard>
    </ConditionalSection>
  </div>
</template>
```

### Results Display Pattern
```vue
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
    label="Limiting Main Tee Length"
    :value="limitingMainTee"
    unit="m"
    :is-bold="true"
  />
</div>
```

---

## Design Patterns

### 1. Progressive Disclosure
Use `ConditionalSection` to show/hide content based on user selections:
```vue
<RadioGroup v-model="hasRake" :options="yesNoOptions" />
<ConditionalSection :show="hasRake === 'yes'">
  <InputField v-model="rakeAngle" label="Rake Angle" />
</ConditionalSection>
```

### 2. Left-Right Question Layout
Use `QuestionCard` for important decision points:
```vue
<QuestionCard>
  <template #context>
    <!-- Explanation and context -->
  </template>
  <template #answer>
    <!-- Input or selection -->
  </template>
</QuestionCard>
```

### 3. Grouped Results
Use `CalculationResult` in a container with borders:
```vue
<div class="border border-brand-black p-4">
  <h4 class="btn_12_text mb-4">Limiting Lengths</h4>
  <CalculationResult ... />
  <CalculationResult ... />
</div>
```

---

## Styling Notes

All components follow the gold standard patterns:
- **Webflow classes** for typography (`heading-style-h1`, `paragraph-18px`, `btn_12_text`)
- **Tailwind utilities** for layout and spacing
- **Border color**: `border-brand-black` (#333)
- **Responsive**: Mobile-first with `lg:` breakpoints
- **Accessible**: ARIA labels, semantic HTML, keyboard navigation
