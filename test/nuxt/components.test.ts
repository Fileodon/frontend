import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import CardForm from '../../app/components/card-form.vue'
import DangerZone from '../../app/components/danger-zone.vue'
import FormInput from '../../app/components/form-input.vue'
import FormModal from '../../app/components/form-modal.vue'
import InfoField from '../../app/components/InfoField.vue'
import TableCard from '../../app/components/tableCard.vue'
import OrganizationForm from '../../app/components/forms/organization.vue'
import OrganizationRolesForm from '../../app/components/forms/organizationRoles.vue'
import OrganizationUserForm from '../../app/components/forms/organizationUser.vue'
import OrganizationUserInviteForm from '../../app/components/forms/organization-user-invite.vue'
import RenameFileForm from '../../app/components/forms/rename-file.vue'
import SftpConnectionForm from '../../app/components/forms/sftp-connection.vue'
import PageLoading from '../../app/components/views/page-loading.vue'
import Footer from '../../app/components/layout/footer.vue'
import Header from '../../app/components/layout/header.vue'
import UnauthenticatedHeader from '../../app/components/layout/unauthenticatedHeader.vue'

describe('shared components', () => {
	it('renders card form header and body slots', async () => {
		const wrapper = await mountSuspended(CardForm, {
			slots: {
				header: '<h2>Sign in</h2>',
				body: '<p>Enter your details</p>',
			},
		})

		expect(wrapper.get('h2').text()).toBe('Sign in')
		expect(wrapper.get('section').text()).toContain('Enter your details')
	})

	it('renders a danger zone title and slot content', async () => {
		const wrapper = await mountSuspended(DangerZone, {
			slots: { default: '<button>Delete account</button>' },
		})

		expect(wrapper.get('h3').text()).toBe('Danger zone')
		expect(wrapper.get('button').text()).toBe('Delete account')
	})

	it('renders form input label, info, slot, and validation errors', async () => {
		const wrapper = await mountSuspended(FormInput, {
			props: {
				id: 'email',
				label: 'Email',
				info: 'Use your work email',
				errors: ['Email is required'],
			},
			slots: { default: '<input id="email" type="email">' },
		})

		expect(wrapper.get('label').text()).toContain('Email')
		expect(wrapper.get('input').attributes('type')).toBe('email')
		expect(wrapper.text()).toContain('Use your work email')
		expect(wrapper.get('[role="alert"]').text()).toBe('Email is required')
	})

	it('renders a modal with the supplied id and content', async () => {
		const wrapper = await mountSuspended(FormModal, {
			props: { id: 'confirm-modal' },
			slots: { default: '<p>Confirm this action</p>' },
		})

		expect(wrapper.get('dialog').attributes('id')).toBe('confirm-modal')
		expect(wrapper.text()).toContain('Confirm this action')
	})

	it('renders an info field and optional description', async () => {
		const wrapper = await mountSuspended(InfoField, {
			props: {
				label: 'Connection ID',
				info: 'connection-123',
				description: 'Use this ID when configuring the CLI',
			},
		})

		expect(wrapper.text()).toContain('Connection ID')
		expect(wrapper.text()).toContain('connection-123')
		expect(wrapper.text()).toContain('Use this ID when configuring the CLI')
	})

	it('renders table header, body, and footer slots', async () => {
		const wrapper = await mountSuspended(TableCard, {
			slots: {
				head: '<span>Name</span>',
				default: '<p>Example row</p>',
				footer: '<button>Next</button>',
			},
		})

		expect(wrapper.get('#table').text()).toContain('Name')
		expect(wrapper.text()).toContain('Example row')
		expect(wrapper.get('button').text()).toBe('Next')
	})
})

describe('form components', () => {
	it('submits updated organization details', async () => {
		const wrapper = await mountSuspended(OrganizationForm, {
			props: {
				title: 'Create organization',
				subtitle: 'Set up your workspace',
				submitBtnText: 'Create',
				pending: false,
				errors: undefined,
			},
		})

		await wrapper.get('#organization-name').setValue('Example team')
		await wrapper.get('#workspace-url').setValue('example-team')
		await wrapper.get('#contact-email').setValue('team@example.com')
		await wrapper.get('button[type="submit"]').trigger('click')

		expect(wrapper.emitted('submit')?.[0]?.[0]).toEqual({
			orgName: 'Example team',
			workspaceURL: 'example-team',
			contactEmail: 'team@example.com',
		})
	})

	it('submits an invitation with the selected role', async () => {
		const wrapper = await mountSuspended(OrganizationUserInviteForm, {
			props: {
				errors: undefined,
				roles: [{ id: 'role-1', name: 'Member' }],
				pending: false,
			},
		})

		await wrapper.get('input[type="email"]').setValue('member@example.com')
		await wrapper.get('select').setValue('role-1')
		await wrapper.get('button').trigger('click')

		expect(wrapper.emitted('submit')?.[0]?.[0]).toEqual({
			email: 'member@example.com',
			roleId: 'role-1',
			organizationId: -1,
		})
	})

	it('emits old and new paths when renaming a file', async () => {
		const wrapper = await mountSuspended(RenameFileForm, {
			props: {
				submitBtnText: 'Rename',
				currentPath: '/files/old.txt',
				pending: false,
				errors: undefined,
			},
		})

		await wrapper.get('input').setValue('/files/new.txt')
		await wrapper.get('button').trigger('click')

		expect(wrapper.emitted('submit')?.[0]?.[0]).toEqual({
			oldRemoteFilePath: '/files/old.txt',
			newRemoteFilePath: '/files/new.txt',
		})
	})

	it('emits the updated SFTP connection name', async () => {
		const wrapper = await mountSuspended(SftpConnectionForm, {
			props: {
				submitBtnText: 'Save',
				sftpConnection: { id: 1, displayName: 'Original name' },
				pending: false,
				errors: undefined,
			},
		})

		await wrapper.get('input').setValue('Updated name')
		await wrapper.get('button').trigger('click')

		expect(wrapper.emitted('submit')?.[0]?.[0]).toEqual({
			displayName: 'Updated name',
			port: null,
		})
	})

	it('creates a role with the selected permissions', async () => {
		const wrapper = await mountSuspended(OrganizationRolesForm, {
			props: {
				permissions: [{ name: 'Read files', bitValue: '2' }],
				errors: undefined,
			},
		})

		await wrapper.get('input[type="text"]').setValue('Reader')
		await wrapper.get('input[type="checkbox"]').setValue(true)
		await wrapper.get('button.btn-primary').trigger('click')

		expect(wrapper.emitted('createRole')?.[0]?.[0]).toEqual({
			name: 'Reader',
			permissionMask: 2,
		})
	})

	it('emits role changes for an organization user', async () => {
		const wrapper = await mountSuspended(OrganizationUserForm, {
			props: {
				user: {
					id: 7,
					userName: 'Alex',
					role: { id: 'role-1', name: 'Member' },
				},
				errors: undefined,
				roles: [
					{ id: 'role-1', name: 'Member' },
					{ id: 'role-2', name: 'Admin' },
				],
			},
		})

		const roleSelect = wrapper.get('select')
		roleSelect.element.options[1]!.selected = true
		await roleSelect.trigger('change')
		await wrapper.get('#submit').trigger('click')

		expect(wrapper.emitted('saveChanges')?.[0]?.[0]).toEqual({
			id: 7,
			roleId: 'role-2',
		})
	})
})

describe('layout components', () => {
	it('renders the page loading indicator', async () => {
		const wrapper = await mountSuspended(PageLoading)

		expect(wrapper.get('.loading').exists()).toBe(true)
	})

	it('renders the layout heading content', async () => {
		const wrapper = await mountSuspended(Header, {
			props: {
				title: 'Settings',
				header: 'Organization settings',
				description: 'Manage your workspace',
			},
		})

		expect(wrapper.text()).toContain('Settings')
		expect(wrapper.text()).toContain('Organization settings')
		expect(wrapper.text()).toContain('Manage your workspace')
	})

	it('renders login and sign-up navigation', async () => {
		const wrapper = await mountSuspended(UnauthenticatedHeader)
		const links = wrapper.findAll('a')

		expect(links.map(link => link.text())).toEqual(['Log in', 'Sign up'])
		expect(links.map(link => link.attributes('href'))).toEqual([
			'/auth',
			'/auth?register=true',
		])
	})

	it('renders footer policy and account links', async () => {
		const wrapper = await mountSuspended(Footer)

		expect(wrapper.text()).toContain('Policies')
		expect(wrapper.text()).toContain('Cookie')
		expect(wrapper.text()).toContain('Login')
		expect(wrapper.text()).toContain('Register')
	})
})
