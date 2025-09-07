<template>
  <div>
    <div>
      <div class="relative">
        <SfLink :href="`/product/${product.id}`" class="block">
          <NuxtImg :src="`${$directus?.url}/assets/${product.image?.filename_disk}`" :alt="product?.name"
            class="block object-cover h-auto rounded-md aspect-square" width="300" height="300" />
        </SfLink>
        <SfButton variant="tertiary" size="sm" square
          class="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
          aria-label="Add to wishlist">
          <SfIconFavorite size="sm" />
        </SfButton>
      </div>
      <div class="p-4 border-t border-neutral-200" style="background-color: white !important;">
        <SfLink :href="`/product/${product.id}`" variant="secondary" class="no-underline"> {{ product.name }} </SfLink>
        <div class="flex items-center pt-1">
          <SfRating size="xs" :value="product?.rating || 0" :max="5" />
          <SfLink :href="`/product/${product?.id}`" variant="secondary" class="pl-1 no-underline">
            <SfCounter size="xs">{{ product?.rating || 0 }}</SfCounter>
          </SfLink>
        </div>
        <p class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700">
          By: <span v-for="facet in product?.user" :key="facet.id">{{ facet?.directus_users_id?.name }}</span>
        </p>
        <span class="block pb-2 font-bold typography-text-lg">
          {{ formatPrice(product?.price) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    SfRating,
    SfCounter,
    SfLink,
    SfButton,
    SfIconFavorite
  } from '@storefront-ui/vue';
  import {
    computed
  } from 'vue';

  const {
    $directus,
  } = useNuxtApp()

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  });

  const formatPrice = (amount: number | undefined) => {
    if (!amount || isNaN(amount)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };
</script>