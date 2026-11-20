import { defineStore } from 'pinia'
import { emailValidation } from '~/utils/validation/email'
import { passwordValidation } from '~/utils/validation/password'

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
		// enabled: !!accessJWT.value,
		watch: [accessJWT],
		// immediate: !!accessJWT,
	})

	async function login(form: Schema<'LoginRequest'>): Promise<ApiFormResponse<undefined>> {
		const emailError = emailValidation(form.email ?? '')
		if (emailError) {
			const errors: Schema<'ValidationProblemDetails'> = { errors: { email: [emailError] } }
			return { status: 'bad_request', data: errors }
		}
		const passwordError = passwordValidation(form.password ?? '')
		if (passwordError) {
			return { status: 'bad_request', data: { errors: { password: [passwordError] } } }
		}
		try {
			const response = await $api('/auth', {
				method: 'POST',
				credentials: 'include',
				body: form,
			})
			if (!response.accessToken) {
				alert('login faild skill issue?')
				return { status: 'bad_request', data: { errors: { noToken: ['could not generate token'] } } }
			}
			await handleAuthSuccessResponse(response)
			await nextTick()
			return { status: 'success', data: undefined }
		}
		catch (err) {
			return handleApiFormError(err)
		}
	}

	async function register(form: Schema<'RegisterRequest'>): Promise<ApiFormResponse<undefined>> {
		if (form.username && form.username?.trim().length <= 0) {
			const errors: Schema<'ValidationProblemDetails'> = { errors: { username: ['The username cannot be empty'] } }
			return { status: 'bad_request', data: errors }
		}
		const emailError = emailValidation(form.email ?? '')
		if (emailError) {
			return { status: 'bad_request', data: { errors: { email: [emailError] } } }
		}
		const passwordError = passwordValidation(form.password ?? '')
		if (passwordError) {
			return { status: 'bad_request', data: { errors: { password: [passwordError] } } }
		}
		try {
			const response = await $api('/auth/register', {
				method: 'post',
				credentials: 'include',
				body: form,

			})
			return { status: 'success', data: response }
		}
		catch (err) {
			return handleApiFormError(err)
		}
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
		try {
			await $api('/auth/logout', {
				method: 'post',
				credentials: 'include',
				ignoreResponseError: true,
			})

			accessJWT.value = undefined // Nulstil accessJWT
			tokenExpiry.value = null // Nulstil token-udløbstidspunktet
			// await refreshAuthMe() // Opdater brugerdata efter logout
			await navigateTo('/auth')
		}
		catch (error) {
			console.error('Error occurred while logging out:', error)
		}
	}

	async function resendEmailConfirm() {
		try {
			if (!user.value?.email) return
			const response = await $api('/auth/email/request-confirmation', {
				method: 'POST',
				body: {
					email: user.value.email,
				},
			})
			console.log(response)
		}
		catch (err) {
			console.log('error', err)
		}
	}

	return {
		accessJWT: readonly(accessJWT),
		user: readonly(user),
		isLoggedIn,
		login,
		register,
		refresh,
		logout,
		resendEmailConfirm,
	}
})
