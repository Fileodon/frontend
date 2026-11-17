<template>
	<div>
		<form-input
			id="file-name"
			label="Filename"
			info=""
			:errors="errors?.Filename"
		>
			<input
				v-model="dirtyObject"
				class="form-text-input"
				type="text"
				:disabled="pending"
			>
		</form-input>
		<button
			class="btn btn-warning mt-2"
			:disabled="!isDirty"
			@click="submitForm"
		>
			{{ submitBtnText }}
		</button>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	submitBtnText: string
	currentPath: string
	pending: boolean
	errors: Schema<'ValidationProblemDetails'>['errors']
}>()

const emit = defineEmits<{
	(e: 'submit', form: Schema<'SFTPActionRenameRequest'>): Promise<void>
}>()

const { dirtyObject, isDirty } = useForm(props.currentPath)

async function submitForm() {
	console.log('submit')
	await emit('submit', {
		oldRemoteFilePath: props.currentPath,
		newRemoteFilePath: dirtyObject.value,
	})
}
</script>

<style scoped>

</style>
