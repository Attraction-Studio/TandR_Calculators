<template>
  <div class="mb-8 flex lg:flex-row flex-col gap-6">
    <!-- Left Column: Information/Context -->
    <div class="lg:w-1/2 w-full">
      <h4 v-if="questionTitle" class="text-xl font-semibold mb-3">
        {{ questionTitle }}
      </h4>
      <div class="paragraph-18px text-gray-700">
        <slot name="context" />
      </div>
      <InfoBox
        v-if="infoTitle || $slots.info"
        :variant="infoVariant"
        :title="infoTitle"
        class="mt-4"
      >
        <slot name="info" />
      </InfoBox>
    </div>

    <!-- Right Column: Question/Input -->
    <div class="lg:w-1/2 w-full flex flex-col justify-center">
      <div
        class="border border-brand-black p-6 bg-white"
        :class="highlightAnswer ? 'ring-2 ring-gray-300' : ''"
      >
        <slot name="answer" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import InfoBox from "./InfoBox.vue";

  defineProps({
    questionTitle: {
      type: String,
      default: "",
    },
    infoTitle: {
      type: String,
      default: "",
    },
    infoVariant: {
      type: String,
      default: "info",
      validator: (value) => ["default", "warning", "info"].includes(value),
    },
    highlightAnswer: {
      type: Boolean,
      default: false,
    },
  });
</script>
