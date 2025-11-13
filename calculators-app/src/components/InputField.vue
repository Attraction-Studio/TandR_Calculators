<template>
  <div class="mb-4">
    <label :for="id" class="block btn_12_text mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500" aria-label="required">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :step="step"
      :min="min"
      :max="max"
      :value="modelValue ?? ''"
      :class="[
        'w-full px-4 py-2 border border-brand-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors',
        error ? 'border-red-500' : '',
      ]"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="error ? `${id}-error` : undefined"
      @input="handleInput"
    />
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
  const props = defineProps({
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
    type: {
      type: String,
      default: "text",
    },
    step: {
      type: [String, Number],
      default: undefined,
    },
    min: {
      type: [String, Number],
      default: undefined,
    },
    max: {
      type: [String, Number],
      default: undefined,
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

  const emit = defineEmits(["update:modelValue"]);

  function handleInput(event) {
    const value = event.target.value;
    // If type is number, convert to number
    if (props.type === 'number') {
      if (value === '' || value === null || value === undefined) {
        // For empty values, emit null so the input can be cleared
        emit('update:modelValue', null);
      } else {
        const numValue = Number(value);
        emit('update:modelValue', isNaN(numValue) ? null : numValue);
      }
    } else {
      emit('update:modelValue', value);
    }
  }
</script>
