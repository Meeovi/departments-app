<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-alert type="info">Authenticating...</v-alert>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter, useNuxtApp } from '#imports';

const route = useRoute();
const router = useRouter();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { $directus } = useNuxtApp();

onMounted(async () => {
    // Example: handle OAuth callback with Directus
    const { access_token } = route.query;
    if (access_token) {
        useCookie('directus_access_token').value = access_token;
        await router.push('/');
    } else {
        // Optionally handle error or redirect
        await router.push('/Auth/login');
    }
});

useHead({
    title: 'Auth Callback',
});
</script>