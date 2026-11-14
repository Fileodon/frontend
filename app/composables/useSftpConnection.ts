export default function useSftpConnection(sftpConnectionId: Schema<'BaseSFTPConnectionGetResponse'>['id'], initialDir: string) {
	const { $api } = useNuxtApp()

	const organizationStore = useOrganizationStore()
	const orgId = computed(() => organizationStore.currentSelectedOrganizationId)

	const currentDir = ref<string>(initialDir)

	const { data, error, status, refresh: refreshList, pending: sftpConnectionsPending } = useLazyApi('/organization/{organizationid}/sftpaction/{sftpconnectionid}/list',
		{
			method: 'get',
			path: {
				sftpconnectionid: sftpConnectionId,
				organizationid: orgId,
			},
			query: {
				RemoteDirectoryPath: currentDir,
			},
			// server: false,
			retry: false,
			watch: [currentDir],
			// immediate: false
		},
	)

	watchEffect(() => console.log(data.value))

	function changeDir(dir?: string | null) {
		if (!dir) return
		currentDir.value = dir
	}

	async function uploadFiles(files: File[]) {
		try {
			const response = await $api('/organization/{organizationid}/sftpaction/{sftpconnectionid}/upload', {
				method: 'post',
				path: {
					sftpconnectionid: sftpConnectionId,
					organizationid: orgId.value,
				},
				body: {
					Files: files.map(file => file.name),
					RemoteFilePaths: '',
				},
				bodySerializer() {
					const formRequest = new FormData()
					for (const file of files) {
						formRequest.append('Files', file)
						formRequest.append('RemoteFilePaths', `${currentDir.value}/${file.name}`)
					}
					return formRequest
				},
			})
			console.log('Maybe listen to', response.jobId)
			refreshList()
		}
		catch (err) {
			return err
		}
	}

	// function editFile(file: Schema<'IFormFile'>) {
	// 	alert('asdsd')
	// }

	// function viewFile(file: Schema<'IFormFile'>) {

	// }

	// function downloadFile(file: ISftpFile) {

	// }

	// async function deleteFile(file: Schema<'IFormFile'>) {
	// 	// const confirm = window.confirm(`Are you sure you want to delete ${file.fullName}?`)
	// }

	return {
		data,
		error,
		status,
		changeDir,
		currentDir,
		// editFile,
		// viewFile,
		uploadFiles,
		refreshList,
		initialPending: computed(() => organizationStore.userOrganizationsPending || (sftpConnectionsPending.value && !data.value)),
		sftpConnectionsPending,
		// downloadFile,
		// deleteFile,
	}
}
