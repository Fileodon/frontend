import { defineStore } from 'pinia'
import { emailValidation } from '~/utils/validation/email'
import { passwordValidation } from '~/utils/validation/password'

// This store has the purpose of handling all interaction with auth endpoints, and provide authentification for the rest of the application.
export const useAuthStore = defineStore('auth', () => {
	const { $api } = useNuxtApp()
	const tokenExpiry = ref()
	// This is the short lived token
	const accessTokenCookie = useCookie('accessToken', {})
	// This is long lived and should be moved to httpOnly cookie.
	const refreshTokenCookie = useCookie('refreshToken', {
		refresh: true, // refreshed expiry every time refreshTokenCookie.value is set
		expires: tokenExpiry.value ?? new Date(Date.now() + 60 * 60 * 1000),
	})
	const accessJWTRef = ref<string | null | undefined>(accessTokenCookie.value)
	const refreshJWTRef = ref<string | null | undefined>(refreshTokenCookie.value)

	const accessJWT = computed({
		get: () => accessJWTRef.value,
		set: (val: string | null | undefined) => {
			accessTokenCookie.value = val
			accessJWTRef.value = val
		},
	})

	const refreshJWT = computed({
		get: () => refreshJWTRef.value,
		set: (val: string | null | undefined) => {
			refreshTokenCookie.value = val
			refreshJWTRef.value = val
		},
	})

	const { data: user } = useLazyApi('/api/auth/me', {
		server: false,
	})

	async function login(form: Schema<'LoginRequest'>) {
		const emailError = emailValidation(form.email ?? '')
		if (emailError) {
			return { errors: { email: emailError } }
		}
		const passwordError = passwordValidation(form.password ?? '')
		if (passwordError) {
			return { errors: { password: passwordError } }
		}
		const response = await $api('/api/auth', {
			method: 'POST',
			body: form,
		})
		if (!response.accessToken) {
			alert('login faild skill issue?')
			return
		}
		await handleAuthSuccessResponse(response)
	}

	async function register(form: Schema<'RegisterRequest'>) {
		if (form.username && form.username?.trim().length <= 0) {
			return { errors: { username: 'The username cannot be empty' } }
		}
		const emailError = emailValidation(form.email ?? '')
		if (emailError) {
			return { errors: { email: emailError } }
		}
		const passwordError = passwordValidation(form.password ?? '')
		if (passwordError) {
			return { errors: { password: passwordError } }
		}
		await $api('/api/auth/register', {
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
	}

	async function refresh() {
		if (!refreshJWT.value) return
		const response = await $api('/api/auth/refresh', {
			method: 'post',
			credentials: 'include',
			body: { refreshToken: refreshJWT.value },
		})
		await handleAuthSuccessResponse(response)
	}

	async function handleAuthSuccessResponse(response: Schema<'AuthResponse'>) {
		tokenExpiry.value = response.refreshTokenExpiresAt
		await nextTick() // make sure state is updated before we set new accessToken so that updated tokenExpiry is set on cookie
		accessJWT.value = response.accessToken
		refreshJWT.value = response.refreshToken
	}

	return {
		accessJWT: readonly(accessJWT),
		user: readonly(user),
		login,
		register,
		refresh,
	}
})
