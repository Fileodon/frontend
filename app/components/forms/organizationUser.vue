<template>
	<div
		class="flex flex-col gap-4 text-left"
	>
		<div
			class="flex flex-row justify-between"
		>
			<h3 class="text-lg font-bold">
				Currently managing {{ user.userName }}
			</h3>
			<button
				class="btn btn-xs rounded"
				@click="emit('close')"
			>
				close
			</button>
		</div>
		<div class="flex flex-col">
			<form-input
				id="role-form-input-select"
				label="Role"
				info=""
				:errors="undefined"
			>
				<select
					id="role-form-input-select"
					v-model="dirtyUser.role"
					class="select w-fit"
				>
					<option
						v-for="role in roles"
						:key="role.id"
						:value="role"
					>
						{{ role.name }}
					</option>
				</select>
			</form-input>
		</div>
		<!-- Reverse to have submit be on tab index before remove -->
		<div class="flex flex-row-reverse justify-between">
			<button
				id="submit"
				class="btn btn-sm btn-success"
				@click="submitForm"
			>
				Submit changes
			</button>
			<button
				class="btn btn-sm btn-error"
				@click="emit('removeUser', dirtyUser)"
			>
				Remove from organisation
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	user: Schema<'GetUserOrganizationResponse'>
	errors: Schema<'ValidationProblemDetails'>['errors'] | undefined
	roles: Schema<'GetRoleResponse'>[]
}>()

const emit = defineEmits<{
	removeUser: [user: Schema<'GetUserOrganizationResponse'>]
	saveChanges: [user: Schema<'EditUserOrganizationRequest'>] // Implementer her og på remove at den skal sende den korrekte DTO retur
	close: []
}>()

const { dirtyObject: dirtyUser } = useForm(props.user)

async function submitForm() {
	const edit: Schema<'EditUserOrganizationRequest'> = {
		id: dirtyUser.value.id,
		roleId: dirtyUser.value.role.id,
	}
	emit('saveChanges', edit)
}
</script>

<style scoped>

</style>
