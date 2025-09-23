<template>
  <Dialog :open="show" @update:open="(open) => !open && $emit('close')">
    <DialogContent class="max-w-6xl max-h-[90vh] overflow-y-auto">
              <div v-if="userPlant" class="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="w-full">
                    <!-- Header -->
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <DialogTitle class="text-2xl font-semibold leading-6 text-gray-900 dark:text-gray-100">
                          {{ userPlant.display_name }}
                        </DialogTitle>
                        <p class="text-sm text-gray-500 dark:text-gray-400 italic">
                          {{ userPlant.plant.name }}
                          <span v-if="userPlant.variety"> - {{ userPlant.variety }}</span>
                        </p>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span :class="getStatusColor(userPlant.status)" class="px-3 py-1 text-sm rounded-full font-medium">
                          {{ userPlant.status }}
                        </span>
                      </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <!-- Plant Details -->
                      <div>
                        <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Plant Information</h4>
                        <div class="space-y-3">
                          <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Planted Date:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100">{{ formatDate(userPlant.planting_date) }}</span>
                          </div>
                          
                          <div v-if="userPlant.expected_harvest_date" class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Expected Harvest:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100">{{ formatDate(userPlant.expected_harvest_date) }}</span>
                          </div>

                          <div v-if="userPlant.actual_harvest_date" class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Actual Harvest:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100">{{ formatDate(userPlant.actual_harvest_date) }}</span>
                          </div>

                          <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Quantity Planted:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100">{{ userPlant.quantity_planted || 1 }}</span>
                          </div>

                          <div v-if="userPlant.location" class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Location:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100">{{ userPlant.location }}</span>
                          </div>

                          <div v-if="userPlant.growing_method" class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Growing Method:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100 capitalize">{{ userPlant.growing_method }}</span>
                          </div>

                          <div v-if="userPlant.growing_environment" class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Environment:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100 capitalize">{{ userPlant.growing_environment }}</span>
                          </div>

                          <div v-if="userPlant.container_type" class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Container:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100">{{ userPlant.container_type }}</span>
                          </div>
                        </div>

                        <!-- Notes -->
                        <div v-if="userPlant.notes" class="mt-6">
                          <h5 class="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">Notes</h5>
                          <p class="text-gray-700 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                            {{ userPlant.notes }}
                          </p>
                        </div>

                        <!-- Performance Tracking -->
                        <div v-if="userPlant.actual_yield || userPlant.success_rating || userPlant.lessons_learned" class="mt-6">
                          <h5 class="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">Performance</h5>
                          <div class="space-y-2">
                            <div v-if="userPlant.actual_yield" class="flex justify-between">
                              <span class="text-gray-600 dark:text-gray-400">Actual Yield:</span>
                              <span class="font-medium text-gray-900 dark:text-gray-100">{{ userPlant.actual_yield }}</span>
                            </div>
                            <div v-if="userPlant.success_rating" class="flex justify-between">
                              <span class="text-gray-600 dark:text-gray-400">Success Rating:</span>
                              <div class="flex items-center">
                                <div class="flex">
                                  <svg
                                    v-for="i in 5"
                                    :key="i"
                                    :class="[
                                      'h-4 w-4',
                                      i <= userPlant.success_rating ? 'text-yellow-400' : 'text-gray-300'
                                    ]"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                  </svg>
                                </div>
                                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">({{ userPlant.success_rating }}/5)</span>
                              </div>
                            </div>
                            <div v-if="userPlant.lessons_learned" class="mt-3">
                              <span class="text-gray-600 dark:text-gray-400 text-sm">Lessons Learned:</span>
                              <p class="text-gray-700 dark:text-gray-300 text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mt-1">
                                {{ userPlant.lessons_learned }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Activities & Reminders -->
                      <div>
                        <div class="mb-6">
                          <div class="flex justify-between items-center mb-4">
                            <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Activities</h4>
                            <button
                              @click="showActivityModal = true"
                              class="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                            >
                              Log Activity
                            </button>
                          </div>
                          
                          <div v-if="userPlant.activities && userPlant.activities.length > 0" class="space-y-3 max-h-48 overflow-y-auto">
                            <div
                              v-for="activity in userPlant.activities.slice(0, 5)"
                              :key="activity.id"
                              class="border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                            >
                              <div class="flex justify-between items-start mb-1">
                                <span class="font-medium text-gray-900 dark:text-gray-100 capitalize">{{ activity.activity_type.replace('_', ' ') }}</span>
                                <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(activity.activity_date) }}</span>
                              </div>
                              <p v-if="activity.description" class="text-sm text-gray-600 dark:text-gray-400">{{ activity.description }}</p>
                            </div>
                          </div>
                          
                          <div v-else class="text-center py-6 text-gray-500 dark:text-gray-400">
                            <p class="text-sm">No activities recorded yet</p>
                            <button
                              @click="showActivityModal = true"
                              class="mt-2 text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                            >
                              Log your first activity
                            </button>
                          </div>
                        </div>

                        <div>
                          <div class="flex justify-between items-center mb-4">
                            <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100">Upcoming Reminders</h4>
                            <button
                              @click="showReminderModal = true"
                              class="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                            >
                              Add Reminder
                            </button>
                          </div>
                          
                          <div v-if="userPlant.reminders && userPlant.reminders.length > 0" class="space-y-3 max-h-48 overflow-y-auto">
                            <div
                              v-for="reminder in userPlant.reminders.filter(r => r.status === 'pending').slice(0, 5)"
                              :key="reminder.id"
                              class="border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                            >
                              <div class="flex justify-between items-start mb-1">
                                <span class="font-medium text-gray-900 dark:text-gray-100">{{ reminder.title }}</span>
                                <span :class="getReminderStatusColor(reminder)" class="text-xs px-2 py-1 rounded-full">
                                  {{ getReminderStatus(reminder) }}
                                </span>
                              </div>
                              <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(reminder.due_date) }}</p>
                              <p v-if="reminder.description" class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ reminder.description }}</p>
                            </div>
                          </div>
                          
                          <div v-else class="text-center py-6 text-gray-500 dark:text-gray-400">
                            <p class="text-sm">No reminders set</p>
                            <button
                              @click="showReminderModal = true"
                              class="mt-2 text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                            >
                              Add your first reminder
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  @click="showEditModal = true"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                >
                  Edit Plant
                </button>
                <button
                  @click="$emit('close')"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
    </DialogContent>
  </Dialog>

  <!-- Nested Modals -->
  <LogActivityModal
    :userPlant="userPlant"
    :show="showActivityModal"
    @close="showActivityModal = false"
    @logged="onActivityLogged"
  />

  <AddReminderModal
    :userPlant="userPlant"
    :show="showReminderModal"
    @close="showReminderModal = false"
    @added="onReminderAdded"
  />

  <EditPlantModal
    :userPlant="userPlant"
    :show="showEditModal"
    @close="showEditModal = false"
    @updated="onPlantUpdated"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-vue-next'
import LogActivityModal from './LogActivityModal.vue'
import AddReminderModal from './AddReminderModal.vue'
import EditPlantModal from './EditPlantModal.vue'

interface UserPlant {
  id: number
  display_name: string
  custom_name?: string
  variety?: string
  planting_date: string
  expected_harvest_date?: string
  actual_harvest_date?: string
  status: string
  location?: string
  quantity_planted?: number
  growing_method?: string
  growing_environment?: string
  container_type?: string
  notes?: string
  actual_yield?: string
  success_rating?: number
  lessons_learned?: string
  plant: {
    id: number
    name: string
    scientific_name: string
  }
  activities?: any[]
  reminders?: any[]
  [key: string]: any
}

defineProps<{
  userPlant: UserPlant | null
  show: boolean
}>()

const emit = defineEmits<{
  close: []
  updated: []
}>()

const showActivityModal = ref(false)
const showReminderModal = ref(false)
const showEditModal = ref(false)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'planning':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    case 'germinating':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'growing':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'flowering':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'fruiting':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    case 'harvesting':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'completed':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getReminderStatus = (reminder: any) => {
  const dueDate = new Date(reminder.due_date)
  const now = new Date()
  
  if (dueDate < now) return 'Overdue'
  if (dueDate.toDateString() === now.toDateString()) return 'Due Today'
  if (dueDate.getTime() - now.getTime() <= 2 * 24 * 60 * 60 * 1000) return 'Due Soon'
  return 'Upcoming'
}

const getReminderStatusColor = (reminder: any) => {
  const status = getReminderStatus(reminder)
  switch (status) {
    case 'Overdue':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'Due Today':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    case 'Due Soon':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  }
}

const onActivityLogged = () => {
  showActivityModal.value = false
  emit('updated')
}

const onReminderAdded = () => {
  showReminderModal.value = false
  emit('updated')
}

const onPlantUpdated = () => {
  showEditModal.value = false
  emit('updated')
}
</script>
