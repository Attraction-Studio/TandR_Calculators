<template>
  <div>
    <h2 class="global-step-title">Limit State Type</h2>

    <div class="prose max-w-none space-y-6">
      <p class="paragraph-18px">
        Determine the type of design for the installation.
      </p>
      <hr class="my-6" />

      <!-- Question 0: Operational State (SLS2 trigger) -->
      <div v-show="showQuestion0">
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
              q0Answer === 'yes'
                ? 'bg-[#333] !text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
            @click="answerQuestion0('yes')"
          >
            Yes
          </button>
          <button
            type="button"
            class="px-6 py-2 font-semibold transition-colors"
            :class="
              q0Answer === 'no'
                ? 'bg-[#333] !text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
            @click="answerQuestion0('no')"
          >
            No
          </button>
        </div>
        <p class="paragraph-18px text-sm italic">
          As per the supplement to NZS 1170.5, this category can apply to
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
          reoccupation of an office but may be unsuitable for an operating
          theatre.
        </p>
        <hr class="my-6" />
      </div>

      <!-- Question 1: Part Weight -->
      <div v-show="showQuestion1">
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
          For the ceiling to not be considered ULS design it must weigh less
          than 7.5kg
        </p>
        <hr class="my-6" />
      </div>

      <!-- Question 2: Height -->
      <div v-show="showQuestion2">
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
          For the ceiling to not be considered ULS design, it must be installed
          at a height less than 3m
        </p>
        <hr class="my-6" />
      </div>

      <!-- Question 3: Emergency Egress -->
      <div v-show="showQuestion3">
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
          Could fallen ceiling elements block emergency egress routes?
        </p>
        <hr class="my-6" />
      </div>

      <!-- Question 4: Assumptions -->
      <div v-show="showQuestion4">
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
                assumptions are accurate for the specific installation.
              </p>
              <ul class="list-disc pl-6 space-y-1 text-sm">
                <li>The design guide is only intended for use within NZ</li>
                <li>The building height must not exceed 40m</li>
                <li>The design working life of the ceiling is 50 years</li>
                <li>
                  This guide only covers buildings of importance level 2 and 3
                </li>
                <li>
                  For other importance level structures, specific seismic design
                  is required
                </li>
                <li>
                  Horizontal seismic loads have been treated as the limiting
                  case
                </li>
                <li>The period of the part is less than 0.75s</li>
                <li>The ceiling is non-trafficable</li>
                <li>
                  The seismic loads transferred to structure by the suspended
                  ceiling should be confirmed by a suitably qualified engineer
                </li>
                <li>
                  Any additional body weighing more than 7.5kg is to be
                  separately suspended and braced
                </li>
                <li>
                  The guide is for use with the T&R baffle ceiling system only
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
          <span v-if="footerSLS2Display" class="font-bold">
            {{ footerSLS2Display }}
          </span>
        </p>
        <p v-if="showMultiStateNote" class="paragraph-18px text-sm mt-2">
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

  const { q0Answer, q1Answer, q2Answer, q3Answer, q4Answer, limitStateLogic } =
    state;

  const showAssumptions = ref(false);

  // Question visibility - flow for baffle ceiling (matches reference HTML)
  // Q0 always visible
  const showQuestion0 = computed(() => true);
  // Q1 shows after Q0 is answered (either yes or no)
  const showQuestion1 = computed(() => q0Answer.value !== "");
  // Q2 shows only if Q1 = No
  const showQuestion2 = computed(
    () => q0Answer.value !== "" && q1Answer.value === "no",
  );
  // Q3 shows only if Q1 = No AND Q2 = No
  const showQuestion3 = computed(
    () =>
      q0Answer.value !== "" &&
      q1Answer.value === "no" &&
      q2Answer.value === "no",
  );
  // Q4 (assumptions) shows ONLY if Q1, Q2, Q3 are ALL No
  const showQuestion4 = computed(() => {
    return (
      q0Answer.value !== "" &&
      q1Answer.value === "no" &&
      q2Answer.value === "no" &&
      q3Answer.value === "no"
    );
  });

  // Create computed wrappers to ensure reactivity in template
  const showError = computed(() => limitStateLogic.showError.value);
  const limitStateResult = computed(() => limitStateLogic.limitStateMain.value);
  const showResult = computed(() => limitStateLogic.showFooterResult.value);
  const footerSLS2Display = computed(
    () => limitStateLogic.footerSLS2Display.value,
  );
  const showMultiStateNote = computed(
    () => limitStateLogic.showMultiStateNote.value,
  );

  // Question handlers
  function answerQuestion0(answer) {
    q0Answer.value = answer;
  }

  function answerQuestion1(answer) {
    q1Answer.value = answer;
    if (answer === "yes") {
      q2Answer.value = "";
      q3Answer.value = "";
      q4Answer.value = "";
    }
  }

  function answerQuestion2(answer) {
    q2Answer.value = answer;
    if (answer === "yes") {
      q3Answer.value = "";
      q4Answer.value = "";
    }
  }

  function answerQuestion3(answer) {
    q3Answer.value = answer;
    if (answer === "yes") {
      q4Answer.value = "";
    }
  }

  function answerQuestion4(answer) {
    q4Answer.value = answer;
  }
</script>
