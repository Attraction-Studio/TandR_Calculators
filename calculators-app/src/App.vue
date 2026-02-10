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
      <div>
        <component :is="activeComponent" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import CalculatorNav from "./components/CalculatorNav.vue";
  import CeilingComponentsEstimator from "./calculators/CeilingComponentsEstimator.vue";
  import SuspendedCeilingCalculator from "./calculators/SuspendedCeilingCalculator.vue";
  import PlasterboardCeilingCalculator from "./calculators/PlasterboardCeilingCalculator.vue";
  import BaffleCeilingCalculator from "./calculators/BaffleCeilingCalculator.vue";

  // Calculator registry with URL slugs for deep linking
  const calculators = [
    {
      id: "1",
      slug: "ceiling-components-estimator",
      name: "Ceiling Components Estimator",
      component: CeilingComponentsEstimator,
      available: true,
    },
    {
      id: "2",
      slug: "suspended-ceiling-seismic-calculator",
      name: "Suspended Ceiling Seismic Calculator",
      component: SuspendedCeilingCalculator,
      available: true,
    },
    {
      id: "3",
      slug: "seismic-calculator-plasterboard",
      name: "Seismic Calculator - Plasterboard",
      component: PlasterboardCeilingCalculator,
      available: true,
    },
    {
      id: "4",
      slug: "seismic-calculator-baffle-ceilings",
      name: "Seismic Calculator - Baffle Ceilings",
      component: BaffleCeilingCalculator,
      available: true,
    },
  ];

  // Active calculator state
  const activeCalculator = ref("1");

  // Handle URL hash-based deep linking
  const setCalculatorFromHash = () => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const calc = calculators.find(
        (c) => c.id === hash || c.slug === hash.toLowerCase(),
      );
      if (calc && calc.available) {
        activeCalculator.value = calc.id;
      }
    }
  };

  onMounted(() => {
    // Set initial calculator from hash
    setCalculatorFromHash();
    // Listen for hash changes (e.g., back/forward navigation)
    window.addEventListener("hashchange", setCalculatorFromHash);
  });

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
