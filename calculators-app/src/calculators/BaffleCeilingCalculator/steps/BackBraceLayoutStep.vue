<template>
  <div>
    <h2 class="global-step-title">Step Five - Back Bracing Layout</h2>

    <div class="prose max-w-none space-y-6">
      <p class="paragraph-18px">
        The minimum number of braces for a ceiling depends on 2 factors:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>
          Capacity basis (sufficient braces to transfer the total ceiling load)
        </li>
        <li>
          Motion limiting basis (sufficient braces to ensure that the ceiling
          moves as a single unit)
        </li>
      </ul>

      <h3 class="text-xl font-semibold">
        Minimum number of braces (capacity basis)
      </h3>

      <table class="w-full border-collapse text-center mb-8">
        <tbody>
          <tr class="border-b">
            <td class="py-3 px-2">
              <b>Ceiling Area (m<sup>2</sup>)</b>
              <span
                class="badge bg-green-500 text-white px-2 py-1 rounded text-xs ml-1"
                >Ca</span
              >
            </td>
            <td class="py-3 px-2" rowspan="2"><b>/</b></td>
            <td class="py-3 px-2">
              <b>Area per brace (m<sup>2</sup>)</b>
              <span
                class="badge bg-yellow-500 text-white px-2 py-1 rounded text-xs ml-1"
                >Ab</span
              >
            </td>
            <td class="py-3 px-2" rowspan="2"><b>=</b></td>
            <td class="py-3 px-2">
              <b>Min. # of braces</b>
              <span
                class="badge bg-green-600 text-white px-2 py-1 rounded text-xs ml-1"
                >#b</span
              >
            </td>
          </tr>
          <tr class="border-b bg-green-50">
            <td class="py-3 px-2">
              <input
                type="number"
                step="1"
                v-model.number="ceilingArea"
                class="w-32 border border-gray-300 rounded px-3 py-2 text-center"
              />
            </td>
            <td class="py-3 px-2">{{ state.areaPerBrace.value.toFixed(1) }}</td>
            <td class="py-3 px-2 font-semibold text-lg">
              {{ state.minimumBraces.value }}
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-xl font-semibold">
        Maximum brace spacing along a Strongback
      </h3>

      <table class="w-full border-collapse text-center mb-8">
        <tbody>
          <tr class="border-b">
            <td class="py-3 px-2">
              <b>Area per brace (m<sup>2</sup>)</b>
              <span
                class="badge bg-yellow-500 text-white px-2 py-1 rounded text-xs ml-1"
                >Ab</span
              >
            </td>
            <td class="py-3 px-2" rowspan="2"><b>/</b></td>
            <td class="py-3 px-2"><b>Strongback Brace Spacing (m)</b></td>
            <td class="py-3 px-2" rowspan="2"><b>=</b></td>
            <td class="py-3 px-2">
              <b>Max. Brace Spacing (m)</b>
              <span
                class="badge bg-blue-500 text-white px-2 py-1 rounded text-xs ml-1"
                >Bs</span
              >
            </td>
          </tr>
          <tr class="border-b bg-green-50">
            <td class="py-3 px-2">{{ state.areaPerBrace.value.toFixed(1) }}</td>
            <td class="py-3 px-2">2.4</td>
            <td class="py-3 px-2 font-semibold">
              {{ state.maxBraceSpacing.value.toFixed(1) }}
            </td>
          </tr>
        </tbody>
      </table>

      <p class="paragraph-18px">
        The calculated minimum number of braces represents the number of braces
        required to carry the total ceiling load, with the assumption that
        ceiling load is evenly shared between braces.
      </p>

      <p class="paragraph-18px">
        Often the shape of the ceiling means that more than the minimum number
        of braces are required to adequately control the motion of the ceiling,
        therefore costing should not be based off the minimum number. Instead an
        RCP should be annotated with required bracing in accordance with the
        bracing guidelines below to work out the actual number of braces:
      </p>

      <div class="bg-gray-100 p-4 rounded">
        <p class="font-semibold mb-2">Bracing Guidelines:</p>
        <ul class="list-disc pl-6 space-y-1 text-sm">
          <li>Bracing should be laid out evenly throughout the ceiling area</li>
          <li>Strongbacks closest to the ceiling edges should be braced</li>
          <li>
            Bracing should be placed near discontinuities or corners in the
            ceiling
          </li>
          <li>
            The maximum spacing between braces on any strongback must not exceed
            the calculated maximum brace spacing
          </li>
          <li>
            Typically, there should be at least 4 braces per ceiling, however 2
            braces can be used if the ceiling is very small
          </li>
        </ul>
      </div>

      <!-- Bracing Guidance Button -->
      <div class="mt-6">
        <button
          type="button"
          class="calc-button calc-button-primary"
          @click="showBracingGuidance = true"
        >
          Show Bracing Guidance Diagram
        </button>
      </div>

      <!-- Bracing Guidance Modal -->
      <div
        v-if="showBracingGuidance"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="showBracingGuidance = false"
      >
        <div class="fixed inset-0 bg-black/50" aria-hidden="true"></div>
        <div
          class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
        >
          <div class="flex items-center justify-between p-4 border-b">
            <h3 class="text-xl font-semibold">Bracing Guidance Diagram</h3>
            <button
              type="button"
              class="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              @click="showBracingGuidance = false"
            >
              &times;
            </button>
          </div>
          <div class="p-4">
            <img
              src="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/6966ea71f6f170575cafd180_BackBracingGuidance.png"
              alt="Back Bracing Guidance"
              class="w-full rounded"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref } from "vue";

  const state = inject("calculatorState");

  const { ceilingArea } = state;

  const showBracingGuidance = ref(false);
</script>
