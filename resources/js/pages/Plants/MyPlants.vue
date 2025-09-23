<template>
  <AppLayout title="My Plants">
    <template #header>
      <div class="flex justify-between items-center">
        <h2 class="font-semibold text-xl text-foreground leading-tight">
          My Plants
        </h2>
          <Link
            href="/plants-browse"
            class="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-primary/90 focus:bg-primary/90 active:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition ease-in-out duration-150"
          >
            Add New Plant
          </Link>
      </div>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- Dashboard Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-muted-foreground">Total Plants</div>
                  <div class="text-2xl font-bold text-card-foreground">{{ dashboardStats.total_plants || 0 }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-chart-2 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-muted-foreground">Active Plants</div>
                  <div class="text-2xl font-bold text-card-foreground">{{ dashboardStats.active_plants || 0 }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-chart-4 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-muted-foreground">Ready to Harvest</div>
                  <div class="text-2xl font-bold text-card-foreground">{{ dashboardStats.ready_to_harvest || 0 }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15v-3h4v3H8z"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-muted-foreground">Overdue Tasks</div>
                  <div class="text-2xl font-bold text-card-foreground">{{ dashboardStats.overdue_reminders || 0 }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg mb-6">
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-card-foreground mb-2">
                  Search Plants
                </label>
                <input
                  v-model="filters.search"
                  type="text"
                  placeholder="Search by name..."
                  class="w-full rounded-md border-border bg-background text-foreground focus:border-ring focus:ring-ring"
                  @input="debouncedSearch"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-card-foreground mb-2">
                  Status
                </label>
                <select
                  v-model="filters.status"
                  class="w-full rounded-md border-border bg-background text-foreground focus:border-ring focus:ring-ring"
                  @change="loadPlants"
                >
                  <option value="">All Status</option>
                  <option value="planning">Planning</option>
                  <option value="germinating">Germinating</option>
                  <option value="growing">Growing</option>
                  <option value="flowering">Flowering</option>
                  <option value="fruiting">Fruiting</option>
                  <option value="harvesting">Harvesting</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-card-foreground mb-2">
                  Growing Method
                </label>
                <select
                  v-model="filters.growing_method"
                  class="w-full rounded-md border-border bg-background text-foreground focus:border-ring focus:ring-ring"
                  @change="loadPlants"
                >
                  <option value="">All Methods</option>
                  <option value="hydroponic">Hydroponic</option>
                  <option value="soil">Soil</option>
                  <option value="aeroponic">Aeroponic</option>
                  <option value="aquaponic">Aquaponic</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-card-foreground mb-2">
                  Sort By
                </label>
                <select
                  v-model="filters.sort_by"
                  class="w-full rounded-md border-border bg-background text-foreground focus:border-ring focus:ring-ring"
                  @change="loadPlants"
                >
                  <option value="planting_date">Planting Date</option>
                  <option value="expected_harvest_date">Harvest Date</option>
                  <option value="status">Status</option>
                  <option value="custom_name">Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Plants Grid -->
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p class="mt-2 text-muted-foreground">Loading your plants...</p>
        </div>

        <div v-else-if="userPlants.data && userPlants.data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="userPlant in userPlants.data"
            :key="userPlant.id"
            class="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="p-6">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-medium text-card-foreground">
                  {{ userPlant.display_name }}
                </h3>
                <span :class="getStatusColor(userPlant.status)" class="px-2 py-1 text-xs rounded-full">
                  {{ userPlant.status }}
                </span>
              </div>

              <p class="text-sm text-muted-foreground italic mb-2">
                {{ userPlant.plant.name }}
                <span v-if="userPlant.variety"> - {{ userPlant.variety }}</span>
              </p>

              <div class="space-y-2 text-sm mb-4">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Planted:</span>
                  <span class="text-card-foreground">{{ formatDate(userPlant.planting_date) }}</span>
                </div>
                
                <div v-if="userPlant.expected_harvest_date" class="flex justify-between">
                  <span class="text-muted-foreground">Expected Harvest:</span>
                  <span class="text-card-foreground">{{ formatDate(userPlant.expected_harvest_date) }}</span>
                </div>

                <div v-if="userPlant.days_planted !== undefined" class="flex justify-between">
                  <span class="text-muted-foreground">Days Planted:</span>
                  <span class="text-card-foreground">{{ userPlant.days_planted }}</span>
                </div>

                <div v-if="userPlant.location" class="flex justify-between">
                  <span class="text-muted-foreground">Location:</span>
                  <span class="text-card-foreground">{{ userPlant.location }}</span>
                </div>
              </div>

              <div class="flex space-x-2">
                <button
                  @click="viewPlant(userPlant)"
                  class="flex-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium py-2 px-3 rounded-md text-sm transition-colors"
                >
                  View Details
                </button>
                <button
                  @click="logActivity(userPlant)"
                  class="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-3 rounded-md text-sm transition-colors"
                >
                  Log Activity
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <div class="text-muted-foreground text-lg mb-4">
            You haven't planted anything yet.
          </div>
          <Link
            href="/plants-browse"
            class="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-primary/90 focus:bg-primary/90 active:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition ease-in-out duration-150"
          >
            Browse Plant Database
          </Link>
        </div>

        <!-- Pagination -->
        <div v-if="userPlants.data && userPlants.data.length > 0" class="mt-8">
          <nav class="flex items-center justify-between border-t border-border px-4 py-3 sm:px-6">
            <div class="flex flex-1 justify-between sm:hidden">
              <button
                @click="loadPage(userPlants.current_page - 1)"
                :disabled="userPlants.current_page <= 1"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                @click="loadPage(userPlants.current_page + 1)"
                :disabled="userPlants.current_page >= userPlants.last_page"
                class="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-muted-foreground">
                  Showing {{ userPlants.from }} to {{ userPlants.to }} of {{ userPlants.total }} results
                </p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <!-- Plant Detail Modal -->
    <UserPlantDetailModal
      :userPlant="selectedUserPlant"
      :show="showDetailModal"
      @close="showDetailModal = false"
      @updated="onPlantUpdated"
    />

    <!-- Activity Log Modal -->
    <LogActivityModal
      :userPlant="activityUserPlant"
      :show="showActivityModal"
      @close="showActivityModal = false"
      @logged="onActivityLogged"
    />
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Link } from '@inertiajs/vue3'
import { debounce } from 'lodash'
import AppLayout from '@/layouts/AppLayout.vue'
import UserPlantDetailModal from '@/components/Plants/UserPlantDetailModal.vue'
import LogActivityModal from '@/components/Plants/LogActivityModal.vue'

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
  days_planted?: number
  plant: {
    id: number
    name: string
    scientific_name: string
  }
  [key: string]: any
}

interface DashboardStats {
  total_plants: number
  active_plants: number
  ready_to_harvest: number
  overdue_reminders: number
}

interface PaginatedUserPlants {
  data: UserPlant[]
  current_page: number
  last_page: number
  from: number
  to: number
  total: number
}

const userPlants = ref<PaginatedUserPlants>({
  data: [],
  current_page: 1,
  last_page: 1,
  from: 0,
  to: 0,
  total: 0
})

const dashboardStats = ref<DashboardStats>({
  total_plants: 0,
  active_plants: 0,
  ready_to_harvest: 0,
  overdue_reminders: 0
})

const loading = ref(false)
const selectedUserPlant = ref<UserPlant | null>(null)
const showDetailModal = ref(false)
const activityUserPlant = ref<UserPlant | null>(null)
const showActivityModal = ref(false)

const filters = reactive({
  search: '',
  status: '',
  growing_method: '',
  sort_by: 'planting_date',
  sort_direction: 'desc'
})

const debouncedSearch = debounce(() => {
  loadPlants()
}, 300)

const loadDashboard = async () => {
  try {
    const response = await fetch('/my-plants/dashboard')
    const data = await response.json()
    dashboardStats.value = data.stats
  } catch (error) {
    console.error('Failed to load dashboard stats:', error)
  }
}

const loadPlants = async (page = 1) => {
  loading.value = true
  
  try {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    
    params.append('page', page.toString())
    
    const response = await fetch(`/my-plants?${params}`)
    const data = await response.json()
    
    userPlants.value = data
  } catch (error) {
    console.error('Failed to load plants:', error)
  } finally {
    loading.value = false
  }
}

const loadPage = (page: number) => {
  if (page >= 1 && page <= userPlants.value.last_page) {
    loadPlants(page)
  }
}

const viewPlant = (userPlant: UserPlant) => {
  selectedUserPlant.value = userPlant
  showDetailModal.value = true
}

const logActivity = (userPlant: UserPlant) => {
  activityUserPlant.value = userPlant
  showActivityModal.value = true
}

const onPlantUpdated = () => {
  showDetailModal.value = false
  loadPlants()
  loadDashboard()
}

const onActivityLogged = () => {
  showActivityModal.value = false
  loadPlants()
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'planning':
      return 'bg-muted text-muted-foreground'
    case 'germinating':
      return 'bg-chart-4/20 text-chart-4'
    case 'growing':
      return 'bg-primary/10 text-primary'
    case 'flowering':
      return 'bg-secondary/20 text-secondary'
    case 'fruiting':
      return 'bg-chart-5/20 text-chart-5'
    case 'harvesting':
      return 'bg-chart-2/20 text-chart-2'
    case 'completed':
      return 'bg-primary/20 text-primary'
    case 'failed':
      return 'bg-destructive/10 text-destructive'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

onMounted(() => {
  loadDashboard()
  loadPlants()
})
</script>
