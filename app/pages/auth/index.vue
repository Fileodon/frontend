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
import { passwordValidation } from '~/utils/validation/password'
import { AuthForm } from '#components'

definePageMeta({ layout: 'un-authenticated' })
const route = useRoute()

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

function handleRegister(registerForm: { username: string, email: string, password: string }) {
	console.log('Register form submitted:', registerForm)
	if (!registerForm) {
		errors.value = { form: 'Register form is not found!' }
		return
	}

	const emailError = validateEmail(registerForm.email)
	if (emailError) {
		errors.value = { email: emailError }
		return
	}

	const passwordError = passwordValidation(registerForm.password)
	if (passwordError) {
		errors.value = { password: passwordError }
		return
	}

	if (registerForm.username.trim().length < 0) {
		errors.value = { username: 'The username length must not be empty!' }
		return
	}
}

function handleLogin(loginForm: { email: string, password: string }) {
	console.log('Login form submitted:', loginForm)
	if (!loginForm) {
		errors.value = { form: 'Login form is not found!' }
		return
	}
	const emailError = validateEmail(loginForm.email)
	if (emailError) {
		errors.value = { email: emailError }
		return
	}

	const passwordError = passwordValidation(loginForm.password)
	if (passwordError) {
		errors.value = { password: passwordError }
		return
	}
}

function validateEmail(email: string): (string | null | undefined) {
	if (!email || email.trim().length == 0) {
		return 'Email input must not be empty!'
	}

	if (!email.includes('@')) {
		return 'Email must contain \'@\'!'
	}

	if (!email.includes('.')) {
		return 'Email must contain \'.\'!'
	}
}
</script>

<style scoped></style>
