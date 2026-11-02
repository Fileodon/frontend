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
						</tr>
						<tr>
							<td colspan="1">
								<fieldset class="fieldset grid grid-cols-1 md:grid-cols-3  bg-base-100 border-base-300 rounded-box border p-4 w-full ">
									<legend class="fieldset-legend">
										Permissions
									</legend>
									<label
										v-for="(p, index) in mockPermissions"
										:key="index"
										class="label"
									>
										<input
											type="checkbox"
											:checked="true"
											class="toggle toggle-accent"
										>
										{{ p }}
									</label>
								</fieldset>
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
type permission = 'users.edit' | 'user.view' | 'connections.edit' | 'connections.view'
interface MockRole {
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
</script>

<style scoped>

</style>
