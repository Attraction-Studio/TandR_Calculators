<template>
  <div class="p-4 border border-brand-black">
    <p class="text-sm text-gray-600 mb-1">{{ label }}</p>
    <p class="text-2xl font-bold">
      {{ formattedValue }}
      <span v-if="unit" class="text-lg font-normal text-gray-600 ml-1">
        {{ unit }}
      </span>
    </p>
  </div>
</template>

<script setup>
  import { computed } from "vue";

  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [Number, String],
      required: true,
    },
    unit: {
      type: String,
      default: "",
    },
    decimals: {
      type: Number,
      default: 2,
    },
  });

  const formattedValue = computed(() => {
    if (typeof props.value === "number") {
      return props.value.toFixed(props.decimals);
    }
    return props.value;
  });
</script>
