<template>
  <div>
    <h2 class="global-step-title">Seismic Weight</h2>
    <p class="paragraph-18px mb-6">
      Enter or select the corresponding values in the column on the right and
      sum all the component weights to get a total seismic weight. This value
      will be used in the following steps this worksheet.
    </p>
    <div class="flex lg:flex-row flex-col gap-6">
      <!-- Left: Inputs -->
      <div class="lg:w-1/2 w-full space-y-8">
        <!-- Grid Mass Section -->
        <div>
          <h3 class="font-semibold text-lg mb-4">Grid Mass</h3>
          <SelectField
            id="grid-mass"
            v-model="state.gridMass.value"
            label="Grid Type"
            :options="gridMassOptions"
            @update:model-value="onGridMassChange"
          />

          <ConditionalSection :show="!!gridMassNote">
            <InfoBox variant="warning" :title="gridMassNote.title">
              {{ gridMassNote.text }}
            </InfoBox>
          </ConditionalSection>
        </div>

        <!-- Tile Mass Section -->
        <div>
          <h3 class="font-semibold text-lg mb-4">Tile Mass (kg/m²)</h3>
          <InputField
            id="tile-mass"
            v-model.number="state.tileMass.value"
            label="Tile Mass"
            type="number"
            step="0.1"
            min="0"
          />

          <button
            type="button"
            @click="showCommonTiles = !showCommonTiles"
            class="text-blue-600 hover:underline text-sm mt-2"
          >
            {{ showCommonTiles ? "Hide" : "Show" }} Common Tiles
          </button>

          <div
            v-if="showCommonTiles"
            class="mt-4 border border-gray-300 rounded overflow-hidden"
          >
            <table class="w-full text-sm">
              <thead class="bg-gray-100">
                <tr>
                  <th class="text-left p-2 border-b border-gray-300">Tile</th>
                  <th class="text-left p-2 border-b border-gray-300">
                    Weight kg/m²
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="tile in tileMassOptions"
                  :key="tile.type"
                  @click="selectTile(tile.mass)"
                  class="cursor-pointer hover:bg-blue-50 transition-colors"
                  :class="{ 'bg-blue-100': state.tileMass.value === tile.mass }"
                >
                  <td class="p-2 border-b border-gray-200">{{ tile.type }}</td>
                  <td class="p-2 border-b border-gray-200">{{ tile.mass }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Services Section -->
        <div>
          <h3 class="font-semibold text-lg mb-4">Services (kg/m²)</h3>
          <div class="space-y-4">
            <InputField
              id="luminaries"
              v-model.number="state.luminaries.value"
              label="Luminaires"
              type="number"
              step="0.1"
              min="0"
            />

            <InputField
              id="insulation"
              v-model.number="state.insulation.value"
              label="Insulation"
              type="number"
              step="0.1"
              min="0"
            />

            <InputField
              id="other-loads"
              v-model.number="state.otherLoads.value"
              label="Other"
              type="number"
              step="0.1"
              min="0"
            />

            <InputField
              id="dead-load"
              v-model.number="state.deadLoad.value"
              label="Design Distributed Load (min 3 kg/m²)"
              type="number"
              step="0.1"
              min="3"
            />
          </div>
        </div>
      </div>

      <!-- Right: Live Calculation -->
      <div class="lg:w-1/2 w-full">
        <div class="border border-brand-black p-6 sticky top-4">
          <h4 class="btn_12_text mb-4 border-b border-brand-black pb-2">
            Total Seismic Weight
          </h4>
          <div class="text-4xl font-bold mb-6">
            {{ state.seismicWeight.value.toFixed(1) }}
            <span class="text-2xl">kg/m²</span>
          </div>

          <div class="space-y-2 text-sm mb-4">
            <div class="flex justify-between">
              <span>Grid Mass:</span>
              <span class="font-semibold"
                >{{ Number(state.gridMass.value || 0).toFixed(1) }} kg/m²</span
              >
            </div>
            <div class="flex justify-between">
              <span>Tile Mass:</span>
              <span class="font-semibold"
                >{{ Number(state.tileMass.value || 0).toFixed(1) }} kg/m²</span
              >
            </div>
            <div class="flex justify-between">
              <span>Luminaries:</span>
              <span class="font-semibold"
                >{{ state.luminaries.value.toFixed(1) }} kg/m²</span
              >
            </div>
            <div class="flex justify-between">
              <span>Insulation:</span>
              <span class="font-semibold"
                >{{ state.insulation.value.toFixed(1) }} kg/m²</span
              >
            </div>
            <div class="flex justify-between">
              <span>Other:</span>
              <span class="font-semibold"
                >{{ state.otherLoads.value.toFixed(1) }} kg/m²</span
              >
            </div>
            <div class="flex justify-between border-t border-brand-black pt-2">
              <span>Dead Load:</span>
              <span class="font-semibold"
                >{{ state.deadLoad.value.toFixed(1) }} kg/m²</span
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
  </div>
</template>

<script setup>
  import { inject, computed, ref } from "vue";
  import StepCard from "../../../components/StepCard.vue";
  import SelectField from "../../../components/SelectField.vue";
  import InputField from "../../../components/InputField.vue";
  import ConditionalSection from "../../../components/ConditionalSection.vue";
  import InfoBox from "../../../components/InfoBox.vue";
  import {
    GRID_MASS_OPTIONS,
    TILE_MASS_OPTIONS,
  } from "../../data/suspendedCeilingData.js";

  const state = inject("calculatorState");
  const gridMassOptions = GRID_MASS_OPTIONS;
  const tileMassOptions = TILE_MASS_OPTIONS;
  const showCommonTiles = ref(false);

  const gridMassNote = computed(() => {
    const option = GRID_MASS_OPTIONS.find(
      (opt) => opt.value === Number(state.gridMass.value)
    );
    if (option?.warning) {
      return {
        title: "Grid Configuration Note",
        text: option.warning,
      };
    }
    return null;
  });

  function onGridMassChange() {
    // Grid spacing is automatically computed in the composable
  }

  function selectTile(mass) {
    state.tileMass.value = mass;
    showCommonTiles.value = false;
  }
</script>
