<template>
    <v-sheet class="pa-8" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="500">
            <v-form @submit.prevent="onSave">
                <v-text-field v-model="user.first_name" label="First Name" required />
                <v-text-field v-model="user.last_name" label="Last Name" required />
                <v-text-field v-model="user.email" label="Email Address" type="email" required />
                <v-text-field v-model="user.username" label="Username" required />
                <v-text-field v-model="password" label="New Password" type="password" />
                <v-btn color="success" :loading="loading" type="submit" class="mt-4">Save</v-btn>
                <v-btn color="error" class="mt-4 ml-2" @click="onLogout">Logout</v-btn>
                <v-btn color="info" class="mt-4 ml-2" @click="onRefresh">Refresh Session</v-btn>
                <v-alert v-if="message" type="success" class="mt-4">{{ message }}</v-alert>
                <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
            </v-form>
        </v-card>
    </v-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useNuxtApp } from '#imports';

const user = ref({ first_name: '', last_name: '', email: '', username: '' });
const password = ref('');
const loading = ref(false);
const message = ref('');
const error = ref('');
const router = useRouter();
const { $directus } = useNuxtApp();

const fetchUser = async () => {
    loading.value = true;
    error.value = '';
    try {
        const me = await $directus.users.me.read();
        user.value = { ...user.value, ...me };
    } catch (e) {
        error.value = e?.message || 'Failed to load user.';
    } finally {
        loading.value = false;
    }
};

const onSave = async () => {
    loading.value = true;
    message.value = '';
    error.value = '';
    try {
        const updateData = {
            first_name: user.value.first_name,
            last_name: user.value.last_name,
            email: user.value.email,
            username: user.value.username,
        };
        if (password.value) updateData.password = password.value;
        await $directus.users.me.update(updateData);
        message.value = 'Account updated!';
        password.value = '';
    } catch (e) {
        error.value = e?.message || 'Failed to update account.';
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
        message.value = 'Session refreshed!';
    } catch (e) {
        error.value = e?.message || 'Session refresh failed.';
    } finally {
        loading.value = false;
    }
};

onMounted(fetchUser);

useHead({
    title: 'Account',
});
</script>