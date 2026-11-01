export default defineNuxtRouteMiddleware(() => {
	const { isLoggedIn } = useAuthStore()
	// Should navigate to the correct admin dashboard path
	if (isLoggedIn) return navigateTo('/test?')
})
