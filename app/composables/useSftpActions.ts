export default function useSftpActions(sftpConnectionId: Schema<'BaseSFTPConnectionGetResponse'>['id']) {
	const { $api } = useNuxtApp()

	const organizationStore = useOrganizationStore()
	const orgId = computed(() => organizationStore.currentSelectedOrganizationId)

	async function uploadFiles(files: File[], basePath: string, pathIsFullPath = false): Promise<ApiFormResponse<Schema<'SFTPActionUploadResponse'>>> {
		try {
			const response = await $api('/api/organization/{organizationid}/sftpaction/{sftpconnectionid}/upload', {
				method: 'post',
				path: {
					sftpconnectionid: sftpConnectionId,
					organizationid: orgId.value,
				},
				body: {
					Files: files.map(file => file.name),
					RemoteFilePaths: basePath,
				},
				bodySerializer() {
					const formRequest = new FormData()
					for (const file of files) {
						formRequest.append('Files', file)
						formRequest.append('RemoteFilePaths', `${basePath}${pathIsFullPath ? '' : '/' + file.name}`)
					}
					formRequest.append('OverrideExisting', 'true')
					return formRequest
				},
			})
			console.log('Maybe listen to', response.jobId)
			return {
				status: 'success',
				data: response,
			}
		}
		catch (err) {
			return handleApiFormError(err)
		}
	}

	async function downloadFile(remoteFilePath: string) {
		try {
			await $api('/api/organization/{organizationid}/sftpaction/{sftpconnectionid}/download', {
				method: 'GET',
				responseType: 'blob',
				path: {
					organizationid: orgId.value,
					sftpconnectionid: sftpConnectionId,
				},
				query: {
					remoteFilePath,
				},
				onResponse: (res) => {
					const response = res.response
					if (!response.ok) {
						if (res.error) {
							alert(res.error.message)
						}
						else {
							alert('download failes with no error')
						}
						return
					}

					const disposition = response.headers.get('content-disposition')
					const match = disposition?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i)
					const filename = match ? decodeURIComponent(match[1] ?? match[0]) : 'download'
					const url = URL.createObjectURL(response._data as Blob)
					const a = document.createElement('a')
					a.href = url
					a.download = filename
					document.body.appendChild(a)
					a.click()
					a.remove()
					URL.revokeObjectURL(url)
				},
			})
		}
		catch (err) {
			console.log('SOmething epicly failed', err)
		}
	}

	async function downloadFileToText(remoteFilePath: string) {
		try {
			const response = await $api('/api/organization/{organizationid}/sftpaction/{sftpconnectionid}/download', {
				method: 'GET',
				responseType: 'text',
				path: {
					organizationid: orgId.value,
					sftpconnectionid: sftpConnectionId,
				},
				query: {
					remoteFilePath,
				},
				onResponse: (res) => {
					const response = res.response
					if (!response.ok) {
						if (res.error) {
							alert(res.error.message)
						}
						else {
							alert('download failes with no error')
						}
						return
					}
				},
			})
			console.log(response)
		}
		catch (err) {
			console.log('SOmething epicly failed', err)
		}
	}

	async function deleteFile(path: string) {
		try {
			await $api('/api/organization/{organizationid}/sftpaction/{sftpconnectionid}/delete', {
				method: 'DELETE',
				path: {
					organizationid: orgId.value,
					sftpconnectionid: sftpConnectionId,
				},
				query: {
					remoteFilePath: path,
				},
			})
		}
		catch (err) {
			console.log('SOmething epicly failed', err)
		}
	}

	async function renameFile(form: Schema<'SFTPActionRenameRequest'>): Promise<ApiFormResponse<Schema<'SFTPActionRenameResponse'>>> {
		try {
			const response = await $api('/api/organization/{organizationid}/sftpaction/{sftpconnectionid}/rename', {
				method: 'PUT',
				path: {
					organizationid: orgId.value,
					sftpconnectionid: sftpConnectionId,
				},
				body: form,
			})
			return {
				status: 'success',
				data: response,
			}
		}
		catch (err) {
			return handleApiFormError(err)
		}
	}

	async function createDirectory(form: Schema<'SFTPActionCreateDirectoryRequest'>): Promise<ApiFormResponse<Schema<'SFTPActionCreateDirectoryResponse'>[]>> {
		try {
			const response = await $api('/api/organization/{organizationid}/sftpaction/{sftpconnectionid}/create-directory', {
				method: 'POST',
				path: {
					organizationid: orgId.value,
					sftpconnectionid: sftpConnectionId,
				},
				body: form,
			})
			return {
				status: 'success',
				data: response,
			}
		}
		catch (err) {
			return handleApiFormError(err)
		}
	}

	return {
		deleteFile,
		downloadFileToText,
		downloadFile,
		uploadFiles,
		renameFile,
		createDirectory,
	}
}
