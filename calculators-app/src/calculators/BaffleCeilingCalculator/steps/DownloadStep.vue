<template>
  <div>
    <h2 class="global-step-title">Step Seven - Download</h2>

    <div class="prose max-w-none space-y-6">
      <hr class="my-6" />

      <h2 class="text-2xl font-bold text-green-600 text-center">We're done!</h2>

      <p class="text-center">
        <button
          @click="showDownloadModal = true"
          class="px-8 py-4 bg-green-600 !text-white rounded-lg hover:bg-green-700 transition-colors text-lg"
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
            <p>Generating PDF...</p>
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
                  placeholder="Client Name"
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

              <button
                @click="buildPDF"
                class="w-full px-8 py-4 bg-[#3C999B] !text-white font-semibold hover:bg-[#3C999B]/80 transition-colors flex items-center gap-2"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
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
  import { exportBaffleCeilingPDF } from "../../utils/pdfExport.js";

  const state = inject("calculatorState");

  const showDownloadModal = ref(false);
  const isDownloading = ref(false);

  const projectName = ref("");
  const preparedFor = ref("");
  const notes = ref("");

  function buildPDF() {
    isDownloading.value = true;

    try {
      exportBaffleCeilingPDF(state, {
        jobName: projectName.value || "Untitled Project",
        preparedFor: preparedFor.value,
        notes: notes.value,
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
