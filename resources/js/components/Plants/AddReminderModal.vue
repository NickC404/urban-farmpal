<template>
  <div>
    <!-- Placeholder for AddReminderModal -->
    <!-- This component would allow users to create reminders for plant care tasks -->
  </div>
</template>

<script setup lang="ts">
defineProps<{
  userPlant: any
  show: boolean
}>()

defineEmits<{
  close: []
  added: []
}>()
</script>
