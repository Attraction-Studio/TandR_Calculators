<template>
  <StepCard
    :step-number="3"
    title="Seismic Weight Components"
    description="Enter the weight of all ceiling components"
    :is-complete="state.step3Complete"
  >
    <div class="flex lg:flex-row flex-col gap-6">
      <!-- Left: Inputs -->
      <div class="lg:w-1/2 w-full space-y-6">
        <SelectField
          id="grid-mass"
          v-model="state.gridMass"
          label="Grid Type"
          :options="gridMassOptions"
          @update:model-value="onGridMassChange"
        />

        <ConditionalSection :show="gridMassNote">
          <InfoBox variant="warning" :title="gridMassNote.title">
            {{ gridMassNote.text }}
          </InfoBox>
        </ConditionalSection>

        <TableSelect
          id="tile-mass"
          v-model="state.tileMass"
          label="Tile Type"
          :options="tileMassOptions"
          :columns="['type', 'mass']"
          :headers="['Tile Type', 'Mass (kg/m²)']"
          hint="Click a row to select"
        />

        <InputField
          id="luminaries"
          v-model.number="state.luminaries"
          label="Luminaries (kg/m²)"
          type="number"
          step="0.1"
          min="0"
        />

        <InputField
          id="insulation"
          v-model.number="state.insulation"
          label="Insulation (kg/m²)"
          type="number"
          step="0.1"
          min="0"
        />

        <InputField
          id="other-loads"
          v-model.number="state.otherLoads"
          label="Other Loads (kg/m²)"
          type="number"
          step="0.1"
          min="0"
        />
      </div>

      <!-- Right: Live Calculation -->
      <div class="lg:w-1/2 w-full">
        <div class="border border-brand-black p-6 sticky top-4">
          <h4 class="btn_12_text mb-4 border-b border-brand-black pb-2">
            Total Seismic Weight
          </h4>
          <div class="text-4xl font-bold mb-6">
            {{ state.seismicWeight.toFixed(1) }}
            <span class="text-2xl">kg/m²</span>
          </div>

          <div class="space-y-2 text-sm mb-4">
            <div class="flex justify-between">
              <span>Grid Mass:</span>
              <span class="font-semibold"
                >{{ Number(state.gridMass || 0).toFixed(1) }} kg/m²</span
              >
            </div>
            <div class="flex justify-between">
              <span>Tile Mass:</span>
              <span class="font-semibold"
                >{{ Number(state.tileMass || 0).toFixed(1) }} kg/m²</span
              >
            </div>
            <div class="flex justify-between">
              <span>Luminaries:</span>
              <span class="font-semibold"
                >{{ state.luminaries.toFixed(1) }} kg/m²</span
              >
            </div>
            <div class="flex justify-between">
              <span>Insulation:</span>
              <span class="font-semibold"
                >{{ state.insulation.toFixed(1) }} kg/m²</span
              >
            </div>
            <div class="flex justify-between">
              <span>Other:</span>
              <span class="font-semibold"
                >{{ state.otherLoads.toFixed(1) }} kg/m²</span
              >
            </div>
            <div
              class="flex justify-between border-t border-brand-black pt-2"
            >
              <span>Dead Load:</span>
              <span class="font-semibold"
                >{{ state.deadLoad.toFixed(1) }} kg/m²</span
              >
            </div>
          </div>

          <InfoBox
            v-if="state.weightValidation.error"
            variant="warning"
            title="Weight Limit Exceeded"
          >
            {{ state.weightValidation.error }}
          </InfoBox>
        </div>
      </div>
    </div>
  </StepCard>
</template>

<script setup>
import { inject, computed } from 'vue';
import StepCard from '../../../components/StepCard.vue';
import SelectField from '../../../components/SelectField.vue';
import InputField from '../../../components/InputField.vue';
import TableSelect from '../../../components/TableSelect.vue';
import ConditionalSection from '../../../components/ConditionalSection.vue';
import InfoBox from '../../../components/InfoBox.vue';
import { GRID_MASS_OPTIONS, TILE_MASS_OPTIONS } from '../../data/suspendedCeilingData.js';

const state = inject('calculatorState');
const gridMassOptions = GRID_MASS_OPTIONS;
const tileMassOptions = TILE_MASS_OPTIONS;

const gridMassNote = computed(() => {
  const option = GRID_MASS_OPTIONS.find(
    (opt) => opt.value === Number(state.gridMass)
  );
  if (option?.warning) {
    return {
      title: 'Grid Configuration Note',
      text: option.warning,
    };
  }
  return null;
});

function onGridMassChange() {
  // Grid spacing is automatically computed in the composable
}
</script>
