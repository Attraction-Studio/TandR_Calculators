<template>
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 max-h-0"
    enter-to-class="opacity-100 max-h-screen"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 max-h-screen"
    leave-to-class="opacity-0 max-h-0"
  >
    <div v-if="show" class="overflow-hidden">
      <slot />
    </div>
  </transition>
</template>

<script setup>
  defineProps({
    show: {
      type: Boolean,
      required: true,
    },
  });
</script>
