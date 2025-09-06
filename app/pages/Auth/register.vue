<template>
    <v-card class="mx-auto" max-width="344" title="User Registration">
        <v-container>
            <v-text-field v-model="first" color="primary" label="First name" variant="underlined" />
            <v-text-field v-model="last" color="primary" label="Last name" variant="underlined" />
            <v-text-field v-model="email" color="primary" label="Email" variant="underlined" />
            <v-text-field 
                v-model="password" 
                color="primary" 
                label="Password" 
                placeholder="Enter your password"
                variant="underlined" 
            />
            <v-checkbox v-model="terms" color="secondary" label="I agree to site terms and conditions" />
        </v-container>
        <v-divider />
        <v-card-actions>
            <v-spacer />
            <v-btn color="success" :disabled="!terms || loading" @click="onRegister">
                Complete Registration
                <v-icon icon="mdi-chevron-right" end />
            </v-btn>
        </v-card-actions>
        <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
    </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useNuxtApp } from '#imports';

const first = ref('');
const last = ref('');
const email = ref('');
const password = ref('');
const terms = ref(false);
const loading = ref(false);
const error = ref('');
const router = useRouter();
const { $directus } = useNuxtApp();

const onRegister = async () => {
    if (!terms.value) return;
    loading.value = true;
    error.value = '';
    try {
        await $directus.users.createOne({
            email: email.value,
            password: password.value,
            first_name: first.value,
            last_name: last.value,
        });
        await router.push('/Auth/login');
    } catch (e) {
        error.value = e?.message || 'Registration failed';
    } finally {
        loading.value = false;
    }
};

useHead({
    title: 'Register',
});
</script>