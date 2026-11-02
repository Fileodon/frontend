<template>
	<div class="flex flex-col gap-4">
		<div>
			<p class="text-gray-500 italic">
				Manage your organisations users
			</p>
		</div>
		<section
			id="stats"
		>
			<!-- Any stats? -->
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
					class="table bg-black/35 border border-gray-600 text-center"
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
								class="hover:bg-gray-600/50 "
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
								v-if="currentUserEditForm && currentUserEdit && currentUserEdit.id === user.id"
							>
								<td
									colspan="3"
								>
									<div
										class="flex flex-col gap-4 text-left"
									>
										<div class="flex flex-row justify-between">
											<h3 class="text-lg font-bold">
												Currently managing {{ currentUserEdit.username }}
											</h3>
											<button
												class="btn btn-xs rounded"
												@click="clearCurrentUserEdit()"
											>
												close
											</button>
										</div>
										<div class="flex flex-col">
											<label>
												Role
											</label>
											<select
												v-model="currentUserEditForm.role"
												class="select w-fit"
											>
												<option
													v-for="role in mockRoles"
													:key="role.id"
													:value="role"
												>
													{{ role.name }}
												</option>
											</select>
										</div>
										<!-- Reverse to have submit be on tab index before remove -->
										<div class="flex flex-row-reverse justify-between">
											<button
												id="submit"
												class="btn btn-sm btn-success"
												@click="submitEditUser"
											>
												Submit changes
											</button>
											<button
												class="btn btn-sm btn-error"
												@click="removeUser"
											>
												Remove from organisation
											</button>
										</div>
									</div>
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

interface MockUser {
	id: number
	username: string
	role?: MockRole
}

interface MockRole {
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
// TODO replace type here with the DTO form
const currentUserEditForm = useState<MockUser | undefined>('current-user-edit-form', () => undefined)

async function editUser(user: MockUser) {
	currentUserEdit.value = { ...user }
	currentUserEditForm.value = { ...user }
	await nextTick()
}

async function submitEditUser() {
	// TODO validate stuff maybe
	if (currentUserEdit.value === undefined || currentUserEditForm.value === undefined) {
		alert('error tried to submit without edit set')
		return
	}

	const originaluserindex = mockUsers.value.findIndex(u => u.id === currentUserEdit.value?.id)
	if (!originaluserindex) {
		return
	}
	mockUsers.value[originaluserindex] = currentUserEditForm.value
	clearCurrentUserEdit()
}

async function removeUser() {
	if (currentUserEdit.value === undefined || currentUserEditForm.value === undefined) {
		alert('error tried to remove without edit set')
		return
	}
	mockUsers.value = mockUsers.value.filter(u => u.id !== currentUserEdit.value?.id)
	clearCurrentUserEdit()
}

async function clearCurrentUserEdit() {
	currentUserEdit.value = undefined
	currentUserEditForm.value = undefined
}
</script>

<style scoped></style>
