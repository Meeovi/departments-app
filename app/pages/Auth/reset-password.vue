<template>
    <div>
        <form @submit.prevent="onResetPassword">
            <v-table class="table">
                <tbody>
                    <tr>
                        <td style="text-align: right;">Password</td>
                        <td>
                            <v-text-field v-model="password" type="password" name="password" hint="Reset your password for your account" required />
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right;">Repeat Password</td>
                        <td>
                            <v-text-field v-model="repeatPassword" type="password" name="repeatPassword" hint="Repeat your password" required />
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <v-card-actions>
                <v-spacer />
                <v-btn color="blue-darken-1" variant="text" :loading="loading" type="submit">
                    Reset Password
                </v-btn>
            </v-card-actions>
            <v-alert v-if="message" type="success" class="mt-4">{{ message }}</v-alert>
            <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useNuxtApp } from '#imports';

const password = ref('');
const repeatPassword = ref('');
const loading = ref(false);
const message = ref('');
const error = ref('');
const route = useRoute();
const { $directus } = useNuxtApp();

const onResetPassword = async () => {
    if (password.value !== repeatPassword.value) {
        error.value = 'Passwords do not match.';
        return;
    }
    loading.value = true;
    message.value = '';
    error.value = '';
    try {
        // The token should be passed via query param, e.g. /reset-password?token=...
        const token = route.query.token;
        if (!token) throw new Error('Missing reset token.');
        await $directus.auth.resetPassword(token, password.value);
        message.value = 'Password reset successful! You can now log in.';
    } catch (e) {
        error.value = e?.message || 'Failed to reset password.';
    } finally {
        loading.value = false;
    }
};

useHead({
    title: 'Reset Password',
});
</script>