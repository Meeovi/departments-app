<template>
    <v-sheet class="bg-deep-purple pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
                    label="Email"></v-text-field>

                <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
                    placeholder="Enter your password"></v-text-field>

                <br>

                <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit"
                    variant="elevated">
                    Sign In
                </v-btn>
                <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
            </v-form>
        </v-card>
    </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useNuxtApp } from '#imports';

const form = ref(false);
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const router = useRouter();
const { $directus } = useNuxtApp();

const required = v => !!v || 'Field is required';

const onSubmit = async () => {
    if (!form.value) return;
    loading.value = true;
    error.value = '';
    try {
        // Directus authentication
        const authRes = await $directus.auth.login({
            email: email.value,
            password: password.value,
        });
        // Store token in cookie for session persistence
        useCookie('directus_access_token').value = authRes.access_token;
        await router.push('/');
    } catch (e) {
        error.value = e?.message || 'Login failed';
    } finally {
        loading.value = false;
    }
};

const onLogout = async () => {
    loading.value = true;
    try {
        await $directus.auth.logout();
        useCookie('directus_access_token').value = null;
        await router.push('/Auth/login');
    } catch (e) {
        error.value = e?.message || 'Logout failed.';
    } finally {
        loading.value = false;
    }
};

const onRefresh = async () => {
    loading.value = true;
    try {
        await $directus.auth.refresh();
    } catch (e) {
        error.value = e?.message || 'Session refresh failed.';
    } finally {
        loading.value = false;
    }
};

useHead({
    title: 'Login to Example',
});
</script>