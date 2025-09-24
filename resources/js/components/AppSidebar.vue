<script setup lang="ts">
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as calendar } from '@/routes/calendar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/vue3';
import { 
    LayoutGrid, 
    Sprout, 
    Calendar, 
    BarChart3, 
    Settings, 
    BookOpen, 
    HelpCircle,
    Leaf,
    Droplets,
    Sun,
    Moon,
    Monitor
} from 'lucide-vue-next';
import AppLogo from './AppLogo.vue';
import { useAppearance } from '@/composables/useAppearance';

const { appearance, updateAppearance } = useAppearance();

// Cycle through themes: light -> dark -> system -> light
function cycleTheme() {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(appearance.value);
    const nextIndex = (currentIndex + 1) % themes.length;
    updateAppearance(themes[nextIndex]);
}

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'My Garden',
        href: '/my-garden',
        icon: Sprout,
    },
    {
        title: 'Plant Database',
        href: '/plants-browse',
        icon: Leaf,
    },
    {
        title: 'Planting Calendar',
        href: calendar().url,
        icon: Calendar,
    },
    {
        title: 'Growth Tracking',
        href: '#',
        icon: BarChart3,
    },
    {
        title: 'Water Management',
        href: '#',
        icon: Droplets,
    },
    {
        title: 'Light Monitoring',
        href: '#',
        icon: Sun,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Help & Support',
        href: '#',
        icon: HelpCircle,
    },
    {
        title: 'Growing Guides',
        href: '#',
        icon: BookOpen,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
    {
        title: 'Growing Setup',
        href: '/settings/growing-setup',
        icon: Sprout,
    },
];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset" class="border-r border-sidebar-border/70">
        <SidebarHeader class="border-b border-sidebar-border/70">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child class="hover:bg-accent/50 dark:hover:bg-accent/20">
                        <Link :href="dashboard()">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent class="px-2 py-4">
            <div class="space-y-1">
                <NavMain :items="mainNavItems" />
            </div>
        </SidebarContent>

        <SidebarFooter class="border-t border-sidebar-border/70 p-2">
            <div class="space-y-1">
                <NavFooter :items="footerNavItems" />
            </div>
            
            <!-- Theme Toggle -->
            <div class="mt-3 mb-3">
                <div class="flex items-center justify-center">
                    <button
                        @click="cycleTheme"
                        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/50 dark:hover:bg-accent/20"
                        :title="`Current: ${appearance} mode`"
                    >
                        <Sun v-if="appearance === 'light'" class="h-4 w-4" />
                        <Moon v-else-if="appearance === 'dark'" class="h-4 w-4" />
                        <Monitor v-else class="h-4 w-4" />
                        <span class="hidden group-data-[collapsible=icon]:hidden">
                            {{ appearance === 'light' ? 'Light' : appearance === 'dark' ? 'Dark' : 'System' }}
                        </span>
                    </button>
                </div>
            </div>
            
            <div class="mt-4">
                <NavUser />
            </div>
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
