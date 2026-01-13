<template>
  <div class="min-h-screen">
    <div class="w-full py-8">
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
  import { ref, computed } from "vue";
  import CalculatorNav from "./components/CalculatorNav.vue";
  import CeilingComponentsEstimator from "./calculators/CeilingComponentsEstimator.vue";
  import SuspendedCeilingCalculator from "./calculators/SuspendedCeilingCalculator.vue";
  import PlasterboardCeilingCalculator from "./calculators/PlasterboardCeilingCalculator.vue";
  import BaffleCeilingCalculator from "./calculators/BaffleCeilingCalculator.vue";

  // Calculator registry
  const calculators = [
    {
      id: "1",
      name: "Ceiling Components Estimator",
      component: CeilingComponentsEstimator,
      available: true,
    },
    {
      id: "2",
      name: "Suspended Ceiling Seismic Calculator",
      component: SuspendedCeilingCalculator,
      available: true,
    },
    {
      id: "3",
      name: "Seismic Calculator - Plasterboard",
      component: PlasterboardCeilingCalculator,
      available: true,
    },
    {
      id: "4",
      name: "Seismic Calculator - Baffle Ceilings",
      component: BaffleCeilingCalculator,
      available: true,
    },
  ];

  // Active calculator state
  const activeCalculator = ref("1");

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
