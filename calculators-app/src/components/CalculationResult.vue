<template>
  <div class="flex justify-between items-center py-3 border-b border-brand-black">
    <div class="flex-1">
      <span class="text-sm">{{ label }}</span>
      <p v-if="description" class="text-xs text-gray-600 mt-1">
        {{ description }}
      </p>
    </div>
    <div class="text-right">
      <span :class="['text-lg', isBold ? 'font-bold' : 'font-normal']">
        {{ formattedValue }}
      </span>
      <span v-if="unit" class="text-lg font-normal text-gray-600 ml-1">
        {{ unit }}
      </span>
      <div v-if="secondaryValue" class="text-sm text-gray-600 mt-1">
        {{ secondaryLabel }}: {{ secondaryValue }}
        <span v-if="secondaryUnit" class="ml-1">{{ secondaryUnit }}</span>
      </div>
    </div>
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
      default: 1,
    },
    description: {
      type: String,
      default: "",
    },
    isBold: {
      type: Boolean,
      default: false,
    },
    secondaryLabel: {
      type: String,
      default: "",
    },
    secondaryValue: {
      type: [Number, String],
      default: "",
    },
    secondaryUnit: {
      type: String,
      default: "",
    },
  });

  const formattedValue = computed(() => {
    if (typeof props.value === "number") {
      return props.value.toFixed(props.decimals);
    }
    return props.value;
  });
</script>
