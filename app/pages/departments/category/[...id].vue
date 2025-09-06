<template>
    <div>

        <div class="departmentPage">
            <!--Charts Category-->
            <div v-if="category?.slug === 'charts'">
                <charts />
            </div>

            <!--Radio Station Category-->
            <div v-else-if="category?.slug === 'radio-stations'">
                <stations />
            </div>

            <!--Meeovi Eats Category-->
            <div v-else-if="category?.slug === 'eats'">
                <eats />
            </div>

            <!--Meeovi Restaurants Category-->
            <div v-else-if="category?.slug === 'restaurants'">
                <div v-for=" (restaurants, index) in restaurantsList" :key="index">
                    <restaurants :restaurant="restaurants" />
                </div>
            </div>

            <v-card variant="text" v-else>
                <v-toolbar :style="`background-color: ${category?.color}; color: ${category?.colortext}`"
                    :title="`Meeovi ${category?.departments[0]?.departments_id?.name} - ${category?.name}`">
                    <v-slide-group show-arrows>
                        <v-slide-group-item v-slot="{ isSelected, toggle }">
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <v-btn :color="isSelected ? 'primary' : undefined" class="ma-2" @click="toggle"
                                        v-bind="props" append-icon="fas:fa fa-caret-down" variant="text">
                                        Categories
                                    </v-btn>
                                </template>
                                <v-list class="departmentMenu">
                                    <v-row>
                                        <v-col cols="3" v-for="categories in category?.categories"
                                            :key="categories?.categories_id?.id">
                                            <v-list-item>
                                                <NuxtLink
                                                    :to="`/departments/categories/${categories?.categories_id?.id}`">
                                                    {{ categories?.categories_id?.name }}</NuxtLink>
                                            </v-list-item>
                                        </v-col>
                                    </v-row>
                                </v-list>
                            </v-menu>
                        </v-slide-group-item>

                        <v-slide-group-item v-for="menu in category?.menus" :key="menu" v-slot="{ isSelected, toggle }">
                            <v-btn :color="isSelected ? 'primary' : undefined" class="ma-2" @click="toggle"
                                :href="`${menu?.url}`">
                                {{ menu?.name }}
                            </v-btn>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-toolbar>
            </v-card>

            <section data-bs-version="5.1" class="article1 shopm5 cid-uW1D0jyO5B" id="aarticle1-3">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="title col-md-12 col-lg-12">
                            <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-4">
                                Meeovi
                            </h3>
                            <h4 class="mbr-section-subtitle align-center mbr-fonts-style mb-0 display-1">
                                <strong>{{ category?.name }}</strong>
                            </h4>

                        </div>
                    </div>
                </div>
            </section>

            <v-row>
                <!--List of products in the category-->
                <v-col cols="3" v-for="category in category?.products" :key="category.id">
                    <div v-for="products in category" :key="products?.products_id.id">
                        <productCard :product="products?.products_id?.id" />
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script setup>
    import productCard from '@/components/Related/productCard.vue'
        
    const route = useRoute()
    const {
        $directus,
        $readItem,
        $readItems
    } = useNuxtApp()

    const {
        data: category
    } = await useAsyncData('category', () => {
        return $directus.request($readItem('categories', route.params.id, {
            fields: ['*',
                'categories.categories_id.*',
                'departments.departments_id.*',
                'products.products_id.*',
                'products.products_id.image.*',
                'menus.*',
                'image.*'
            ]
        }))
    })

    const {
        data: restaurantsList
    } = await useAsyncData('restaurantsList', () => {
        return $directus.request($readItems('shops', {
            fields: ['*', {
                '*': ['*']
            }]
        }))
    })

    const {
        data: callouts
    } = await useAsyncData('callouts', () => {
        return $directus.request($readItem('callouts', '2'))
    })

    useHead({
        title: computed(() => category?.value?.name || 'Category Page')
    });
</script>