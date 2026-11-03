<template>
	<div
		class="flex flex-col gap-4 text-left"
	>
		<div
			class="flex flex-row justify-between"
		>
			<h3 class="text-lg font-bold">
				Currently managing {{ dirtyUser.username }}
			</h3>
			<button
				class="btn btn-xs rounded"
				@click="emit('close')"
			>
				close
			</button>
		</div>
		<div class="flex flex-col">
			<label>
				Role
			</label>
			<select
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
		</div>
		<!-- Reverse to have submit be on tab index before remove -->
		<div class="flex flex-row-reverse justify-between">
			<button
				id="submit"
				class="btn btn-sm btn-success"
				@click="emit('saveChanges', dirtyUser)"
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
import type { MockRole, MockUser } from '~/pages/users.vue'

const props = defineProps<{
	user: MockUser
	roles: MockRole[]
}>()

const emit = defineEmits<{
	removeUser: [user: MockUser]
	saveChanges: [user: MockUser] // Implementer her og på remove at den skal sende den korrekte DTO retur
	close: []
}>()

const { dirtyObject: dirtyUser } = useForm(props.user)

onUnmounted(() => {
	console.log('unmounting organizationUsers')
})

watchEffect(() => {
	console.log(props)
})
</script>

<style scoped>

</style>
