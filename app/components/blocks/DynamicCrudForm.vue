<template>
  <v-form @submit.prevent="onSubmit">
    <v-row>
      <v-col v-for="field in fields" :key="field.field" cols="12" md="6">
        <component
          :is="getComponent(field)"
          v-model="form[field.field]"
          :label="field.note || field.name || field.field"
          :type="field.type === 'integer' ? 'number' : field.type"
          :items="field.options || []"
          :required="field.required"
          v-if="!isRepeater(field) && !isFile(field)"
        />
        <div v-else-if="isRepeater(field)">
          <label class="font-weight-bold mb-2">{{ field.note || field.name || field.field }}</label>
          <div v-for="(item, idx) in form[field.field] || []" :key="idx" class="mb-2">
            <v-text-field v-model="form[field.field][idx]" :label="'Item ' + (idx + 1)" />
            <v-btn icon color="error" @click="removeRepeaterItem(field.field, idx)"><v-icon>mdi-delete</v-icon></v-btn>
          </div>
          <v-btn small color="primary" @click="addRepeaterItem(field.field)">Add Item</v-btn>
        </div>
        <div v-else-if="isFile(field)">
          <label class="font-weight-bold mb-2">{{ field.note || field.name || field.field }}</label>
          <v-file-input v-model="form[field.field]" :label="field.note || field.name || field.field" show-size />
        </div>
      </v-col>
    </v-row>
    <turnstile-widget v-model="turnstileToken" class="my-4" />
    <v-btn color="primary" type="submit">{{ submitLabel }}</v-btn>
    <v-btn v-if="showDelete" color="error" class="ml-2" @click="onDelete">Delete</v-btn>
  </v-form>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useNuxtApp } from '#imports';
import { TurnstileWidget } from '@nuxtjs/turnstile';

const props = defineProps({
  collection: { type: String, required: true },
  value: { type: Object, default: () => ({}) },
  submitLabel: { type: String, default: 'Save' },
  showDelete: { type: Boolean, default: false },
});
const emit = defineEmits(['submit', 'delete']);
const { $directus } = useNuxtApp();
const fields = ref([]);
const form = ref({ ...props.value });
const turnstileToken = ref('');

const getComponent = (field) => {
  if (field.type === 'boolean') return 'v-checkbox';
  if (field.type === 'text' || field.type === 'string') return 'v-text-field';
  if (field.type === 'integer' || field.type === 'number') return 'v-text-field';
  if (field.type === 'dateTime' || field.type === 'date') return 'v-text-field';
  if (field.type === 'json') return 'v-textarea';
  if (field.type === 'select' || field.options) return 'v-select';
  return 'v-text-field';
};
const isRepeater = (field) => field.interface === 'list' || field.type === 'array';
const isFile = (field) => field.interface === 'file' || field.type === 'file';
const addRepeaterItem = (fieldName) => {
  if (!form.value[fieldName]) form.value[fieldName] = [];
  form.value[fieldName].push('');
};
const removeRepeaterItem = (fieldName, idx) => {
  form.value[fieldName].splice(idx, 1);
};

const fetchFields = async () => {
  const meta = await $directus.fields.readByCollection(props.collection);
  fields.value = meta.filter(f => !f.hidden && f.interface !== 'presentational-divider');
};

const onSubmit = () => {
  emit('submit', { ...form.value, turnstileToken: turnstileToken.value });
};
const onDelete = () => {
  emit('delete', { ...form.value });
};

watch(() => props.value, v => { form.value = { ...v }; });
onMounted(fetchFields);
</script>
