<script setup lang="ts">
import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthBase from '@/layouts/AuthLayout.vue';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/vue3';
import { LoaderCircle, Eye, EyeOff } from 'lucide-vue-next';
import { ref } from 'vue';

const showPassword = ref(false);
const showConfirmPassword = ref(false);
</script>

<template>
    <AuthBase
        title="Join Urban FarmPal"
        description="Create your account to start your urban farming journey"
    >
        <Head title="Register" />

        <Form
            v-bind="RegisteredUserController.store.form()"
            :reset-on-success="['password', 'password_confirmation']"
            v-slot="{ errors, processing }"
            class="flex flex-col gap-6"
        >
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="name">Full Name</Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        autofocus
                        :tabindex="1"
                        autocomplete="name"
                        name="name"
                        placeholder="Enter your full name"
                        :class="{ 'border-red-500': errors.name }"
                    />
                    <InputError :message="errors.name" />
                </div>

                <div class="grid gap-2">
                    <Label for="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        :tabindex="2"
                        autocomplete="email"
                        name="email"
                        placeholder="your.email@example.com"
                        :class="{ 'border-red-500': errors.email }"
                    />
                    <InputError :message="errors.email" />
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        We'll use this to send you growing tips and updates.
                    </p>
                </div>

                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <div class="relative">
                        <Input
                            id="password"
                            :type="showPassword ? 'text' : 'password'"
                            required
                            :tabindex="3"
                            autocomplete="new-password"
                            name="password"
                            placeholder="Create a strong password"
                            :class="{ 'border-red-500': errors.password }"
                        />
                        <button
                            type="button"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                            @click="showPassword = !showPassword"
                        >
                            <Eye v-if="!showPassword" class="h-4 w-4" />
                            <EyeOff v-else class="h-4 w-4" />
                        </button>
                    </div>
                    <InputError :message="errors.password" />
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        Must be at least 8 characters with a mix of letters, numbers, and symbols.
                    </p>
                </div>

                <div class="grid gap-2">
                    <Label for="password_confirmation">Confirm Password</Label>
                    <div class="relative">
                        <Input
                            id="password_confirmation"
                            :type="showConfirmPassword ? 'text' : 'password'"
                            required
                            :tabindex="4"
                            autocomplete="new-password"
                            name="password_confirmation"
                            placeholder="Confirm your password"
                            :class="{ 'border-red-500': errors.password_confirmation }"
                        />
                        <button
                            type="button"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                            @click="showConfirmPassword = !showConfirmPassword"
                        >
                            <Eye v-if="!showConfirmPassword" class="h-4 w-4" />
                            <EyeOff v-else class="h-4 w-4" />
                        </button>
                    </div>
                    <InputError :message="errors.password_confirmation" />
                </div>

                <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                    <div class="flex items-start space-x-3">
                        <div class="text-green-600 dark:text-green-400">🌱</div>
                        <div class="text-sm">
                            <p class="font-medium text-green-800 dark:text-green-200">
                                Welcome to Urban FarmPal!
                            </p>
                            <p class="text-green-700 dark:text-green-300">
                                After creating your account, we'll guide you through a quick setup to personalize your growing experience.
                            </p>
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    class="mt-2 w-full"
                    tabindex="5"
                    :disabled="processing"
                    data-test="register-user-button"
                >
                    <LoaderCircle
                        v-if="processing"
                        class="h-4 w-4 animate-spin"
                    />
                    Create Account & Start Growing
                </Button>
            </div>

            <div class="text-center text-sm text-muted-foreground">
                Already have an account?
                <TextLink
                    :href="login()"
                    class="underline underline-offset-4"
                    :tabindex="6"
                    >Log in</TextLink
                >
            </div>
        </Form>
    </AuthBase>
</template>
