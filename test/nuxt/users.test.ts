import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

const { organizationStore, roleStore, userOrganizationStore } = vi.hoisted(() => {
	const organizationStore = {
		currentOrganization: { id: 1, orgName: 'Test Org' },
		currentSelectedOrganizationId: 1,
		currentOrganizationPending: false,
	}
	const roleStore = {
		roles: [
			{ id: 1, name: 'admin' },
			{ id: 2, name: 'editor' },
			{ id: 3, name: 'viewer' },
		],
	}
	const userOrganizationStore = {
		organizationUsers: [
			{ id: 101, userName: 'Test Admin', role: { id: 1, name: 'admin' } },
			{ id: 102, userName: 'Test Viewer', role: { id: 3, name: 'viewer' } },
		],
		pendingOrganizationUsers: false,
		updateUserOrganization: vi.fn(async (user) => {
			const nextRole = roleStore.roles.find(role => role.id === user.roleId)
			const target = userOrganizationStore.organizationUsers.find(item => item.id === user.id)
			if (target && nextRole) {
				target.role = nextRole
			}
			return { status: 'success', data: target }
		}),
	}
	return { organizationStore, roleStore, userOrganizationStore }
})

vi.mock('../../app/stores/organizationStore', () => ({
	useOrganizationStore: () => organizationStore,
}))

vi.mock('../../app/stores/roleStore', () => ({
	useRoleStore: () => roleStore,
}))

vi.mock('../../app/stores/userOrganizationStore', () => ({
	useUserOrganizationStore: () => userOrganizationStore,
}))

import UsersPage from '../../app/pages/users.vue'

describe('Users page', () => {
	it('renders users and updates a role from the edit panel', async () => {
		userOrganizationStore.organizationUsers = [
			{ id: 101, userName: 'Test Admin', role: { id: 1, name: 'admin' } },
			{ id: 102, userName: 'Test Viewer', role: { id: 3, name: 'viewer' } },
		]
		userOrganizationStore.updateUserOrganization.mockClear()

		const wrapper = await mountSuspended(UsersPage, {
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

		expect(userOrganizationStore.updateUserOrganization).toHaveBeenCalledTimes(1)
		expect(wrapper.findAll('#users-table tbody tr')[0]?.text()).toContain('editor')
		expect(wrapper.text()).toContain('Showing 2 out of 2 users')
	})
})
