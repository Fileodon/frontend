import { useAuthStore } from '~/stores/authStore'

const ignoredErrorCodes = new Set<number>([])

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hook('openFetch:onRequest', async (context) => {
		const authStore = useAuthStore()
		await nextTick()
		context.options.headers.set('Authorization', `Bearer ${authStore.accessJWT}`)
	})
	nuxtApp.hook('openFetch:onResponseError:api', async (context) => {
		const authStore = useAuthStore()
		const toastStore = useToastStore()

		const response = context.response

		if (response.status === 401) {
			authStore.refresh()
		}
		else if (!ignoredErrorCodes.has(response.status)) {
			// Dette er ikke optimalt, men jeg har ikke mere tid :(
			const statusText = response.statusText || JSON.stringify(response._data)
			await callOnce(`${context.request}-${statusText}`, () => toastStore.addToast({
				message: 'Action failed with: ' + statusText,
				type: 'error',
			}), { mode: 'render' })
		}
	})
})
