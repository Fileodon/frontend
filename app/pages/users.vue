<template>
	<div>
		<layout-header
			title="Users"
			header="Manage Users"
			description="Manage organisation users"
		/>
		<section
			id="stats"
			class="w-full h-fit flex flex-row"
		>
			<div class="stats connection-stat">
				<div class="stat">
					<div class="stat-title">
						Total users
					</div>
					<div class="stat-value font-normal">
						<p>{{ userOrganizationStore.organizationUsers?.length }}</p>
					</div>
					<div class="stat-desc">
						In Cool
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
					class="w-sm rounded-md border border-gray-600 px-2.5 outline-0 bg-black/35"
				>
				<div class="ml-auto">
					<button class="btn btn-soft btn-accent p-[0.6rem]">
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
								<!-- <forms-organization-user
									:user="user"
									:roles="mockRoles"
									@remove-user="removeUser"
									@save-changes="submitEditUser"
									@close="clearCurrentUserEdit"
								/> -->
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
		<!-- User edit modal -->
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'Users',
	breadcrumbs: ['index'],
})

const userOrganizationStore = useUserOrganizationStore()

const queryString = useState('users-query-string', () => '')

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

	// TODO submit edit via api
	clearCurrentUserEdit()
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
