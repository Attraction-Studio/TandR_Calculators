<template>
  <StepCard
    :step-number="6"
    title="Measured Tee Lengths"
    description="Enter the maximum measured tee lengths as per plans supplied"
    :is-complete="state.step6Complete.value"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InputField
        id="max-main-tee"
        v-model.number="state.maxMainTee"
        label="Max Main Tee Length (m)"
        type="number"
        step="0.1"
        min="0"
        required
      />

      <InputField
        id="max-cross-tee"
        v-model.number="state.maxCrossTee"
        label="Max Cross Tee Length (m)"
        type="number"
        step="0.1"
        min="0"
        required
      />
    </div>
  </StepCard>
</template>

<script setup>
import { inject } from 'vue';
import StepCard from '../../../components/StepCard.vue';
import InputField from '../../../components/InputField.vue';

const state = inject('calculatorState');
</script>
