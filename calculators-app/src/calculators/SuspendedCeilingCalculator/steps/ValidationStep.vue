<template>
  <StepCard
    :step-number="6"
    title="Measured Tee Lengths"
    description="Enter the maximum measured tee lengths as per plans supplied"
    :is-complete="state.step6Complete.value"
  >
    <div class="space-y-6">
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

      <!-- Connection Heights (for back brace calculations) -->
      <div class="border-t border-gray-300 pt-6">
        <h3 class="text-lg font-semibold mb-4">Connection Heights (Optional)</h3>
        <p class="text-sm text-gray-600 mb-4">
          These values override the default floor + ceiling height calculation for
          back brace and rigid hanger calculations. Leave blank to use default
          (floor height + ceiling height).
        </p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputField
            id="connection-height"
            v-model.number="state.connectionHeight"
            label="Connection Height (m) - Rigid Hanger"
            type="number"
            step="0.1"
            min="0"
            hint="Height from connection to overhead structure to ground level"
          />

          <InputField
            id="connection-height-2"
            v-model.number="state.connectionHeight2"
            label="Connection Height (m) - Back Brace"
            type="number"
            step="0.1"
            min="0"
            hint="Maximum height of back brace connection to overhead structure"
          />
        </div>
      </div>
    </div>
  </StepCard>
</template>

<script setup>
import { inject } from 'vue';
import StepCard from '../../../components/StepCard.vue';
import InputField from '../../../components/InputField.vue';

const state = inject('calculatorState');
</script>
