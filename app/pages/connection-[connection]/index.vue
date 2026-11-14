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
				<!-- Maybe add share path? -->
			</template>
			<table class="table">
				<thead>
					<tr class="bg-base-200">
						<td>File name</td>
						<td>Updated</td>
						<td>Last modified</td>
						<td />
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(row, index) in sortedDataByIsDirectory"
						:key="index"
					>
						<td>
							<div class="flex flex-row gap-2 items-center">
								<Icon
									v-if="row.isDirectory"
									name="material-symbols-light:folder-outline-rounded"
									size="1rem"
								/>
								<Icon
									v-else
									name="material-symbols-light:draft-outline-rounded"
									size="1rem"
								/>
								{{ row.relativeName }}
							</div>
						</td>
						<td>Maybe the name of the user in the latest audit log?</td>
						<td>{{ new Date(row.lastWriteTime).toUTCString() }}</td>
						<td v-if="!row.isDirectory">
							<button
								class="flex items-center justify-center"
								:popovertarget="`popover-row-${index}`"
								:style="{ anchorName: `--row-action-anchor-${index}` }"
								:disabled="!row.hasAccess"
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
									<div
										class="tooltip tooltip-left"
										data-tip="Open file in browser"
									>
										<Icon
											name="material-symbols-light:file-open-outline-rounded"
										/>
									</div>
								</li>
								<li>
									<div
										class="tooltip tooltip-left"
										data-tip="Download file"
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
								:disabled="!row.hasAccess"

								@click="changeDir(row.absoluteName)"
							>
								View
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</table-card>
	</div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const connectionId = computed(() => {
	try {
		console.log(route.params)
		return Number(`${route.params.connection}`)
	}
	catch (err) {
		console.log(err)
		return -1
	}
})
console.log(route.query.routePath)
const { data, initialPending, changeDir, currentDir } = useSftpConnection(connectionId.value, `${route.query.routePath ?? '/home/fileodon'}`)

watchEffect(() => {
	router.replace({ path: route.path, query: { routePath: currentDir.value } })
})

const sortedDataByIsDirectory = computed(() => {
	const folders = data.value?.filter(r => r.isDirectory === true) as Schema<'SFTPActionListFilesResponse'>[]
	const files = data.value?.filter(r => r.isDirectory === false) as Schema<'SFTPActionListFilesResponse'>[]
	return [
		...(folders ?? []),
		...(files ?? []),
	] as Schema<'SFTPActionListFilesResponse'>[]
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
</script>

<style scoped>

</style>
