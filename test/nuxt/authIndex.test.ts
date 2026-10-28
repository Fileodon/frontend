import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AuthPage from '../../app/pages/auth/index.vue'

describe('Auth page', () => {
    it('shows the login form by default', async () => {
        const wrapper = await mountSuspended(AuthPage, {
            route: '/auth',
        })

        expect(wrapper.find('input[aria-label="Email"]').exists()).toBe(true)
        expect(wrapper.find('input[aria-label="Password"]').exists()).toBe(true)
        expect(wrapper.find('input[aria-label="Username"]').exists()).toBe(false)
    })

    it('shows the registration form when the register query is true', async () => {
        const wrapper = await mountSuspended(AuthPage, {
            route: '/auth?register=true',
        })

        expect(wrapper.find('input[aria-label="Username"]').exists()).toBe(true)
        expect(wrapper.find('input[aria-label="Email"]').exists()).toBe(true)
        expect(wrapper.find('input[aria-label="Password"]').exists()).toBe(true)
    })
})
