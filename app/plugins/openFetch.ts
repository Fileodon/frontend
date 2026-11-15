import { useAuthStore } from '~/stores/authStore'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hook('openFetch:onRequest', async (context) => {
		const authStore = useAuthStore()
		context.options.headers.set('Authorization', `Bearer ${authStore.accessJWT}`)
	})
	nuxtApp.hook('openFetch:onResponseError', async (context) => {
		const authStore = useAuthStore()
		if (context.response.status === 401) {
			authStore.refresh()
		}
	})
})
