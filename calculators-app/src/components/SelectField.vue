<template>
  <div class="mb-4">
    <label :for="id" class="block btn_12_text mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500" aria-label="required">*</span>
    </label>
    <select
      :id="id"
      :value="modelValue"
      :class="[
        'w-full px-4 py-2 border border-brand-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors',
        error ? 'border-red-500' : '',
      ]"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="error ? `${id}-error` : undefined"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :data-note="option.note"
      >
        {{ option.label }}
      </option>
    </select>
    <p
      v-if="error"
      :id="`${id}-error`"
      class="mt-1 text-sm text-red-600"
      role="alert"
    >
      {{ error }}
    </p>
    <p v-if="hint && !error" class="mt-1 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
  defineProps({
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    options: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(
          (option) =>
            typeof option === "object" &&
            "value" in option &&
            "label" in option
        );
      },
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
    hint: {
      type: String,
      default: "",
    },
  });

  defineEmits(["update:modelValue"]);
</script>
