import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import ResetPasswordPage from '../../app/pages/auth/resetPassword.vue'

describe('Reset password page', () => {
    it('shows the reset instructions, email field, and link back to login', async () => {
        const wrapper = await mountSuspended(ResetPasswordPage, {
            route: '/auth/resetPassword',
        })

        expect(wrapper.get('h1').text()).toBe('Reset password')
        expect(wrapper.get('input[aria-label="Email"]').attributes('type')).toBe('email')
        expect(wrapper.text()).toContain('The link will be usable for 5 minutes.')
        expect(wrapper.get('button').text()).toBe('Reset')
        expect(wrapper.get('a[href="/auth"]').text()).toBe('Back to Login')
    })
})
