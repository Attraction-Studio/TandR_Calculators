<template>
  <div class="mb-12">
    <!-- Progress Bar -->
    <div class="relative">
      <div class="overflow-hidden h-2 mb-4 text-xs flex bg-gray-200 border border-brand-black">
        <div
          :style="{ width: progressPercentage + '%' }"
          class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-black transition-all duration-500"
        />
      </div>
    </div>

    <!-- Step Indicators -->
    <div class="flex justify-between items-start">
      <div
        v-for="step in steps"
        :key="step.number"
        class="flex flex-col items-center flex-1"
      >
        <!-- Circle Indicator -->
        <div
          :class="[
            'w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300',
            step.number < currentStep
              ? 'bg-green-500 border-green-500 text-white'
              : step.number === currentStep
              ? 'bg-brand-black border-brand-black text-white scale-110'
              : 'bg-white border-gray-300 text-gray-400'
          ]"
        >
          <span v-if="step.number < currentStep">✓</span>
          <span v-else>{{ step.number }}</span>
        </div>

        <!-- Step Label -->
        <div class="mt-2 text-center">
          <p
            :class="[
              'text-xs font-semibold',
              step.number <= currentStep ? 'text-brand-black' : 'text-gray-400'
            ]"
          >
            {{ step.label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  steps: {
    type: Array,
    required: true,
    // Format: [{ number: 1, label: 'Step Name' }, ...]
  },
  currentStep: {
    type: Number,
    required: true,
  },
});

const progressPercentage = computed(() => {
  return ((props.currentStep - 1) / (props.steps.length - 1)) * 100;
});
</script>
