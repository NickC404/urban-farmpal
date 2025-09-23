<template>
  <AppLayout title="Plant Database">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
        Plant Database
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- Search and Filters -->
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Plants
                </label>
                <input
                  v-model="filters.search"
                  type="text"
                  placeholder="Search by name..."
                  class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  @input="debouncedSearch"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  v-model="filters.category"
                  class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  @change="loadPlants"
                >
                  <option value="">All Categories</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="herbs">Herbs</option>
                  <option value="fruits">Fruits</option>
                  <option value="flowers">Flowers</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty
                </label>
                <select
                  v-model="filters.difficulty"
                  class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  @change="loadPlants"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Growing Method
                </label>
                <select
                  v-model="filters.growing_method"
                  class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  @change="loadPlants"
                >
                  <option value="">All Methods</option>
                  <option value="hydroponic">Hydroponic</option>
                  <option value="soil">Soil</option>
                  <option value="aeroponic">Aeroponic</option>
                  <option value="aquaponic">Aquaponic</option>
                </select>
              </div>
            </div>

            <div class="mt-4 flex justify-between items-center">
              <div class="flex space-x-2">
                <button
                  @click="showCompatibleOnly = !showCompatibleOnly; loadPlants()"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium',
                    showCompatibleOnly
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  ]"
                >
                  Show Compatible Only
                </button>
              </div>

              <div class="flex items-center space-x-2">
                <label class="text-sm text-gray-700 dark:text-gray-300">Sort by:</label>
                <select
                  v-model="filters.sort_by"
                  class="rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  @change="loadPlants"
                >
                  <option value="name">Name</option>
                  <option value="difficulty_level">Difficulty</option>
                  <option value="days_to_harvest">Days to Harvest</option>
                  <option value="category">Category</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Plant Grid -->
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p class="mt-2 text-gray-600 dark:text-gray-400">Loading plants...</p>
        </div>

        <div v-else-if="plants.data && plants.data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="plant in plants.data"
            :key="plant.id"
            class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            @click="selectPlant(plant)"
          >
            <div class="p-6">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {{ plant.name }}
                </h3>
                <span :class="getDifficultyColor(plant.difficulty_level)" class="px-2 py-1 text-xs rounded-full">
                  {{ plant.difficulty_level }}
                </span>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-400 italic mb-2">
                {{ plant.scientific_name }}
              </p>

              <p class="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {{ plant.description }}
              </p>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="font-medium text-gray-900 dark:text-gray-100">Category:</span>
                  <span class="text-gray-600 dark:text-gray-400 capitalize ml-1">{{ plant.category }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-900 dark:text-gray-100">Harvest:</span>
                  <span class="text-gray-600 dark:text-gray-400 ml-1">
                    {{ plant.days_to_harvest ? `${plant.days_to_harvest} days` : 'N/A' }}
                  </span>
                </div>
                <div>
                  <span class="font-medium text-gray-900 dark:text-gray-100">Sun:</span>
                  <span class="text-gray-600 dark:text-gray-400 capitalize ml-1">
                    {{ plant.sun_requirement?.replace('_', ' ') }}
                  </span>
                </div>
                <div>
                  <span class="font-medium text-gray-900 dark:text-gray-100">Water:</span>
                  <span class="text-gray-600 dark:text-gray-400 capitalize ml-1">{{ plant.water_requirement }}</span>
                </div>
              </div>

              <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  @click.stop="addToGarden(plant)"
                  class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
                >
                  Add to My Garden
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <div class="text-gray-400 dark:text-gray-600 text-lg">
            No plants found matching your criteria.
          </div>
          <button
            @click="clearFilters"
            class="mt-4 text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Clear filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="plants.data && plants.data.length > 0" class="mt-8">
          <nav class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6">
            <div class="flex flex-1 justify-between sm:hidden">
              <button
                @click="loadPage(plants.current_page - 1)"
                :disabled="plants.current_page <= 1"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                @click="loadPage(plants.current_page + 1)"
                :disabled="plants.current_page >= plants.last_page"
                class="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Showing {{ plants.from }} to {{ plants.to }} of {{ plants.total }} results
                </p>
              </div>
              <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    @click="loadPage(plants.current_page - 1)"
                    :disabled="plants.current_page <= 1"
                    class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="loadPage(page)"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 text-sm font-semibold',
                      page === plants.current_page
                        ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    ]"
                  >
                    {{ page }}
                  </button>
                  <button
                    @click="loadPage(plants.current_page + 1)"
                    :disabled="plants.current_page >= plants.last_page"
                    class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <!-- Plant Detail Modal -->
    <PlantDetailModal
      :plant="selectedPlant"
      :show="showPlantModal"
      @close="showPlantModal = false"
      @add-to-garden="addToGarden"
    />

    <!-- Add to Garden Modal -->
    <AddPlantModal
      :plant="plantToAdd"
      :show="showAddModal"
      @close="showAddModal = false"
      @added="onPlantAdded"
    />
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { router } from '@inertiajs/vue3'
import { debounce } from 'lodash'
import AppLayout from '@/layouts/AppLayout.vue'
import PlantDetailModal from '@/components/Plants/PlantDetailModal.vue'
import AddPlantModal from '@/components/Plants/AddPlantModal.vue'

interface Plant {
  id: number
  name: string
  scientific_name: string
  description: string
  category: string
  difficulty_level: string
  sun_requirement: string
  water_requirement: string
  days_to_harvest: number
  [key: string]: any
}

interface PaginatedPlants {
  data: Plant[]
  current_page: number
  last_page: number
  from: number
  to: number
  total: number
}

const plants = ref<PaginatedPlants>({
  data: [],
  current_page: 1,
  last_page: 1,
  from: 0,
  to: 0,
  total: 0
})

const loading = ref(false)
const showCompatibleOnly = ref(false)
const selectedPlant = ref<Plant | null>(null)
const showPlantModal = ref(false)
const plantToAdd = ref<Plant | null>(null)
const showAddModal = ref(false)

const filters = reactive({
  search: '',
  category: '',
  difficulty: '',
  growing_method: '',
  sort_by: 'name',
  sort_direction: 'asc'
})

const visiblePages = computed(() => {
  const pages = []
  const current = plants.value.current_page
  const last = plants.value.last_page
  
  let start = Math.max(1, current - 2)
  let end = Math.min(last, current + 2)
  
  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(last, start + 4)
    } else {
      start = Math.max(1, end - 4)
    }
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const debouncedSearch = debounce(() => {
  loadPlants()
}, 300)

const loadPlants = async (page = 1) => {
  loading.value = true
  
  try {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    
    if (showCompatibleOnly.value) {
      params.append('compatible', '1')
    }
    
    params.append('page', page.toString())
    
    const endpoint = showCompatibleOnly.value ? '/plants/compatible' : '/plants'
    const response = await fetch(`${endpoint}?${params}`)
    const data = await response.json()
    
    plants.value = data
  } catch (error) {
    console.error('Failed to load plants:', error)
  } finally {
    loading.value = false
  }
}

const loadPage = (page: number) => {
  if (page >= 1 && page <= plants.value.last_page) {
    loadPlants(page)
  }
}

const selectPlant = (plant: Plant) => {
  selectedPlant.value = plant
  showPlantModal.value = true
}

const addToGarden = (plant: Plant) => {
  plantToAdd.value = plant
  showAddModal.value = false
  showPlantModal.value = false
  showAddModal.value = true
}

const onPlantAdded = () => {
  showAddModal.value = false
  plantToAdd.value = null
  // Could show success message here
}

const clearFilters = () => {
  Object.keys(filters).forEach(key => {
    if (key === 'sort_by') {
      filters[key] = 'name'
    } else if (key === 'sort_direction') {
      filters[key] = 'asc'
    } else {
      filters[key] = ''
    }
  })
  showCompatibleOnly.value = false
  loadPlants()
}

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

onMounted(() => {
  loadPlants()
})
</script>
