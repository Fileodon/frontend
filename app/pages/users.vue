<template>
	<views-page-loading v-if="userOrganizationStore.pendingOrganizationUsers" />
	<div v-else>
		<layout-header
			title="Users"
			header="Manage Users"
			:description="`Manage ${organizationStore.currentOrganization?.orgName} users`"
		/>
		<section
			id="stats"
			class="w-full h-fit flex flex-row mb-4"
		>
			<div />
			<div class="stats">
				<div class="stat">
					<div class="stat-title">
						Total users
					</div>
					<div class="stat-value font-normal">
						<p>{{ userOrganizationStore.organizationUsers?.length }}</p>
					</div>
					<div class="stat-desc">
						In {{ organizationStore.currentOrganization?.orgName }}
					</div>
				</div>
			</div>
		</section>
		<table-card>
			<template #head>
				<input
					v-model="queryString"
					type="search"
					placeholder="Search..."
					class="w-sm input input-md input-bordered outline-0 bg-base-300"
				>
				<div class="ml-auto">
					<button
						class="btn btn-soft btn-accent p-[0.6rem]"
						@click="inviteModal?.show()"
					>
						<!-- <Icon name="material-symbols-light:add" /> --> Invite
					</button>
				</div>
			</template>
			<table
				id="users-table"
				class="resource-table"
			>
				<thead>
					<tr>
						<th>Username</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<template
						v-for="user in userOrganizationStore.organizationUsers"
						:key="user.id"
					>
						<tr
							class="resource-table-row"
						>
							<td>{{ user.userName }}</td>
							<td>{{ user.role?.name }}</td>
							<td>
								<button
									class="btn btn-sm btn-info"
									@click="editUser(user)"
								>
									Edit
								</button>
							</td>
						</tr>
						<tr
							v-show="currentUserEdit && currentUserEdit.id === user.id"
						>
							<td
								colspan="3"
							>
								<forms-organization-user
									:user="user"
									:roles="roleStore.roles ?? []"
									:errors="formErrors"
									@remove-user="removeUser"
									@save-changes="submitEditUser"
									@close="clearCurrentUserEdit"
								/>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
			<template #footer>
				<p class="text-gray-500">
					Showing {{ userOrganizationStore.organizationUsers?.length }} out of {{ userOrganizationStore.organizationUsers?.length }} users
				</p>
				<div class="join">
					<!-- TODO: Impementer pagination -->
					<button
						disabled
						class="join-item btn btn-sm btn-active"
					>
						1
					</button>
				</div>
			</template>
		</table-card>
		<form-modal
			id="invite_user_modal"
			ref="invite-user-modal"
		>
			<card-form>
				<template #header>
					<h3>Invite a user to your organization</h3>
				</template>
				<template #body>
					<forms-organization-user-invite
						ref="invite-user-form"
						:roles="roleStore.roles ?? []"
						:errors="formErrors"
						:pending="pending"
						@submit="inviteUser"
					/>
				</template>
			</card-form>
		</form-modal>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'Users',
	breadcrumbs: ['home'],
})

const inviteModal = useTemplateRef('invite-user-modal')
const inviteForm = useTemplateRef('invite-user-form')

const organizationStore = useOrganizationStore()
const userOrganizationStore = useUserOrganizationStore()
const roleStore = useRoleStore()

const queryString = useState('users-query-string', () => '')
const pending = useState('users-api-pending', () => false)
const formErrors = useState<Schema<'ValidationProblemDetails'>['errors']>('org-edit-form-errors')
const currentUserEdit = useState<Schema<'GetUserOrganizationResponse'> | undefined>('current-user-edit', () => undefined)

async function editUser(user: Schema<'GetUserOrganizationResponse'>) {
	if (currentUserEdit.value?.id == user.id) {
		clearCurrentUserEdit()
		return
	}
	currentUserEdit.value = { ...user }
	await nextTick()
}

async function submitEditUser(user: Schema<'EditUserOrganizationRequest'>) {
	// TODO validate stuff maybe
	if (currentUserEdit.value === undefined || user.id !== currentUserEdit.value.id) {
		alert('error tried to submit without edit set')
		return
	}

	if (user.id !== currentUserEdit.value.id) {
		return
	}

	pending.value = true
	const result = await userOrganizationStore.updateUserOrganization(user)
	if (result.status === 'bad_request') {
		formErrors.value = result.data.errors
		pending.value = false
		return
	}
	formErrors.value = undefined
	pending.value = false
	clearCurrentUserEdit()
}

async function inviteUser(invite: Schema<'CreateUserOrganizationRequest'>) {
	pending.value = true
	const result = await userOrganizationStore.inviteUser({
		...invite,
		organizationId: organizationStore.currentSelectedOrganizationId,
	})
	if (result.status === 'bad_request') {
		formErrors.value = result.data.errors
		pending.value = false
		return
	}
	inviteForm.value?.clearForm()
	formErrors.value = undefined
	pending.value = false
	inviteModal.value?.close()
}

async function removeUser(user: Schema<'GetUserOrganizationResponse'>) {
	if (currentUserEdit.value === undefined || user.id !== currentUserEdit.value.id) {
		alert('error tried to remove without edit set')
		return
	}

	// TODO Call api
	clearCurrentUserEdit()
}

async function clearCurrentUserEdit() {
	currentUserEdit.value = undefined
}
</script>

<style scoped></style>
