<template>
  <div>
    <h2 class="global-step-title">Determining the Seismic Clearance</h2>

    <div class="prose max-w-none space-y-6">
      <p class="paragraph-18px">
        The required inter-storey drift values need to be determined to ensure
        that there is sufficient clearance to allow parts to move relative to
        each other during a seismic event.
      </p>

      <table class="w-full border-collapse text-center">
        <tbody>
          <tr class="border-b">
            <td class="py-3 px-4"><b>Type of Installation</b></td>
            <td class="py-3 px-4"><b>Type of Design</b></td>
            <td class="py-3 px-4">
              <b>Clearance Required (mm)</b>
              <span
                class="badge bg-blue-700 text-white px-2 py-1 rounded text-xs ml-1"
                >Sc</span
              >
            </td>
          </tr>
          <tr class="border-b">
            <td class="py-3 px-4">Perimeter fixing</td>
            <td class="py-3 px-4">SLS<br />ULS</td>
            <td class="py-3 px-4">10<br />10</td>
          </tr>
          <tr class="border-b bg-green-50">
            <td class="py-3 px-4">Back Braced</td>
            <td class="py-3 px-4">SLS<br />ULS</td>
            <td class="py-3 px-4 font-semibold">
              {{ state.seismicClearance.value.sls }}<br />
              {{ state.seismicClearance.value.uls }}
            </td>
          </tr>
        </tbody>
      </table>

      <p class="text-sm mt-4">
        For larger plenum heights the required seismic clearance may be
        impractical, for site specific installations contact a suitably
        qualified consulting engineer.
      </p>
    </div>
  </div>
</template>

<script setup>
  import { inject } from "vue";

  const state = inject("calculatorState");
</script>
