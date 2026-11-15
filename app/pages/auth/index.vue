<template>
	<div class="flex min-h-screen flex-1 flex-col items-center justify-center p-4">
		<auth-form
			ref="auth-form"
			:errors="errors"
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

const errors = ref<Record<string, string>>()
const form = useTemplateRef('auth-form')

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
	const result = await authStore.register(registerForm)
	errors.value = result.errors
}, 500)

const handleLogin = useDebounceFn(async (loginForm: Schema<'LoginRequest'>) => {
	const result = await authStore.login(loginForm)
	if (result.success) {
		return navigateTo('/test')
	}
	errors.value = result.errors
}, 500)
</script>

<style scoped></style>
