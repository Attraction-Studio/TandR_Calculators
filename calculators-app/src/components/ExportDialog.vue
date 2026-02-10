<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="close"
      >
        <div
          class="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold">Download</h3>
            <button @click="close" class="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div v-if="isExporting" class="flex flex-col items-center py-8">
            <div class="w-4 h-4 bg-black animate-pulse mb-4"></div>
            <p class="text-sm text-gray-500">Generating PDF...</p>
          </div>

          <div v-else>
            <h4 class="text-lg font-semibold mb-4">Project Details</h4>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Job Name</label>
                <input
                  type="text"
                  v-model="formData.jobName"
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
                  v-model="formData.preparedFor"
                  placeholder="Client Name"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1"
                  >Add a note on your document</label
                >
                <textarea
                  v-model="formData.notes"
                  rows="3"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                ></textarea>
              </div>

              <!-- Error message -->
              <div v-if="error" class="rounded-md bg-red-50 p-3">
                <p class="text-sm text-red-800">{{ error }}</p>
              </div>

              <button
                @click="handleExport"
                :disabled="isExporting"
                class="w-full px-8 py-4 bg-[#3C999B] !text-white font-semibold hover:bg-[#3C999B]/80 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
              @click="close"
              class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
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
