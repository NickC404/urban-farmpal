<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { SelectValue, type SelectValueProps, useForwardProps } from 'reka-ui'

const props = defineProps<SelectValueProps & { class?: HTMLAttributes['class'] }>()

const forwarded = useForwardProps(props)
</script>

<template>
  <SelectValue
    data-slot="select-value"
    v-bind="forwarded"
    :class="cn('text-sm', props.class)"
  />
</template>
