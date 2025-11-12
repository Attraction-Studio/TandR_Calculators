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
            v-model="state.gridMass"
            label="Grid Type"
            :options="gridMassOptions"
            @update:model-value="onGridMassChange"
          />
          <div
            class="mt-8 p-6 border border-gray-300 flex justify-center items-center"
          >
            <img v-if="gridImage" :src="gridImage.src" :alt="gridImage.alt" />
          </div>
          <ConditionalSection class="mt-8" :show="!!gridMassNote">
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
            v-model.number="state.tileMass"
            label="Tile Mass"
            type="number"
            step="0.1"
            min="0"
          />

          <button
            type="button"
            @click="showCommonTiles = !showCommonTiles"
            class="bg-[#333] !text-white px-4 py-2 text-sm mt-2 flex items-center gap-2"
          >
            {{ showCommonTiles ? "Hide" : "Show" }} Common Tiles
            <svg
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'rotate-180': showCommonTiles }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
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
              v-model.number="state.luminaries"
              label="Luminaires"
              type="number"
              step="0.1"
              min="0"
            />

            <InputField
              id="insulation"
              v-model.number="state.insulation"
              label="Insulation"
              type="number"
              step="0.1"
              min="0"
            />

            <InputField
              id="other-loads"
              v-model.number="state.otherLoads"
              label="Other"
              type="number"
              step="0.1"
              min="0"
            />

            <InputField
              id="dead-load"
              v-model.number="state.deadLoad"
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
        <div class="bg-gray-100 p-6 sticky top-4">
          <h4 class="btn_12_text mb-4 border-b border-brand-black pb-2">
            Total Seismic Weight
          </h4>
          <div class="text-4xl font-bold mb-6">
            {{ state.seismicWeight.value.toFixed(1) }}
            <span class="text-2xl">kg/m²</span>
          </div>

          <div v-if="state.seismicWeight.value > 24.78" class="mb-4">
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-start gap-3"
            >
              <svg
                class="w-6 h-6 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <p>The maximum allowable ceiling weight is 24.78 kg/m²</p>
            </div>
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

  const gridImage = computed(() => {
    const images = {
      1.1: {
        src: "https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/69128151a8058c7604b90fb4_scs_step2image1.jpg",
        alt: "Main Tee @ 1200kg/m² | Cross Tee @ 600kg/m²",
      },
      1.6: {
        src: "https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/69128151e9e6a5b8e0e771c8_scs_step2image3.jpg",
        alt: "Main Tee @ 1200kg/m² | Cross Tee @ 600kg/m² | Additional Cross Tee @ 600kg/m²",
      },
      1.8: {
        src: "https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/69128151e9e6a5b8e0e771cb_scs_step2image4.jpg",
        alt: "Main Tee @ 600kg/m² | Cross Tee @ 600kg/m²",
      },
      1.4: {
        src: "https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/691281513c47c4946c75648f_scs_step2image2.jpg",
        alt: "Main Tee @ 600kg/m² | Cross Tee @ 1200kg/m²",
      },
    };
    return images[state.gridMass.value] || null;
  });

  function onGridMassChange() {
    // Grid spacing is automatically computed in the composable
  }

  function selectTile(mass) {
    state.tileMass.value = mass;
    showCommonTiles.value = false;
  }
</script>
