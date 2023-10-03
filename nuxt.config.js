import path from 'path'
import fs from 'fs'

export default {
  mode: 'universal',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Детская городская поликлиника №44',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content:
          'Официальный сайт детской городской поликлиники №44 г. Санкт-Петербурга',
      },
      {
        hid: 'og-title',
        name: 'og:title',
        content: 'Детская городская поликлиника №44',
      },
      {
        hid: 'og-desc',
        name: 'og:desc',
        content:
          'Официальный сайт детской городской поликлиники №44 г. Санкт-Петербурга',
      },
      {
        hid: 'og-image',
        name: 'og:image',
        content: 'https://dgp44.spb.ru/fav.png',
      },
      {
        hid: 'og-url',
        name: 'og:url',
        content: 'https://dgp44.spb.ru',
      },
      {name: 'format-detection', content: 'telephone=no'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/fav.png'},
      {
        rel: 'stylesheet',
        href: '/scripts/bvi/_dist/css/bvi.min.css',
      },
    ],
    script: [{src: '/scripts/bvi/_dist/js/bvi.min.js', body: true}],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/styles.scss', '~/assets/styles/reset.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: './plugins/vue-carousel.js',
      mode: 'client',
    },
    {
      src: './plugins/vue-masonry.js',
      mode: 'client',
    },
    {
      src: './plugins/vue-datepicker',
      mode: 'client',
    },
    {
      src: './plugins/vue-mask',
      mode: 'client',
    },
    {
      src: './plugins/vue-resize-detector',
      mode: 'client',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-route-meta',
    'nuxt-vue-multiselect',
    'cookie-universal-nuxt',
    '@nuxtjs/recaptcha',
    // '@nuxtjs/yandex-metrika',
    '@nuxtjs/sitemap'
  ],

  // yandexMetrika: {
  //   id: '93481516',
  //   defer: true,
  //   clickmap: true,
  //   trackLinks: true,
  //   accurateTrackBounce: true
  // },

  sitemap: {
    hostname: 'https://dgp44.spb.ru',
    gzip: true,
    exclude: [],
    routes: [],
  },

  publicRuntimeConfig: {
    recaptcha: {
      hideBadge: true,
      language: 'ru',
      siteKey: '6Lf5u4QlAAAAAOIkC4T7CV3oAwt6Noh6h2RB_FBW',
      version: 3,
    },
  },

  styleResources: {
    scss: ['./assets/styles/variables/*.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, {isDev, isClient}) {
      // ..
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      })

      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) config.mode = 'development'
    },
    transpile: ['vue2-datepicker'],
  },

  serverMiddleware: ['~/middleware/redirects.js'],

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'admin-profile',
        path: '/about/docs/main/:id',
        component: resolve(__dirname, 'pages/about/docs/all/_id.vue'),
      })
    },
  },

  server: {
    port: 8888,
    // host: '192.168.0.106',
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),
    // },
  },
}
