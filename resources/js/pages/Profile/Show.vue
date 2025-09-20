<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

import HeadingSmall from '@/components/HeadingSmall.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem, type User } from '@/types';
import { Link } from '@inertiajs/vue3';

interface Props {
    user: User;
}

const props = defineProps<Props>();

// Get the authenticated user
const page = usePage();
const authUser = page.props.auth.user;

// Check if viewing own profile
const isOwnProfile = computed(() => {
    return authUser.id === props.user.id;
});

// Set up breadcrumbs
const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: isOwnProfile.value ? 'My Profile' : `${props.user.name}'s Profile`,
        href: `/profile${!isOwnProfile.value ? `/${props.user.id}` : ''}`,
    },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head :title="isOwnProfile ? 'My Profile' : `${user.name}'s Profile`" />

        <div class="container mx-auto py-6">
            <div class="mb-6 flex items-center justify-between">
                <HeadingSmall
                    :title="isOwnProfile ? 'My Profile' : `${user.name}'s Profile`"
                    description="View profile information"
                />
                <div v-if="isOwnProfile" class="flex space-x-4">
                    <Link :href="route('profile.edit')">
                        <Button>Edit Profile</Button>
                    </Link>
                    <Link :href="route('password.edit')">
                        <Button variant="outline">Change Password</Button>
                    </Link>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <h3 class="text-lg font-medium">Profile Information</h3>
                </CardHeader>
                <CardContent>
                    <div class="grid gap-6 md:grid-cols-2">
                        <div>
                            <h4 class="mb-2 text-sm font-medium text-muted-foreground">Name</h4>
                            <p>{{ user.name }}</p>
                        </div>
                        <div>
                            <h4 class="mb-2 text-sm font-medium text-muted-foreground">Email</h4>
                            <p>{{ user.email }}</p>
                            <span v-if="user.email_verified_at" class="mt-1 inline-block text-xs text-green-600">
                                Verified
                            </span>
                            <span v-else class="mt-1 inline-block text-xs text-amber-600">
                                Not verified
                            </span>
                        </div>
                        <div>
                            <h4 class="mb-2 text-sm font-medium text-muted-foreground">Member Since</h4>
                            <p>{{ new Date(user.created_at).toLocaleDateString() }}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
