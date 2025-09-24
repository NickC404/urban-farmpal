<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>()

const forwarded = useForwardProps(props)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    v-bind="forwarded"
    :class="cn(
      'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      props.class,
    )"
  >
    <slot />
    <ChevronDown class="h-4 w-4 opacity-50" />
  </SelectTrigger>
</template>
