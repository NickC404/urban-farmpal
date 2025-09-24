<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { ComboboxGroup, type ComboboxGroupProps, useForwardProps } from 'reka-ui'

const props = defineProps<ComboboxGroupProps & { class?: HTMLAttributes['class'] }>()

const forwarded = useForwardProps(props)
</script>

<template>
  <ComboboxGroup
    data-slot="command-group"
    v-bind="forwarded"
    :class="cn(
      'text-foreground [&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:py-1.5 [&_[data-slot=command-group-heading]]:text-xs [&_[data-slot=command-group-heading]]:font-medium [&_[data-slot=command-group-heading]]:text-muted-foreground overflow-hidden p-1',
      props.class,
    )"
  >
    <slot />
  </ComboboxGroup>
</template>
