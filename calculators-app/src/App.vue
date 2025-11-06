<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Calculator Navigation -->
      <CalculatorNav
        :calculators="calculators"
        :active-calculator="activeCalculator"
        @select="selectCalculator"
      />

      <!-- Active Calculator Component -->
      <div class="mt-8">
        <component :is="activeComponent" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CalculatorNav from './components/CalculatorNav.vue';
import CeilingComponentsEstimator from './calculators/CeilingComponentsEstimator.vue';

// Calculator registry
const calculators = [
  {
    id: '1',
    name: 'Ceiling Components Estimator',
    component: CeilingComponentsEstimator,
    available: true,
  },
  {
    id: '2',
    name: 'Seismic Calculator',
    component: null,
    available: false,
  },
  {
    id: '3',
    name: 'Seismic Calculator - Plasterboard',
    component: null,
    available: false,
  },
  {
    id: '4',
    name: 'Seismic Calculator - Baffle Ceilings',
    component: null,
    available: false,
  },
];

// Active calculator state
const activeCalculator = ref('1');

// Get active calculator component
const activeComponent = computed(() => {
  const calc = calculators.find((c) => c.id === activeCalculator.value);
  return calc?.component || null;
});

// Select calculator
function selectCalculator(id) {
  const calc = calculators.find((c) => c.id === id);
  if (calc && calc.available) {
    activeCalculator.value = id;
  }
}
</script>

