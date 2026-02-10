<template>
  <nav aria-label="Calculator navigation">
    <div class="tab-scroll">
      <div class="tab-track">
        <button
          v-for="calc in calculators"
          :key="calc.id"
          :id="`calc-nav-${calc.id}`"
          :aria-pressed="activeCalculator === calc.id"
          :aria-label="`Switch to ${calc.name} calculator`"
          :disabled="!calc.available"
          :class="[
            'tab',
            activeCalculator === calc.id ? 'tab--active' : '',
            !calc.available ? 'tab--disabled' : '',
          ]"
          @click="$emit('select', calc.id)"
        >
          <span
            :class="[
              'tab-indicator',
              activeCalculator === calc.id ? 'tab-indicator--active' : '',
            ]"
          />
          {{ calc.name }}
        </button>
      </div>
    </div>
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
  .tab-track {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  @media (min-width: 1024px) {
    .tab-track {
      flex-direction: row;
    }
  }

  .tab {
    position: relative;
    padding: 0.625rem 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    text-align: left;
    cursor: pointer;
    border: none;
    background-color: black;
    color: white !important;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  .tab:hover:not(.tab--active):not(.tab--disabled) {
    background-color: #e4e4e4;
    color: black !important;
  }

  @media (min-width: 1024px) {
    .tab {
      padding: 0.75rem 1.5rem;
      font-size: 0.8125rem;
    }
  }

  .tab--active {
    background-color: #fff;
    color: black !important;
    font-weight: 600 !important;
  }

  .tab--disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .tab-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 8px;
    background-color: white;
    border-radius: 0;
    flex-shrink: 0;
    transition:
      border-radius 0.35s ease,
      background-color 0.3s ease,
      transform 0.4s ease;
  }

  .tab:hover:not(.tab--active) .tab-indicator {
    background-color: #1a1a1a;
    transform: rotate(45deg);
  }

  .tab--active .tab-indicator,
  .tab-indicator--active {
    background-color: #1a1a1a;
    border-radius: 50rem;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
</style>
