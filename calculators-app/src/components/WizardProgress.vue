<template>
  <div class="relative mb-12">
    <!-- Step Indicators -->
    <p class="text-xl font-semibold mb-4">Steps</p>

    <!-- Desktop: Show all steps -->
    <div class="hidden md:flex items-start w-full">
      <div v-for="step in steps" :key="step.number" class="flex flex-row mr-2">
        <!-- Circle Indicator -->
        <div
          :class="[
            'w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300',
            step.number < currentStep
              ? 'bg-[#3C999B] border-[#3C999B] !text-white'
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

    <!-- Mobile: Condensed view (current - 1, current, current + 2, ..., 9) -->
    <div class="flex md:hidden items-center gap-1.5">
      <!-- Previous step (if exists) -->
      <div v-if="currentStep > 1" class="flex-shrink-0">
        <div
          class="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold bg-[#3C999B] border-[#3C999B] !text-white"
        >
          ✓
        </div>
      </div>

      <!-- Current step -->
      <div class="flex-shrink-0">
        <div
          class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold bg-[#333] border-[#333] !text-white"
        >
          {{ currentStep }}
        </div>
      </div>

      <!-- Next 2 steps -->
      <div
        v-for="stepNum in visibleNextSteps"
        :key="stepNum"
        class="flex-shrink-0"
      >
        <div
          class="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold bg-white border-[#333] text-[#333]"
        >
          {{ stepNum }}
        </div>
      </div>

      <!-- Ellipsis -->
      <div v-if="showEllipsis" class="flex-shrink-0 px-1">
        <span class="text-[#333] font-bold text-sm">...</span>
      </div>

      <!-- Final step (9) -->
      <div v-if="showFinalStep" class="flex-shrink-0">
        <div
          class="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold bg-white border-[#333] text-[#333]"
        >
          {{ totalSteps }}
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

  const totalSteps = computed(() => props.steps.length);

  // Mobile: Show next 2 steps from current
  const visibleNextSteps = computed(() => {
    const steps = [];
    const maxForward = 2;
    for (let i = 1; i <= maxForward; i++) {
      const nextStep = props.currentStep + i;
      if (nextStep <= totalSteps.value) {
        steps.push(nextStep);
      }
    }
    return steps;
  });

  // Show ellipsis if there's a gap between visible steps and final step
  const showEllipsis = computed(() => {
    return props.currentStep + 2 < totalSteps.value - 1;
  });

  // Show final step if it's not already in visible range
  const showFinalStep = computed(() => {
    return props.currentStep + 2 < totalSteps.value;
  });
</script>
