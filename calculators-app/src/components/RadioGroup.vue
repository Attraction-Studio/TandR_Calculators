<template>
  <div class="mb-6">
    <label class="block btn_12_text mb-3">
      {{ label }}
    </label>
    <div
      class="flex flex-wrap gap-4"
      role="radiogroup"
      :aria-labelledby="`radio-group-${id}`"
    >
      <label
        v-for="option in options"
        :key="option.value"
        class="flex items-center cursor-pointer group"
        @click.stop="handleClick(option.value)"
      >
        <!-- Hidden native radio input for accessibility -->
        <input
          :id="`${id}-${option.value}`"
          :name="id"
          type="radio"
          :value="option.value"
          :checked="String(modelValue) === String(option.value)"
          class="sr-only"
          @change="handleChange"
        />
        <!-- Custom square radio button -->
        <span
          :class="[
            'mr-2 w-5 h-5 border-2 transition-colors',
            String(modelValue) === String(option.value)
              ? 'bg-black border-black'
              : 'bg-white border-brand-black group-hover:bg-gray-50',
          ]"
          aria-hidden="true"
        />
        <span class="text-sm">{{ option.label }}</span>
      </label>
    </div>
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
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
  });

  const emit = defineEmits(["update:modelValue"]);

  function handleClick(value) {
    const currentValue = String(props.modelValue);
    const newValue = String(value);
    if (currentValue !== newValue) {
      emit('update:modelValue', value);
    }
  }

  function handleChange(event) {
    const value = event.target.value;
    emit('update:modelValue', value);
  }
</script>
