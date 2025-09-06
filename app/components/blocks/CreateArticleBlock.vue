<template>
  <div>
    <DynamicCrudForm
      collection="articles"
      :submit-label="'Create Article'"
      @submit="createArticle"
    />
    <v-alert v-if="message" type="success" class="mt-4">{{ message }}</v-alert>
    <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#imports';
import DynamicCrudForm from './DynamicCrudForm.vue';

const { $directus, createItem } = useNuxtApp();
const message = ref('');
const error = ref('');

const createArticle = async (data) => {
  message.value = '';
  error.value = '';
  try {
    // Remove turnstileToken before sending to Directus
    const { turnstileToken, ...articleData } = data;
    await createItem($directus, 'articles', articleData);
    message.value = 'Article created successfully!';
  } catch (e) {
    error.value = e?.message || 'Failed to create article.';
  }
};
</script>
