<template>
	<div>
		<table-card>
			<template #head>
				<h1>something here</h1>
			</template>
			<table class="resource-table">
				<thead>
					<tr>
						<td>name</td>
						<td>Actions</td>
					</tr>
				</thead>
				<tbody>
					<template
						v-for="role in mockRoles"
						:key="role.id"
					>
						<tr class="resource-table-row">
							<td>
								{{ role.name }}
							</td>
							<td>
								<button
									class="btn btn-sm btn-info"
									@click="editUser(role)"
								>
									Edit
								</button>
							</td>
						</tr>
						<tr v-show="currentRoleEdit && currentRoleEdit.id === role.id ">
							<td colspan="2">
								<forms-organization-roles
									:role="role"
									:permissions="mockPermissions"
									@close="clearCurrentUserEdit"
									@submit-role="() => console.log('save role permissions')"
									@remove-role="() => console.log('remove role')"
								/>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
		</table-card>
	</div>
</template>

<script setup lang="ts">
enum MockStatus {
	SYSTEM = 'system',
	CUSTOM = 'custom',
}
export type permission = 'users.edit' | 'user.view' | 'connections.edit' | 'connections.view'
export interface MockRole {
	id: number
	name: string
	type: MockStatus
	user_count: number
	permissions: permission[]
}
const mockPermissions = useState<permission[]>('mock-permissions', () => [
	'users.edit',
	'user.view',
	'connections.edit',
	'connections.view',
])
const mockRoles: MockRole[] = [
	{ id: 1, name: 'admin', type: MockStatus.SYSTEM, user_count: 1, permissions: ['connections.edit', 'connections.view', 'user.view', 'users.edit'] },
	{ id: 2, name: 'editor', type: MockStatus.SYSTEM, user_count: 2, permissions: ['connections.edit', 'connections.view', 'user.view'] },
	{ id: 3, name: 'viewer', type: MockStatus.SYSTEM, user_count: 3, permissions: ['connections.view', 'user.view'] },
	{ id: 4, name: 'guest', type: MockStatus.CUSTOM, user_count: 0, permissions: [] },
]

const currentRoleEdit = useState<MockRole | undefined>('current-role-edit', () => undefined)

async function editUser(role: MockRole) {
	if (currentRoleEdit.value?.id == role.id) {
		clearCurrentUserEdit()
		return
	}
	currentRoleEdit.value = { ...role }
	await nextTick()
}

async function clearCurrentUserEdit() {
	currentRoleEdit.value = undefined
}
</script>

<style scoped>

</style>
