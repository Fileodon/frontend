import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AuthForm from '../../app/components/forms/auth.vue'

describe('AuthForm', () => {
	it('submits the login form values', async () => {
		const wrapper = await mountSuspended(AuthForm, {
			props: { errors: undefined },
		})

		expect(wrapper.text()).toContain('Welcome back')
		await wrapper.get('input[aria-label="Email"]').setValue('user@example.com')
		await wrapper.get('input[aria-label="Password"]').setValue('secret123')
		await wrapper.get('button.btn-primary').trigger('click')

		expect(wrapper.emitted('login')?.[0]?.[0]).toEqual({
			email: 'user@example.com',
			password: 'secret123',
		})
	})

	it('switches to registration and submits the registration form values', async () => {
		const wrapper = await mountSuspended(AuthForm, {
			props: { errors: undefined },
		})

		await wrapper.get('button[aria-pressed="false"]').trigger('click')

		expect(wrapper.text()).toContain('Create your account')
		await wrapper.get('input[aria-label="Username"]').setValue('new-user')
		await wrapper.get('input[aria-label="Email"]').setValue('new@example.com')
		await wrapper.get('input[aria-label="Password"]').setValue('secret123')
		await wrapper.get('input[aria-label="Confirm Password"]').setValue('secret123')
		await wrapper.get('button.btn-primary').trigger('click')

		expect(wrapper.emitted('register')?.[0]?.[0]).toEqual({
			username: 'new-user',
			email: 'new@example.com',
			password: 'secret123',
			confirmPassword: 'secret123',
		})
	})

	it('shows supplied validation errors', async () => {
		const wrapper = await mountSuspended(AuthForm, {
			props: { errors: { email: ['Email is invalid'] } },
		})

		expect(wrapper.get('[role="alert"]').text()).toContain('Email is invalid')
	})
})
