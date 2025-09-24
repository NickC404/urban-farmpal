<template>
  <Dialog :open="show" @update:open="(open) => !open && $emit('close')">
    <DialogContent class="max-w-lg max-h-[90vh] overflow-y-auto">
              <form @submit.prevent="addPlant">
                <div class="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="w-full">
                      <div class="flex justify-between items-center mb-4">
                        <DialogTitle class="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
                          Add {{ plant?.name }}
                        </DialogTitle>
                      </div>

                      <div class="space-y-4">
                        <!-- Custom Name -->
                        <div>
                          <label for="custom_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Custom Name (Optional)
                          </label>
                          <input
                            id="custom_name"
                            v-model="form.custom_name"
                            type="text"
                            :placeholder="`e.g., My ${plant?.name}`"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>

                        <!-- Variety -->
                        <div>
                          <label for="variety" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Variety (Optional)
                          </label>
                          <input
                            id="variety"
                            v-model="form.variety"
                            type="text"
                            placeholder="e.g., Cherry Belle, Buttercrunch"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>

                        <!-- Planting Date -->
                        <div>
                          <label for="planting_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Planting Date *
                          </label>
                          <input
                            id="planting_date"
                            v-model="form.planting_date"
                            type="date"
                            required
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>

                        <!-- Quantity -->
                        <div>
                          <label for="quantity_planted" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Quantity Planted
                          </label>
                          <input
                            id="quantity_planted"
                            v-model.number="form.quantity_planted"
                            type="number"
                            min="1"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>

                        <!-- Location -->
                        <div>
                          <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Location (Optional)
                          </label>
                          <input
                            id="location"
                            v-model="form.location"
                            type="text"
                            placeholder="e.g., Garden Bed 1, Kitchen Window"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>

                        <!-- Growing Method -->
                        <div>
                          <label for="growing_method" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Growing Method
                          </label>
                          <select
                            id="growing_method"
                            v-model="form.growing_method"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="">Select method</option>
                            <option v-if="plant?.hydroponic_compatible" value="hydroponic">Hydroponic</option>
                            <option v-if="plant?.soil_compatible" value="soil">Soil</option>
                            <option v-if="plant?.aeroponic_compatible" value="aeroponic">Aeroponic</option>
                            <option v-if="plant?.aquaponic_compatible" value="aquaponic">Aquaponic</option>
                          </select>
                        </div>

                        <!-- Growing Environment -->
                        <div>
                          <label for="growing_environment" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Growing Environment
                          </label>
                          <select
                            id="growing_environment"
                            v-model="form.growing_environment"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="">Select environment</option>
                            <option v-if="plant?.indoor_compatible" value="indoor">Indoor</option>
                            <option v-if="plant?.outdoor_compatible" value="outdoor">Outdoor</option>
                            <option v-if="plant?.greenhouse_compatible" value="greenhouse">Greenhouse</option>
                            <option value="mixed">Mixed</option>
                          </select>
                        </div>

                        <!-- Container Type -->
                        <div>
                          <label for="container_type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Container Type (Optional)
                          </label>
                          <input
                            id="container_type"
                            v-model="form.container_type"
                            type="text"
                            placeholder="e.g., 6-inch pot, raised bed, ground"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>

                        <!-- Notes -->
                        <div>
                          <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Notes (Optional)
                          </label>
                          <textarea
                            id="notes"
                            v-model="form.notes"
                            rows="3"
                            placeholder="Any additional notes about this planting..."
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          ></textarea>
                        </div>

                        <!-- Expected Harvest Date (calculated) -->
                        <div v-if="expectedHarvestDate" class="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <p class="text-sm text-green-800 dark:text-green-200">
                            <strong>Expected harvest date:</strong> {{ expectedHarvestDate }}
                            <span v-if="plant?.days_to_harvest" class="text-xs text-green-600 dark:text-green-300">
                              ({{ plant.days_to_harvest }} days from planting)
                            </span>
                          </p>
                        </div>

                        <!-- Error message -->
                        <div v-if="error" class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                          <p class="text-sm text-red-800 dark:text-red-200">{{ error }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    :disabled="loading"
                    class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed sm:ml-3 sm:w-auto"
                  >
                    <span v-if="loading" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </span>
                    <span v-else>Add Plant</span>
                  </button>
                  <button
                    type="button"
                    @click="$emit('close')"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-vue-next'

interface Plant {
  id: number
  name: string
  days_to_harvest?: number
  hydroponic_compatible: boolean
  soil_compatible: boolean
  aeroponic_compatible: boolean
  aquaponic_compatible: boolean
  indoor_compatible: boolean
  outdoor_compatible: boolean
  greenhouse_compatible: boolean
  [key: string]: any
}

const props = defineProps<{
  plant: Plant | null
  show: boolean
}>()

const emit = defineEmits<{
  close: []
  added: []
}>()

const loading = ref(false)
const error = ref('')

const form = reactive({
  custom_name: '',
  variety: '',
  planting_date: new Date().toISOString().split('T')[0],
  quantity_planted: 1,
  location: '',
  growing_method: '',
  growing_environment: '',
  container_type: '',
  notes: ''
})

const expectedHarvestDate = computed(() => {
  if (!form.planting_date || !props.plant?.days_to_harvest) {
    return null
  }
  
  const plantingDate = new Date(form.planting_date)
  const harvestDate = new Date(plantingDate)
  harvestDate.setDate(harvestDate.getDate() + props.plant.days_to_harvest)
  
  return harvestDate.toLocaleDateString()
})

const addPlant = async () => {
  if (!props.plant) return
  
  loading.value = true
  error.value = ''
  
  try {
    router.post('/my-plants', {
      plant_id: props.plant.id,
      ...form
    }, {
      onSuccess: () => {
        emit('added')
        resetForm()
      },
      onError: (errors) => {
        error.value = Object.values(errors).flat().join(', ') || 'Failed to add plant'
      },
      onFinish: () => {
        loading.value = false
      }
    })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
    loading.value = false
  }
}

const resetForm = () => {
  Object.assign(form, {
    custom_name: '',
    variety: '',
    planting_date: new Date().toISOString().split('T')[0],
    quantity_planted: 1,
    location: '',
    growing_method: '',
    growing_environment: '',
    container_type: '',
    notes: ''
  })
  error.value = ''
}

// Reset form when modal is closed
watch(() => props.show, (show) => {
  if (!show) {
    resetForm()
  }
})
</script>
