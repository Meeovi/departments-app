<template>
  <div>
    <section id="footer03-8b" data-bs-version="5.1" class="footer3 cid-u4cbW5p2qg" once="footer"
      data-sortbtn="btn-primary">
      <div class="container">
        <v-row class="align-left justify-content-center mbr-white">
          <v-col cols="12" class="md-pb">
            <h2 class="mbr-section-title pb-2 mbr-fonts-style display-7">
              <strong>{{ about?.name }}</strong></h2>
            <div v-for="child in about?.menus" :key="child.id">
              <h3 class="mbr-section-subtitle mbr-fonts-style mbr-lighter display-4"><NuxtLink
                  :href="`/${child.slug}`">{{ child?.name }}</NuxtLink></h3>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>

    <copyright />
  </div>
</template>

<script setup>
  import copyright from '~/components/blocks/copyright.vue'

  const {
    $directus,
    $readItem
  } = useNuxtApp()

  const {
    data: about
  } = await useAsyncData('about', () => {
    return $directus.request($readItem('navigation', '7',))
  })
</script>