import { clearNuxtState, useState } from '#app'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'
import UsersPage, { type MockUser } from '../../app/pages/users.vue'

const UsersPageWithFreshState = defineComponent({
	setup() {
		clearNuxtState()
		useState<MockUser[]>('mock-users', () => []).value = [
			{ id: 101, username: 'Test Admin', role: { id: 1, name: 'admin' } },
			{ id: 102, username: 'Test Viewer', role: { id: 3, name: 'viewer' } },
		]
		useState<string[]>('mock-current-user-permissions', () => []).value = ['edit', 'view']
		return () => h(UsersPage)
	},
})

describe('Users page', () => {
	it('renders users, updates a role, and removes a user', async () => {
		const wrapper = await mountSuspended(UsersPageWithFreshState, {
			route: '/users',
		})

		expect(wrapper.findAll('#users-table tbody tr')).toHaveLength(4)
		expect(wrapper.text()).toContain('Test Admin')
		expect(wrapper.text()).toContain('admin')
		expect(wrapper.text()).toContain('Showing 2 out of 2 users')
		const editButtons = wrapper.findAll('#users-table tbody tr.resource-table-row button')
		expect(editButtons).toHaveLength(2)
		expect(editButtons.every(button => button.attributes('disabled') === undefined)).toBe(true)

		await editButtons[0]?.trigger('click')

		const editPanel = wrapper.get('#users-table tbody tr:nth-child(2)')
		expect(editPanel.get('h3').text()).toBe('Currently managing Test Admin')
		expect(editPanel.isVisible()).toBe(true)

		const roleSelect = wrapper.get('select')
		roleSelect.element.options[1]!.selected = true
		await roleSelect.trigger('change')
		await wrapper.get('#submit').trigger('click')

		expect(wrapper.findAll('#users-table tbody tr')[0]?.text()).toContain('editor')

		await wrapper.find('#users-table tbody tr.resource-table-row button').trigger('click')
		await wrapper.get('#users-table tbody tr:nth-child(2) .btn-error').trigger('click')

		expect(wrapper.findAll('#users-table tbody tr')).toHaveLength(2)
		expect(wrapper.get('#users-table tbody').text()).not.toContain('Test Admin')
		expect(wrapper.text()).toContain('Showing 1 out of 1 users')
	})
})
