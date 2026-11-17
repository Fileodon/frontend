import { useAuthStore } from '~/stores/authStore'

const ignoredErrorCodes = new Set<number>([])
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hook('openFetch:onRequest', async (context) => {
		const authStore = useAuthStore()
		await nextTick()
		context.options.headers.set('Authorization', `Bearer ${authStore.accessJWT}`)
	})
	nuxtApp.hook('openFetch:onResponseError', async (context) => {
		const authStore = useAuthStore()
		const toastStore = useToastStore()

		const response = context.response
		if (response.status === 401) {
			authStore.refresh()
		}
		else if (!ignoredErrorCodes.has(response.status)) {
			await callOnce('user', () => toastStore.addToast({
				message: 'Action failed with: ' + response.statusText,
				type: 'error',
			}), { mode: 'render' })
		}
	})
})
