<template>
  <div class="border-t border-brand-black pt-8 mt-12">
    <h2 class="btn_12_text mb-6">Calculation Results</h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Left: Key Values -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Key Values</h3>
        <div class="space-y-3">
          <CalculationResult
            label="Seismic Weight"
            :value="state.seismicWeight"
            unit="kg/m²"
            :is-bold="true"
          />
          <CalculationResult
            label="Floor Factor"
            :value="state.floorFactorValue"
            :decimals="1"
          />
          <CalculationResult
            label="Seismic Force (SLS)"
            :value="state.seismicForces.sls"
            unit="kgf/m²"
          />
          <CalculationResult
            label="Seismic Force (ULS)"
            :value="state.seismicForces.uls"
            unit="kgf/m²"
            :is-bold="true"
          />
        </div>
      </div>

      <!-- Right: Limiting Lengths -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Limiting Lengths</h3>
        <div class="space-y-3">
          <CalculationResult
            label="Limiting Main Tee Length (ULS)"
            :value="state.adjustedLimitingLengths.uls.main"
            unit="m"
            :is-bold="true"
            description="Maximum allowable main tee length"
          />
          <CalculationResult
            label="Limiting Cross Tee Length (ULS)"
            :value="state.adjustedLimitingLengths.uls.cross"
            unit="m"
            :is-bold="true"
            description="Maximum allowable cross tee length"
          />
        </div>

        <div class="mt-6 space-y-3">
          <div class="flex items-center gap-2">
            <span
              :class="[
                'w-6 h-6 flex items-center justify-center border-2 border-brand-black font-bold',
                state.designValidation.mainPass
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white',
              ]"
            >
              {{ state.designValidation.mainPass ? "✓" : "✗" }}
            </span>
            <span class="text-sm">
              Main Tee: {{ state.maxMainTee.toFixed(1) }}m
              {{ state.designValidation.mainPass ? "≤" : ">" }}
              {{ state.designValidation.governingMain.toFixed(1) }}m
            </span>
          </div>

          <div class="flex items-center gap-2">
            <span
              :class="[
                'w-6 h-6 flex items-center justify-center border-2 border-brand-black font-bold',
                state.designValidation.crossPass
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white',
              ]"
            >
              {{ state.designValidation.crossPass ? "✓" : "✗" }}
            </span>
            <span class="text-sm">
              Cross Tee: {{ state.maxCrossTee.toFixed(1) }}m
              {{ state.designValidation.crossPass ? "≤" : ">" }}
              {{ state.designValidation.governingCross.toFixed(1) }}m
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Design Recommendation -->
    <InfoBox
      :variant="
        state.designValidation.mainPass && state.designValidation.crossPass
          ? 'info'
          : 'warning'
      "
      title="Design Recommendation"
    >
      {{ state.designValidation.recommendation }}
    </InfoBox>

    <!-- Grid Strengthening Notes -->
    <ConditionalSection
      :show="
        state.strengtheningDistances &&
        (state.strengtheningDistances.main > 0 ||
          state.strengtheningDistances.cross > 0)
      "
    >
      <div class="mt-6">
        <h4 class="btn_12_text mb-3">Grid Strengthening Requirements</h4>
        <div class="space-y-2">
          <p v-if="state.strengtheningDistances.main > 0" class="text-sm">
            <strong>Main Tee:</strong> Grid strengthening required for
            {{ state.strengtheningDistances.main.toFixed(1) }}m from the fixed
            edge
          </p>
          <p v-if="state.strengtheningDistances.cross > 0" class="text-sm">
            <strong>Cross Tee:</strong> Grid strengthening required for
            {{ state.strengtheningDistances.cross.toFixed(1) }}m from the fixed
            edge
          </p>
        </div>
      </div>
    </ConditionalSection>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import CalculationResult from '../../../components/CalculationResult.vue';
import InfoBox from '../../../components/InfoBox.vue';
import ConditionalSection from '../../../components/ConditionalSection.vue';

const state = inject('calculatorState');
</script>
