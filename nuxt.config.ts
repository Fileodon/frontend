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
    modules: ['@pinia/nuxt', '@nuxt/icon/module', 'nuxt-open-fetch'],
    icon:{
        customCollections:[
            {
                prefix: 'custom-icons',
                dir: resolve('./app/assets/icons'),
            }
        ],
        mode: 'css',
        cssLayer: 'base',
        size: '24px',
    },
    openFetch: {
        clients: {
            auth: {
                baseURL: process.env.API_BASE_URL || "https://api.sftptogo.snipertools.me",
                schema: process.env.API_BASE_URL ? process.env.API_BASE_URL + "/openapi/v1.json" : "https://api.sftptogo.snipertools.me/openapi/v1.json",
            },
        },  
    },
})
