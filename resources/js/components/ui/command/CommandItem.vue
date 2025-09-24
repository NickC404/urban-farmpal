<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { ComboboxItem, type ComboboxItemEmits, type ComboboxItemProps, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ComboboxItemEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ComboboxItem
    data-slot="command-item"
    v-bind="forwarded"
    :class="cn(
      'aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      props.class,
    )"
  >
    <slot />
  </ComboboxItem>
</template>
