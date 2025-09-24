<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { ComboboxEmpty, type ComboboxEmptyProps, useForwardProps } from 'reka-ui'

const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes['class'] }>()

const forwarded = useForwardProps(props)
</script>

<template>
  <ComboboxEmpty
    data-slot="command-empty"
    v-bind="forwarded"
    :class="cn('py-6 text-center text-sm', props.class)"
  >
    <slot />
  </ComboboxEmpty>
</template>
