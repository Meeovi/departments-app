// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: false
  },

  features: {
    devLogs: false,
  },

  app: {
    head: {
      viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
      templateParams: {
        separator: '·',
      },
      htmlAttrs: {
        lang: 'en',
      },
      meta: [{
        name: 'description',
        content: 'Starter template for the M Framework'
      }, ],
      link: [{
          rel: 'icon',
          href: '/favicon.ico'
        },
        {
          rel: 'apple-touch-icon',
          href: '/icons/apple-touch-icon-180x180.png'
        },
      ],
      script: [{
        //src: 'https://static.elfsight.com/platform/platform.js'
      }]
    },
  },

  css: [
    'assets/web/assets/mobirise-icons2/mobirise2.css',
    'assets/bootstrap/css/bootstrap.min.css',
    'assets/bootstrap/css/bootstrap-grid.min.css',
    'assets/bootstrap/css/bootstrap-reboot.min.css',
    'assets/theme/css/style.css',
    'assets/mobirise/css/mbr-additional.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'assets/styles/mobile.css',
    'assets/styles/styles.css',
  ],

  modules: [
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxtjs/i18n',
    "nuxt-security",
    '@storefront-ui/nuxt',
    'vuetify-nuxt-module'
  ],

  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', '*'],
        'script-src': ["'self'", "'unsafe-inline'", '*'],
        'script-src-attr': ["'unsafe-inline'"],
        'connect-src': ["'self'", process.env.DIRECTUS_URL || ''],
        'frame-ancestors': ["'self'", process.env.DIRECTUS_URL || ''],
      },
      strictTransportSecurity: {
        maxAge: 0
      },
      crossOriginOpenerPolicy: false,
      crossOriginEmbedderPolicy: false,
      permissionsPolicy: false
    }
  },

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    detectBrowserLanguage: false,
    vueI18n: './app/i18n/i18n.config',
    locales: [{
      code: 'en',
      name: 'English',
    }, {
      code: 'es',
      name: 'Español',
    }, {
      code: 'ar',
      name: 'العربية',
      dir: 'rtl',
    }],
  },

  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: 'fa-svg',
        svg: {
          fa: {
            libraries: [
              [ /* default export? */ false, /* export name */ 'fas', /* library */ '@fortawesome/free-solid-svg-icons']
            ]
          }
        },
        sets: [{
          name: 'mdi',
          cdn: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css'
        }]
      }
    }
  },

  // Image Configuration - https://image.nuxt.com/providers/directus
  image: {
    providers: {
      directus: {
        provider: 'directus',
        options: {
          baseURL: `${process.env.DIRECTUS_URL}assets/`,
        },
      },
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL as string,
  },

  sitemap: {
    sources: ['/api/sitemap'],
  },

  runtimeConfig: {
    meilisearch: {
      apiKey: process.env.MEILISEARCH_MASTER_KEY
    },
    public: {
      // Site Configuration
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Meeovi',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,

      // Directus
      directus: {
        url: process.env.DIRECTUS_URL,
        nuxtBaseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3011',
        auth: {
          email: process.env.NUXTUS_DIRECTUS_ADMIN_EMAIL,
          password: process.env.NUXTUS_DIRECTUS_ADMIN_PASSWORD,
          token: process.env.NUXTUS_DIRECTUS_STATIC_TOKEN,
          enabled: true,
          enableGlobalAuthMiddleware: false, // Enable auth middleware on every page
          userFields: ['*'], // Select user fields
          redirect: {
            login: '/auth/login', // Path to redirect when login is required
            logout: '/', // Path to redirect after logout
            home: '/', // Path to redirect after successful login
            resetPassword: '/auth/reset-password', // Path to redirect for password reset
            callback: '/auth/callback', // Path to redirect after login with provider
          },
        }
      },

      meilisearch: {
        host: process.env.NUXT_PUBLIC_MEILISEARCH_HOST || 'http://localhost:7700',
        searchApiKey: process.env.NUXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY || '',
        indexName: process.env.NUXT_PUBLIC_MEILISEARCH_INDEX_NAME || 'default',
        options: {
          primaryKey: 'id',
          keepZeroFacets: false,
          finitePagination: false
        }
      },

      // Google Tag Manager
      gtagId: process.env.NUXT_PUBLIC_GTAG_ID,
    },
  },

  // Build configuration
  build: {
    transpile: ['@meilisearch/instant-meilisearch', 'vue-instantsearch']
  },
})