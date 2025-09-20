<script setup lang="ts">
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { urlIsActive } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/vue3';

defineProps<{
    items: NavItem[];
}>();

const page = usePage();
</script>

<template>
    <SidebarGroup class="px-0 py-0">
        <SidebarGroupLabel class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Farming Tools
        </SidebarGroupLabel>
        <SidebarMenu class="mt-2">
            <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton
                    as-child
                    :is-active="urlIsActive(item.href, page.url)"
                    :tooltip="item.title"
                    class="hover:bg-green-50 dark:hover:bg-green-900/20 data-[active=true]:bg-green-100 dark:data-[active=true]:bg-green-900/30 data-[active=true]:text-green-700 dark:data-[active=true]:text-green-300"
                >
                    <Link :href="item.href" class="flex items-center gap-3">
                        <component :is="item.icon" class="h-4 w-4" />
                        <span class="font-medium">{{ item.title }}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>
