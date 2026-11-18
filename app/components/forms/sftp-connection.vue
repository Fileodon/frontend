<template>
	<div>
		<form-input
			id="conenction-display-name"
			label="Connection name"
			info=""
			:errors="errors?.DisplayName"
		>
			<input
				v-model="dirtyObject.displayName"
				class="form-text-input"
				type="text"
				:disabled="pending"
			>
		</form-input>
		<button
			class="btn btn-warning mt-2"
			:disabled="!isDirty || pending"
			@click="submitForm"
		>
			{{ submitBtnText }}
		</button>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	submitBtnText: string
	sftpConnection: Schema<'BaseSFTPConnectionGetResponse'>
	pending: boolean
	errors: Schema<'ValidationProblemDetails'>['errors']
}>()

const emit = defineEmits<{
	(e: 'submit', form: Schema<'SFTPConnectionUpdateRequest'>): Promise<void>
}>()

const { dirtyObject, isDirty } = useForm(props.sftpConnection)

async function submitForm() {
	const form: Schema<'SFTPConnectionUpdateRequest'> = {
		displayName: dirtyObject.value.displayName,
		port: null,
	}
	await emit('submit', form)
}
</script>

<style scoped>

</style>
