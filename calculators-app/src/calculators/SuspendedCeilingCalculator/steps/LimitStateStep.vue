<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Main Content (2/3) -->
    <div class="lg:col-span-2">
      <h2 class="text-4xl font-bold mb-8">Limit State Type</h2>

      <div class="prose max-w-none space-y-6">
        <div>
          <h3 class="text-xl font-semibold mb-3">
            What is limit state design?
          </h3>
          <p class="paragraph-18px">
            The limit state of a ceiling determines the level of seismic
            activity that the ceiling must withstand. A structure shall be
            designed and constructed in such a way that it will, during
            its design working life (with appropriate degrees of
            reliability) sustain all seismic activity that is likely to
            occur.
          </p>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-3">
            Serviceability Limit State One (SLS1)
          </h3>
          <p class="paragraph-18px">
            No damage occurs and the structure and the non-structural
            components do not require repair after the seismic event.
          </p>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-3">
            Serviceability Limit State Two (SLS2)
          </h3>
          <p class="paragraph-18px">
            The system is should only suffer minor damage and should be
            able to be repaired within a short period of time. Ceilings
            designed to SLS2 may have lightweight tiles, sections of grid,
            and other components fall during larger earthquakes. Therefore
            designing a ceiling to SLS2 loads is a risk based decision and
            project stakeholders should be made aware.
          </p>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-3">
            Ultimate Limit State (ULS)
          </h3>
          <p class="paragraph-18px mb-4">
            Specifically, for earthquake actions this shall mean avoidance
            of collapse of the structural system or parts of the structure
            representing a hazard to human life inside and outside the
            structure necessary for the building evacuation.
          </p>
          <p class="paragraph-18px mb-4">
            ULS requirements must be met for all ceilings, but there are
            multiple pathways to achieve this. ULS design criteria can be
            met by either:
          </p>
          <ul class="list-disc pl-6 space-y-2 paragraph-18px">
            <li>
              Designing the ceiling to withstand higher ULS loads. Note
              that damage to the ceiling is still likely to occur during a
              ULS event, independently tethering heavy items that could be
              a life safety hazard is advised.
            </li>
            <li>
              Design the ceiling to withstand SLS2 loads. There must be no
              parts in the ceiling that may be a life safety risk if the
              ceiling was to collapse, therefore meeting ULS requirements
              by ensuring there are no life safety hazards present.
              Designing to SLS2 only is a risk based decision that should
              be made by suitably competent engineer and discussed with
              the client and end user. It is not suitable for all
              projects.
            </li>
          </ul>
        </div>

        <div class="my-8">
          <QuestionBox
            title="Does any part of the suspended ceiling create a life safety hazard to building occupants?"
          >
            <p class="paragraph-18px mb-4">
              Hazards include but are not limited to:
            </p>
            <ul class="list-disc pl-6 space-y-2 paragraph-18px mb-6">
              <li>
                Heavy/hard falling objects such as heavy acoustic tiles,
                lighting and heaters supported by the ceiling grid.
              </li>
              <li>
                Ceilings above emergency egress routes or emergency exits,
                where ceiling collapse could obstruct evacuation of the
                building.
              </li>
            </ul>

            <RadioGroup
              id="limit-state"
              v-model="state.limitState"
              label="Select Limit State"
              :options="limitStateOptions"
            />
          </QuestionBox>
        </div>

        <InfoBox variant="info">
          <p class="text-sm">
            As per the suppliment to NZS 1170.5, this category can apply
            to ceilings which interact with fire suppression systems,
            emergency lighting installations and other parts.
          </p>
          <p class="text-sm mt-2">
            Note that this applies for all parts and components that are
            essential for a building to be occupied. These would include;
            fire protection systems, critical plumbing systems, electrical
            systems and lifts. For all structures these will be elements
            required to be returned to an operational state within an
            acceptably short time frame (hours or days rather than weeks)
            in order for the structure to be reoccupied.
          </p>
          <p class="text-sm mt-2">
            For example reinstatement of lightweight fallen tiles may be
            considered a viable option within the time frame indicated to
            allow reoccupation of a office but may be unsuitable for an
            operating theatre.
          </p>
        </InfoBox>
      </div>
    </div>

    <!-- Right Sidebar (1/3) -->
    <div class="lg:col-span-1">
      <CalculationSidebar>
        <div class="space-y-4 text-sm">
          <div>
            <div class="font-semibold mb-1">Limit State Type</div>
            <div class="text-lg">
              {{ state.limitState.toUpperCase() || "-" }}
            </div>
          </div>
          <div class="border-t border-gray-300 pt-4">
            <div class="text-xs text-gray-500">
              Complete this step to see calculations
            </div>
          </div>
        </div>
      </CalculationSidebar>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import QuestionBox from '../../../components/QuestionBox.vue';
import CalculationSidebar from '../../../components/CalculationSidebar.vue';
import RadioGroup from '../../../components/RadioGroup.vue';
import InfoBox from '../../../components/InfoBox.vue';
import { LIMIT_STATE_OPTIONS } from '../../data/suspendedCeilingData.js';

const state = inject('calculatorState');
const limitStateOptions = LIMIT_STATE_OPTIONS;
</script>
