<template>
    <div class="departmentPage">
        <div v-if="department?.name === 'Deals'">
            <v-toolbar :style="`background-color: ${department?.color}; color: ${department?.colortext}`"
                :title="department?.name"></v-toolbar>
            <deals :category="department?.id" />
        </div>

        <div v-else>
            <v-card variant="text">
                <v-toolbar :style="`background-color: ${department?.color}; color: ${department?.colortext}`"
                    :title="department?.name">
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
                                        <v-col cols="3" v-for="categories in department?.categories"
                                            :key="categories?.categories_id?.id">
                                            <v-list-item>
                                                <NuxtLink
                                                    :to="`/departments/category/${categories?.categories_id?.id}`">
                                                    {{ categories?.categories_id?.name }}</NuxtLink>
                                            </v-list-item>
                                        </v-col>
                                    </v-row>
                                </v-list>
                            </v-menu>
                        </v-slide-group-item>

                        <v-slide-group-item v-if="department?.menus?.length" v-for="menu in department?.menus" :key="menu"
                            v-slot="{ isSelected, toggle }">
                            <v-btn :color="isSelected ? 'primary' : undefined" class="ma-2" @click="toggle"
                                :href="`${menu?.url}`">
                                {{ menu?.name }}
                            </v-btn>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-toolbar>

                <section data-bs-version="5.1" class="pricing6 shopm5 cid-uW1BAp128W" id="apricing6-1">

                    <div class="mbr-overlay"></div>
                    <div class="container">
                        <div>
                            <div class="row align-items-stretch items-row justify-content-center">

                                <div class="col-12 col-md-12 col-lg-6">
                                    <div v-if="department?.name === 'Travel'">
                                        <travel :category="department?.name" />
                                    </div>
                                    <!--<div v-else-if="department?.name === 'Appstore'">
            <appstore :category="department?.name" />
          </div>-->
                                    <div v-else-if="department?.name === 'Weather'">
                                        <weather :category="department?.name" />
                                    </div>

                                    <div v-else-if="department?.name === 'Time'">
                                        <timeComponent :category="department?.name" />
                                    </div>

                                    <div v-else class="mbr-section-head"
                                        :style="`background-color: ${department?.color}`">
                                        <h4 class="mbr-section-title mbr-fonts-style mb-0 display-7" :style="`color: ${department?.colortext}`">
                                            <strong>Meeovi</strong>
                                        </h4>
                                        <h5 class="mbr-section-subtitle mbr-fonts-style mb-0 display-2" :style="`color: ${department?.colortext}`">
                                            <strong>{{ department?.name }}</strong>
                                        </h5>
                                        <h5 class="main-text mbr-fonts-style mb-0 display-7" :style="`color: ${department?.colortext}`">
                                            {{ department?.description }}
                                        </h5>
                                        <div class="mbr-section-btn item-footer">
                                            <a href="" class="btn btn-danger item-btn display-7" target="_blank">
                                                <span
                                                    class="mobi-mbri mobi-mbri-arrow-next mbr-iconfont mbr-iconfont-btn"></span>
                                                Shop Now
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="item features-image col-12 col-md-6 col-lg-3"
                                    v-for="product in introProducts?.products" :key="product.id">
                                    <productCard :product="product?.products_id" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section data-bs-version="5.1" class="gallery2 shopm5 cid-uW1BojE78S" id="agallery2-0"
                    v-if="department?.products?.products_id?.type === 'department'"
                    :style="`background-image: url(${$directus?.url}assets/${department?.image?.filename_disk})`">
                    <div class="mbr-overlay" style="opacity: 0.8; background-color: rgb(255, 255, 255);">
                    </div>

                    <div class="container-fluid">
                        <div class="row">
                            <!--Vibez Slider-->
                            <v-sheet
                                class="mx-auto sliderProducts row align-items-stretch items-row justify-content-center">
                                <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
                                    <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }"
                                        v-for="shorts in department?.shorts" :key="shorts">
                                        <shorts :short="shorts?.shorts_id" :class="['ma-4', selectedClass]"
                                            @click="toggle" />
                                        <div class="d-flex fill-height align-center justify-center">
                                            <v-scale-transition>
                                                <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline"
                                                    size="48"></v-icon>
                                            </v-scale-transition>
                                        </div>
                                    </v-slide-group-item>
                                </v-slide-group>
                            </v-sheet>
                        </div>
                    </div>
                </section>

                <v-row class="departmentRow">
                    <!--Best Seller Product Slider-->
                    <v-sheet class="mx-auto sliderProducts row align-items-stretch items-row justify-content-center">
                        <h4 style="left: 15px; position: relative;">{{ callouts?.menus?.[1]?.name }}</h4>
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
                            <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }"
                                v-for="products in best?.products" :key="products">
                                <productCard :product="products?.products_id" :class="['ma-4', selectedClass]"
                                    @click="toggle" />
                                <div class="d-flex fill-height align-center justify-center">
                                    <v-scale-transition>
                                        <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline"
                                            size="48"></v-icon>
                                    </v-scale-transition>
                                </div>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>

                    <!--List of latest products in the department-->
                    <v-sheet class="mx-auto sliderProducts row align-items-stretch items-row justify-content-center">
                        <h4 style="left: 15px; position: relative;">{{ callouts?.menus?.[2]?.name }}</h4>
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
                            <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }"
                                v-for="products in latestProducts?.products" :key="products">
                                <productCard :product="products?.products_id" :class="['ma-4', selectedClass]"
                                    @click="toggle" />
                                <div class="d-flex fill-height align-center justify-center">
                                    <v-scale-transition>
                                        <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline"
                                            size="48"></v-icon>
                                    </v-scale-transition>
                                </div>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>

                    <!--List of products in the department-->
                    <v-sheet class="mx-auto sliderProducts row align-items-stretch items-row justify-content-center">
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
                            <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }"
                                v-for="products in department?.products" :key="products">
                                <productCard :product="products?.products_id" :class="['ma-4', selectedClass]"
                                    @click="toggle" />
                                <div class="d-flex fill-height align-center justify-center">
                                    <v-scale-transition>
                                        <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline"
                                            size="48"></v-icon>
                                    </v-scale-transition>
                                </div>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>

                    <!--List of events in this department-->
                    <v-sheet class="mx-auto sliderProducts row align-items-stretch items-row justify-content-center"
                        v-if="department?.products?.products_id?.type === 'department'">
                        <h4 style="left: 15px; position: relative;">{{ callouts?.menus?.[3]?.name }}
                            {{ department?.name }}</h4>
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
                            <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }"
                                v-for="products in events" :key="products">
                                <productCard :product="products?.events_id" :class="['ma-4', selectedClass]"
                                    @click="toggle" />
                                <div class="d-flex fill-height align-center justify-center">
                                    <v-scale-transition>
                                        <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline"
                                            size="48"></v-icon>
                                    </v-scale-transition>
                                </div>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>
                    <!---->

                    <!--List of spaces in the department-->
                    <v-sheet class="mx-auto sliderProducts row align-items-stretch items-row justify-content-center" v-if="department?.spaces?.length">
                        <h4 style="left: 15px; position: relative;">{{ callouts?.menus?.[4]?.name }}
                            {{ department?.name }}</h4>
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
                            <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }"
                                v-for="spaces in department?.spaces" :key="spaces">
                                <spaces :space="spaces?.spaces_id" :class="['ma-4', selectedClass]" @click="toggle" />
                                <div class="d-flex fill-height align-center justify-center">
                                    <v-scale-transition>
                                        <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline"
                                            size="48"></v-icon>
                                    </v-scale-transition>
                                </div>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>
                </v-row>
            </v-card>
        </div>
    </div>
</template>

<script setup>
    import shorts from '@/components/Related/short.vue'
    import spaces from '@/components/Related/space.vue'
    import productCard from '@/components/Related/productCard.vue'
    import travel from '@/components/categories/travel.vue'
    import deals from '@/components/categories/deals.vue'
    import timeComponent from '@/components/categories/time/time.vue'
    import weather from '@/components/categories/weather/weather.vue'

    const route = useRoute()
    const model = ref(null)
    const {
        $directus,
        $readItem
    } = useNuxtApp()

    const {
        data: department
    } = await useAsyncData('department', () => {
        return $directus.request($readItem('departments', route.params.id, {
            fields: ['*',
                'categories.categories_id.*',
                'spaces.spaces_id.*',
                'events.events_id.*',
                'products.products_id.*',
                'products.products_id.image.*',
                'menus.*',
                'shorts.shorts_id.*',
                'image.*'
            ]
        }))
    })

    const {
        data: introProducts
    } = await useAsyncData('introProducts', () => {
        return $directus.request($readItem('departments', route.params.id, {
            fields: ['*',
                'products.products_id.*',
                'collections.collections_id.*',
                'images.*'
            ],
            limit: 2,
        }))
    })

    const {
        data: best
    } = await useAsyncData('best', () => {
        return $directus.request($readItem('departments', route.params.id, {
            fields: ['*',
                'products.products_id.*',
                'collections.collections_id.*',
                'images.*'
            ],
            limit: 10,
            filter: {
                collections: {
                    collections_id: {
                        name: {
                            _eq: "Best Sellers"
                        }
                    }
                }
            }
        }))
    })

    const {
        data: latestProducts
    } = await useAsyncData('latestProducts', () => {
        return $directus.request($readItem('departments', route.params.id, {
            fields: ['*',
                'products.products_id.*',
                'collections.collections_id.*',
                'images.*'
            ],
            limit: 10,
            filter: {
                products: {
                    products_id: {
                        status: {
                            _eq: "published"
                        }
                    }
                }
            }
        }))
    })

    const {
        data: limitProducts
    } = await useAsyncData('limitProducts', () => {
        return $directus.request($readItem('departments', route.params.id, {
            fields: ['*',
                'products.products_id.*',
                'collections.collections_id.*',
                'images.*'
            ],
            limit: 2,
            filter: {
                products: {
                    products_id: {
                        status: {
                            _eq: "published"
                        }
                    }
                }
            }
        }))
    })

        const {
        data: events
    } = await useAsyncData('events', () => {
        return $directus.request($readItem('departments', route.params.id, {
            fields: ['*',
                'products.products_id.*',
                'collections.collections_id.*',
                'images.*'
            ],
            limit: 10,
            filter: {
                products: {
                    products_id: {
                        type: {
                            _eq: "event"
                        }
                    }
                }
            }
        }))
    })

    const {
        data: callouts
    } = await useAsyncData('callouts', () => {
        return $directus.request($readItem('callouts', '2'))
    })

    useHead({
        title: computed(() => department?.value?.name || 'Department Page')
    });
</script>