<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'reka-ui'
import { Search } from 'lucide-vue-next'

const props = defineProps<ComboboxInputProps & { class?: HTMLAttributes['class'] }>()

const forwarded = useForwardProps(props)
</script>

<template>
  <div class="flex items-center border-b px-3">
    <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <ComboboxInput
      data-slot="command-input"
      v-bind="forwarded"
      :class="cn(
        'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )"
    />
  </div>
</template>
