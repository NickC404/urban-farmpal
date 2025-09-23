<template>
  <Dialog :open="show" @update:open="(open) => !open && $emit('close')">
    <DialogContent class="max-w-4xl max-h-[90vh] overflow-y-auto">
              <div v-if="plant" class="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="w-full">
                    <!-- Header -->
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <DialogTitle class="text-2xl font-semibold leading-6 text-gray-900 dark:text-gray-100">
                          {{ plant.name }}
                        </DialogTitle>
                        <p class="text-sm text-gray-500 dark:text-gray-400 italic">{{ plant.scientific_name }}</p>
                      </div>
                    </div>

                    <!-- Plant Image (if available) -->
                    <div v-if="plant.image_url" class="mb-6">
                      <img :src="plant.image_url" :alt="plant.name" class="w-full h-48 object-cover rounded-lg">
                    </div>

                    <!-- Description -->
                    <div class="mb-6">
                      <p class="text-gray-700 dark:text-gray-300">{{ plant.description }}</p>
                    </div>

                    <!-- Plant Details Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <!-- Basic Info -->
                      <div>
                        <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Basic Information</h4>
                        <div class="space-y-2">
                          <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Category:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100 capitalize">{{ plant.category }}</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Plant Type:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100 capitalize">{{ plant.plant_type }}</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Difficulty:</span>
                            <span :class="getDifficultyColor(plant.difficulty_level)" class="px-2 py-1 text-xs rounded-full font-medium capitalize">
                              {{ plant.difficulty_level }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- Growing Conditions -->
                      <div>
                        <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Growing Conditions</h4>
                        <div class="space-y-2">
                          <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Sun Requirement:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100 capitalize">
                              {{ plant.sun_requirement?.replace('_', ' ') }}
                            </span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Water Requirement:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100 capitalize">{{ plant.water_requirement }}</span>
                          </div>
                          <div v-if="plant.optimal_ph_min && plant.optimal_ph_max" class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Optimal pH:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100">
                              {{ plant.optimal_ph_min }} - {{ plant.optimal_ph_max }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- Timing -->
                      <div>
                        <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Timing</h4>
                        <div class="space-y-2">
                          <div v-if="plant.days_to_germination" class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Days to Germination:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100">{{ plant.days_to_germination }}</span>
                          </div>
                          <div v-if="plant.days_to_harvest" class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Days to Harvest:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100">{{ plant.days_to_harvest }}</span>
                          </div>
                          <div v-if="plant.days_to_maturity" class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Days to Maturity:</span>
                            <span class="font-medium text-gray-900 dark:text-gray-100">{{ plant.days_to_maturity }}</span>
                          </div>
                        </div>
                      </div>

                      <!-- Compatibility -->
                      <div>
                        <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Compatibility</h4>
                        <div class="space-y-3">
                          <div>
                            <span class="text-gray-600 dark:text-gray-400 text-sm">Growing Methods:</span>
                            <div class="flex flex-wrap gap-1 mt-1">
                              <span v-if="plant.hydroponic_compatible" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                Hydroponic
                              </span>
                              <span v-if="plant.soil_compatible" class="px-2 py-1 bg-brown-100 text-brown-800 text-xs rounded-full">
                                Soil
                              </span>
                              <span v-if="plant.aeroponic_compatible" class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                Aeroponic
                              </span>
                              <span v-if="plant.aquaponic_compatible" class="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                                Aquaponic
                              </span>
                            </div>
                          </div>
                          <div>
                            <span class="text-gray-600 dark:text-gray-400 text-sm">Environments:</span>
                            <div class="flex flex-wrap gap-1 mt-1">
                              <span v-if="plant.indoor_compatible" class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                Indoor
                              </span>
                              <span v-if="plant.outdoor_compatible" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Outdoor
                              </span>
                              <span v-if="plant.greenhouse_compatible" class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                Greenhouse
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Growing Tips -->
                    <div v-if="plant.growing_tips" class="mb-6">
                      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Growing Tips</h4>
                      <p class="text-gray-700 dark:text-gray-300 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        {{ plant.growing_tips }}
                      </p>
                    </div>

                    <!-- Harvesting Tips -->
                    <div v-if="plant.harvesting_tips" class="mb-6">
                      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Harvesting Tips</h4>
                      <p class="text-gray-700 dark:text-gray-300 text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        {{ plant.harvesting_tips }}
                      </p>
                    </div>

                    <!-- Common Issues -->
                    <div v-if="plant.common_issues" class="mb-6">
                      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Common Issues</h4>
                      <p class="text-gray-700 dark:text-gray-300 text-sm bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                        {{ plant.common_issues }}
                      </p>
                    </div>

                    <!-- Expected Yield -->
                    <div v-if="plant.expected_yield" class="mb-6">
                      <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Expected Yield</h4>
                      <p class="text-gray-700 dark:text-gray-300">{{ plant.expected_yield }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  @click="$emit('add-to-garden', plant)"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                >
                  Add to My Garden
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
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-vue-next'

interface Plant {
  id: number
  name: string
  scientific_name: string
  description: string
  category: string
  plant_type: string
  difficulty_level: string
  sun_requirement: string
  water_requirement: string
  days_to_germination?: number
  days_to_harvest?: number
  days_to_maturity?: number
  optimal_ph_min?: number
  optimal_ph_max?: number
  hydroponic_compatible: boolean
  soil_compatible: boolean
  aeroponic_compatible: boolean
  aquaponic_compatible: boolean
  indoor_compatible: boolean
  outdoor_compatible: boolean
  greenhouse_compatible: boolean
  growing_tips?: string
  harvesting_tips?: string
  common_issues?: string
  expected_yield?: string
  image_url?: string
  [key: string]: any
}

defineProps<{
  plant: Plant | null
  show: boolean
}>()

defineEmits<{
  close: []
  'add-to-garden': [plant: Plant]
}>()

const getDifficultyColor = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'advanced':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}
</script>
