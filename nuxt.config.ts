// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  runtimeConfig : {
    GITHUB_CLIENT_ID : process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
    TWITCH_CLIENT_ID : process.env.TWITCH_CLIENT_ID,
    TWITCH_CLIENT_SECRET : process.env.TWITCH_CLIENT_SECRET,
    authSecret: '123',
  },
  modules: ["@sidebase/nuxt-auth", "@nuxtjs/tailwindcss"],
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    baseURL: 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs',
      trustHost: false,
      addDefaultCallbackUrl: true
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  },
  routeRules : {
    '/' : { prerender : true },
    '/api/**': { cors: true },
    '/protected/**' : { swr : 3600 }
  }
})