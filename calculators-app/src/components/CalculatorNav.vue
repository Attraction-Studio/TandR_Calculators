<template>
  <nav aria-label="Calculator navigation">
    <div class="tab-scroll">
      <div class="tab-track" ref="trackRef">
        <!-- Sliding background -->
        <span class="tab-slider" :style="sliderStyle" />

        <button
          v-for="calc in calculators"
          :key="calc.id"
          :ref="(el) => setTabRef(calc.id, el)"
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
  import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";

  const props = defineProps({
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

  const trackRef = ref(null);
  const tabRefs = {};

  function setTabRef(id, el) {
    if (el) tabRefs[id] = el;
  }

  const sliderLeft = ref(0);
  const sliderTop = ref(0);
  const sliderWidth = ref(0);
  const sliderHeight = ref(0);
  const hasInitialized = ref(false);

  function updateSlider() {
    const activeTab = tabRefs[props.activeCalculator];
    const track = trackRef.value;
    if (activeTab && track) {
      const trackRect = track.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      sliderLeft.value = tabRect.left - trackRect.left;
      sliderTop.value = tabRect.top - trackRect.top;
      sliderWidth.value = tabRect.width;
      sliderHeight.value = tabRect.height;
      hasInitialized.value = true;
    }
  }

  const sliderStyle = computed(() => ({
    transform: `translate(${sliderLeft.value}px, ${sliderTop.value}px)`,
    width: `${sliderWidth.value}px`,
    height: `${sliderHeight.value}px`,
    transition: hasInitialized.value
      ? "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      : "none",
  }));

  watch(
    () => props.activeCalculator,
    () => nextTick(updateSlider),
  );

  onMounted(() => {
    nextTick(updateSlider);
    window.addEventListener("resize", updateSlider);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateSlider);
  });
</script>

<style scoped>
  .tab-track {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    background-color: black;
  }

  @media (min-width: 1024px) {
    .tab-track {
      flex-direction: row;
    }
  }

  .tab-slider {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    pointer-events: none;
    z-index: 0;
  }

  .tab {
    position: relative;
    z-index: 1;
    padding: 0.625rem 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    text-align: left;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: white !important;
    transition: color 0.4s ease;
  }

  .tab:hover:not(.tab--active):not(.tab--disabled) {
    color: #ccc !important;
  }

  @media (min-width: 1024px) {
    .tab {
      padding: 0.75rem 1.5rem;
      font-size: 0.8125rem;
    }
  }

  .tab--active {
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
    background-color: white;
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
