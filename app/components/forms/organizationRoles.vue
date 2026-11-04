<template>
	<div class="flex flex-col gap-4">
		<div
			class="flex flex-row justify-between"
		>
			<h3 class="text-lg font-bold">
				Currently managing {{ dirtyObject.name }}
			</h3>
			<button
				class="btn btn-xs rounded"
				@click="emit('close')"
			>
				close
			</button>
		</div>
		<fieldset class="fieldset grid grid-cols-1 md:grid-cols-3  bg-base-100 border-base-300 rounded-box border p-4 w-full ">
			<legend class="fieldset-legend">
				Permissions
			</legend>
			<label
				v-for="(p, index) in permissions"
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
		<div class="flex flex-row justify-between">
			<button
				class="btn btn-error"
				@click="emit('removeRole', dirtyObject)"
			>
				Delete role
			</button>
			<button
				class="btn btn-primary"
				@click="emit('submitRole', dirtyObject)"
			>
				Save changes
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { permission } from '~/pages/settings/roles/index.vue'
import type { MockRole } from '~/pages/users.vue'

const props = defineProps<{
	role: MockRole
	permissions: permission[]
}>()

const { dirtyObject } = useForm(props.role)

const emit = defineEmits<{
	submitRole: [role: MockRole]
	removeRole: [role: MockRole]
	close: []
}>()
</script>

<style scoped>

</style>
