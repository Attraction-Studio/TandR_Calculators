<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Main Content (2/3) -->
    <div class="lg:col-span-2">
      <h2 class="text-4xl font-bold mb-8">
        Introduction to suspended ceiling seismic design
      </h2>

      <div class="prose max-w-none space-y-6">
        <p class="paragraph-18px">
          There are two main ways of approaching the seismic design of a
          suspended ceiling, each with their own benefits and drawbacks.
        </p>

        <div class="my-8">
          <h3 class="text-2xl font-semibold mb-4">1. Perimeter Fixing</h3>
          <p class="paragraph-18px mb-4">
            This approach to seismic restraint relies on connections to adjacent
            walls to transfer the horizontal seismic load back to the primary
            building structure.
          </p>
          <p class="paragraph-18px mb-4">
            The perimeter fixing approach relies on a fix-float philosophy,
            where the perimeter edges directly opposite a 'fixed' edge shall be
            'floating'.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <img
              src="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/6912815162d671bf3ce4dd5f_scs_fixededge1.jpg"
              alt="Fixed edge configuration"
              class="my-4"
            />
            <img
              src="https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/691281512eb4e8893c2b2c1b_scs_fixededge2.jpg"
              alt="Fixed edge configuration"
              class="my-4"
            />
          </div>
          <p class="paragraph-18px mb-4">
            A fixed edge has the tee riveted to the wall trim and screws each
            side of the tee into the wall to provide a solid load path. The
            floating edge has seismic clearance between the ceiling and the wall
            to allow for movement of the building structure.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div class="bg-gray-100 p-4">
              <h4 class="font-semibold mb-2">Pros</h4>
              <ul class="list-disc pl-5 space-y-1 text-sm">
                <li>Simpler and cheaper to install</li>
                <li>Smaller floating edge clearances required</li>
              </ul>
            </div>
            <div class="bg-gray-100 p-4">
              <h4 class="font-semibold mb-2">Cons</h4>
              <ul class="list-disc pl-5 space-y-1 text-sm">
                <li>
                  Can only be used for small-medium ceilings, as the ceiling
                  size is limited by the grid strength
                </li>
                <li>Walls must be capable of transferring the seismic load</li>
                <li>
                  Seismic joints may be used to expand the size of ceiling that
                  may be edge restrained
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="my-8">
          <h3 class="text-2xl font-semibold mb-4">2. Back Bracing</h3>
          <p class="paragraph-18px mb-4">
            This approach is used for larger ceilings, where the required
            ceiling tee lengths exceed the allowable lengths or where the walls
            around the ceiling cannot be relied upon to transfer the seismic
            load to the primary building structure.
          </p>
          <p class="paragraph-18px mb-4">
            Rigid bracing is used evenly throughout the ceiling to transfer the
            ceiling seismic load through to the overhead structure. This
            approach requires that all the perimeter edges are floating in order
            to prevent damage from inter-story drift.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div class="bg-gray-100 p-4">
              <h4 class="font-semibold mb-2">Pros</h4>
              <ul class="list-disc pl-5 space-y-1 text-sm">
                <li>Suitable for large ceilings</li>
                <li>
                  No load from the ceiling is transferred to perimeter walls
                </li>
                <li>
                  Important if there are part height walls or bulkheads around
                  the ceiling that have not been designed to carry the ceiling
                  loads
                </li>
              </ul>
            </div>
            <div class="bg-gray-100 p-4">
              <h4 class="font-semibold mb-2">Cons</h4>
              <ul class="list-disc pl-5 space-y-1 text-sm">
                <li>
                  Larger plenum heights require large floating edge clearances
                </li>
                <li>Usually more expensive than edge-restrained designs</li>
                <li>
                  Harder to keep ceiling square as there are no fixed edges
                </li>
              </ul>
            </div>
          </div>

          <p class="paragraph-18px">
            An alternative to back bracing that may be used in certain
            situations is rigid hangers. This approach is suitable for ceilings
            suspended very close (50-500mm) to purlins, rafters/trusses, or
            floor joists. The wire hangers are replaced with heavy gauge steel
            angle hangers, which are used to transfer the seismic load back to
            primary structure.
          </p>
        </div>
      </div>
    </div>

    <!-- Right Sidebar (1/3) -->
    <div class="lg:col-span-1">
      <CalculationSidebar>
        <div class="space-y-4 text-sm">
          <div>
            <div class="font-semibold mb-1">Limit State Type</div>
            <div class="text-lg">
              {{
                state.limitState.value
                  ? state.limitState.value.toUpperCase()
                  : "-"
              }}
            </div>
          </div>

          <div class="border-t border-gray-300 pt-4">
            <div class="font-semibold mb-1">Seismic Weight</div>
            <div class="text-lg">
              {{ state.seismicWeight.value.toFixed(1) }} kg/m²
            </div>
          </div>

          <div class="border-t border-gray-300 pt-4">
            <div class="font-semibold mb-1">Seismic Force (ULS)</div>
            <div class="text-lg">
              {{ state.seismicForces.value.uls.toFixed(2) }} kgf/m²
            </div>
          </div>

          <div class="border-t border-gray-300 pt-4">
            <div class="font-semibold mb-1">Limiting Main Tee Length (ULS)</div>
            <div class="text-lg">
              {{ state.adjustedLimitingLengths.value.uls.main.toFixed(1) }} m
            </div>
          </div>

          <div class="border-t border-gray-300 pt-4">
            <div class="font-semibold mb-1">
              Limiting Cross Tee Length (ULS)
            </div>
            <div class="text-lg">
              {{ state.adjustedLimitingLengths.value.uls.cross.toFixed(1) }} m
            </div>
          </div>

          <div class="border-t border-gray-300 pt-4">
            <div class="font-semibold mb-1">Area per Brace</div>
            <div class="text-lg">-</div>
          </div>

          <div class="border-t border-gray-300 pt-4">
            <div class="font-semibold mb-1">Max Tee Spacing</div>
            <div class="text-lg">
              Main: {{ state.gridSpacing.value.main }}m<br />
              Cross: {{ state.gridSpacing.value.cross }}m
            </div>
          </div>

          <div class="border-t border-gray-300 pt-4">
            <div class="text-xs text-gray-500">
              Values update as you progress through steps
            </div>
          </div>
        </div>
      </CalculationSidebar>
    </div>
  </div>
</template>

<script setup>
  import { inject } from "vue";
  import CalculationSidebar from "../../../components/CalculationSidebar.vue";

  const state = inject("calculatorState");
</script>
