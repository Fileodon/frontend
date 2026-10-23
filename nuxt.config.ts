// https://nuxt.com/docs/api/configuration/nuxt-config'
import tailwindcss from "@tailwindcss/vite";
import { createResolver } from "nuxt/kit"

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss() as any],
  },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxt/icon/module'],
  icon:{
    customCollections:[
        {
            prefix: 'custom-icons',
            dir: resolve('./app/assets/icons'),
        }
    ]
  }
})
