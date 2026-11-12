<template>
	<div>
		<layout-header
			title="Roles"
			header="Manage organization roles"
			description="Manage roles in your organization"
		/>
		<section
			id="stats"
		>
			<div class="stats connection-stat">
				<div class="stat">
					<div class="stat-title">
						Total roles
					</div>
					<div class="stat-value font-normal">
						{{ mockRoles.length }}
					</div>
					<div class="stat-desc">
						The total amount of roles in "Orgname"
					</div>
				</div>
			</div>
			<div class="stats connection-stat">
				<div class="stat">
					<div class="stat-title">
						Custom roles
					</div>
					<div class="stat-value text-success font-normal">
						{{ mockRoles.filter(r => r.type == MockStatus.CUSTOM).length }}
					</div>
					<div class="stat-desc">
						Custom made roles
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
						Create new
						<!-- Syntes evt create new bare skal pushe en ny til in memory staten og så åbne edit? så hvis man trykker close eller remove bliver den bare ikke sendt? -->
					</button>
				</div>
			</template>
			<table class="resource-table">
				<thead>
					<tr>
						<td>Name</td>
						<td>Type</td>
						<td>Actions</td>
					</tr>
				</thead>
				<tbody>
					<template
						v-for="role in roleStore.roles"
						:key="role.id"
					>
						<tr class="resource-table-row">
							<td>
								{{ role.name }}
							</td>
							<td>
								{{ role.isSystemRole ? 'system' : 'custom' }}
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
							<td colspan="3">
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
definePageMeta({
	title: 'Roles',
	breadcrumbs: ['index'],
})

const roleStore = useRoleStore()

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

const queryString = useState('users-query-string', () => '')
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
