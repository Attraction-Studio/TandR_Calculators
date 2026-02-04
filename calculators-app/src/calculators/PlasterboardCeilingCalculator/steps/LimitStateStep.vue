<template>
  <div>
    <h2 class="global-step-title">Step One - Limit State Type</h2>

    <div class="prose max-w-none space-y-6">
      <p class="paragraph-18px">
        Determine the type of design for the installation.
      </p>
      <hr class="my-6" />

      <!-- Question 1: SLS2 Required -->
      <div v-show="showQuestion1">
        <p class="paragraph-18px font-semibold">
          <b
            >Is the suspended ceiling and/or elements which directly interact
            with the ceiling required to be returned to an operational state
            within an acceptably short time frame in order for the structure to
            be occupied?</b
          >
        </p>

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
          For example reinstatement of stopped edges at corner junctions may be
          considered a viable option within the time frame indicated to allow
          reoccupation of a office but may be unsuitable for an operating
          theatre
        </p>
        <hr class="my-6" />
      </div>

      <!-- Question 2: Part Weight -->
      <div v-show="showQuestion2">
        <p class="paragraph-18px font-semibold">
          <b
            >Does the suspended ceiling, when considered as a whole, weigh more
            than 7.5kg?</b
          >
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
              @click.prevent="showAssumptions = true"
              class="text-link"
            >
              assumptions and limitations</a
            >?</b
          >
        </p>

        <!-- Assumptions Modal -->
        <div
          v-if="showAssumptions"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="showAssumptions = false"
        >
          <div class="fixed inset-0 bg-black/50" aria-hidden="true"></div>
          <div
            class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
          >
            <div class="flex items-center justify-between p-4 border-b">
              <h3 class="text-xl font-semibold">Assumptions and Limitations</h3>
              <button
                type="button"
                class="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                @click="showAssumptions = false"
              >
                &times;
              </button>
            </div>
            <div class="p-4">
              <p class="text-sm mb-4">
                The following assumptions have been made while developing this
                seismic design guide. Installers should ensure that the
                assumptions are accurate for the specific installation. If the
                project falls outside of the scope of these limitations, a
                suitably qualified engineer should be engaged.
              </p>
              <ul class="list-disc pl-6 space-y-1 text-sm">
                <li>The design guide is only intended for use within NZ</li>
                <li>The building height must not exceed 40m</li>
                <li>The design working life of the ceiling is 50 years</li>
                <li>
                  This guide only cover buildings of importance level 2 and 3
                </li>
                <li>
                  For other importance level structures, specific seismic design
                  is required
                </li>
                <li>
                  Part Category 6 is not included in this generic design guide.
                  If required then it is recommended that a suitably qualified
                  chartered professional engineer carry out a specific design.
                </li>
                <li>
                  Horizontal seismic loads have been treated as the limiting
                  case since they are typically the loads that have the most
                  effect on the performance of suspended ceilings
                </li>
                <li>The period of the part is less than 0.75s</li>
                <li>
                  Part ductility is dependent on whether the design is SLS or
                  ULS
                </li>
                <li>
                  For ULS design ceiling ductility of 2 has been used as per NZS
                  1170.5 Supplement 1
                </li>
                <li>
                  Class C soils have been assumed, this is the worst case for
                  determination of the seismic action for parts
                </li>
                <li>
                  For perimeter fixed ceilings, a continuous ceiling dwang or
                  cross nog is assumed for suitable attachment to the perimeter
                  trim
                </li>
                <li>The maximum main tee spacing is 1200mm</li>
                <li>
                  The maximum cross tee spacing is 600mm, but is primarily based
                  on the lining manufacturer's recommendations
                </li>
                <li>The ceiling is non-trafficable</li>
                <li>The ceiling must be flat in the horizontal plane</li>
                <li>
                  The seismic loads transferred to structure by the suspended
                  ceiling (via back braces, rigid hangers or fixed edges) should
                  be confirmed by a suitably qualified engineer
                </li>
                <li>
                  Any additional body weighing more than 7.5kg is to be
                  separately suspended and braced
                </li>
                <li>
                  The guide is for use with the T&R suspended plasterboard grid
                  system only
                </li>
                <li>
                  Ceiling movement/damage should not cause an unusually high
                  level of damage
                </li>
                <li>
                  The design guide is only to be used for flat ceilings, or
                  ceilings with a rake angle of less than 10 degrees to the
                  horizontal
                </li>
              </ul>
            </div>
          </div>
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
            {{ limitStateLogic.footerSLS2Display.value }}
          </span>
        </p>
        <p
          v-if="limitStateLogic.showMultiStateNote.value"
          class="paragraph-18px text-sm mt-2"
        >
          <small
            >As there are two limit states which apply to the ceiling in this
            instance, the most stringent state which results in the shortest
            allowable lengths will apply.</small
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref, computed } from "vue";

  const state = inject("calculatorState");

  const { q1Answer, q2Answer, q3Answer, q4Answer, q5Answer, limitStateLogic } =
    state;

  const showAssumptions = ref(false);

  // Question visibility
  const showQuestion1 = computed(() => true);
  const showQuestion2 = computed(() => q1Answer.value !== "");
  const showQuestion3 = computed(
    () => q1Answer.value !== "" && q2Answer.value === "no",
  );
  const showQuestion4 = computed(
    () =>
      q1Answer.value !== "" &&
      q2Answer.value === "no" &&
      q3Answer.value === "no",
  );
  const showQuestion5 = computed(() => {
    if (q1Answer.value === "yes") return true;
    if (
      q2Answer.value === "no" &&
      q3Answer.value === "no" &&
      q4Answer.value === "no"
    )
      return true;
    return false;
  });

  const showError = limitStateLogic.showError;
  const limitStateResult = limitStateLogic.limitStateMain;
  const showResult = limitStateLogic.showFooterResult;

  // Question handlers
  function answerQuestion1(answer) {
    q1Answer.value = answer;
    if (answer === "yes") {
      q2Answer.value = "";
      q3Answer.value = "";
      q4Answer.value = "";
      q5Answer.value = "";
    }
  }

  function answerQuestion2(answer) {
    q2Answer.value = answer;
    if (answer === "yes") {
      q3Answer.value = "";
      q4Answer.value = "";
      q5Answer.value = "";
    }
  }

  function answerQuestion3(answer) {
    q3Answer.value = answer;
    if (answer === "yes") {
      q4Answer.value = "";
      q5Answer.value = "";
    }
  }

  function answerQuestion4(answer) {
    q4Answer.value = answer;
    if (answer === "yes") {
      q5Answer.value = "";
    }
  }

  function answerQuestion5(answer) {
    q5Answer.value = answer;
  }
</script>
