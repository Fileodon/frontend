<template>
	<div>
		<layout-header
			:title="name"
			header="File editor"
			description="Edit file content from your browser"
		/>
		<section
			id="overview"
			class="card w-full h-fit border border-base-300 bg-base-100 shadow-sm mt-5"
		>
			<button
				class="btn btn-soft btn-error w-xs"
				@click="returnToOverview"
			>
				Go back
			</button>
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

<script setup lang="ts">
import VueMonacoEditor from '@guolao/vue-monaco-editor'

definePageMeta({
	title: 'File editor',
	breadcrumbs: ['index', 'connection-connection'],
})

const route = useRoute()

const name = computed(() => String(route.params.path ?? 'File editor'))
useHead({
	title: name,
})

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
console.log(route.query.routePath)
const { content } = useSftpFile(connectionId.value, path.value)
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
</script>

<style scoped>

</style>
