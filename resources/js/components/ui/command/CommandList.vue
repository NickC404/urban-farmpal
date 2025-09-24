<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { ComboboxContent, type ComboboxContentProps, useForwardProps } from 'reka-ui'

const props = defineProps<ComboboxContentProps & { class?: HTMLAttributes['class'] }>()

const forwarded = useForwardProps(props)
</script>

<template>
  <ComboboxContent
    data-slot="command-list"
    v-bind="forwarded"
    :class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', props.class)"
  >
    <slot />
  </ComboboxContent>
</template>
