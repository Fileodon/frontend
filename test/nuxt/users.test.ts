import { clearNuxtState } from '#app'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'
import UsersPage from '../../app/pages/users.vue'

const UsersPageWithFreshState = defineComponent({
	setup() {
		clearNuxtState()
		return () => h(UsersPage)
	},
})

describe('Users page', () => {
	it('renders users, updates a role, and removes a user', async () => {
		const wrapper = await mountSuspended(UsersPageWithFreshState, {
			route: '/users',
		})

		expect(wrapper.findAll('#users-table tbody tr')).toHaveLength(5)
		expect(wrapper.text()).toContain('Jakob Espersen')
		expect(wrapper.text()).toContain('admin')
		expect(wrapper.text()).toContain('Showing 5 out of 5 users')
		const editButtons = wrapper.findAll('#users-table button')
		expect(editButtons).toHaveLength(5)
		expect(editButtons.every(button => button.attributes('disabled') === undefined)).toBe(true)

		await wrapper.findAll('#users-table button')[0]?.trigger('click')

		expect(wrapper.get('dialog h3').text()).toBe('Currently managing Jakob Espersen')

		const roleSelect = wrapper.get('select')
		roleSelect.element.options[1]!.selected = true
		await roleSelect.trigger('change')
		await wrapper.get('form.flex-col').trigger('submit')

		expect(wrapper.findAll('#users-table tbody tr')[0]?.text()).toContain('editor')
		expect(wrapper.find('dialog').attributes('open')).toBeUndefined()

		await wrapper.findAll('#users-table button')[0]?.trigger('click')
		await wrapper.get('.btn-error').trigger('click')

		expect(wrapper.findAll('#users-table tbody tr')).toHaveLength(4)
		expect(wrapper.get('#users-table tbody').text()).not.toContain('Jakob Espersen')
		expect(wrapper.text()).toContain('Showing 4 out of 4 users')
	})
})
