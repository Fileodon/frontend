// https://nuxt.com/docs/api/configuration/nuxt-config'
import tailwindcss from '@tailwindcss/vite'
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({

	modules: ['@pinia/nuxt', '@nuxt/icon/module', 'nuxt-open-fetch', '@nuxt/eslint', '@nuxt/test-utils/module'],
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],	compatibilityDate: '2025-07-15',
	vite: {
		plugins: [tailwindcss() as Plugin[]],
	},
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
			},
			typescript: true,
		},
	},
	icon: {
		customCollections: [
			{
				prefix: 'custom-icons',
				dir: resolve('./app/assets/icons'),
			},
		],
		mode: 'css',
		cssLayer: 'base',
		size: '24px',
	},
	openFetch: {
		clients: {
			api: {
				baseURL: process.env.API_BASE_URL ? process.env.API_BASE_URL : 'https://api.fileodon.dev',
				schema: process.env.API_OPENAPI_PATH ? process.env.API_OPENAPI_PATH : 'https://api.filodon.dev/swagger/v1/swagger.json',
			},
		},
	},
})
