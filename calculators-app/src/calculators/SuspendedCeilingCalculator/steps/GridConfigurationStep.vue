<template>
  <StepCard
    :step-number="4"
    title="Grid Configuration"
    description="Select your ceiling grid and connection details"
    :is-complete="state.step4Complete"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SelectField
        id="stud-type"
        v-model="state.studType"
        label="Wall Construction Type"
        :options="studTypeOptions"
      />

      <SelectField
        id="connection-type"
        v-model="state.connectionType"
        label="Connection Type"
        :options="connectionTypeOptions"
      />

      <SelectField
        id="grid-type"
        v-model="state.gridType"
        label="Grid Type"
        :options="gridTypeOptions"
      />
    </div>

    <div class="mt-6 p-4 bg-gray-50 border border-brand-black">
      <h4 class="btn_12_text mb-2">Grid Spacing</h4>
      <div class="flex gap-6">
        <div>
          <span class="text-sm">Main Tee:</span>
          <span class="font-semibold ml-2">{{ state.gridSpacing.main }}m</span>
        </div>
        <div>
          <span class="text-sm">Cross Tee:</span>
          <span class="font-semibold ml-2">{{ state.gridSpacing.cross }}m</span>
        </div>
      </div>
    </div>
  </StepCard>
</template>

<script setup>
import { inject } from 'vue';
import StepCard from '../../../components/StepCard.vue';
import SelectField from '../../../components/SelectField.vue';
import { STUD_TYPES, CONNECTION_TYPES, GRID_TYPES } from '../../data/suspendedCeilingData.js';

const state = inject('calculatorState');
const studTypeOptions = STUD_TYPES;
const connectionTypeOptions = CONNECTION_TYPES;
const gridTypeOptions = GRID_TYPES;
</script>
