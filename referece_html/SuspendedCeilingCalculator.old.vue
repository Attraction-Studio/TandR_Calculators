<template>
  <div class="w-full">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="heading-style-h1 mb-4">
        Suspended Ceiling Seismic Calculator
      </h2>
      <p class="paragraph-18px max-w-3xl">
        This calculator helps you determine seismic requirements for suspended
        ceiling systems in accordance with NZ seismic standards.
      </p>
    </div>

    <!-- Wizard Progress -->
    <WizardProgress :steps="wizardSteps" :current-step="currentStep" />

    <!-- Wizard Content -->
    <div class="min-h-[600px]">
      <!-- Page 1: Introduction -->
      <div v-show="currentStep === 1">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content (2/3) -->
          <div class="lg:col-span-2">
            <h2 class="text-4xl font-bold mb-8">T&R Seismic Calculator</h2>

            <div class="prose max-w-none space-y-6">
              <p class="paragraph-18px">
                Because every building is different, there is no standard
                seismic restraint solution to address site, location, form and
                function. The scope of seismic restraint and related engineering
                work that will be required will not be known until the ceiling
                design is completed. The T&R Seismic System will provide a
                solution for buildings with an Importance Level of 3 and below.
                A suitably qualified Chartered Professional Engineer will be
                required for Importance Levels 4 & 5. It is imperative that
                mechanical services, sprinkler systems, electrical and suspended
                ceiling design are all co-ordinated at appropriate stages.
              </p>

              <p class="paragraph-18px">
                While full compliance with seismic requirements will add cost,
                it will limit damage, reduce repair costs and reduce the time to
                re-occupy post event. Furthermore it is now a legislative
                requirement for Code of Compliance Certificates and Health and
                Safety Laws. The new laws, affect those who are upstream from
                the workplace (for example designers, engineers, manufacturers,
                suppliers or installers). Specifically they have a duty to
                ensure, so far as is reasonably practicable, that the work they
                do or the things they provide to the workplace don't create
                health and safety risks.
              </p>

              <div class="my-8">
                <h3 class="text-xl font-semibold mb-4">Usage Notes:</h3>

                <p class="text-sm mb-4">
                  This guide allows a designer to calculate required bracing for
                  suspended ceilings. The calculations are based on conservative
                  assumptions. Reduced seismic bracing designs for individual
                  sites may be possible if a suitably qualified Chartered
                  Professional Engineer carries out a site-specific design. This
                  guide should not be used as a calculation template for a PS-1;
                  specific seismic design should be carried out for these cases.
                </p>

                <p class="text-sm mb-4">
                  This guide has been prepared by JSK Consulting Engineers for
                  T&R Interior Systems with the usual care and thoroughness of
                  the consulting profession. Interpretation and application of
                  this guide is outside the control of the engineer and
                  therefore is the users' responsibility. This guide does not
                  constitute a producer statement or engineer's certification,
                  and is not for use with trafficable ceilings or ceilings which
                  support partition walls or any other service load.
                </p>

                <p class="text-sm mb-4">
                  Allowance for relative motion between the ceiling and
                  structure must be provided by floating edges. If the perimeter
                  bracing method is used then two perpendicular edges must be
                  fixed with the remaining two floating. If back bracing to the
                  upper structure is used, then all edges must be floating.
                  Floating edges must also be provided around rigid or
                  separately braced items that pass through the ceiling. The
                  amount of clearance should be checked by an engineer on a
                  case-by-case basis.
                </p>

                <p class="text-sm">
                  Consult a structural engineer for the expected earthquake
                  deflections of the structure.
                </p>
              </div>

              <InfoBox variant="info">
                <p class="text-sm">
                  © The T&R Seismic System has been developed in conjunction
                  with JSK Consulting Engineers, the University of Canterbury
                  and T&R Interior Systems. It remains the intellectual property
                  of T&R Interior Systems and may not be used with other
                  products.
                </p>
              </InfoBox>
            </div>
          </div>

          <!-- Right Sidebar (1/3) -->
          <div class="lg:col-span-1">
            <div class="border border-brand-black p-6 bg-white sticky top-4">
              <h3
                class="text-xl font-semibold mb-4 pb-3 border-b border-brand-black"
              >
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
                    >This design is for 2 way exposed 24mm CBI grid only and
                    cannot be used with any other manufacturer's grid</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Page 2: Design Methods -->
      <div v-show="currentStep === 2">
        <div class="max-w-4xl">
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
                This approach to seismic restraint relies on connections to
                adjacent walls to transfer the horizontal seismic load back to
                the primary building structure.
              </p>
              <p class="paragraph-18px mb-4">
                The perimeter fixing approach relies on a fix-float philosophy,
                where the perimeter edges directly opposite a 'fixed' edge shall
                be 'floating'.
              </p>
              <p class="paragraph-18px mb-4">
                A fixed edge has the tee riveted to the wall trim and screws
                each side of the tee into the wall to provide a solid load path.
                The floating edge has seismic clearance between the ceiling and
                the wall to allow for movement of the building structure.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div class="bg-gray-100 p-4">
                  <h4 class="font-semibold mb-2">Pros</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>Cheaper and faster installation</li>
                    <li>Less plenum congestion</li>
                  </ul>
                </div>
                <div class="bg-gray-100 p-4">
                  <h4 class="font-semibold mb-2">Cons</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Can only be used for small-medium ceilings, as the ceiling
                      size is limited by the grid strength
                    </li>
                    <li>
                      Walls must be capable of transferring the seismic load
                    </li>
                    <li>
                      Seismic joints may be used to expand the size of ceiling
                      that may be edge restrained
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="my-8">
              <h3 class="text-2xl font-semibold mb-4">2. Back Bracing</h3>
              <p class="paragraph-18px mb-4">
                This approach is used for larger ceilings, where the required
                ceiling tee lengths exceed the allowable lengths or where the
                walls around the ceiling cannot be relied upon to transfer the
                seismic load to the primary building structure.
              </p>
              <p class="paragraph-18px mb-4">
                Rigid bracing is used evenly throughout the ceiling to transfer
                the ceiling seismic load through to the overhead structure. This
                approach requires that all the perimeter edges are floating in
                order to prevent damage from inter-story drift.
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
                      Important if there are part height walls or bulkheads
                      around the ceiling that have not been designed to carry
                      the ceiling loads
                    </li>
                  </ul>
                </div>
                <div class="bg-gray-100 p-4">
                  <h4 class="font-semibold mb-2">Cons</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Larger plenum heights require large floating edge
                      clearances
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
                situations is rigid hangers. This approach is suitable for
                ceilings suspended very close (50-500mm) to purlins,
                rafters/trusses, or floor joists. The wire hangers are replaced
                with heavy gauge steel angle hangers, which are used to transfer
                the seismic load back to primary structure.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Limit State Selection -->
      <div v-show="currentStep === 3">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content (2/3) -->
          <div class="lg:col-span-2">
            <h2 class="text-3xl font-bold mb-6">Step One - Limit State Type</h2>

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

              <!-- Question Box -->
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
                  v-model="limitState"
                  label="Select Limit State Design"
                  :options="limitStateOptions"
                />
              </QuestionBox>

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

          <!-- Calculation Sidebar (1/3) -->
          <div class="lg:col-span-1">
            <CalculationSidebar>
              <div class="space-y-4 text-sm">
                <div>
                  <div class="font-semibold mb-1">T - Limit State Type</div>
                  <div class="text-lg">
                    {{ limitState.toUpperCase() || "-" }}
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
      </div>

      <!-- Step 4: Site Information -->
      <div v-show="currentStep === 4">
        <StepCard
          :step-number="2"
          title="Site Information"
          description="Enter details about your project location and building"
          :is-complete="step2Complete"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SelectField
              id="zone-factor"
              v-model="zoneFactor"
              label="Seismic Zone"
              :options="zoneFactorOptions"
              placeholder="Select your location"
              required
              hint="Select the closest location to your project"
            />

            <SelectField
              id="importance-level"
              v-model="importanceLevel"
              label="Importance Level"
              :options="importanceLevelOptions"
              required
            />

            <InputField
              id="floor-height"
              v-model.number="floorHeight"
              label="Floor Height (m)"
              type="number"
              step="0.1"
              min="0"
              hint="Height from ground to floor level"
            />

            <InputField
              id="ceiling-height"
              v-model.number="ceilingHeight"
              label="Ceiling Height (m)"
              type="number"
              step="0.1"
              min="0"
              hint="Height from floor to ceiling"
            />
          </div>
        </StepCard>
      </div>

      <!-- Step 5: Seismic Weight -->
      <div v-show="currentStep === 5">
        <StepCard
          :step-number="3"
          title="Seismic Weight Components"
          description="Enter the weight of all ceiling components"
          :is-complete="step3Complete"
        >
          <div class="flex lg:flex-row flex-col gap-6">
            <!-- Left: Inputs -->
            <div class="lg:w-1/2 w-full space-y-6">
              <SelectField
                id="grid-mass"
                v-model="gridMass"
                label="Grid Type"
                :options="gridMassOptions"
                @update:model-value="onGridMassChange"
              />

              <ConditionalSection :show="gridMassNote">
                <InfoBox variant="warning" :title="gridMassNote.title">
                  {{ gridMassNote.text }}
                </InfoBox>
              </ConditionalSection>

              <TableSelect
                id="tile-mass"
                v-model="tileMass"
                label="Tile Type"
                :options="tileMassOptions"
                :columns="['type', 'mass']"
                :headers="['Tile Type', 'Mass (kg/m²)']"
                hint="Click a row to select"
              />

              <InputField
                id="luminaries"
                v-model.number="luminaries"
                label="Luminaries (kg/m²)"
                type="number"
                step="0.1"
                min="0"
              />

              <InputField
                id="insulation"
                v-model.number="insulation"
                label="Insulation (kg/m²)"
                type="number"
                step="0.1"
                min="0"
              />

              <InputField
                id="other-loads"
                v-model.number="otherLoads"
                label="Other Loads (kg/m²)"
                type="number"
                step="0.1"
                min="0"
              />
            </div>

            <!-- Right: Live Calculation -->
            <div class="lg:w-1/2 w-full">
              <div class="border border-brand-black p-6 sticky top-4">
                <h4 class="btn_12_text mb-4 border-b border-brand-black pb-2">
                  Total Seismic Weight
                </h4>
                <div class="text-4xl font-bold mb-6">
                  {{ seismicWeight.toFixed(1) }}
                  <span class="text-2xl">kg/m²</span>
                </div>

                <div class="space-y-2 text-sm mb-4">
                  <div class="flex justify-between">
                    <span>Grid Mass:</span>
                    <span class="font-semibold"
                      >{{ Number(gridMass || 0).toFixed(1) }} kg/m²</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span>Tile Mass:</span>
                    <span class="font-semibold"
                      >{{ Number(tileMass || 0).toFixed(1) }} kg/m²</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span>Luminaries:</span>
                    <span class="font-semibold"
                      >{{ luminaries.toFixed(1) }} kg/m²</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span>Insulation:</span>
                    <span class="font-semibold"
                      >{{ insulation.toFixed(1) }} kg/m²</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span>Other:</span>
                    <span class="font-semibold"
                      >{{ otherLoads.toFixed(1) }} kg/m²</span
                    >
                  </div>
                  <div
                    class="flex justify-between border-t border-brand-black pt-2"
                  >
                    <span>Dead Load:</span>
                    <span class="font-semibold"
                      >{{ deadLoad.toFixed(1) }} kg/m²</span
                    >
                  </div>
                </div>

                <InfoBox
                  v-if="weightValidation.error"
                  variant="warning"
                  title="Weight Limit Exceeded"
                >
                  {{ weightValidation.error }}
                </InfoBox>
              </div>
            </div>
          </div>
        </StepCard>
      </div>

      <!-- Step 6: Grid Configuration -->
      <div v-show="currentStep === 6">
        <StepCard
          :step-number="4"
          title="Grid Configuration"
          description="Select your ceiling grid and connection details"
          :is-complete="step4Complete"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SelectField
              id="stud-type"
              v-model="studType"
              label="Wall Construction Type"
              :options="studTypeOptions"
            />

            <SelectField
              id="connection-type"
              v-model="connectionType"
              label="Connection Type"
              :options="connectionTypeOptions"
            />

            <SelectField
              id="grid-type"
              v-model="gridType"
              label="Grid Type"
              :options="gridTypeOptions"
            />
          </div>

          <div class="mt-6 p-4 bg-gray-50 border border-brand-black">
            <h4 class="btn_12_text mb-2">Grid Spacing</h4>
            <div class="flex gap-6">
              <div>
                <span class="text-sm">Main Tee:</span>
                <span class="font-semibold ml-2">{{ gridSpacing.main }}m</span>
              </div>
              <div>
                <span class="text-sm">Cross Tee:</span>
                <span class="font-semibold ml-2">{{ gridSpacing.cross }}m</span>
              </div>
            </div>
          </div>
        </StepCard>
      </div>

      <!-- Step 7: Design Options -->
      <div v-show="currentStep === 7">
        <StepCard
          :step-number="5"
          title="Design Options"
          description="Configure grid strengthening and special conditions"
          :is-complete="step5Complete"
        >
          <div class="space-y-8">
            <QuestionCard
              question-title="Specify the location of the first Main Tee connection?"
              info-title="Connection Location"
            >
              <template #context>
                <p class="mb-3">
                  If you wish to specify the location of the first tee
                  connections, full lengths of main tees are to be used around
                  the fixed edges of the ceilings.
                </p>
                <p class="text-sm text-gray-600">
                  When yes is selected, the limiting lengths are increased by
                  3.0m.
                </p>
              </template>

              <template #answer>
                <RadioGroup
                  id="specify-connection"
                  v-model="specifyMainConnection"
                  label="Specify Connection Location?"
                  :options="yesNoOptions"
                />
              </template>
            </QuestionCard>

            <QuestionCard
              question-title="Grid Strengthening Options"
              info-title="About Grid Strengthening"
            >
              <template #context>
                <p class="mb-3">
                  The T&R 4-way clip can be installed at main or cross tee
                  connections, allowing the limiting tee length to be increased
                  in some cases.
                </p>
              </template>

              <template #info>
                <p>
                  Grid strengthening is used when tee lengths exceed capacity
                  limits. Clips are installed at connection points to increase
                  strength.
                </p>
              </template>

              <template #answer>
                <div class="space-y-4">
                  <RadioGroup
                    id="strengthen-main"
                    v-model="strengthenMain"
                    label="Strengthen Main Tees?"
                    :options="yesNoOptions"
                  />

                  <RadioGroup
                    id="strengthen-cross"
                    v-model="strengthenCross"
                    label="Strengthen Cross Tees?"
                    :options="yesNoOptions"
                  />
                </div>
              </template>
            </QuestionCard>

            <QuestionCard
              question-title="Is the ceiling raked?"
              info-title="Rake Angle Information"
            >
              <template #context>
                <p class="mb-3">
                  A raked ceiling is one that is angled from the horizontal. The
                  maximum allowable rake is 20 degrees.
                </p>
              </template>

              <template #info>
                <p>
                  Rake angles affect seismic calculations by modifying the
                  effective tee lengths. Specific design by a qualified engineer
                  is required for angles exceeding 20°.
                </p>
              </template>

              <template #answer>
                <RadioGroup
                  id="is-raked"
                  v-model="isRaked"
                  label="Ceiling Raked?"
                  :options="yesNoOptions"
                />

                <ConditionalSection :show="isRaked === 'yes'">
                  <InputField
                    id="rake-angle"
                    v-model.number="rakeAngle"
                    label="Rake Angle (degrees)"
                    type="number"
                    step="0.1"
                    min="0"
                    :max="20"
                    :error="rakeAngleError"
                    hint="Maximum 20 degrees"
                    class="mt-4"
                  />
                </ConditionalSection>
              </template>
            </QuestionCard>
          </div>
        </StepCard>
      </div>

      <!-- Step 8: Validation -->
      <div v-show="currentStep === 8">
        <StepCard
          :step-number="6"
          title="Measured Tee Lengths"
          description="Enter the maximum measured tee lengths as per plans supplied"
          :is-complete="step6Complete"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InputField
              id="max-main-tee"
              v-model.number="maxMainTee"
              label="Max Main Tee Length (m)"
              type="number"
              step="0.1"
              min="0"
              required
            />

            <InputField
              id="max-cross-tee"
              v-model.number="maxCrossTee"
              label="Max Cross Tee Length (m)"
              type="number"
              step="0.1"
              min="0"
              required
            />
          </div>
        </StepCard>
      </div>

      <!-- Step 9: Results -->
      <div v-show="currentStep === 9">
        <div class="border-t border-brand-black pt-8 mt-12">
          <h2 class="btn_12_text mb-6">Calculation Results</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <!-- Left: Key Values -->
            <div>
              <h3 class="text-2xl font-semibold mb-4">Key Values</h3>
              <div class="space-y-3">
                <CalculationResult
                  label="Seismic Weight"
                  :value="seismicWeight"
                  unit="kg/m²"
                  :is-bold="true"
                />
                <CalculationResult
                  label="Floor Factor"
                  :value="floorFactorValue"
                  :decimals="1"
                />
                <CalculationResult
                  label="Seismic Force (SLS)"
                  :value="seismicForces.sls"
                  unit="kgf/m²"
                />
                <CalculationResult
                  label="Seismic Force (ULS)"
                  :value="seismicForces.uls"
                  unit="kgf/m²"
                  :is-bold="true"
                />
              </div>
            </div>

            <!-- Right: Limiting Lengths -->
            <div>
              <h3 class="text-2xl font-semibold mb-4">Limiting Lengths</h3>
              <div class="space-y-3">
                <CalculationResult
                  label="Limiting Main Tee Length (ULS)"
                  :value="adjustedLimitingLengths.uls.main"
                  unit="m"
                  :is-bold="true"
                  description="Maximum allowable main tee length"
                />
                <CalculationResult
                  label="Limiting Cross Tee Length (ULS)"
                  :value="adjustedLimitingLengths.uls.cross"
                  unit="m"
                  :is-bold="true"
                  description="Maximum allowable cross tee length"
                />
              </div>

              <div class="mt-6 space-y-3">
                <div class="flex items-center gap-2">
                  <span
                    :class="[
                      'w-6 h-6 flex items-center justify-center border-2 border-brand-black font-bold',
                      designValidation.mainPass
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white',
                    ]"
                  >
                    {{ designValidation.mainPass ? "✓" : "✗" }}
                  </span>
                  <span class="text-sm">
                    Main Tee: {{ maxMainTee.toFixed(1) }}m
                    {{ designValidation.mainPass ? "≤" : ">" }}
                    {{ designValidation.governingMain.toFixed(1) }}m
                  </span>
                </div>

                <div class="flex items-center gap-2">
                  <span
                    :class="[
                      'w-6 h-6 flex items-center justify-center border-2 border-brand-black font-bold',
                      designValidation.crossPass
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white',
                    ]"
                  >
                    {{ designValidation.crossPass ? "✓" : "✗" }}
                  </span>
                  <span class="text-sm">
                    Cross Tee: {{ maxCrossTee.toFixed(1) }}m
                    {{ designValidation.crossPass ? "≤" : ">" }}
                    {{ designValidation.governingCross.toFixed(1) }}m
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Design Recommendation -->
          <InfoBox
            :variant="
              designValidation.mainPass && designValidation.crossPass
                ? 'info'
                : 'warning'
            "
            title="Design Recommendation"
          >
            {{ designValidation.recommendation }}
          </InfoBox>

          <!-- Grid Strengthening Notes -->
          <ConditionalSection
            :show="
              strengtheningDistances &&
              (strengtheningDistances.main > 0 ||
                strengtheningDistances.cross > 0)
            "
          >
            <div class="mt-6">
              <h4 class="btn_12_text mb-3">Grid Strengthening Requirements</h4>
              <div class="space-y-2">
                <p v-if="strengtheningDistances.main > 0" class="text-sm">
                  <strong>Main Tee:</strong> Grid strengthening required for
                  {{ strengtheningDistances.main.toFixed(1) }}m from the fixed
                  edge
                </p>
                <p v-if="strengtheningDistances.cross > 0" class="text-sm">
                  <strong>Cross Tee:</strong> Grid strengthening required for
                  {{ strengtheningDistances.cross.toFixed(1) }}m from the fixed
                  edge
                </p>
              </div>
            </div>
          </ConditionalSection>
        </div>
      </div>
    </div>

    <!-- Wizard Navigation -->
    <div
      class="flex justify-between items-center mt-8 pt-6 border-t border-brand-black"
    >
      <button
        v-if="currentStep > 1"
        @click="previousStep"
        class="px-6 py-3 border-2 border-brand-black hover:bg-gray-100 transition-colors btn_12_text"
      >
        ← Previous
      </button>
      <div v-else></div>

      <div class="text-sm text-gray-600">
        Step {{ currentStep }} of {{ totalSteps }}
      </div>

      <button
        v-if="currentStep < totalSteps"
        @click="nextStep"
        :disabled="!canProceed"
        :class="[
          'px-6 py-3 border-2 border-brand-black transition-colors btn_12_text',
          canProceed
            ? 'bg-brand-black text-white hover:bg-gray-800'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed',
        ]"
      >
        Next →
      </button>
      <button
        v-else-if="currentStep === totalSteps && step6Complete"
        @click="resetCalculator"
        class="px-6 py-3 border-2 border-brand-black hover:bg-gray-100 transition-colors btn_12_text"
      >
        Start New Calculation
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from "vue";
  import WizardProgress from "../components/WizardProgress.vue";
  import StepCard from "../components/StepCard.vue";
  import QuestionCard from "../components/QuestionCard.vue";
  import QuestionBox from "../components/QuestionBox.vue";
  import CalculationSidebar from "../components/CalculationSidebar.vue";
  import ConditionalSection from "../components/ConditionalSection.vue";
  import RadioGroup from "../components/RadioGroup.vue";
  import SelectField from "../components/SelectField.vue";
  import InputField from "../components/InputField.vue";
  import TableSelect from "../components/TableSelect.vue";
  import InfoBox from "../components/InfoBox.vue";
  import CalculationResult from "../components/CalculationResult.vue";

  import {
    LIMIT_STATE_OPTIONS,
    ZONE_FACTORS,
    IMPORTANCE_LEVELS,
    GRID_MASS_OPTIONS,
    TILE_MASS_OPTIONS,
    STUD_TYPES,
    CONNECTION_TYPES,
    GRID_TYPES,
    DUCTILITY_OPTIONS,
    YES_NO_OPTIONS,
    CONSTANTS,
    getGridSpacing,
    getConnectionCapacity,
    getGridCapacity,
    getFloorFactor,
  } from "../calculators-app/src/calculators/data/suspendedCeilingData.js";

  import {
    calculateSeismicWeight,
    validateSeismicWeight,
    calculateAllSeismicForces,
    calculateLimitingLengths,
    adjustForRakeAngle,
    validateRakeAngle,
    calculateStrengtheningDistance,
    validateDesign,
  } from "../calculators-app/src/calculators/utils/seismicCalculations.js";

  // ============================================================================
  // WIZARD STATE
  // ============================================================================
  const currentStep = ref(1);
  const totalSteps = 9;

  const wizardSteps = [
    { number: 1, label: "Introduction" },
    { number: 2, label: "Design Methods" },
    { number: 3, label: "Limit State" },
    { number: 4, label: "Site Info" },
    { number: 5, label: "Weight" },
    { number: 6, label: "Grid Config" },
    { number: 7, label: "Options" },
    { number: 8, label: "Validation" },
    { number: 9, label: "Results" },
  ];

  // ============================================================================
  // STATE - Step 1: Limit State
  // ============================================================================
  const limitState = ref("uls");

  // ============================================================================
  // STATE - Step 2: Site Information
  // ============================================================================
  const zoneFactor = ref("");
  const importanceLevel = ref("2");
  const floorHeight = ref(0);
  const ceilingHeight = ref(0);

  // ============================================================================
  // STATE - Step 3: Seismic Weight
  // ============================================================================
  const gridMass = ref("");
  const tileMass = ref("");
  const luminaries = ref(0);
  const insulation = ref(0);
  const otherLoads = ref(0);
  const deadLoad = ref(CONSTANTS.DEFAULT_DEAD_LOAD);

  // ============================================================================
  // STATE - Step 4: Grid Configuration
  // ============================================================================
  const studType = ref("1");
  const connectionType = ref("1");
  const gridType = ref("1");

  // ============================================================================
  // STATE - Step 5: Design Options
  // ============================================================================
  const strengthenMain = ref("no");
  const strengthenCross = ref("no");
  const specifyMainConnection = ref("no");
  const isRaked = ref("no");
  const rakeAngle = ref(0);

  // ============================================================================
  // STATE - Step 6: Validation
  // ============================================================================
  const maxMainTee = ref(0);
  const maxCrossTee = ref(0);

  // ============================================================================
  // COMPUTED - Step Completion
  // ============================================================================
  const step1Complete = computed(() => !!limitState.value);

  const step2Complete = computed(
    () =>
      zoneFactor.value &&
      importanceLevel.value &&
      floorHeight.value > 0 &&
      ceilingHeight.value > 0,
  );

  const step3Complete = computed(
    () => gridMass.value && tileMass.value && seismicWeight.value > 0,
  );

  const step4Complete = computed(
    () => studType.value && connectionType.value && gridType.value,
  );

  const step5Complete = computed(() => true); // Always complete

  const step6Complete = computed(
    () => maxMainTee.value > 0 && maxCrossTee.value > 0,
  );

  // ============================================================================
  // COMPUTED - Seismic Weight
  // ============================================================================
  const seismicWeight = computed(() => {
    return calculateSeismicWeight({
      gridMass: Number(gridMass.value) || 0,
      tileMass: Number(tileMass.value) || 0,
      luminaries: luminaries.value,
      insulation: insulation.value,
      other: otherLoads.value,
      deadLoad: deadLoad.value,
    });
  });

  const weightValidation = computed(() => {
    return validateSeismicWeight(seismicWeight.value);
  });

  // ============================================================================
  // COMPUTED - Grid Spacing
  // ============================================================================
  const gridSpacing = computed(() => {
    return getGridSpacing(Number(gridMass.value));
  });

  const gridMassNote = computed(() => {
    const option = GRID_MASS_OPTIONS.find(
      (opt) => opt.value === Number(gridMass.value),
    );
    if (option?.warning) {
      return {
        title: "Grid Configuration Note",
        text: option.warning,
      };
    }
    return null;
  });

  // ============================================================================
  // COMPUTED - Seismic Forces
  // ============================================================================
  const ductilityFactor = computed(() => {
    const option = DUCTILITY_OPTIONS.find((opt) => opt.value === 1);
    return option?.partULS || 1;
  });

  const seismicForces = computed(() => {
    if (!step2Complete.value || !step3Complete.value) {
      return { sls: 0, sls2: 0, uls: 0 };
    }

    return calculateAllSeismicForces({
      zoneFactor: Number(zoneFactor.value),
      importanceLevel: Number(importanceLevel.value),
      floorHeight: floorHeight.value,
      ceilingHeight: ceilingHeight.value,
      partFactorULS: ductilityFactor.value,
      seismicWeight: seismicWeight.value,
    });
  });

  const floorFactorValue = computed(() => {
    return getFloorFactor(floorHeight.value + ceilingHeight.value);
  });

  // ============================================================================
  // COMPUTED - Limiting Lengths
  // ============================================================================
  const limitingLengths = computed(() => {
    if (!step4Complete.value) {
      return {
        sls: { main: 0, cross: 0 },
        sls2: { main: 0, cross: 0 },
        uls: { main: 0, cross: 0 },
      };
    }

    const connectionCap = getConnectionCapacity(
      Number(studType.value),
      Number(connectionType.value),
      "uls",
    );

    const gridCap = getGridCapacity(Number(gridType.value));

    return calculateLimitingLengths({
      teeCapacityMain: gridCap.mainTee,
      teeCapacityCross: gridCap.crossTee1200,
      connectionCapacity: connectionCap,
      wallCapacity: connectionCap,
      gridCapacityMain: gridCap.mainTee,
      gridCapacityCross: gridCap.crossTee1200,
      mainTeeSpacing: gridSpacing.value.main,
      crossTeeSpacing: gridSpacing.value.cross,
      seismicForceSLS: seismicForces.value.sls,
      seismicForceSLS2: seismicForces.value.sls2,
      seismicForceULS: seismicForces.value.uls,
      strengthenMain: strengthenMain.value === "yes",
      strengthenCross: strengthenCross.value === "yes",
      additionalMainLength: specifyMainConnection.value === "yes" ? 3.0 : 0,
      additionalCrossLength: 0,
    });
  });

  // Apply rake angle adjustment
  const adjustedLimitingLengths = computed(() => {
    if (isRaked.value !== "yes" || rakeAngle.value === 0) {
      return limitingLengths.value;
    }

    return {
      sls: {
        main: adjustForRakeAngle(
          limitingLengths.value.sls.main,
          rakeAngle.value,
        ),
        cross: limitingLengths.value.sls.cross,
      },
      sls2: {
        main: adjustForRakeAngle(
          limitingLengths.value.sls2.main,
          rakeAngle.value,
        ),
        cross: limitingLengths.value.sls2.cross,
      },
      uls: {
        main: adjustForRakeAngle(
          limitingLengths.value.uls.main,
          rakeAngle.value,
        ),
        cross: limitingLengths.value.uls.cross,
      },
    };
  });

  // ============================================================================
  // COMPUTED - Design Validation
  // ============================================================================
  const designValidation = computed(() => {
    if (!step6Complete.value) {
      return {
        recommendation: "",
        mainPass: false,
        crossPass: false,
        governingMain: 0,
        governingCross: 0,
      };
    }

    return validateDesign({
      maxMainTee: maxMainTee.value,
      maxCrossTee: maxCrossTee.value,
      limitingMainSLS: adjustedLimitingLengths.value.sls.main,
      limitingMainSLS2: adjustedLimitingLengths.value.sls2.main,
      limitingMainULS: adjustedLimitingLengths.value.uls.main,
      limitingCrossSLS: adjustedLimitingLengths.value.sls.cross,
      limitingCrossSLS2: adjustedLimitingLengths.value.sls2.cross,
      limitingCrossULS: adjustedLimitingLengths.value.uls.cross,
    });
  });

  // Grid strengthening distances
  const strengtheningDistances = computed(() => {
    if (strengthenMain.value !== "yes" && strengthenCross.value !== "yes") {
      return null;
    }

    // Calculate distance without strengthening
    const withoutStrengthening = calculateLimitingLengths({
      teeCapacityMain: getGridCapacity(Number(gridType.value)).mainTee,
      teeCapacityCross: getGridCapacity(Number(gridType.value)).crossTee1200,
      connectionCapacity: getConnectionCapacity(
        Number(studType.value),
        Number(connectionType.value),
        "uls",
      ),
      wallCapacity: getConnectionCapacity(
        Number(studType.value),
        Number(connectionType.value),
        "uls",
      ),
      gridCapacityMain: getGridCapacity(Number(gridType.value)).mainTee,
      gridCapacityCross: getGridCapacity(Number(gridType.value)).crossTee1200,
      mainTeeSpacing: gridSpacing.value.main,
      crossTeeSpacing: gridSpacing.value.cross,
      seismicForceSLS: seismicForces.value.sls,
      seismicForceSLS2: seismicForces.value.sls2,
      seismicForceULS: seismicForces.value.uls,
      strengthenMain: false,
      strengthenCross: false,
      additionalMainLength: 0,
      additionalCrossLength: 0,
    });

    return {
      main:
        strengthenMain.value === "yes"
          ? calculateStrengtheningDistance(
              maxMainTee.value,
              withoutStrengthening.uls.main,
            )
          : 0,
      cross:
        strengthenCross.value === "yes"
          ? calculateStrengtheningDistance(
              maxCrossTee.value,
              withoutStrengthening.uls.cross,
            )
          : 0,
    };
  });

  // Rake angle validation
  const rakeAngleError = computed(() => {
    if (isRaked.value !== "yes" || rakeAngle.value === 0) return "";
    const validation = validateRakeAngle(rakeAngle.value);
    return validation.error || "";
  });

  // ============================================================================
  // OPTIONS
  // ============================================================================
  const limitStateOptions = LIMIT_STATE_OPTIONS;
  const zoneFactorOptions = ZONE_FACTORS;
  const importanceLevelOptions = IMPORTANCE_LEVELS.filter((il) => !il.disabled);
  const gridMassOptions = GRID_MASS_OPTIONS;
  const tileMassOptions = TILE_MASS_OPTIONS;
  const studTypeOptions = STUD_TYPES;
  const connectionTypeOptions = CONNECTION_TYPES;
  const gridTypeOptions = GRID_TYPES;
  const yesNoOptions = YES_NO_OPTIONS;

  // ============================================================================
  // COMPUTED - Wizard Navigation
  // ============================================================================
  const canProceed = computed(() => {
    switch (currentStep.value) {
      case 1: // Introduction page
        return true;
      case 2: // Design methods page
        return true;
      case 3: // Limit state
        return step1Complete.value;
      case 4: // Site info
        return step2Complete.value;
      case 5: // Weight
        return step3Complete.value;
      case 6: // Grid config
        return step4Complete.value;
      case 7: // Options
        return step5Complete.value;
      case 8: // Validation
        return step6Complete.value;
      case 9: // Results
        return true;
      default:
        return false;
    }
  });

  // ============================================================================
  // METHODS - Wizard Navigation
  // ============================================================================
  function nextStep() {
    if (canProceed.value && currentStep.value < totalSteps) {
      currentStep.value++;
      scrollToTop();
    }
  }

  function previousStep() {
    if (currentStep.value > 1) {
      currentStep.value--;
      scrollToTop();
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetCalculator() {
    // Reset all state
    currentStep.value = 1;
    limitState.value = "uls";
    zoneFactor.value = "";
    importanceLevel.value = "2";
    floorHeight.value = 0;
    ceilingHeight.value = 0;
    gridMass.value = "";
    tileMass.value = "";
    luminaries.value = 0;
    insulation.value = 0;
    otherLoads.value = 0;
    studType.value = "1";
    connectionType.value = "1";
    gridType.value = "1";
    strengthenMain.value = "no";
    strengthenCross.value = "no";
    specifyMainConnection.value = "no";
    isRaked.value = "no";
    rakeAngle.value = 0;
    maxMainTee.value = 0;
    maxCrossTee.value = 0;
    scrollToTop();
  }

  function onGridMassChange() {
    // Grid spacing is automatically computed
  }
</script>
