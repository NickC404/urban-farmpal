<template>
  <Dialog :open="show" @update:open="(open) => !open && $emit('close')">
    <DialogContent class="max-w-lg max-h-[90vh] overflow-y-auto">
              <form @submit.prevent="logActivity">
                <div class="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="w-full">
                      <div class="flex justify-between items-center mb-4">
                        <DialogTitle class="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
                          Log Activity for {{ userPlant?.display_name }}
                        </DialogTitle>
                      </div>

                      <div class="space-y-4">
                        <!-- Activity Type -->
                        <div>
                          <label for="activity_type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Activity Type *
                          </label>
                          <select
                            id="activity_type"
                            v-model="form.activity_type"
                            required
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="">Select activity type</option>
                            <option value="watering">Watering</option>
                            <option value="feeding">Feeding/Fertilizing</option>
                            <option value="pruning">Pruning</option>
                            <option value="transplanting">Transplanting</option>
                            <option value="harvesting">Harvesting</option>
                            <option value="pest_control">Pest Control</option>
                            <option value="disease_treatment">Disease Treatment</option>
                            <option value="observation">Observation</option>
                            <option value="germination">Germination</option>
                            <option value="flowering">Flowering</option>
                            <option value="fruiting">Fruiting</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <!-- Activity Date -->
                        <div>
                          <label for="activity_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Activity Date *
                          </label>
                          <input
                            id="activity_date"
                            v-model="form.activity_date"
                            type="datetime-local"
                            required
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>

                        <!-- Description -->
                        <div>
                          <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                          </label>
                          <input
                            id="description"
                            v-model="form.description"
                            type="text"
                            placeholder="Brief description of the activity"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>

                        <!-- Activity-specific fields -->
                        <div v-if="form.activity_type === 'watering'" class="space-y-3">
                          <div class="grid grid-cols-2 gap-3">
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                              <input
                                v-model="activityData.amount"
                                type="text"
                                placeholder="e.g., 500ml, 1L"
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Method</label>
                              <select
                                v-model="activityData.method"
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              >
                                <option value="">Select method</option>
                                <option value="hand">Hand watering</option>
                                <option value="drip">Drip irrigation</option>
                                <option value="spray">Spray bottle</option>
                                <option value="soaker">Soaker hose</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div v-if="form.activity_type === 'feeding'" class="space-y-3">
                          <div class="grid grid-cols-2 gap-3">
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fertilizer Type</label>
                              <input
                                v-model="activityData.fertilizer_type"
                                type="text"
                                placeholder="e.g., NPK, Compost"
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                              <input
                                v-model="activityData.amount"
                                type="text"
                                placeholder="e.g., 10ml, 1 tbsp"
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Dilution</label>
                            <input
                              v-model="activityData.dilution"
                              type="text"
                              placeholder="e.g., 1:100, Half strength"
                              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                          </div>
                        </div>

                        <div v-if="form.activity_type === 'harvesting'" class="space-y-3">
                          <div class="grid grid-cols-2 gap-3">
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
                              <input
                                v-model="activityData.quantity"
                                type="text"
                                placeholder="e.g., 500g, 10 tomatoes"
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Quality</label>
                              <select
                                v-model="activityData.quality"
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              >
                                <option value="">Select quality</option>
                                <option value="excellent">Excellent</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="poor">Poor</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <!-- Plant Health -->
                        <div>
                          <label for="plant_health" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Plant Health
                          </label>
                          <select
                            id="plant_health"
                            v-model="form.plant_health"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="">Not specified</option>
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                            <option value="poor">Poor</option>
                            <option value="critical">Critical</option>
                          </select>
                        </div>

                        <!-- Notes -->
                        <div>
                          <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Notes
                          </label>
                          <textarea
                            id="notes"
                            v-model="form.notes"
                            rows="3"
                            placeholder="Additional notes about this activity..."
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          ></textarea>
                        </div>

                        <!-- Milestone -->
                        <div class="flex items-center">
                          <input
                            id="is_milestone"
                            v-model="form.is_milestone"
                            type="checkbox"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label for="is_milestone" class="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                            Mark as milestone event
                          </label>
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
                      Logging...
                    </span>
                    <span v-else>Log Activity</span>
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
import { ref, reactive, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-vue-next'

interface UserPlant {
  id: number
  display_name: string
  [key: string]: any
}

const props = defineProps<{
  userPlant: UserPlant | null
  show: boolean
}>()

const emit = defineEmits<{
  close: []
  logged: []
}>()

const loading = ref(false)
const error = ref('')

const form = reactive({
  activity_type: '',
  activity_date: new Date().toISOString().slice(0, 16),
  description: '',
  notes: '',
  plant_health: '',
  is_milestone: false
})

const activityData = reactive({
  amount: '',
  method: '',
  fertilizer_type: '',
  dilution: '',
  quantity: '',
  quality: ''
})

const logActivity = async () => {
  if (!props.userPlant) return
  
  loading.value = true
  error.value = ''
  
  try {
    router.post('/plant-activities', {
      user_plant_id: props.userPlant.id,
      activity_data: activityData,
      ...form
    }, {
      onSuccess: () => {
        emit('logged')
        resetForm()
      },
      onError: (errors) => {
        error.value = Object.values(errors).flat().join(', ') || 'Failed to log activity'
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
    activity_type: '',
    activity_date: new Date().toISOString().slice(0, 16),
    description: '',
    notes: '',
    plant_health: '',
    is_milestone: false
  })
  
  Object.assign(activityData, {
    amount: '',
    method: '',
    fertilizer_type: '',
    dilution: '',
    quantity: '',
    quality: ''
  })
  
  error.value = ''
}

// Reset form when modal is closed
watch(() => props.show, (show) => {
  if (!show) {
    resetForm()
  }
})

// Clear activity-specific data when activity type changes
watch(() => form.activity_type, () => {
  Object.assign(activityData, {
    amount: '',
    method: '',
    fertilizer_type: '',
    dilution: '',
    quantity: '',
    quality: ''
  })
})
</script>
