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
						<tr
							v-for="user in mockUsers"
							:key="user.id"
							class="hover:bg-gray-600/50"
						>
							<td>{{ user.username }}</td>
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
					</tbody>
				</table>
				<div class="flex flex-row align-center justify-between">
					<p class="text-gray-500">
						Showing {{ mockUsers.length }} out of {{ mockUsers.length }} users
					</p>
					<div class="join">
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
		<dialog
			id="user_edit_modal"
			ref="user_edit_modal"
			class="modal"
		>
			<div class="modal-box">
				<div v-if="currentUserEdit">
					<form
						class="flex flex-col gap-4"
						@submit.prevent="submitEditUser()"
					>
						<h3 class="text-lg font-bold">
							Currently managing {{ currentUserEdit.username }}
						</h3>
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
							>
								Submit changes
							</button>
							<button
								class="btn btn-sm btn-error"
								@click.prevent="removeUser"
							>
								Remove from organisation
							</button>
						</div>
					</form>
				</div>
				<div v-else>
					<p>Geting ready</p>
				</div>
			</div>
			<!-- closes modal on esc or click on backdrop -->
			<form
				method="dialog"
				class="modal-backdrop"
			>
				<button>
					Close
				</button>
			</form>
		</dialog>
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

const queryString = useState('users-query-string', () => '')

const userEditModal = useTemplateRef('user_edit_modal')
const currentUserEdit = useState<MockUser>('current-user-edit')
// TODO replace type here with the DTO form
const currentUserEditForm = useState<MockUser>()

async function editUser(user: MockUser) {
	currentUserEdit.value = { ...user }
	currentUserEditForm.value = { ...user }
	await nextTick()
	userEditModal.value?.showModal()
}

async function submitEditUser() {
	// TODO validate stuff maybe
	if (currentUserEdit.value === undefined) {
		alert('error tried to submit without edit set')
		return
	}

	const originaluserindex = mockUsers.value.findIndex(u => u.id === currentUserEdit.value?.id)
	mockUsers.value[originaluserindex] = currentUserEditForm.value
	userEditModal.value?.close()
}

async function removeUser() {
	if (currentUserEdit.value === undefined) {
		alert('error tried to remove without edit set')
		return
	}
	mockUsers.value = mockUsers.value.filter(u => u.id !== currentUserEdit.value.id)
	userEditModal.value?.close()
}
</script>

<style scoped></style>
