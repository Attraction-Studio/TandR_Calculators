<template>
  <div class="my-8 p-6 bg-gray-50">
    <h3 v-if="title" class="text-lg font-semibold mb-4">{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>
