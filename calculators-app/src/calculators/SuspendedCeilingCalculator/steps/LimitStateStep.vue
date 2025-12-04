<template>
  <div>
    <h2 class="global-step-title">Limit State Type</h2>

    <div class="prose max-w-none space-y-6">
      <h3 class="text-2xl font-semibold mb-4">
        <b>What is limit state design?</b>
      </h3>
      <p class="paragraph-18px">
        The limit state of a ceiling determines the level of seismic activity
        that the ceiling must withstand. A structure shall be designed and
        constructed in such a way that it will, during its design working life
        (with appropriate degrees of reliability) sustain all seismic activity
        that is likely to occur.
      </p>

      <h3 class="text-2xl font-semibold mb-4">
        <b>Serviceability Limit State One (SLS1)</b>
      </h3>
      <p class="paragraph-18px">
        No damage occurs and the structure and the non-structural components do
        not require repair after the seismic event.
      </p>

      <h3 class="text-2xl font-semibold mb-4">
        <b>Serviceability Limit State Two (SLS2)</b>
      </h3>
      <p class="paragraph-18px">
        The system is should only suffer minor damage and should be able to be
        repaired within a short period of time. Ceilings designed to SLS2 may
        have lightweight tiles, sections of grid, and other components fall
        during larger earthquakes. Therefore designing a ceiling to SLS2 loads
        is a risk based decision and project stakeholders should be made aware.
      </p>

      <h3 class="text-2xl font-semibold mb-4">
        <b>Ultimate Limit State (ULS)</b>
      </h3>
      <p class="paragraph-18px">
        Specifically, for earthquake actions this shall mean avoidance of
        collapse of the structural system or parts of the structure representing
        a hazard to human life inside and outside the structure necessary for
        the building evacuation.
      </p>

      <p class="paragraph-18px">
        ULS requirements must be met for all ceilings, but there are multiple
        pathways to achieve this. ULS design criteria can be met by either:
      </p>
      <ul class="list-disc pl-6 space-y-2 paragraph-18px">
        <li>
          Designing the ceiling to withstand higher ULS loads. Note that damage
          to the ceiling is still likely to occur during a ULS event,
          independently tethering heavy items that could be a life safety hazard
          is advised.
        </li>
        <li>
          Design the ceiling to withstand SLS2 loads. There must be
          <b><u>no</u></b> parts in the ceiling that may be a life safety risk
          if the ceiling was to collapse, therefore meeting ULS requirements by
          ensuring there are no life safety hazards present. Designing to SLS2
          only is a risk based decision that should be made by suitably
          competent engineer and discussed with the client and end user. It is
          not suitable for all projects.
        </li>
      </ul>

      <p class="paragraph-18px mt-6">
        <b>Determine the type of design for the installation.</b>
      </p>
      <hr class="my-6" />

      <!-- Question 1: Life Safety Hazard -->
      <div v-show="showQuestion1">
        <p class="paragraph-18px font-semibold">
          <b
            >Does any part of the suspended ceiling create a life safety hazard
            to building occupants?</b
          >
        </p>
        <p class="paragraph-18px">Hazards include but are not limited to:</p>
        <ul class="list-disc pl-6 space-y-1 paragraph-18px">
          <li>
            Heavy/hard falling objects such as heavy acoustic tiles, lighting
            and heaters supported by the ceiling grid.
          </li>
          <li>
            Ceilings above emergency egress routes or emergency exits, where
            ceiling collapse could obstruct evacuation of the building.
          </li>
        </ul>

        <div class="flex gap-2 my-4">
          <button
            type="button"
            class="px-6 py-2 font-semibold transition-colors"
            :class="
              q1Answer === 'yes'
                ? 'bg-[#333] !text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
            @click="answerQuestion1('yes')"
          >
            Yes
          </button>
          <button
            type="button"
            class="px-6 py-2 font-semibold transition-colors"
            :class="
              q1Answer === 'no'
                ? 'bg-[#333] !text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
            @click="answerQuestion1('no')"
          >
            No
          </button>
        </div>

        <p class="paragraph-18px text-sm italic">
          As per the suppliment to NZS 1170.5, this category can apply to
          ceilings which interact with fire suppression systems, emergency
          lighting installations and other parts.
        </p>
        <p class="paragraph-18px text-sm italic mt-2">
          Note that this applies for all parts and components that are essential
          for a building to be occupied. These would include; fire protection
          systems, critical plumbing systems, electrical systems and lifts. For
          all structures these will be elements required to be returned to an
          operational state within an acceptably short time frame (hours or days
          rather than weeks) in order for the structure to be reoccupied.
        </p>
        <p class="paragraph-18px text-sm italic mt-2">
          For example reinstatement of lightweight fallen tiles may be
          considered a viable option within the time frame indicated to allow
          reoccupation of a office but may be unsuitable for an operating
          theatre
        </p>
        <hr class="my-6" />
      </div>

      <!-- Question 2: Part Weight -->
      <div v-show="showQuestion2">
        <p class="paragraph-18px font-semibold">
          <b>Does any individual part of the ceiling weigh more than 7.5kg?</b>
        </p>
        <div class="flex gap-2 my-4">
          <button
            type="button"
            class="px-6 py-2 font-semibold transition-colors"
            :class="
              q2Answer === 'yes'
                ? 'bg-[#333] !text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
            @click="answerQuestion2('yes')"
          >
            Yes
          </button>
          <button
            type="button"
            class="px-6 py-2 font-semibold transition-colors"
            :class="
              q2Answer === 'no'
                ? 'bg-[#333] !text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
            @click="answerQuestion2('no')"
          >
            No
          </button>
        </div>
        <p class="paragraph-18px text-sm italic">
          For the ceiling to not be considered ULS design it must weigh less
          than 7.5kg
        </p>
        <hr class="my-6" />
      </div>

      <!-- Question 3: Height -->
      <div v-show="showQuestion3">
        <p class="paragraph-18px font-semibold">
          <b
            >Is the suspended ceiling installation at a height of 3m or
            greater?</b
          >
        </p>
        <div class="flex gap-2 my-4">
          <button
            type="button"
            class="px-6 py-2 font-semibold transition-colors"
            :class="
              q3Answer === 'yes'
                ? 'bg-[#333] !text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
            @click="answerQuestion3('yes')"
          >
            Yes
          </button>
          <button
            type="button"
            class="px-6 py-2 font-semibold transition-colors"
            :class="
              q3Answer === 'no'
                ? 'bg-[#333] !text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
            @click="answerQuestion3('no')"
          >
            No
          </button>
        </div>
        <p class="paragraph-18px text-sm italic">
          For the ceiling to not be considered ULS design, it must be installed
          at a height less than 3m
        </p>
        <hr class="my-6" />
      </div>

      <!-- Question 4: Emergency Egress -->
      <div v-show="showQuestion4">
        <p class="paragraph-18px font-semibold">
          <b
            >Would collapse of the suspended ceiling block emergency egress
            routes?</b
          >
        </p>
        <div class="flex gap-2 my-4">
          <button
            type="button"
            class="px-6 py-2 font-semibold transition-colors"
            :class="
              q4Answer === 'yes'
                ? 'bg-[#333] !text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
            @click="answerQuestion4('yes')"
          >
            Yes
          </button>
          <button
            type="button"
            class="px-6 py-2 font-semibold transition-colors"
            :class="
              q4Answer === 'no'
                ? 'bg-[#333] !text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
            @click="answerQuestion4('no')"
          >
            No
          </button>
        </div>
        <p class="paragraph-18px text-sm italic">
          Could fallen ceiling tiles block emergency egress routes?
        </p>
        <hr class="my-6" />
      </div>

      <!-- Question 5: Assumptions -->
      <div v-show="showQuestion5">
        <p class="paragraph-18px font-semibold">
          <b
            >Does the ceiling comply with all of the
            <a
              href="#"
              @click.prevent="showAssumptions = !showAssumptions"
              class="text-blue-600 hover:underline"
            >
              assumptions and limitations</a
            >?</b
          >
        </p>

        <div v-if="showAssumptions" class="bg-gray-100 p-4 my-4 rounded">
          <h4 class="text-xl font-semibold mb-3">
            Assumptions and Limitations
          </h4>
          <ul class="list-disc pl-6 space-y-1 text-sm">
            <li>The design guide is only intended for use within NZ</li>
            <li>The building height must not exceed 40m</li>
            <li>The design working life of the ceiling is 50 years</li>
            <li>This guide only cover buildings of importance level 2 and 3</li>
            <li>
              For other importance level structures, specific seismic design is
              required
            </li>
            <li>
              Part Category 6 is not included in this generic design guide.
            </li>
            <li>
              Only horizontal forces have been considered in this guide.
              Vertical forces may need to be considered on a site-specific basis
            </li>
            <li>The period of the part is less than 0.75s</li>
            <li>
              Part ductility is dependant on whether the design is SLS or ULS
            </li>
            <li>Class C soils have been assumed</li>
            <li>
              For perimeter fixed ceilings, a continuous ceiling dwang or cross
              nog is assumed for suitable attachment to the perimeter trim
            </li>
            <li>The maximum tee spacing is 1200mm in any direction</li>
            <li>The ceiling is non-trafficable</li>
            <li>
              The seismic loads transferred by the suspended ceiling should be
              confirmed by a qualified structural engineer
            </li>
            <li>
              Any additional body weighing more than 10kg is to be separately
              suspended and braced
            </li>
            <li>
              Tiles exceeding 3kg/m<sup>2</sup> to be clipped into the grid at
              all egress routes and corridors.
            </li>
          </ul>
        </div>

        <div class="flex gap-2 my-4">
          <button
            type="button"
            class="px-6 py-2 font-semibold transition-colors"
            :class="
              q5Answer === 'yes'
                ? 'bg-[#333] !text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
            @click="answerQuestion5('yes')"
          >
            Yes
          </button>
          <button
            type="button"
            class="px-6 py-2 font-semibold transition-colors"
            :class="
              q5Answer === 'no'
                ? 'bg-[#333] !text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
            @click="answerQuestion5('no')"
          >
            No
          </button>
        </div>
        <hr class="my-6" />
      </div>

      <!-- Error Message -->
      <div v-if="showError" class="alert alert-danger">
        <p>
          Obtain site specific design advice from an appropriately qualified
          engineer
        </p>
        <p>&nbsp;</p>
      </div>

      <!-- Result -->
      <div v-if="showResult" class="alert alert-success">
        <p class="paragraph-18px">
          Your Limit State Type is
          <span class="font-bold">{{ limitStateResult }}</span>
          <span
            v-if="limitStateLogic.footerSLS2Display.value"
            class="font-bold"
          >
            {{ limitStateLogic.footerSLS2Display.value }}</span
          >
        </p>
        <p
          v-if="limitStateLogic.showSLS2Note.value"
          class="paragraph-18px text-sm mt-2"
        >
          SLS2 loads may be able to be used for design, consult an engineer.
        </p>
        <p
          v-if="limitStateLogic.footerSLS2Display.value"
          class="paragraph-18px text-sm mt-2"
        >
          <small
            >As there are two limit states which apply to the suspended ceiling
            in this instance, the most stringent state which results in the
            shortest allowable tee length will apply.</small
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref, computed } from "vue";

  const state = inject("calculatorState");

  // Use centralized question answers from state
  const { q1Answer, q2Answer, q3Answer, q4Answer, q5Answer, limitStateLogic } =
    state;

  const showAssumptions = ref(false);

  // Question visibility logic
  const showQuestion1 = computed(() => true);
  const showQuestion2 = computed(() => q1Answer.value === "no");
  const showQuestion3 = computed(
    () => q1Answer.value === "no" && q2Answer.value === "no"
  );
  const showQuestion4 = computed(
    () =>
      q1Answer.value === "no" &&
      q2Answer.value === "no" &&
      q3Answer.value === "no"
  );
  const showQuestion5 = computed(() => {
    // Show Q5 (assumptions) when:
    // 1. Q1=Yes (skip directly to assumptions), OR
    // 2. Q1=No AND Q2=No AND Q3=No AND Q4=No (reached end of decision tree)
    if (q1Answer.value === "yes") {
      return true;
    }
    if (
      q1Answer.value === "no" &&
      q2Answer.value === "no" &&
      q3Answer.value === "no" &&
      q4Answer.value === "no"
    ) {
      return true;
    }
    return false;
  });

  // Use computed properties from centralized logic
  const showError = limitStateLogic.showError;
  const limitStateResult = limitStateLogic.limitStateMain;
  const showSLS2Note = computed(() => q1Answer.value === "no");
  const showResult = limitStateLogic.showFooterResult;

  // Question handlers
  function answerQuestion1(answer) {
    q1Answer.value = answer;
    // Reset subsequent questions
    if (answer === "yes") {
      q2Answer.value = "";
      q3Answer.value = "";
      q4Answer.value = "";
      q5Answer.value = "";
    }
  }

  function answerQuestion2(answer) {
    q2Answer.value = answer;
    // Reset subsequent questions
    if (answer === "yes") {
      q3Answer.value = "";
      q4Answer.value = "";
      q5Answer.value = "";
    }
  }

  function answerQuestion3(answer) {
    q3Answer.value = answer;
    // Reset subsequent questions
    if (answer === "yes") {
      q4Answer.value = "";
      q5Answer.value = "";
    }
  }

  function answerQuestion4(answer) {
    q4Answer.value = answer;
    // Reset subsequent questions
    if (answer === "yes") {
      q5Answer.value = "";
    }
  }

  function answerQuestion5(answer) {
    q5Answer.value = answer;
  }
</script>
