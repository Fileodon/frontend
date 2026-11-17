export default function useSftpConnection(sftpConnectionId: Schema<'BaseSFTPConnectionGetResponse'>['id'], initialDir: string) {
	// const { $api } = useNuxtApp()

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
		console.log(dir)
		currentDir.value = dir
	}

	// async function uploadFiles(files: FileList, basePath: string): Promise<ApiFormResponse<Schema<'SFTPActionUploadResponse'>>> {
	// 	try {
	// 		const file: File[] = []
	// 		for (let i = 0; i < files.length; i++) {
	// 			if (!files?.item(i)) continue
	// 			try {
	// 				file.push(files?.item(i) as File)
	// 			}
	// 			catch (e) {
	// 				console.log(e)
	// 			}
	// 		}
	// 		const response = await $api('/organization/{organizationid}/sftpaction/{sftpconnectionid}/upload', {
	// 			method: 'post',
	// 			path: {
	// 				sftpconnectionid: sftpConnectionId,
	// 				organizationid: orgId.value,
	// 			},
	// 			body: {
	// 				Files: file.map(file => file.name),
	// 				RemoteFilePaths: basePath,
	// 			},
	// 			bodySerializer() {
	// 				const formRequest = new FormData()
	// 				for (const file of files) {
	// 					formRequest.append('Files', file)
	// 					formRequest.append('RemoteFilePaths', `${basePath}/${file.name}`)
	// 				}
	// 				return formRequest
	// 			},
	// 		})
	// 		console.log('Maybe listen to', response.jobId)
	// 		refreshList()
	// 		return {
	// 			status: 'success',
	// 			data: response,
	// 		}
	// 	}
	// 	catch (err) {
	// 		return handleApiFormError(err)
	// 	}
	// }

	// async function downloadFile(remoteFilePath: string) {
	// 	try {
	// 		await $api('/organization/{organizationid}/sftpaction/{sftpconnectionid}/download', {
	// 			method: 'GET',
	// 			responseType: 'blob',
	// 			path: {
	// 				organizationid: orgId.value,
	// 				sftpconnectionid: sftpConnectionId,
	// 			},
	// 			query: {
	// 				remoteFilePath,
	// 			},
	// 			onResponse: (res) => {
	// 				const response = res.response
	// 				if (!response.ok) {
	// 					if (res.error) {
	// 						alert(res.error.message)
	// 					}
	// 					else {
	// 						alert('download failes with no error')
	// 					}
	// 					return
	// 				}

	// 				const disposition = response.headers.get('content-disposition')
	// 				const match = disposition?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i)
	// 				const filename = match ? decodeURIComponent(match[1] ?? match[0]) : 'download'
	// 				const url = URL.createObjectURL(response._data as Blob)
	// 				const a = document.createElement('a')
	// 				a.href = url
	// 				a.download = filename
	// 				document.body.appendChild(a)
	// 				a.click()
	// 				a.remove()
	// 				URL.revokeObjectURL(url)
	// 			},
	// 		})
	// 	}
	// 	catch (err) {
	// 		console.log('SOmething epicly failed', err)
	// 	}
	// }

	// async function downloadFileToText(remoteFilePath: string) {
	// 	try {
	// 		const response = await $api('/organization/{organizationid}/sftpaction/{sftpconnectionid}/download', {
	// 			method: 'GET',
	// 			responseType: 'text',
	// 			path: {
	// 				organizationid: orgId.value,
	// 				sftpconnectionid: sftpConnectionId,
	// 			},
	// 			query: {
	// 				remoteFilePath,
	// 			},
	// 			onResponse: (res) => {
	// 				const response = res.response
	// 				if (!response.ok) {
	// 					if (res.error) {
	// 						alert(res.error.message)
	// 					}
	// 					else {
	// 						alert('download failes with no error')
	// 					}
	// 					return
	// 				}
	// 			},
	// 		})
	// 		console.log(response)
	// 	}
	// 	catch (err) {
	// 		console.log('SOmething epicly failed', err)
	// 	}
	// }

	// async function deleteFile(path: string) {
	// 	try {
	// 		await $api('/organization/{organizationid}/sftpaction/{sftpconnectionid}/delete', {
	// 			method: 'DELETE',
	// 			path: {
	// 				organizationid: orgId.value,
	// 				sftpconnectionid: sftpConnectionId,
	// 			},
	// 			query: {
	// 				remoteFilePath: path,
	// 			},
	// 		})
	// 		refreshList()
	// 	}
	// 	catch (err) {
	// 		console.log('SOmething epicly failed', err)
	// 	}
	// }

	return {
		data,
		error,
		status,
		changeDir,
		currentDir,
		refreshList,
		initialPending: computed(() => organizationStore.userOrganizationsPending || (sftpConnectionsPending.value && !data.value)),
		sftpConnectionsPending,
	}
}
