<template>
	<div>
		<card-form>
			<template #header>
				<h3>Distribute files</h3>
			</template>
			<template #body>
				<form-input
					id="upload-files"
					label="Upload files"
					info=""
					:errors="[]"
				>
					<input
						ref="upload-files-input"
						class="file-input"
						type="file"
						multiple
						:disabled="pending"
					>
				</form-input>
				<form-input
					id="select-connections"
					label="Select target connections"
					info=""
					:errors="formErrors?.Orgs"
				>
					<select
						id="role-form-input-select"
						v-model="selectedConnections"
						:disabled="pending"
						multiple
						class="select "
					>
						<option
							v-for="connection in sftpConnectionStore.sftpConnections"
							:key="connection.id"
							:value="connection"
						>
							{{ connection.displayName }}
						</option>
					</select>
				</form-input>
				<form-input
					v-for="(connection, index) in form"
					id="path-inputs"
					:key="index"
					:label="selectedConnections.find(s => s.id === connection.sftpConnectionId)?.displayName ?? 'unknown'"
					info=""
					:errors="formErrors?.Locations"
				>
					<input
						v-model="form[index]!.remotePath"
						type="text"
						class="form-text-input"
					>
				</form-input>
				<button
					id="upload-files"
					class="btn btn-dash"
					:disabled="pending"
					@click="uploadFilesDebounce"
				>
					Upload
				</button>
			</template>
		</card-form>
	</div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const sftpConnectionStore = useSftpConnectionStore()

const pending = useState('upload-files-pending', () => false)
const fileInput = useTemplateRef('upload-files-input')
const formErrors = useState<Schema<'ValidationProblemDetails'>['errors']>('org-edit-form-errors')

const selectedConnections = useState<Schema<'BaseSFTPConnectionGetResponse'>[]>('selected-connections', () => [])
const connectionIds = computed(() => selectedConnections.value.map(c => c.id))
const form = useState<Schema<'SFTPActionDistributeLocation'>[]>('form', () => [])

watchEffect(() => {
	form.value = form.value.filter(f => connectionIds.value.find(id => id === f.sftpConnectionId))
	selectedConnections.value.forEach((con) => {
		if (!form.value.find(f => f.sftpConnectionId === con.id)) {
			form.value.push({
				sftpConnectionId: con.id,
				remotePath: '/home/fileodon/upload',
			})
		}
	})
})

const uploadFilesDebounce = useDebounceFn(async () => {
	pending.value = true
	if (!fileInput.value?.files || fileInput.value?.files.length <= 0) {
		alert('you havent chosen anything is this a bug?')
		return
	}
	const files: File[] = []
	for (let i = 0; i < fileInput.value?.files.length; i++) {
		if (!fileInput.value?.files?.item(i)) continue
		try {
			files.push(fileInput.value?.files?.item(i) as File)
		}
		catch (e) {
			console.log(e)
		}
	}
	await sftpConnectionStore.distributeFiles(files, form.value)
	// uploadModal.value?.close()
	// await refreshList()
	pending.value = false
}, 500)
</script>

<style scoped>

</style>
