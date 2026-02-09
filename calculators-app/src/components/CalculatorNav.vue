<template>
  <nav
    class="mb-12 border-b border-gray-200 pb-12"
    aria-label="Calculator navigation"
  >
    <ul class="flex flex-wrap gap-2">
      <li v-for="calc in calculators" :key="calc.id">
        <button
          :id="`calc-nav-${calc.id}`"
          :aria-pressed="activeCalculator === calc.id"
          :aria-label="`Switch to ${calc.name} calculator`"
          :disabled="!calc.available"
          :class="[
            'nav-tab px-4 py-2 text-md lg:text-lg font-medium relative',
            activeCalculator === calc.id ? 'nav-tab--active' : '',
            !calc.available
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer',
          ]"
          @click="$emit('select', calc.id)"
        >
          {{ calc.name }}
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

<style scoped>
  .nav-tab {
    position: relative;
  }

  .nav-tab::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-brand-black, #1a1a1a);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  .nav-tab:hover::after {
    transform: scaleX(0.5);
  }

  .nav-tab--active::after {
    transform: scaleX(1);
  }

  .nav-tab--active:hover::after {
    transform: scaleX(1);
  }
</style>
