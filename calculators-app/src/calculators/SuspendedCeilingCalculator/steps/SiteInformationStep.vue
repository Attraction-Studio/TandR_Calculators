<template>
  <div>
    <h2 class="global-step-title">Site Information</h2>
    <p class="paragraph-18px mb-6">
      Enter details about your project location and building
    </p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SelectField
        id="zone-factor"
        :model-value="state.zoneFactor.value"
        @update:model-value="(val) => (state.zoneFactor.value = val)"
        label="Seismic Zone"
        :options="zoneFactorOptions"
        placeholder="Select your location"
        required
        hint="Select the closest location to your project"
      />

      <SelectField
        id="importance-level"
        :model-value="state.importanceLevel.value"
        @update:model-value="(val) => (state.importanceLevel.value = val)"
        label="Importance Level"
        :options="importanceLevelOptions"
        required
      />

      <InputField
        id="floor-height"
        :model-value="state.floorHeight.value"
        @update:model-value="(val) => (state.floorHeight.value = val)"
        label="Floor Height (m)"
        type="number"
        step="0.1"
        min="0"
        hint="Height from ground to floor level"
      />

      <InputField
        id="ceiling-height"
        :model-value="state.ceilingHeight.value"
        @update:model-value="(val) => (state.ceilingHeight.value = val)"
        label="Ceiling Height (m)"
        type="number"
        step="0.1"
        min="0"
        hint="Height from floor to ceiling"
      />

      <SelectField
        id="ductility"
        :model-value="state.ductility.value"
        @update:model-value="(val) => (state.ductility.value = val)"
        label="Ductility"
        :options="ductilityOptions"
        hint="Ductility factor for ULS calculations"
      >
        <template #info>
          <div class="text-sm space-y-2">
            <p>
              The ductility of a ceiling relates to the capability of the
              ceiling and it's connections to absorb and dissipate energy during
              an earthquake without failure.
            </p>
            <p>
              A higher ductility allows for a greater ability to absorb
              earthquake energy, and therefore results in larger limiting
              lengths. Using a ductility of 1.0 is the more conservative
              approach.
            </p>
            <p class="font-semibold">Standards guidance:</p>
            <ul class="list-disc pl-4 space-y-1">
              <li>
                <b>NZS2785:2020</b>, Suspended ceilings - Design and
                installation. - This standard gives a maximum ductility of 1.0
                for ultimate limit state.
              </li>
              <li>
                <b>NZS4600:2018</b>, Cold-formed steel structures. - This
                standard gives a maximum ductility of 1.25 for ultimate limit
                state.
              </li>
            </ul>
            <p class="text-xs italic mt-2">
              Both standards are referenced by B1 of the NZ building code
              (NZS2785 is indirectly referenced), in general the most current
              standard should be used.
            </p>
          </div>
        </template>
      </SelectField>
    </div>
  </div>
</template>

<script setup>
  import { inject } from "vue";
  import StepCard from "../../../components/StepCard.vue";
  import SelectField from "../../../components/SelectField.vue";
  import InputField from "../../../components/InputField.vue";
  import {
    ZONE_FACTORS,
    IMPORTANCE_LEVELS,
  } from "../../data/suspendedCeilingData.js";

  const state = inject("calculatorState");
  const zoneFactorOptions = ZONE_FACTORS;
  const importanceLevelOptions = IMPORTANCE_LEVELS.filter((il) => !il.disabled);

  // Ductility options (legacy: <option value="1">1</option> and <option value="1.25">1.25</option>)
  const ductilityOptions = [
    { value: 1, label: "1.0 (Standard)" },
    { value: 1.25, label: "1.25 (NZS4600:2018)" },
  ];
</script>
