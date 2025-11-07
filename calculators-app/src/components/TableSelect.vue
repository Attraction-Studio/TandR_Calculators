<template>
  <div class="mb-4">
    <label v-if="label" class="block btn_12_text mb-3">
      {{ label }}
      <span v-if="required" class="text-red-500" aria-label="required">*</span>
    </label>
    <div class="border border-brand-black overflow-hidden">
      <table class="w-full">
        <thead v-if="showHeaders">
          <tr class="border-b border-brand-black bg-gray-50">
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="px-4 py-2 text-left text-sm font-semibold"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(option, index) in options"
            :key="option.value"
            :class="[
              'cursor-pointer transition-colors border-b border-brand-black last:border-b-0',
              modelValue === option.value
                ? 'bg-black text-white'
                : 'hover:bg-gray-50',
            ]"
            @click="selectOption(option.value)"
          >
            <td
              v-for="(col, colIndex) in columns"
              :key="colIndex"
              class="px-4 py-3 text-sm"
            >
              {{ option[col] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="hint" class="mt-2 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
  const props = defineProps({
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
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
          (option) => typeof option === "object" && "value" in option
        );
      },
    },
    columns: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every((col) => typeof col === "string");
      },
    },
    headers: {
      type: Array,
      default: () => [],
    },
    showHeaders: {
      type: Boolean,
      default: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      default: "",
    },
  });

  const emit = defineEmits(["update:modelValue"]);

  function selectOption(value) {
    emit("update:modelValue", value);
  }
</script>
