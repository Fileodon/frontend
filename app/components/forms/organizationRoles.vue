<template>
	<div class="flex flex-col gap-4">
		<div
			class="flex flex-row justify-between"
		>
			<h3
				v-if="role"
				class="text-lg font-bold"
			>
				Currently managing {{ role?.name }}
			</h3>
			<h3 v-else>
				Creating new role
			</h3>
			<button
				class="btn btn-xs rounded"
				@click="emit('close')"
			>
				close
			</button>
		</div>
		<div class="flex flex-col text-left">
			<form-input
				id="role-name"
				label="Name"
				info="Edit the name of the role"
				:errors="errors?.Name"
			>
				<input
					id="role-name"
					v-model="roleForm.name"
					type="text"
					placeholder="Editor"
					class="input input-bordered w-full outline-0 bg-base-300"
				>
			</form-input>
			<fieldset class="fieldset grid grid-cols-1 md:grid-cols-3  bg-base-100 border-base-300 rounded-box border p-4 w-full ">
				<legend class="fieldset-legend">
					Permissions
				</legend>
				<label
					v-for="(permission, index) in permissions"
					:key="index"
					class="label"
				>
					<input
						v-model="roleForm.permissions"
						type="checkbox"
						class="toggle toggle-accent"
						:value="permission"
					>
					{{ permission.name }}
				</label>
			</fieldset>
		</div>
		<div class="flex flex-row justify-between">
			<button
				class="btn btn-error"
				@click="emit('removeRole', roleForm)"
			>
				Delete role
			</button>
			<button
				class="btn btn-primary"
				@click="submitForm"
			>
				Save changes
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const { role, permissions } = defineProps<{
	role?: Schema<'GetRoleResponse'>
	permissions: Schema<'GetPermissionResponse'>[]
	errors: Schema<'ValidationProblemDetails'>['errors']
}>()

const { dirtyObject: roleForm } = useForm<Schema<'GetRoleResponse'>>(role ?? {
	id: '',
	name: '',
	permissionMask: 0,
	isSystemRole: false,
	permissions: [],
},
)

const emit = defineEmits<{
	submitRole: [role: Schema<'EditRoleRequest'>]
	createRole: [role: Schema<'CreateRoleRequest'>]
	removeRole: [role: Schema<'GetRoleResponse'>]
	close: []
}>()

async function submitForm() {
	if (!role) {
		const newRole: Schema<'CreateRoleRequest'> = {
			name: roleForm.value.name,
			permissionMask: roleForm.value.permissions.reduce((mask, permission) => mask | Number(permission.bitValue), 0),
		}
		emit('createRole', newRole)
	}
	else {
		const roleEdit: Schema<'EditRoleRequest'> = {
			id: roleForm.value.id,
			name: roleForm.value.name,
			permissionMask: roleForm.value.permissions.reduce((mask, permission) => mask | Number(permission.bitValue), 0),
		}
		emit('submitRole', roleEdit)
	}
}
</script>

<style scoped>

</style>
