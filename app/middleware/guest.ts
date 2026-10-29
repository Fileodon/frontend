export default defineNuxtRouteMiddleware(() => {
	const { isLoggedIn } = useAuthStore()
	console.log(isLoggedIn)
	if (isLoggedIn) return navigateTo('/test?' + isLoggedIn)
})
