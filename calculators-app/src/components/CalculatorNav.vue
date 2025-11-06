<template>
  <nav class="mb-8" aria-label="Calculator navigation">
    <ul class="flex flex-wrap gap-2">
      <li v-for="calc in calculators" :key="calc.id">
        <button
          :id="`calc-nav-${calc.id}`"
          :aria-pressed="activeCalculator === calc.id"
          :aria-label="`Switch to ${calc.name} calculator`"
          :disabled="!calc.available"
          :class="[
            'px-4 py-2 text-sm font-medium transition-colors',
            activeCalculator === calc.id
              ? 'bg-gray-200 border border-gray-300'
              : 'bg-white border border-gray-200 hover:bg-gray-50',
            !calc.available
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer',
          ]"
          @click="$emit('select', calc.id)"
        >
          {{ calc.id }} {{ calc.name }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
  defineProps({
    calculators: {
      type: Array,
      required: true,
    },
    activeCalculator: {
      type: String,
      required: true,
    },
  });

  defineEmits(["select"]);
</script>
