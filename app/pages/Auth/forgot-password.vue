<template>
    <div>
        <form @submit.prevent="onForgotPassword">
            <v-table class="table">
                <tbody>
                    <tr>
                        <td style="text-align: right;">Enter Email</td>
                        <td>
                            <v-text-field v-model="email" type="email" name="email" hint="Enter your email so we can send you your password reset link" required />
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <v-card-actions>
                <v-spacer />
                <v-btn color="blue-darken-1" variant="text" :loading="loading" type="submit">
                    Send Reset Link
                </v-btn>
            </v-card-actions>
            <v-alert v-if="message" type="success" class="mt-4">{{ message }}</v-alert>
            <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#imports';

const email = ref('');
const loading = ref(false);
const message = ref('');
const error = ref('');
const { $directus } = useNuxtApp();

const onForgotPassword = async () => {
    loading.value = true;
    message.value = '';
    error.value = '';
    try {
        await $directus.auth.requestPasswordReset(email.value);
        message.value = 'Password reset link sent! Please check your email.';
    } catch (e) {
        error.value = e?.message || 'Failed to send reset link.';
    } finally {
        loading.value = false;
    }
};

useHead({
    title: 'Forgot Password',
});
</script>