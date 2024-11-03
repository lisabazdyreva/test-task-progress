// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/styles.css"],
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    display: "swap",
    families: {
      Inter: [400, 600],
    },
  },
});
