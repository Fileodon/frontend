<template>
	<views-page-loading v-if="roleStore.rolesPending || !roleStore.roles" />
	<div v-else>
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
						{{ roleStore.roles?.length }}
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
						{{ roleStore.roles?.filter(r => r.isSystemRole === false).length }}
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
					<button
						class="btn btn-soft btn-accent p-[0.6rem]"
						@click="toggleCreateRole"
					>
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
									:disabled="role.isSystemRole"
									class="btn btn-sm btn-ghost btn-info"
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
									:errors="formErrors"
									:permissions="permissionStore.permissions ?? []"
									@close="clearCurrentUserEdit"
									@submit-role="updateRole"
									@remove-role="deleteRole"
								/>
							</td>
						</tr>
					</template>
					<tr v-show="creatingNewRole">
						<td colspan="3">
							<forms-organization-roles
								:errors="formErrors"
								:permissions="permissionStore.permissions ?? []"
								@close="toggleCreateRole"
								@create-role="createRole"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</table-card>
	</div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

definePageMeta({
	title: 'Roles',
	breadcrumbs: ['home', 'settings'],
})

const roleStore = useRoleStore()
const permissionStore = usePermissionStore()

const queryString = useState('users-query-string', () => '')
const currentRoleEdit = useState<Schema<'GetRoleResponse'> | null>('current-role-edit')
const pending = useState('role-api-pending', () => false)
const creatingNewRole = useState('creating-new-role', () => false)
const formErrors = useState<Schema<'ValidationProblemDetails'>['errors']>('org-edit-form-errors')

async function editUser(role: Schema<'GetRoleResponse'>) {
	if (currentRoleEdit.value?.id == role.id) {
		clearCurrentUserEdit()
		return
	}
	currentRoleEdit.value = { ...role }
	await nextTick()
}

async function clearCurrentUserEdit() {
	currentRoleEdit.value = null
}

async function toggleCreateRole() {
	creatingNewRole.value = !creatingNewRole.value
}

const createRole = useDebounceFn(async (newRole: Schema<'CreateRoleRequest'>) => {
	pending.value = true
	const result = await roleStore.createNewRole(newRole)
	if (result.status === 'bad_request') {
		formErrors.value = result.data.errors
	}
	toggleCreateRole()
	pending.value = false
}, 500)

const updateRole = useDebounceFn(async (editedRole: Schema<'EditRoleRequest'>) => {
	pending.value = true
	const result = await roleStore.updateRole(editedRole)
	if (result.status === 'bad_request') {
		formErrors.value = result.data.errors
	}
	clearCurrentUserEdit()
	pending.value = false
}, 500)

const deleteRole = useDebounceFn(async (deleteRole: Schema<'GetRoleResponse'>) => {
	pending.value = true
	const confirm = window.confirm(`Are you sure you  want to delete role "${deleteRole.name}"`)
	if (confirm === true) {
		await roleStore.deleteRole(deleteRole)
	}
	clearCurrentUserEdit()
	pending.value = false
}, 500)
</script>

<style scoped>

</style>
