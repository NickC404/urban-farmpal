<template>
  <div>
    <!-- Placeholder for EditPlantModal -->
    <!-- This component would allow users to edit their planted crops -->
  </div>
</template>

<script setup lang="ts">
defineProps<{
  userPlant: any
  show: boolean
}>()

defineEmits<{
  close: []
  updated: []
}>()
</script>
