<template>
	<views-page-loading v-if="initialPending" />
	<div v-else>
		<layout-header
			:title="typeof connectionId == 'string' ? connectionId : ''"
			header="Directory list"
			description="Manage files"
		/>
		<table-card>
			<template #head>
				<div class="breadcrumbs text-sm select-none max-w-fit">
					<ul>
						<li>
							<a
								@click="changeDir('/')"
							>/</a>
						</li>
						<li
							v-for="(dir, index) in breadcrumbs"
							:key="index"
						>
							<a
								@click="changeDir(dir.fullPath)"
							>{{ dir.title }}</a>
						</li>
					</ul>
				</div>
				<button
					class="btn btn-active btn-sm ms-auto btn-square"
					lang="en"
					@click="showUploadModal"
				>
					<Icon
						name="material-symbols-light:add"
					/>
				</button>
				<!-- Maybe add share path? -->
			</template>
			<table class="table">
				<thead>
					<tr class="bg-base-200">
						<td>File name</td>
						<!-- <td>Updated</td> -->
						<td>Size</td>
						<td>Last modified</td>
						<td />
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(row, index) in sortedDataByIsDirectory"
						:key="index"
						class="table-row"
					>
						<td>
							<div class="flex flex-row gap-2 items-center">
								<Icon
									v-if="row.isDirectory"
									name="material-symbols-light:folder-outline-rounded"
									size="1.5rem"
								/>
								<Icon
									v-else
									name="material-symbols-light:draft-outline-rounded"
									size="1.5rem"
								/>
								{{ row.relativeName }}
							</div>
						</td>
						<!-- <td>Maybe the name of the user in the latest audit log?</td> -->
						<td>{{ (Number(row.size) / 1024).toFixed(2) }}mb</td>
						<td>{{ new Date(row.lastWriteTime).toUTCString() }}</td>
						<td v-if="!row.isDirectory">
							<button
								class="flex items-center justify-center"
								:popovertarget="`popover-row-${index}`"
								:style="{ anchorName: `--row-action-anchor-${index}` }"
								:disabled="false"
							>
								<Icon name="material-symbols-light:more-vert" />
							</button>

							<ul
								:id="`popover-row-${index}`"
								class="dropdown menu rounded-box bg-base-300 shadow-sm m-1 overflow-visible"
								popover
								:style="{ positionAnchor: `--row-action-anchor-${index}` }"
							>
								<li>
									<NuxtLink
										class="tooltip tooltip-left"
										data-tip="Open file in browser"
										:to="`/connection-${route.params.connection}/${encodeURIComponent(row.absoluteName)}`"
									>
										<Icon
											name="material-symbols-light:file-open-outline-rounded"
										/>
									</NuxtLink>
								</li>
								<li>
									<div
										class="tooltip tooltip-left"
										data-tip="Download file"
										@click="downloadFileDebounce(row.absoluteName)"
									>
										<Icon
											name="material-symbols-light:file-save-outline-rounded"
										/>
									</div>
								</li>
								<li>
									<div
										class="tooltip tooltip-left"
										data-tip="Delete file"
										@click="deleteFileDebounce(row)"
									>
										<Icon
											name="material-symbols-light:delete-outline-rounded"
											class="bg-red-400"
										/>
									</div>
								</li>
							</ul>
						</td>
						<td v-else>
							<button
								class="btn btn-sm btn-info btn-link"
								:disabled="false"
								@click="changeDir(row.absoluteName)"
							>
								View
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</table-card>
		<form-modal
			id="upload_files_modal"
			ref="upload-files-modal"
		>
			<card-form>
				<template #header>
					<h3>Upload file</h3>
				</template>
				<template #body>
					<form-input
						id="file-path"
						label="Path"
						info=""
						:errors="[]"
					>
						<input
							ref="upload-files-path-input"
							v-model="uploadPath"
							class="input input-md input-bordered outline-0"
							type="text"
							:disabled="pending"
						>
					</form-input>
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
		</form-modal>
	</div>
</template>

<!--
TODO
Rename connection
Create directory
-->
<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

definePageMeta({
	title: 'Connection',
	breadcrumbs: ['index', 'connections'],
})
const route = useRoute()
const router = useRouter()

const uploadModal = useTemplateRef('upload-files-modal')
const fileInput = useTemplateRef('upload-files-input')

const connectionId = computed(() => {
	try {
		return Number(`${route.params.connection}`)
	}
	catch (err) {
		console.log(err)
		return -1
	}
})
console.log(route.query.routePath)
const { list, initialPending, changeDir, currentDir, refreshList } = useSftpConnection(connectionId.value, `${route.query.routePath ?? '/home/fileodon'}`)
const { uploadFiles, downloadFile, deleteFile } = useSftpActions(connectionId.value)
const pending = useState('upload-files-pending', () => false)
const uploadPath = useState('form-file-upload-path', () => currentDir.value)

watchEffect(() => {
	router.replace({ path: route.path, query: { routePath: currentDir.value } })
})

const sortedDataByIsDirectory = computed(() => {
	const folders = list.value?.files?.filter(r => r.isDirectory === true) as Schema<'SFTPFileInfo'>[]
	const files = list.value?.files?.filter(r => r.isDirectory === false) as Schema<'SFTPFileInfo'>[]
	return [
		...(folders ?? []),
		...(files ?? []),
	] as Schema<'SFTPFileInfo'>[]
})

const breadcrumbs = computed(() => {
	console.log(currentDir.value)
	const splittet = currentDir.value.split('/').filter(x => x !== '')
	if (!splittet) return []
	function getFullPath(s: string, index: number) {
		let path = ''
		splittet?.forEach((s, i) => {
			if (i <= index)path += `/${s}`
		})
		return path
	}
	const breadcrumbItems = splittet
		.map((s, index) => ({
			title: s,
			fullPath: getFullPath(s, index),
		}
		))
	return breadcrumbItems
})

async function showUploadModal() {
	uploadPath.value = currentDir.value
	await nextTick()
	uploadModal.value?.show()
}

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
	await uploadFiles(files, uploadPath.value)
	uploadModal.value?.close()
	await refreshList()
	pending.value = false
}, 500)

const downloadFileDebounce = useDebounceFn(async (path: string) => {
	pending.value = true
	await downloadFile(path)
	pending.value = false
}, 500)
const deleteFileDebounce = useDebounceFn(async (row: Schema<'SFTPFileInfo'>) => {
	const confirm = window.confirm(`Are you sure you want to delete ${row.relativeName}?`)
	if (!confirm) return
	pending.value = true
	await deleteFile(row.absoluteName)
	await refreshList()
	pending.value = false
}, 500)
</script>

<style scoped>

</style>
