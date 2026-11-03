<template>
	<div class="flex flex-col gap-4">
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
						<p>{{ mockUsers.length }}</p>
					</div>
					<div class="stat-desc">
						In this organization xxx
					</div>
				</div>
			</div>
		</section>
		<section
			id="table"
			class="card w-full h-fit border border-gray-600"
		>
			<div class="flex flex-col gap-4 h-fit m-2">
				<div class="flex flex-row">
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
				</div>
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
							v-for="user in mockUsers"
							:key="user.id"
						>
							<tr
								class="resource-table-row"
							>
								<td>{{ user.username }}</td>
								<td>{{ user.role?.name }}</td>
								<td>
									<button
										class="btn btn-sm btn-info"
										:disabled="!mockCurrentUserPermissions.includes('edit')"
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
										:roles="mockRoles"
										@remove-user="removeUser"
										@save-changes="submitEditUser"
										@close="clearCurrentUserEdit"
									/>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
				<div class="flex flex-row align-center justify-between">
					<p class="text-gray-500">
						Showing {{ mockUsers.length }} out of {{ mockUsers.length }} users
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
				</div>
			</div>
		</section>
		<!-- User edit modal -->
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'Users',
	breadcrumbs: ['index'],
})

export interface MockUser {
	id: number
	username: string
	role?: MockRole
}

export interface MockRole {
	id: number
	name: string
}

const mockRoles: MockRole[] = [
	{ id: 1, name: 'admin' },
	{ id: 2, name: 'editor' },
	{ id: 3, name: 'viewer' },
	{ id: 4, name: 'guest' },
]

const mockUsers = useState<MockUser[]>('mock-users', () => [
	{ id: 1, username: 'Jakob Espersen', role: mockRoles[0] },
	{ id: 2, username: 'Sebastian JenseN?', role: mockRoles[1] },
	{ id: 3, username: 'Tobias Tobiassen', role: mockRoles[1] },
	{ id: 4, username: 'Nicklas LobaDK', role: mockRoles[2] },
	{ id: 5, username: 'Flemming lære', role: mockRoles[3] },
])

const mockCurrentUserPermissions = useState<string[]>('mock-current-user-permissions', () => [
	'edit',
	'view',
])

const queryString = useState('users-query-string', () => '')

const currentUserEdit = useState<MockUser | undefined>('current-user-edit', () => undefined)

async function editUser(user: MockUser) {
	if (currentUserEdit.value?.id == user.id) {
		clearCurrentUserEdit()
		return
	}
	currentUserEdit.value = { ...user }
	await nextTick()
}

async function submitEditUser(user: MockUser) {
	// TODO validate stuff maybe
	if (currentUserEdit.value === undefined || user.id !== currentUserEdit.value.id) {
		alert('error tried to submit without edit set')
		return
	}

	if (user.id !== currentUserEdit.value.id) {
		return
	}

	const originaluserindex = mockUsers.value.findIndex(u => u.id === currentUserEdit.value?.id)
	if (!originaluserindex) {
		return
	}
	mockUsers.value[originaluserindex] = user
	clearCurrentUserEdit()
}

async function removeUser(user: MockUser) {
	if (currentUserEdit.value === undefined || user.id !== currentUserEdit.value.id) {
		alert('error tried to remove without edit set')
		return
	}

	mockUsers.value = mockUsers.value.filter(u => u.id !== user.id)
	clearCurrentUserEdit()
}

async function clearCurrentUserEdit() {
	currentUserEdit.value = undefined
}
</script>

<style scoped></style>
