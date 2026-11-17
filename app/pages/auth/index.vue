<template>
	<div class="flex min-h-screen flex-1 flex-col items-center justify-center p-4">
		<auth-form
			ref="auth-form"
			:errors="formErrors"
			:pending="pending"
			@register="handleRegister"
			@login="handleLogin"
		/>
	</div>
</template>

<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'

definePageMeta({
	layout: 'un-authenticated',
	middleware: ['guest'],
})
const route = useRoute()

const authStore = useAuthStore()

const form = useTemplateRef('auth-form')
const pending = useState('auth-pending', () => false)
const formErrors = useState<Schema<'ValidationProblemDetails'>['errors']>('org-create-form-errors')

watch([() => route.query, form], ([newQuery, newForm]) => {
	if (!newForm) return
	const register = newQuery.register === 'true'
	if (register) {
		newForm.setView(false)
	}
	else {
		newForm.setView(true)
	}
}, { deep: true })

const handleRegister = useDebounceFn(async (registerForm: Schema<'RegisterRequest'>) => {
	pending.value = true
	const result = await authStore.register(registerForm)
	if (result.status === 'success') {
		form.value?.resetForm()
		return navigateTo('/auth', { replace: true })
	}
	if (result.status === 'bad_request') {
		formErrors.value = result.data.errors
	}
	pending.value = false
}, 500)

const handleLogin = useDebounceFn(async (loginForm: Schema<'LoginRequest'>) => {
	pending.value = true
	const result = await authStore.login(loginForm)
	if (result.status === 'success') {
		form.value?.resetForm()
		return navigateTo('/test')
	}
	if (result.status === 'bad_request') {
		formErrors.value = result.data.errors
	}
	pending.value = false
}, 500)
</script>

<style scoped></style>
