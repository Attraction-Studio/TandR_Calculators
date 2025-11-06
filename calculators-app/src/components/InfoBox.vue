<template>
  <div
    :class="[
      'p-4 border',
      variant === 'warning'
        ? 'bg-yellow-50 border-yellow-200'
        : variant === 'info'
        ? 'bg-blue-50 border-blue-200'
        : 'bg-gray-50 border-gray-200',
    ]"
    role="alert"
    :aria-live="variant === 'warning' ? 'polite' : 'off'"
  >
    <div class="flex items-start gap-3">
      <div
        v-if="showIcon"
        :class="[
          'flex-shrink-0 mt-0.5',
          variant === 'warning'
            ? 'text-yellow-600'
            : variant === 'info'
            ? 'text-blue-600'
            : 'text-gray-600',
        ]"
        aria-hidden="true"
      >
        <svg
          v-if="variant === 'warning'"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="flex-1">
        <h4
          v-if="title"
          :class="[
            'font-medium mb-1',
            variant === 'warning'
              ? 'text-yellow-800'
              : variant === 'info'
              ? 'text-blue-800'
              : '',
          ]"
        >
          {{ title }}
        </h4>
        <p
          :class="[
            'text-sm',
            variant === 'warning'
              ? 'text-yellow-700'
              : variant === 'info'
              ? 'text-blue-700'
              : '',
          ]"
        >
          <slot />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    variant: {
      type: String,
      default: "default",
      validator: (value) => ["default", "warning", "info"].includes(value),
    },
    title: {
      type: String,
      default: "",
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  });
</script>
