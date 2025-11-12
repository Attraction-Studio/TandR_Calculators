<template>
  <StepCard
    :step-number="5"
    title="Design Options"
    description="Configure grid strengthening and special conditions"
    :is-complete="state.step5Complete.value"
  >
    <div class="space-y-8">
      <QuestionCard
        question-title="Specify the location of the first Main Tee connection?"
        info-title="Connection Location"
      >
        <template #context>
          <p class="mb-3">
            If you wish to specify the location of the first tee
            connections, full lengths of main tees are to be used around
            the fixed edges of the ceilings.
          </p>
          <p class="text-sm text-gray-600">
            When yes is selected, the limiting lengths are increased by
            3.0m.
          </p>
        </template>

        <template #answer>
          <RadioGroup
            id="specify-connection"
            v-model="state.specifyMainConnection"
            label="Specify Connection Location?"
            :options="yesNoOptions"
          />
        </template>
      </QuestionCard>

      <QuestionCard
        question-title="Grid Strengthening Options"
        info-title="About Grid Strengthening"
      >
        <template #context>
          <p class="mb-3">
            The T&R 4-way clip can be installed at main or cross tee
            connections, allowing the limiting tee length to be increased
            in some cases.
          </p>
        </template>

        <template #info>
          <p>
            Grid strengthening is used when tee lengths exceed capacity
            limits. Clips are installed at connection points to increase
            strength.
          </p>
        </template>

        <template #answer>
          <div class="space-y-4">
            <RadioGroup
              id="strengthen-main"
              v-model="state.strengthenMain"
              label="Strengthen Main Tees?"
              :options="yesNoOptions"
            />

            <RadioGroup
              id="strengthen-cross"
              v-model="state.strengthenCross"
              label="Strengthen Cross Tees?"
              :options="yesNoOptions"
            />
          </div>
        </template>
      </QuestionCard>

      <QuestionCard
        question-title="Is the ceiling raked?"
        info-title="Rake Angle Information"
      >
        <template #context>
          <p class="mb-3">
            A raked ceiling is one that is angled from the horizontal. The
            maximum allowable rake is 20 degrees.
          </p>
        </template>

        <template #info>
          <p>
            Rake angles affect seismic calculations by modifying the
            effective tee lengths. Specific design by a qualified engineer
            is required for angles exceeding 20°.
          </p>
        </template>

        <template #answer>
          <RadioGroup
            id="is-raked"
            v-model="state.isRaked"
            label="Ceiling Raked?"
            :options="yesNoOptions"
          />

          <ConditionalSection :show="state.isRaked.value === 'yes'">
            <InputField
              id="rake-angle"
              v-model.number="state.rakeAngle"
              label="Rake Angle (degrees)"
              type="number"
              step="0.1"
              min="0"
              :max="20"
              :error="state.rakeAngleError"
              hint="Maximum 20 degrees"
              class="mt-4"
            />
          </ConditionalSection>
        </template>
      </QuestionCard>
    </div>
  </StepCard>
</template>

<script setup>
import { inject } from 'vue';
import StepCard from '../../../components/StepCard.vue';
import QuestionCard from '../../../components/QuestionCard.vue';
import RadioGroup from '../../../components/RadioGroup.vue';
import InputField from '../../../components/InputField.vue';
import ConditionalSection from '../../../components/ConditionalSection.vue';
import { YES_NO_OPTIONS } from '../../data/suspendedCeilingData.js';

const state = inject('calculatorState');
const yesNoOptions = YES_NO_OPTIONS;
</script>
