<template>
  <div
    :class="[
      'border border-brand-black p-6 mb-6 transition-all',
      isActive ? 'bg-white' : 'bg-gray-50',
    ]"
  >
    <!-- Step Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <span
            :class="[
              'flex items-center justify-center w-8 h-8 border-2 border-brand-black text-sm font-bold',
              isComplete ? 'bg-black text-white' : 'bg-white text-black',
            ]"
          >
            {{ stepNumber }}
          </span>
          <h3 class="text-2xl font-semibold">{{ title }}</h3>
        </div>
        <p v-if="description" class="paragraph-18px text-gray-600 ml-11">
          {{ description }}
        </p>
      </div>
    </div>

    <!-- Step Content -->
    <div class="ml-11">
      <slot />
    </div>
  </div>
</template>

<script setup>
  defineProps({
    stepNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  });
</script>
