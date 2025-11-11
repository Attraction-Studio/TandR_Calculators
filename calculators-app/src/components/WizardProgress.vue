<template>
  <div class="relative mb-12">
    <!-- Step Indicators -->
    <p class="text-xl font-semibold mb-4">Steps</p>
    <div class="flex items-start w-full">
      <div v-for="step in steps" :key="step.number" class="flex flex-row mr-2">
        <!-- Circle Indicator -->
        <div
          :class="[
            'w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300',
            step.number < currentStep
              ? 'bg-green-500 border-green-500 text-white'
              : step.number === currentStep
              ? 'bg-[#333] border-[#333] !text-white scale-110'
              : 'bg-white border-[#333] text-[#333]',
          ]"
        >
          <span v-if="step.number < currentStep">✓</span>
          <span v-else>{{ step.number }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";

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
