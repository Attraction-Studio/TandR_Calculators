<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <!-- Step Navigation -->
    <div v-if="currentStep > 0" class="mb-4 text-sm text-gray-600">
      Step {{ currentStep }} of 7
    </div>

    <!-- Step 0: Welcome/Intro -->
    <div v-if="currentStep === 0" class="space-y-6">
      <h2 class="text-2xl font-bold text-gray-800">
        T&R Seismic Calculator - Baffle Ceilings
      </h2>
      
      <div class="space-y-4 text-gray-700">
        <p>
          Because every building is different, there is no standard seismic
          restraint solution to address site, location, form and function. The
          scope of seismic restraint and related engineering work that will be
          required will not be known until the ceiling design is completed. The
          T&R Seismic System will provide a solution for buildings with an
          Importance Level of 3 and below. A suitably qualified Chartered
          Professional Engineer will be required for Importance Levels 4 & 5.
          It is imperative that mechanical services, sprinkler systems, electrical
          and suspended ceiling design are all co-ordinated at appropriate stages.
        </p>
        
        <p>
          While full compliance with seismic requirements will add cost, it will
          limit damage, reduce repair costs and reduce the time to re-occupy post
          event. Furthermore it is now a legislative requirement for Code of
          Compliance Certificates and Health and Safety Laws.
        </p>

        <div class="border-t pt-4">
          <h4 class="font-semibold mb-2">Usage Notes:</h4>
          <p class="text-sm italic">
            This guide allows a designer to calculate required bracing for
            suspended baffle ceilings. The calculations are based on conservative
            assumptions. Reduced seismic bracing designs for individual sites may
            be possible if a suitably qualified Chartered Professional Engineer
            carries out a site-specific design.
          </p>
        </div>

        <button
          @click="nextStep"
          class="w-full md:w-auto px-6 py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition-colors"
        >
          Begin
        </button>
      </div>
    </div>

    <!-- Step 1: Limit State Type -->
    <div v-if="currentStep === 1" class="space-y-6">
      <h4 class="text-xl font-semibold">Step One - Limit State Type</h4>
      <p>Determine the type of design for the installation.</p>
      <hr />

      <!-- Question 0: SLS2 -->
      <div v-if="showDiv1_0" class="space-y-4">
        <p class="font-semibold">
          Is the suspended ceiling and/or elements which directly interact
          with the ceiling required to be returned to an operational state
          within an acceptably short time frame in order for the structure to
          be occupied?
        </p>
        <div class="flex gap-4">
          <button
            @click="enableSLS2"
            class="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            Yes
          </button>
          <button
            @click="disableSLS2"
            class="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            No
          </button>
        </div>
        <p class="text-sm italic text-gray-600">
          As per the supplement to NZS 1170.5, this category can apply to
          ceilings which interact with fire suppression systems, emergency
          lighting installations and other parts.
        </p>
      </div>

      <!-- Question 1: Weight > 7.5kg -->
      <div v-if="showDiv1_1" class="space-y-4">
        <p class="font-semibold">
          Does the suspended ceiling, when considered as a whole, weigh more
          than 7.5kg?
        </p>
        <div class="flex gap-4">
          <button
            @click="setULS"
            class="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            Yes
          </button>
          <button
            @click="showDiv1_2 = true; showDiv1_1 = false"
            class="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            No
          </button>
        </div>
      </div>

      <!-- Question 2: Height >= 3m -->
      <div v-if="showDiv1_2" class="space-y-4">
        <p class="font-semibold">
          Is the suspended ceiling installation at a height of 3m or greater?
        </p>
        <div class="flex gap-4">
          <button
            @click="setULS"
            class="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            Yes
          </button>
          <button
            @click="showDiv1_3 = true; showDiv1_2 = false"
            class="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            No
          </button>
        </div>
      </div>

      <!-- Question 3: Block egress -->
      <div v-if="showDiv1_3" class="space-y-4">
        <p class="font-semibold">
          Would collapse of the suspended ceiling block emergency egress routes?
        </p>
        <div class="flex gap-4">
          <button
            @click="setULS"
            class="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            Yes
          </button>
          <button
            @click="showDiv1_4 = true; showDiv1_3 = false"
            class="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            No
          </button>
        </div>
      </div>

      <!-- Question 4: Assumptions compliance -->
      <div v-if="showDiv1_4" class="space-y-4">
        <p class="font-semibold">
          Does the ceiling comply with all of the assumptions and limitations?
        </p>
        <div class="flex gap-4">
          <button
            @click="setSLS"
            class="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            Yes
          </button>
          <button
            @click="showDiv1_5 = true; showDiv1_4 = false"
            class="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            No
          </button>
        </div>
      </div>

      <!-- Need engineer advice -->
      <div v-if="showDiv1_5" class="p-4 bg-red-50 border border-red-200 rounded-md">
        <p class="text-red-800 font-semibold">
          Obtain site specific design advice from an appropriately qualified engineer
        </p>
      </div>

      <!-- Limit state result -->
      <div v-if="showDiv1_7" class="p-4 bg-green-50 border border-green-200 rounded-md">
        <p>
          Your Limit State Type is <span class="font-semibold">{{ limitStateType }}</span>
          <span v-if="tt2">{{ tt2 }}</span>
        </p>
        <p v-if="showMultiState" class="text-sm mt-2">
          <small>
            As there are two limit states which apply to the ceiling in this
            instance, the most stringent state which results in the shortest
            allowable lengths will apply.
          </small>
        </p>
      </div>

      <!-- Navigation -->
      <div v-if="showDiv1_6" class="flex justify-between mt-6">
        <button
          @click="prevStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Previous
        </button>
        <button
          v-if="limitStateType"
          @click="nextStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Step 2: Suspended Baffle Ceiling Weight -->
    <div v-if="currentStep === 2" class="space-y-6">
      <h4 class="text-xl font-semibold">Step Two - Suspended Baffle Ceiling Weight</h4>
      <p>
        Calculate the total seismic weight based on the ceiling and service weights.
      </p>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <tbody>
            <tr class="border-b">
              <td class="p-2">Profile</td>
              <td class="p-2">
                <select
                  v-model="gridmass"
                  @change="calculate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="1.3">100mm by 30mm (Gridlux compatible)</option>
                  <option value="1.7">135mm by 30mm</option>
                  <option value="1.8">150mm by 25mm</option>
                  <option value="2.4">150mm by 30mm (Gridlux compatible)</option>
                </select>
              </td>
              <td class="p-2 text-right">{{ gridmass }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">Baffle Spacing (m)</td>
              <td class="p-2">
                <div class="text-xs text-gray-600 mb-1">
                  Minimum 0.1m - Maximum 1.0m
                </div>
                <div v-if="baffleSpaceError" class="text-xs text-red-600 mb-1">
                  Alternatively contact a suitably qualified chartered
                  professional engineer for specific design.
                </div>
                <input
                  v-model.number="bafflespace"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="1"
                  @input="validateBaffleSpace"
                  @change="calculate"
                  class="w-full px-3 py-2 border rounded-md"
                  :class="baffleSpaceError ? 'border-red-500' : 'border-gray-300'"
                />
              </td>
              <td class="p-2"></td>
            </tr>
            <tr class="border-b">
              <td class="p-2">Baffle Mass (kg/m²)</td>
              <td class="p-2"></td>
              <td class="p-2 text-right">{{ bafflemass.toFixed(2) }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">Strongback Mass (kg/m²)</td>
              <td class="p-2">
                <span class="text-sm">41x21x1.2 PST Channel</span>
              </td>
              <td class="p-2 text-right">1.27</td>
            </tr>
            <tr class="border-b">
              <td class="p-2" rowspan="3">Services</td>
              <td class="p-2">Luminaires incl. Gridlux (kg/m²)</td>
              <td class="p-2">
                <input
                  v-model.number="luminaries"
                  type="number"
                  step="0.1"
                  @change="calculate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </td>
            </tr>
            <tr class="border-b">
              <td class="p-2">Services Allowance (kg/m²)</td>
              <td class="p-2">
                <input
                  v-model.number="insulation"
                  type="number"
                  step="0.1"
                  @change="calculate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </td>
            </tr>
            <tr class="border-b">
              <td class="p-2">Other (kg/m²)</td>
              <td class="p-2">
                <input
                  v-model.number="other"
                  type="number"
                  step="0.1"
                  @change="calculate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </td>
            </tr>
            <tr class="border-b bg-green-50">
              <td colspan="2" class="p-2 text-right font-semibold">
                Total Seismic Weight <span class="ml-2 px-2 py-1 bg-blue-200 rounded text-xs">Sw</span>
              </td>
              <td class="p-2 text-right font-bold">{{ total1 }} kg/m²</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-between mt-6">
        <button
          @click="prevStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Previous
        </button>
        <button
          @click="nextStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Step 3: Seismic Actions -->
    <div v-if="currentStep === 3" class="space-y-6">
      <h4 class="text-xl font-semibold">Step Three - Seismic Actions</h4>
      <p>
        Calculate seismic force based on seismic zone, height above ground level, and building importance level.
      </p>

      <!-- Map Toggle -->
      <div class="mb-4">
        <button
          @click="toggleMap"
          class="text-blue-600 hover:text-blue-800 underline"
        >
          {{ showMap ? 'Hide' : 'Show' }} Zones
        </button>
        <div v-if="showMap" class="mt-4 border rounded-lg p-4">
          <div id="mapdiv" class="w-full"></div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <tbody>
            <tr class="border-b">
              <td class="p-2">
                Zone Factor<br />
                <button
                  @click="toggleMap"
                  class="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Show Zones
                </button>
              </td>
              <td class="p-2">
                <select
                  v-model="zonefactor"
                  @change="calculate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option v-for="zone in zoneOptions" :key="zone.value" :value="zone.value">
                    {{ zone.label }}
                  </option>
                </select>
              </td>
              <td class="p-2 text-right">{{ zonefactor }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">
                Importance Level<br />
                <small class="italic">Anything above IL3 will require a design by an engineer</small>
              </td>
              <td class="p-2">
                <select
                  v-model="insttype"
                  @change="calculate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option :value="1" :disabled="limitStateType === 'ULS' || tt2 === 'SLS2'">Importance Level 1</option>
                  <option :value="2">Importance Level 2</option>
                  <option :value="3">Importance Level 3</option>
                </select>
              </td>
              <td class="p-2 text-right">{{ insttype }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">
                Height Factor<br />
                <small class="italic">Ceiling connection height above ground floor</small>
              </td>
              <td class="p-2">
                <select
                  v-model="floorweight"
                  @change="calculate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option :value="3">0 - 3m</option>
                  <option :value="4">3.1 - 6m</option>
                  <option :value="5">6.1 - 9m</option>
                  <option :value="6">9.1m +</option>
                </select>
              </td>
              <td class="p-2 text-right">{{ floorweight }}</td>
            </tr>
            <tr class="border-b">
              <td colspan="2" class="p-2 text-right">
                Seismic Weight <span class="ml-2 px-2 py-1 bg-blue-200 rounded text-xs">Sw</span>
              </td>
              <td class="p-2 text-right">{{ total1 }}</td>
            </tr>
            <tr class="border-b bg-green-50">
              <td colspan="2" class="p-2 text-right font-semibold">
                Total Seismic Force <span class="ml-2 px-2 py-1 bg-green-200 rounded text-xs">Sf</span><br />
                <small>kg/m²</small>
              </td>
              <td class="p-2 text-right">
                SLS = {{ total2 }}<br />
                <span v-if="tt2">SLS2 = {{ total2a }}<br /></span>
                ULS = {{ total2b }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-between mt-6">
        <button
          @click="prevStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Previous
        </button>
        <button
          @click="nextStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Step 4: Selecting Back Bracing -->
    <div v-if="currentStep === 4" class="space-y-6">
      <h4 class="text-xl font-semibold">Step Four - Selecting Back Bracing</h4>
      <p>
        Determine the maximum area of ceiling that each brace can support based
        on seismic force, brace type and the plenum height.
      </p>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <tbody>
            <tr class="border-b">
              <td class="p-2">
                <b>Maximum Plenum Height (m)</b> <span class="ml-2 px-2 py-1 bg-purple-200 rounded text-xs">Ph</span>
              </td>
              <td class="p-2">
                <select
                  v-model="ctype"
                  @change="calculate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option
                    v-for="option in ctypeOptions"
                    :key="option.value"
                    :value="option.value"
                    :data-d45="option.d45"
                    :data-txt="option.txt"
                  >
                    {{ option.value }}
                  </option>
                </select>
              </td>
            </tr>
            <tr class="border-b">
              <td class="p-2"><b>45° stud length (m)</b></td>
              <td class="p-2 text-right">{{ length45 }} m</td>
            </tr>
            <tr class="border-b">
              <td class="p-2"><b>StratoBrace Capacity (kg)</b></td>
              <td class="p-2 text-right">250 kg</td>
            </tr>
            <tr class="border-b">
              <td class="p-2"><b>Brace Arm Size</b></td>
              <td class="p-2 text-right">{{ bracearmText }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2">
                <b>Area per Brace <small>(m²)</small></b>
              </td>
              <td class="p-2 text-right">
                <span class="font-semibold">{{ apb }}</span>
                <span class="ml-2 px-2 py-1 bg-yellow-200 rounded text-xs">Ab</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Toggle buttons for diagrams -->
      <div class="space-y-4">
        <button
          @click="showBBD = !showBBD"
          class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Bracing diagram
        </button>
        <div v-if="showBBD" class="p-4 bg-gray-50 rounded-md">
          <p class="text-sm italic">
            Installation arrangement of StratoBrace. The brace is constructed of
            various steel stud compression posts with 2x steel studs at 45 degrees
            in each direction, depending on the plenum height.
          </p>
        </div>

        <button
          @click="showBCD = !showBCD"
          class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Connection Details
        </button>
        <div v-if="showBCD" class="p-4 bg-gray-50 rounded-md">
          <p class="text-sm">
            All fasteners into the building structure are sufficient for the
            loadings imparted from the back bracing, as long as the manufacturers
            specifications are followed during the installation of the fastener.
          </p>
        </div>
      </div>

      <div class="flex justify-between mt-6">
        <button
          @click="prevStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Previous
        </button>
        <button
          @click="nextStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Step 5: Back Bracing Layout -->
    <div v-if="currentStep === 5" class="space-y-6">
      <h4 class="text-xl font-semibold">Step Five - Back Bracing Layout</h4>

      <p>The minimum number of braces for a ceiling depends on 2 factors:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Capacity basis (sufficient braces to transfer the total ceiling load)</li>
        <li>Motion limiting basis (sufficient braces to ensure that the ceiling moves as a single unit)</li>
      </ul>

      <h5 class="font-semibold mt-4">Minimum number of braces (capacity basis)</h5>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-center">
          <tbody>
            <tr>
              <td class="p-2 border">
                <b>Ceiling Area (m²)</b>
                <span class="ml-2 px-2 py-1 bg-orange-200 rounded text-xs">Ca</span>
              </td>
              <td class="p-2 border"><b>/</b></td>
              <td class="p-2 border">
                <b>Area per brace (m²)</b>
                <span class="ml-2 px-2 py-1 bg-yellow-200 rounded text-xs">Ab</span>
              </td>
              <td class="p-2 border"><b>=</b></td>
              <td class="p-2 border">
                <b>Min. # of braces</b>
                <span class="ml-2 px-2 py-1 bg-blue-200 rounded text-xs">#b</span>
              </td>
            </tr>
            <tr>
              <td class="p-2 border">
                <input
                  v-model.number="carea"
                  type="number"
                  step="0.1"
                  @change="calculate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </td>
              <td class="p-2 border"><b>/</b></td>
              <td class="p-2 border">{{ apb }}</td>
              <td class="p-2 border"><b>=</b></td>
              <td class="p-2 border font-semibold">{{ minbraces }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h5 class="font-semibold mt-4">Maximum brace spacing along a Strongback</h5>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-center">
          <tbody>
            <tr>
              <td class="p-2 border">
                <b>Area per brace (m²)</b>
                <span class="ml-2 px-2 py-1 bg-yellow-200 rounded text-xs">Ab</span>
              </td>
              <td class="p-2 border"><b>/</b></td>
              <td class="p-2 border"><b>Strongback Brace Spacing (m)</b></td>
              <td class="p-2 border"><b>=</b></td>
              <td class="p-2 border">
                <b>Max. Brace Spacing (m)</b>
                <span class="ml-2 px-2 py-1 bg-green-200 rounded text-xs">Bs</span>
              </td>
            </tr>
            <tr>
              <td class="p-2 border">{{ apb }}</td>
              <td class="p-2 border"><b>/</b></td>
              <td class="p-2 border">2.4</td>
              <td class="p-2 border"><b>=</b></td>
              <td class="p-2 border font-semibold">{{ bspace }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4">
        <button
          @click="showBRG = !showBRG"
          class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Bracing Guidance
        </button>
        <div v-if="showBRG" class="mt-4 p-4 bg-gray-50 rounded-md">
          <p class="text-sm italic">
            Bracing should be laid out evenly throughout the ceiling area.
            Strongbacks closest to the ceiling edges should be braced.
            Thereafter every second strongback must be braced. It is preferable
            that every strongback is braced.
          </p>
        </div>
      </div>

      <div class="flex justify-between mt-6">
        <button
          @click="prevStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Previous
        </button>
        <button
          @click="nextStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Step 6: Determining the Seismic Clearance -->
    <div v-if="currentStep === 6" class="space-y-6">
      <h4 class="text-xl font-semibold">Step Six - Determining the Seismic Clearance</h4>
      <p>
        Determining a seismic clearance is to ensure there is sufficient
        clearance to allow parts to move relative to each other during a seismic event.
      </p>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-center">
          <tbody>
            <tr>
              <td class="p-2 border">
                <b>Plenum height (m)</b>
                <span class="ml-2 px-2 py-1 bg-purple-200 rounded text-xs">Ph</span>
              </td>
              <td class="p-2 border"><b>X</b></td>
              <td class="p-2 border">
                <b>Interstory drift factor</b><br />
                {{ limitStateType }}<span v-if="tt2"> {{ tt2 }}</span>
              </td>
              <td class="p-2 border"><b>=</b></td>
              <td class="p-2 border">
                <b>Required Seismic Clearance (mm)</b>
                <span class="ml-2 px-2 py-1 bg-red-200 rounded text-xs">Sc</span>
              </td>
            </tr>
            <tr>
              <td class="p-2 border">{{ pheight }}</td>
              <td class="p-2 border"><b>X</b></td>
              <td class="p-2 border">{{ idf }}%</td>
              <td class="p-2 border"><b>=</b></td>
              <td class="p-2 border font-semibold">{{ rclearance }} mm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-between mt-6">
        <button
          @click="prevStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Previous
        </button>
        <button
          @click="nextStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Step 7: Download -->
    <div v-if="currentStep === 7" class="space-y-6">
      <h4 class="text-xl font-semibold">Step Seven - Download</h4>
      <p>Appendix A: Details on the Selection of Pertinent Factors</p>

      <hr />

      <h2 class="text-2xl font-bold text-green-600 text-center">We're done!</h2>

      <div class="text-center">
        <button
          @click="showDownloadModal = true"
          class="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
        >
          Download Result
        </button>
      </div>

      <div class="flex justify-start mt-6">
        <button
          @click="prevStep"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Previous
        </button>
      </div>
    </div>

    <!-- Download Modal -->
    <div
      v-if="showDownloadModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showDownloadModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-xl font-semibold mb-4">Download Result</h3>
        
        <div v-if="!downloading && !downloadComplete" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Project Name</label>
            <input
              v-model="projectname"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">By Name</label>
            <input
              v-model="byname"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Notes</label>
            <textarea
              v-model="dnote"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div class="flex gap-4">
            <button
              @click="downloadPDF"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Generate PDF
            </button>
            <button
              @click="showDownloadModal = false"
              class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>

        <div v-if="downloading" class="text-center py-8">
          <p>Generating PDF...</p>
        </div>

        <div v-if="downloadComplete" class="text-center py-8">
          <p class="text-green-600 font-semibold mb-4">PDF Downloaded Successfully!</p>
          <p class="text-sm text-gray-600 mb-4">The PDF has been downloaded to your device.</p>
          <button
            @click="showDownloadModal = false"
            class="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { generatePDF } from './pdfGenerator.js'

// Step management
const currentStep = ref(0)

// Limit state logic
const tt = ref('')
const tt2 = ref('')
const limitStateType = computed(() => tt.value)
const showMultiState = computed(() => tt2.value !== '')

// Step 1 conditional displays
const showDiv1_0 = ref(true)
const showDiv1_1 = ref(false)
const showDiv1_2 = ref(false)
const showDiv1_3 = ref(false)
const showDiv1_4 = ref(false)
const showDiv1_5 = ref(false)
const showDiv1_6 = ref(false)
const showDiv1_7 = ref(false)

// Step 2 inputs
const gridmass = ref(1.3)
const bafflespace = ref(0.1)
const baffleSpaceError = ref(false)
const luminaries = ref(0.2)
const insulation = ref(3)
const other = ref(0)

// Step 3 inputs
const zonefactor = ref(0.13)
const insttype = ref(2)
const floorweight = ref(3)
const showMap = ref(false)
const mapload = ref(0)

// Step 4 inputs
const ctype = ref(0.20)
const showBBD = ref(false)
const showBCD = ref(false)

// Step 5 inputs
const carea = ref(100)
const showBRG = ref(false)

// Download modal
const showDownloadModal = ref(false)
const downloading = ref(false)
const downloadComplete = ref(false)
const downloadLink = ref('')
const projectname = ref('')
const byname = ref('')
const dnote = ref('')

// Zone options (extracted from reference HTML)
const zoneOptions = [
  { value: 0.1, label: 'Kaitaia' },
  { value: 0.1, label: 'Paihia/Russell' },
  { value: 0.1, label: 'Kaikohe' },
  { value: 0.1, label: 'Whangarei' },
  { value: 0.1, label: 'Dargaville' },
  { value: 0.13, label: 'Warkworth' },
  { value: 0.13, label: 'Auckland' },
  { value: 0.13, label: 'Manukau City' },
  { value: 0.13, label: 'Waiuku' },
  { value: 0.13, label: 'Pukekohe' },
  { value: 0.16, label: 'Thames' },
  { value: 0.18, label: 'Paeroa' },
  { value: 0.18, label: 'Waihi' },
  { value: 0.15, label: 'Huntly' },
  { value: 0.15, label: 'Ngaruawahia' },
  { value: 0.18, label: 'Morrinsville' },
  { value: 0.18, label: 'Te Aroha' },
  { value: 0.2, label: 'Tauranga' },
  { value: 0.2, label: 'Mount Maunganui' },
  { value: 0.16, label: 'Hamilton' },
  { value: 0.18, label: 'Cambridge' },
  { value: 0.17, label: 'Te Awamutu' },
  { value: 0.19, label: 'Matamata' },
  { value: 0.22, label: 'Te Puke' },
  { value: 0.21, label: 'Putaruru' },
  { value: 0.21, label: 'Tokoroa' },
  { value: 0.17, label: 'Otorohanga' },
  { value: 0.18, label: 'Te Kuiti' },
  { value: 0.21, label: 'Mangakino' },
  { value: 0.24, label: 'Rotorua' },
  { value: 0.29, label: 'Kawerau' },
  { value: 0.3, label: 'Whakatane' },
  { value: 0.3, label: 'Opotiki' },
  { value: 0.33, label: 'Ruatoria' },
  { value: 0.3, label: 'Murupara' },
  { value: 0.28, label: 'Taupo' },
  { value: 0.21, label: 'Taumarunui' },
  { value: 0.27, label: 'Turangi' },
  { value: 0.36, label: 'Gisborne' },
  { value: 0.37, label: 'Wairoa' },
  { value: 0.18, label: 'Waitara' },
  { value: 0.18, label: 'New Plymouth' },
  { value: 0.18, label: 'Inglewood' },
  { value: 0.18, label: 'Stratford' },
  { value: 0.18, label: 'Opunake' },
  { value: 0.18, label: 'Hawera' },
  { value: 0.19, label: 'Patea' },
  { value: 0.26, label: 'Raetihi' },
  { value: 0.27, label: 'Ohakune' },
  { value: 0.29, label: 'Waiouru' },
  { value: 0.38, label: 'Napier' },
  { value: 0.39, label: 'Hastings' },
  { value: 0.25, label: 'Wanganui' },
  { value: 0.41, label: 'Waipawa' },
  { value: 0.41, label: 'Waipukurau' },
  { value: 0.33, label: 'Taihape' },
  { value: 0.3, label: 'Marton' },
  { value: 0.31, label: 'Bulls' },
  { value: 0.37, label: 'Feilding' },
  { value: 0.38, label: 'Palmerston North' },
  { value: 0.42, label: 'Dannevirke' },
  { value: 0.41, label: 'Woodville' },
  { value: 0.42, label: 'Pahiatua' },
  { value: 0.36, label: 'Foxton/Foxton Beach' },
  { value: 0.4, label: 'Levin' },
  { value: 0.4, label: 'Otaki' },
  { value: 0.4, label: 'Waikanae' },
  { value: 0.4, label: 'Paraparaumu' },
  { value: 0.42, label: 'Masterton' },
  { value: 0.4, label: 'Porirua' },
  { value: 0.4, label: 'Wellington CBD (North of Basin Reserve)' },
  { value: 0.4, label: 'Wellington' },
  { value: 0.4, label: 'Hutt Valley (South of Taita Gorge)' },
  { value: 0.42, label: 'Upper Hutt' },
  { value: 0.4, label: 'Eastborne - Point Howard' },
  { value: 0.4, label: 'Wainuiomata' },
  { value: 0.23, label: 'Takaka' },
  { value: 0.26, label: 'Motueka' },
  { value: 0.27, label: 'Nelson' },
  { value: 0.3, label: 'Picton' },
  { value: 0.33, label: 'Blenheim' },
  { value: 0.36, label: 'St Arnaud' },
  { value: 0.3, label: 'Westport' },
  { value: 0.37, label: 'Reefton' },
  { value: 0.34, label: 'Murchison' },
  { value: 0.45, label: 'Springs Junction' },
  { value: 0.55, label: 'Hanmer Springs' },
  { value: 0.4, label: 'Seddon' },
  { value: 0.4, label: 'Ward' },
  { value: 0.4, label: 'Cheviot' },
  { value: 0.37, label: 'Greymouth' },
  { value: 0.42, label: 'Kaikoura' },
  { value: 0.46, label: 'Harihari' },
  { value: 0.45, label: 'Hokitika' },
  { value: 0.44, label: 'Fox Glacier' },
  { value: 0.44, label: 'Franz Josef' },
  { value: 0.6, label: 'Otira' },
  { value: 0.6, label: 'Arthurs Pass' },
  { value: 0.33, label: 'Rangiora' },
  { value: 0.3, label: 'Darfield' },
  { value: 0.3, label: 'Akaroa' },
  { value: 0.3, label: 'Christchurch' },
  { value: 0.19, label: 'Geraldine' },
  { value: 0.2, label: 'Ashburton' },
  { value: 0.24, label: 'Fairlie' },
  { value: 0.17, label: 'Temuka' },
  { value: 0.15, label: 'Timaru' },
  { value: 0.38, label: 'Mt Cook' },
  { value: 0.27, label: 'Twizel' },
  { value: 0.14, label: 'Waimate' },
  { value: 0.24, label: 'Cromwell' },
  { value: 0.3, label: 'Wanaka' },
  { value: 0.3, label: 'Arrowtown' },
  { value: 0.21, label: 'Alexandra' },
  { value: 0.32, label: 'Queenstown' },
  { value: 0.54, label: 'Milford Sound' },
  { value: 0.13, label: 'Palmerston' },
  { value: 0.13, label: 'Oamaru' },
  { value: 0.13, label: 'Dunedin' },
  { value: 0.13, label: 'Mosgiel' },
  { value: 0.2, label: 'Riverton' },
  { value: 0.36, label: 'Te Anau' },
  { value: 0.18, label: 'Gore' },
  { value: 0.2, label: 'Winton' },
  { value: 0.13, label: 'Balclutha' },
  { value: 0.17, label: 'Mataura' },
  { value: 0.15, label: 'Bluff' },
  { value: 0.17, label: 'Invercargill' },
  { value: 0.14, label: 'Oban' }
]

// Ceiling type options
const ctypeOptions = [
  { value: 0.20, d45: 0.28, txt: '1' },
  { value: 0.40, d45: 0.57, txt: '1' },
  { value: 0.60, d45: 0.85, txt: '1' },
  { value: 0.80, d45: 1.13, txt: '1' },
  { value: 1.00, d45: 1.41, txt: '1' },
  { value: 1.20, d45: 1.70, txt: '1' },
  { value: 1.40, d45: 1.98, txt: '1' },
  { value: 1.60, d45: 2.26, txt: '2' },
  { value: 1.80, d45: 2.55, txt: '2' },
  { value: 2.00, d45: 2.83, txt: '3' },
  { value: 2.20, d45: 3.11, txt: '3' },
  { value: 2.40, d45: 3.39, txt: '3' },
  { value: 2.60, d45: 3.68, txt: '4' },
  { value: 2.80, d45: 3.96, txt: '5' }
]

// Computed values
const bafflemass = computed(() => {
  if (bafflespace.value <= 0) return 0
  return gridmass.value / bafflespace.value
})

const total1 = computed(() => {
  return (bafflemass.value + 1.27 + luminaries.value + insulation.value + other.value).toFixed(2)
})

const returnfactorSLS = computed(() => 0.3325)

const returnfactorSLS2 = computed(() => {
  if (insttype.value === 2) return 0.665
  if (insttype.value === 3) return 0.9975
  return 0.3325
})

const returnfactorULS = computed(() => {
  if (insttype.value === 2) return 1.33
  if (insttype.value === 3) return 1.729
  return 0.3325
})

const total2 = computed(() => {
  return (
    zonefactor.value *
    returnfactorSLS.value *
    floorweight.value *
    1 *
    parseFloat(total1.value)
  ).toFixed(1)
})

const total2a = computed(() => {
  return (
    zonefactor.value *
    returnfactorSLS2.value *
    floorweight.value *
    1 *
    parseFloat(total1.value)
  ).toFixed(1)
})

const total2b = computed(() => {
  return (
    zonefactor.value *
    returnfactorULS.value *
    floorweight.value *
    0.55 *
    parseFloat(total1.value)
  ).toFixed(1)
})

const selectedCtypeOption = computed(() => {
  return ctypeOptions.find(opt => opt.value === parseFloat(ctype.value)) || ctypeOptions[0]
})

const length45 = computed(() => {
  return selectedCtypeOption.value.d45
})

const bracearmText = computed(() => {
  const txt = selectedCtypeOption.value.txt
  if (txt === '1') return '64x35x0.55mm or 92x35x0.55mm Steel Stud'
  if (txt === '2') return '92x35x0.75mm Steel Stud'
  if (txt === '3') return 'Boxed 64x35x0.75mm Steel Stud or Boxed 92x35x0.75mm Steel Stud'
  return 'Boxed 92x35x0.75mm Steel Stud'
})

const high1 = computed(() => {
  if (tt.value === 'ULS') {
    return Math.max(parseFloat(total2.value), parseFloat(total2a.value), parseFloat(total2b.value))
  } else {
    return Math.max(parseFloat(total2.value), parseFloat(total2b.value))
  }
})

const apb = computed(() => {
  return ((250 * 0.7) / high1.value).toFixed(1)
})

const minbraces = computed(() => {
  return Math.ceil(carea.value / parseFloat(apb.value))
})

const bspace = computed(() => {
  return (parseFloat(apb.value) / 2.4).toFixed(1)
})

const pheight = computed(() => {
  return parseFloat(ctype.value)
})

const idf = computed(() => {
  return tt.value === 'ULS' ? 0.025 : 0.0075
})

const rclearance = computed(() => {
  return (pheight.value * idf.value * 1000).toFixed(1)
})

// Methods
function nextStep() {
  if (currentStep.value < 7) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

function enableSLS2() {
  tt2.value = 'SLS2'
  showDiv1_1.value = true
  showDiv1_0.value = false
}

function disableSLS2() {
  tt2.value = ''
  showDiv1_1.value = true
  showDiv1_0.value = false
}

function setULS() {
  tt.value = 'ULS'
  showDiv1_6.value = true
  showDiv1_7.value = true
  showDiv1_5.value = false
  if (tt.value === 'SLS2' || tt.value === 'ULS') {
    // Hide importance level 1 option
  }
}

function setSLS() {
  tt.value = 'SLS'
  showDiv1_6.value = true
  showDiv1_7.value = true
  showDiv1_5.value = false
}

function validateBaffleSpace() {
  const bsp = bafflespace.value
  baffleSpaceError.value = bsp < 0.1 || bsp > 1
}

function calculate() {
  // Calculations are reactive via computed properties
  // This function can be used to trigger side effects if needed
}

function toggleMap() {
  showMap.value = !showMap.value
  if (showMap.value && mapload.value === 0) {
    // Load map iframe on next tick to ensure DOM is ready
    setTimeout(() => {
      const mapdiv = document.getElementById('mapdiv')
      if (mapdiv) {
        mapdiv.innerHTML =
          '<iframe src="https://www.google.com/maps/d/embed?mid=10bhne8TlErYtzZIwt3-e_dYP_yo&z=5" width="640" height="480" style="width:100%; border:none;"></iframe>'
        mapload.value = 1
      }
    }, 100)
  }
}

async function downloadPDF() {
  downloading.value = true
  
  // Get gridmass text
  const gridmassText = (() => {
    const gridmassMap = {
      '1.3': '100mm by 30mm (Gridlux compatible)',
      '1.7': '135mm by 30mm',
      '1.8': '150mm by 25mm',
      '2.4': '150mm by 30mm (Gridlux compatible)'
    }
    return gridmassMap[gridmass.value.toString()] || gridmass.value.toString()
  })()

  // Get floor weight text
  const floorWeightText = (() => {
    const floorWeightMap = {
      '3': '0 - 3m',
      '4': '3.1 - 6m',
      '5': '6.1 - 9m',
      '6': '9.1m +'
    }
    return floorWeightMap[floorweight.value.toString()] || floorweight.value.toString()
  })()

  const pdata = {
    done: '2',
    projectname: projectname.value,
    byname: byname.value,
    dnote: dnote.value,
    lst: tt.value,
    sls2test: tt2.value ? '1' : '0',
    sw: total1.value,
    gridmass: gridmass.value.toString(),
    gridmasst: gridmassText,
    bafflespace: bafflespace.value.toString(),
    bafflemass: bafflemass.value.toFixed(2),
    strongbackmass: '1.27',
    strongbackmasst: '41x21x1.2 PST Channel',
    luminaries: luminaries.value.toString(),
    insulation: insulation.value.toString(),
    other: other.value.toString(),
    carea: carea.value.toString(),
    apb: apb.value,
    minbraces: minbraces.value.toString(),
    bspace: bspace.value,
    rclearance: rclearance.value,
    sf1: total2.value, // SLS
    sf2: total2a.value, // SLS2
    sf3: total2b.value, // ULS
    zone: zonefactor.value.toString(),
    zonet: zoneOptions.find(z => z.value === zonefactor.value)?.label || '',
    insttype: insttype.value.toString(),
    floorweight: floorweight.value.toString(),
    floorweightt: floorWeightText
  }

  try {
    await generatePDF(pdata)
    downloading.value = false
    downloadComplete.value = true
    downloadLink.value = '#' // Not needed for direct download, but keeping for UI consistency
  } catch (error) {
    console.error('Error generating PDF:', error)
    downloading.value = false
    alert('Error generating PDF. Please try again. Error: ' + error.message)
  }
}

// Watch for changes
watch([gridmass, bafflespace, luminaries, insulation, other, zonefactor, insttype, floorweight, ctype, carea], () => {
  calculate()
})

// Initialize
calculate()
</script>

