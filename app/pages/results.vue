<template>
    <v-container fluid class="pa-0">
        <v-row class="d-flex flex-wrap">
            <v-col cols="12" class="py-6 text-center">
                <h1 class="display-1 font-weight-bold mb-2">Shop Our Products</h1>
                <div class="subtitle-1 mb-6">Find the best deals and latest arrivals</div>
            </v-col>
            <v-col cols="12">
                <Search :index-name="'steam-video-games'" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import Search from '~/components/Search/search.vue';
</script>