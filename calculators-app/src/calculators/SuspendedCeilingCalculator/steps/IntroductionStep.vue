<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 global-gap">
    <!-- Main Content (2/3) -->
    <div class="lg:col-span-3">
      <div class="prose max-w-none space-y-6">
        <p class="mb-4">
          Because every building is different, there is no standard seismic
          restraint solution to address site, location, form and function. The
          scope of seismic restraint and related engineering work that will be
          required will not be known until the ceiling design is completed. The
          T&R Seismic System will provide a solution for buildings with an
          Importance Level of 3 and below. A suitably qualified Chartered
          Professional Engineer will be required for Importance Levels 4 & 5. It
          is imperative that mechanical services, sprinkler systems, electrical
          and suspended ceiling design are all co-ordinated at appropriate
          stages.
        </p>

        <p class="pb-12">
          While full compliance with seismic requirements will add cost, it will
          limit damage, reduce repair costs and reduce the time to re-occupy
          post event. Furthermore it is now a legislative requirement for Code
          of Compliance Certificates and Health and Safety Laws. The new laws,
          affect those who are upstream from the workplace (for example
          designers, engineers, manufacturers, suppliers or installers).
          Specifically they have a duty to ensure, so far as is reasonably
          practicable, that the work they do or the things they provide to the
          workplace don't create health and safety risks.
        </p>
        <div class="p-6 bg-gray-100">
          <h3 class="text-xl font-semibold mb-4">Usage Notes:</h3>

          <p class="text-sm mb-4">
            This guide allows a designer to calculate required bracing for
            suspended ceilings. The calculations are based on conservative
            assumptions. Reduced seismic bracing designs for individual sites
            may be possible if a suitably qualified Chartered Professional
            Engineer carries out a site-specific design. This guide should not
            be used as a calculation template for a PS-1; specific seismic
            design should be carried out for these cases.
          </p>

          <p class="text-sm mb-4">
            This guide has been prepared by JSK Consulting Engineers for T&R
            Interior Systems with the usual care and thoroughness of the
            consulting profession. Interpretation and application of this guide
            is outside the control of the engineer and therefore is the users'
            responsibility. This guide does not constitute a producer statement
            or engineer's certification, and is not for use with trafficable
            ceilings or ceilings which support partition walls or any other
            service load.
          </p>

          <p class="text-sm mb-4">
            Allowance for relative motion between the ceiling and structure must
            be provided by floating edges. If the perimeter bracing method is
            used then two perpendicular edges must be fixed with the remaining
            two floating. If back bracing to the upper structure is used, then
            all edges must be floating. Floating edges must also be provided
            around rigid or separately braced items that pass through the
            ceiling. The amount of clearance should be checked by an engineer on
            a case-by-case basis.
          </p>

          <p class="text-sm">
            Consult a structural engineer for the expected earthquake
            deflections of the structure.
          </p>
        </div>
      </div>
    </div>

    <!-- Right Sidebar (1/3) -->
    <div class="lg:col-span-2">
      <div class="border border-brand-black p-6 bg-white sticky top-4">
        <h3 class="text-xl font-semibold mb-4 pb-3 border-b border-brand-black">
          You Will Need...
        </h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span>Building Location</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span>Ceiling Height</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span>Tile Weight</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span>Reflected ceiling plans</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span>A section showing plenum depths</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span
              >This design is for 2 way exposed 24mm CBI grid only and cannot be
              used with any other manufacturer's grid</span
            >
          </li>
        </ul>
      </div>
      <InfoBox class="mt-12" variant="info">
        <p class="text-sm">
          © The T&R Seismic System has been developed in conjunction with JSK
          Consulting Engineers, the University of Canterbury and T&R Interior
          Systems. It remains the intellectual property of T&R Interior Systems
          and may not be used with other products.
        </p>
      </InfoBox>
    </div>
  </div>
</template>

<script setup>
  import InfoBox from "../../../components/InfoBox.vue";
</script>
