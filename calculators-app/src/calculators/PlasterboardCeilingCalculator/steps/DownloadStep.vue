<template>
  <div>
    <h2 class="global-step-title">Step Eight - Download</h2>

    <div class="prose max-w-none space-y-6">
      <hr class="my-6" />

      <h2 class="text-2xl font-bold text-green-600 text-center">We're done!</h2>

      <p class="text-center">
        <button
          @click="showDownloadModal = true"
          class="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg"
        >
          <span class="mr-2">💾</span> Download Result
        </button>
      </p>

      <!-- Download Modal -->
      <div
        v-if="showDownloadModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="showDownloadModal = false"
      >
        <div
          class="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold">Download</h3>
            <button
              @click="showDownloadModal = false"
              class="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div v-if="isDownloading" class="text-center py-8">
            <div class="animate-spin text-4xl mb-4">⏳</div>
            <p>Loading...</p>
          </div>

          <div v-else-if="downloadLink" class="text-center py-8">
            <a
              :href="downloadLink"
              target="_blank"
              class="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-block"
            >
              Download PDF
            </a>
          </div>

          <div v-else>
            <h4 class="text-lg font-semibold mb-4">Project Details</h4>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Job Name</label>
                <input
                  type="text"
                  v-model="projectName"
                  placeholder="My Project"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1"
                  >Prepared For</label
                >
                <input
                  type="text"
                  v-model="preparedFor"
                  placeholder="Fred"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1"
                  >Add a note on your document</label
                >
                <textarea
                  v-model="notes"
                  rows="3"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                ></textarea>
              </div>

              <h4 class="text-lg font-semibold mt-6">
                Enter the Maximum measured Tee Lengths as per plans supplied
              </h4>

              <div>
                <label class="block text-sm font-medium mb-1"
                  >Max Main Tee (m)</label
                >
                <input
                  type="number"
                  step="0.1"
                  v-model.number="maxMainTeeSupplied"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1"
                  >Max Cross Tee (m)</label
                >
                <input
                  type="number"
                  step="0.1"
                  v-model.number="maxCrossTeeSupplied"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <button
                @click="buildPDF"
                class="w-full px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <span class="mr-2">💾</span> Build PDF
              </button>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t">
            <button
              @click="showDownloadModal = false"
              class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref } from "vue";
  import { exportPlasterboardCeilingPDF } from "../../utils/pdfExport.js";

  const state = inject("calculatorState");

  const { maxMainTeeSupplied, maxCrossTeeSupplied } = state;

  const showDownloadModal = ref(false);
  const isDownloading = ref(false);
  const downloadLink = ref("");

  const projectName = ref("");
  const preparedFor = ref("");
  const notes = ref("");

  function buildPDF() {
    isDownloading.value = true;

    try {
      exportPlasterboardCeilingPDF(state, {
        jobName: projectName.value || "Untitled Project",
        preparedFor: preparedFor.value,
        notes: notes.value,
        maxMainTeeSupplied: maxMainTeeSupplied.value || 0,
        maxCrossTeeSupplied: maxCrossTeeSupplied.value || 0,
      });

      showDownloadModal.value = false;
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      isDownloading.value = false;
    }
  }
</script>
