<template>
	<div>
		<button
			class="btn btn-soft btn-link"
			@click="returnToOverview"
		>
			{{ "<-Go back" }}
		</button>
		<layout-header
			:title="name"
			header="File editor"
			description="Edit file content from your browser"
		/>
		<section
			id="fil-content"
		>
			<button
				class="btn btn-outline btn-sm mb-8"
				@click="editName = !editName"
			>
				{{ editName ? 'Exit' : 'Rename' }}
				<Icon
					name="material-symbols-light:edit-square-outline-rounded"
				/>
			</button>
			<forms-rename-file
				v-if="editName"
				submit-btn-text="Rename File"
				:current-path="`${route.params.path}`"
				:pending="pending"
				:errors="formErrors"
				@submit="renameFileDebounce"
			/>
			<info-field
				v-else
				label="File name"
				:info="fileName"
			/>
			<div class="divider" />
			<div class="flex flex-row gap-2">
				<button
					class="btn btn-outline btn-error btn-lg me-auto"
					:disabled="pending"
					@click="deleteFileDebounce"
				>
					<Icon
						name="material-symbols-light:delete-outline-rounded"
						size="2rem"
					/>
					<h5>
						Delete
					</h5>
				</button>
				<button
					class="btn btn-outline btn-lg"
					:disabled="pending"
					@click="downloadFileDebounce"
				>
					<Icon
						name="material-symbols-light:file-save-outline-rounded"
						size="2rem"
					/>
					<h5>
						Download
					</h5>
				</button>
				<button
					class="btn btn-outline btn-success btn-lg"
					:disabled="pending"
					@click="saveChangesToFile"
				>
					<Icon
						name="material-symbols-light:upload-rounded"
						size="2rem"
					/>
					<h5>
						Save changes
					</h5>
				</button>
			</div>
		</section>
		<section
			id="file edit"
			class="card w-full h-fit border border-base-300 bg-base-100 shadow-sm mt-5"
		>
			<section
				id="table"
				class="flex-1 h-full bg-black/35 border-gray-600 border m-2"
			>
				<VueMonacoEditor
					v-model:value="editCode"
					theme="vs-dark"
					height="70vh"
					@mount="handleEditorMount"
				/>
			</section>
		</section>
	</div>
</template>

<!--
TODO
Rename file
Download
upload with overwrite
Delete file
-->
<script setup lang="ts">
import VueMonacoEditor from '@guolao/vue-monaco-editor'
import { useDebounceFn } from '@vueuse/core'

definePageMeta({
	title: 'File editor',
	breadcrumbs: ['index', 'connection-connection'],
})

const route = useRoute()

const name = computed(() => String(route.params.path ?? 'File editor'))
useHead({
	title: name,
})

const editName = useState('edit-filename-toggle', () => false)
const editCode = useState(`edit-code-path-${route.params.path}`, () => '')

const connectionId = computed(() => {
	try {
		return Number(`${route.params.connection}`)
	}
	catch (err) {
		console.log(err)
		return -1
	}
})
const path = computed(() => `${route.params.path}`)
const pending = useState('org-create-pending', () => false)
const formErrors = useState<Schema<'ValidationProblemDetails'>['errors']>('org-create-form-errors')

const { content, fileName, refreshFile } = useSftpFile(connectionId.value, path.value)
const { deleteFile, downloadFile, renameFile, uploadFiles } = useSftpActions(connectionId.value)

watchEffect(() => editCode.value = content.value as string) // kind of a hack, fordi respons typen er forkert.

function returnToOverview() {
	navigateTo(`/connection-${route.params.connection}`)
}

function handleEditorMount(
	editor: import('monaco-editor').editor.IStandaloneCodeEditor,
	monaco: typeof import('monaco-editor'),
) {
	const fileName = String(route.params.name ?? '')
	const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase()

	const language = monaco.languages.getLanguages().find(({ extensions }) =>
		extensions?.some(ext => ext.toLowerCase() === extension),
	)

	const model = editor.getModel()
	if (language && model) {
		monaco.editor.setModelLanguage(model, language.id)
	}
}

const deleteFileDebounce = useDebounceFn(async () => {
	const confirm = window.confirm(`Are you sure you want to delete ${fileName.value}?`)
	if (!confirm) return
	pending.value = true
	await deleteFile(path.value)
	returnToOverview()
	pending.value = false
}, 500)

const downloadFileDebounce = useDebounceFn(async () => {
	pending.value = true
	await downloadFile(path.value)
	pending.value = false
}, 500)

const renameFileDebounce = useDebounceFn(async (form: Schema<'SFTPActionRenameRequest'>) => {
	pending.value = true
	const result = await renameFile(form)
	if (result.status === 'bad_request') {
		formErrors.value = result.data.errors
	}
	editName.value = false
	navigateTo(`/connection-${route.params.connection}/${encodeURIComponent(form.newRemoteFilePath)}`)
	pending.value = false
}, 500)

const saveChangesToFile = useDebounceFn(async () => {
	pending.value = true
	const file = new File([editCode.value], fileName.value, {
		type: 'text/plain',
	})
	console.log(editCode.value, name.value)
	await uploadFiles([file], name.value, true)
	await refreshFile()
	pending.value = false
}, 500)
</script>

<style scoped>

</style>
