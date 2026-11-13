<template>
	<div>
		<form class="flex flex-col gap-4">
			<form-input
				id="invite-form-email"
				label="Email"
				info=""
				:errors="errors?.Email"
			>
				<input
					v-model="inviteForm.email"
					type="email"
					class="input input-md input-bordered w-full outline-0 bg-base-300"

					placeholder="user@fileodon.dev"
				>
			</form-input>
			<form-input
				id="role-form-input-select"
				label="Role"
				info=""
				:errors="errors?.RoleId"
			>
				<select
					id="role-form-input-select"
					v-model="inviteForm.roleId"
					class="select w-fit"
				>
					<option
						v-for="role in roles"
						:key="role.id"
						:value="role.id"
					>
						{{ role.name }}
					</option>
				</select>
			</form-input>
			<div class="flex justify-end">
				<button
					class="btn btn-soft btn-accent"
					@click.prevent="submit"
				>
					Invite
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	errors: Schema<'ValidationProblemDetails'>['errors'] | undefined
	roles: Schema<'GetRoleResponse'>[]
	pending: boolean
}>()
const emit = defineEmits<{
	(e: 'submit', form: Schema<'CreateUserOrganizationRequest'>): Promise<void>
}>()
const { dirtyObject: inviteForm } = useForm<Schema<'CreateUserOrganizationRequest'>>({
	email: '',
	roleId: '',
	organizationId: -1,
})

async function submit() {
	await emit('submit', inviteForm.value)
}
</script>

<style scoped>

</style>
