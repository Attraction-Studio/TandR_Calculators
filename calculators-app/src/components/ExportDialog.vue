<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="close"
      >
        <div class="flex min-h-screen items-center justify-center p-4">
          <!-- Backdrop -->
          <div
            class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            @click="close"
          ></div>

          <!-- Dialog -->
          <div
            class="relative w-full max-w-2xl transform rounded-lg bg-white shadow-xl transition-all"
          >
            <!-- Header -->
            <div class="border-b border-gray-200 px-6 py-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">
                  Export PDF Report
                </h3>
                <button
                  type="button"
                  class="text-gray-400 hover:text-gray-500"
                  @click="close"
                >
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Body -->
            <div class="px-6 py-4 space-y-4">
              <p class="text-sm text-gray-600">
                Please provide the following information for your PDF report:
              </p>

              <!-- Job Name -->
              <div>
                <label
                  for="job-name"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Name <span class="text-red-500">*</span>
                </label>
                <input
                  id="job-name"
                  v-model="formData.jobName"
                  type="text"
                  required
                  class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter job name"
                />
              </div>

              <!-- Prepared For -->
              <div>
                <label
                  for="prepared-for"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Prepared For
                </label>
                <input
                  id="prepared-for"
                  v-model="formData.preparedFor"
                  type="text"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Client or company name (optional)"
                />
              </div>

              <!-- Notes -->
              <div>
                <label
                  for="notes"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  v-model="formData.notes"
                  rows="4"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Add any additional notes or comments (optional)"
                ></textarea>
              </div>

              <!-- Error message -->
              <div v-if="error" class="rounded-md bg-red-50 p-3">
                <p class="text-sm text-red-800">{{ error }}</p>
              </div>
            </div>

            <!-- Footer -->
            <div
              class="border-t border-gray-200 px-6 py-4 flex justify-end gap-3"
            >
              <button
                type="button"
                class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                @click="close"
              >
                Cancel
              </button>
              <button
                type="button"
                class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium !text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!formData.jobName || isExporting"
                @click="handleExport"
              >
                <span v-if="isExporting" class="flex items-center gap-2">
                  <svg
                    class="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Export PDF
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  import { ref, reactive, watch } from "vue";

  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["close", "export"]);

  const formData = reactive({
    jobName: "",
    preparedFor: "",
    notes: "",
  });

  const isExporting = ref(false);
  const error = ref("");

  // Reset form when dialog opens
  watch(
    () => props.isOpen,
    (newValue) => {
      if (newValue) {
        formData.jobName = "";
        formData.preparedFor = "";
        formData.notes = "";
        error.value = "";
        isExporting.value = false;
      }
    },
  );

  function close() {
    if (!isExporting.value) {
      emit("close");
    }
  }

  async function handleExport() {
    if (!formData.jobName) {
      error.value = "Job name is required";
      return;
    }

    error.value = "";
    isExporting.value = true;

    try {
      await emit("export", { ...formData });
      // Close dialog after successful export
      setTimeout(() => {
        isExporting.value = false;
        close();
      }, 500);
    } catch (err) {
      error.value = err.message || "Failed to export PDF. Please try again.";
      isExporting.value = false;
    }
  }
</script>

<style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-active .relative,
  .modal-leave-active .relative {
    transition: transform 0.3s ease;
  }

  .modal-enter-from .relative,
  .modal-leave-to .relative {
    transform: scale(0.95);
  }
</style>
