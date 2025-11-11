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
        placeholder="Select your location"
        required
        hint="Select the closest location to your project"
      />

      <SelectField
        id="importance-level"
        v-model="state.importanceLevel"
        label="Importance Level"
        :options="importanceLevelOptions"
        required
      />

      <InputField
        id="floor-height"
        v-model.number="state.floorHeight"
        label="Floor Height (m)"
        type="number"
        step="0.1"
        min="0"
        hint="Height from ground to floor level"
      />

      <InputField
        id="ceiling-height"
        v-model.number="state.ceilingHeight"
        label="Ceiling Height (m)"
        type="number"
        step="0.1"
        min="0"
        hint="Height from floor to ceiling"
      />
    </div>
  </StepCard>
</template>

<script setup>
import { inject } from 'vue';
import StepCard from '../../../components/StepCard.vue';
import SelectField from '../../../components/SelectField.vue';
import InputField from '../../../components/InputField.vue';
import { ZONE_FACTORS, IMPORTANCE_LEVELS } from '../../data/suspendedCeilingData.js';

const state = inject('calculatorState');
const zoneFactorOptions = ZONE_FACTORS;
const importanceLevelOptions = IMPORTANCE_LEVELS.filter((il) => !il.disabled);
</script>
