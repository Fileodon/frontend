import { defineStore } from 'pinia'
import { emailValidation } from '~/utils/validation/email'
import { passwordValidation } from '~/utils/validation/password'

interface IErrorResponse {
	success: boolean
	errors?: Record<string, string>
}
const accessTokenCookieName = 'accessToken'
// This store has the purpose of handling all interaction with auth endpoints, and provide authentification for the rest of the application.
export const useAuthStore = defineStore('auth', () => {
	const { $api } = useNuxtApp()
	const tokenExpiry = ref()
	// This is the short lived token
	const accessJWTRef = ref<string | null | undefined>(useCookie(accessTokenCookieName).value)

	const isLoggedIn = computed(() => {
		// Maybe do some check on JWT has x more ttl?
		return !!accessJWT.value
	})

	const accessJWT = computed({
		get: () => accessJWTRef.value,
		set: async (val: string | null | undefined) => {
			const accessTokenCookie = useCookie(accessTokenCookieName)
			accessTokenCookie.value = val
			await nextTick()
			accessJWTRef.value = val
			// refreshAuthMe()
		},
	})

	const { data: user, refresh: refreshAuthMe } = useLazyApi('/auth/me', {
		server: false,
		enabled: !!accessJWT.value,
		watch: [accessJWT],
	})

	async function login(form: Schema<'LoginRequest'>): Promise<IErrorResponse> {
		const emailError = emailValidation(form.email ?? '')
		if (emailError) {
			return { success: false, errors: { email: emailError } }
		}
		const passwordError = passwordValidation(form.password ?? '')
		if (passwordError) {
			return { success: false, errors: { password: passwordError } }
		}
		const response = await $api('/auth', {
			method: 'POST',
			credentials: 'include',
			body: form,
		})
		if (!response.accessToken) {
			alert('login faild skill issue?')
			return { success: false, errors: { noToken: 'could not generate token' } }
		}
		await handleAuthSuccessResponse(response)
		refreshAuthMe()
		return { success: true, errors: {} }
	}

	async function register(form: Schema<'RegisterRequest'>): Promise<IErrorResponse> {
		if (form.username && form.username?.trim().length <= 0) {
			return { success: false, errors: { username: 'The username cannot be empty' } }
		}
		const emailError = emailValidation(form.email ?? '')
		if (emailError) {
			return { success: false, errors: { email: emailError } }
		}
		const passwordError = passwordValidation(form.password ?? '')
		if (passwordError) {
			return { success: false, errors: { password: passwordError } }
		}
		await $api('/auth/register', {
			method: 'post',
			credentials: 'include',
			body: form,
			onResponse: (res) => {
				if (res.response.ok) {
					alert('you are now registered gang shit')
					navigateTo('/auth')
				}
				else {
					alert('epic registration fails')
				}
			},
		})
		return { success: true, errors: {} }
	}

	async function refresh() {
		await $api('/auth/refresh', {
			method: 'post',
			credentials: 'include',
			ignoreResponseError: true,
			onResponse: async (res) => {
				if (res.response.ok) {
					console.log(res.response._data)
					await handleAuthSuccessResponse(res.response._data)
					await nextTick()
					await refreshAuthMe()
				}
				else {
					console.log('add some logout')
					logout()
				}
			},
		})
	}

	async function handleAuthSuccessResponse(response: Schema<'AuthResponse'>) {
		tokenExpiry.value = response.refreshTokenExpiryTimestamp
		await nextTick() // make sure state is updated before we set new accessToken so that updated tokenExpiry is set on cookie
		accessJWT.value = response.accessToken
	}

	async function logout() {
		// TODO call logout to remove refresh cookie
		accessJWT.value = undefined
		navigateTo('/auth')
	}

	return {
		accessJWT: readonly(accessJWT),
		user: readonly(user),
		isLoggedIn,
		login,
		register,
		refresh,
		logout,
	}
})
