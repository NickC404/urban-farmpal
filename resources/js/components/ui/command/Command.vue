<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { ComboboxRoot, type ComboboxRootEmits, type ComboboxRootProps, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<ComboboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ComboboxRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ComboboxRoot
    data-slot="command"
    v-bind="forwarded"
    :class="cn(
      'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
      props.class,
    )"
  >
    <slot />
  </ComboboxRoot>
</template>
