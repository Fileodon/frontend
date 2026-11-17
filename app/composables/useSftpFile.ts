export default function useSftpFile(sftpConnectionId: Schema<'BaseSFTPConnectionGetResponse'>['id'], remotePath: string) {
	// const { $api } = useNuxtApp()

	const organizationStore = useOrganizationStore()
	const orgId = computed(() => organizationStore.currentSelectedOrganizationId)

	const fileName = ref('')

	const { data: content, refresh: refreshFile } = useLazyApi('/organization/{organizationid}/sftpaction/{sftpconnectionid}/download', {
		method: 'GET',
		responseType: 'text',
		path: {
			organizationid: orgId,
			sftpconnectionid: sftpConnectionId,
		},
		query: {
			remoteFilePath: remotePath,
		},
		watch: [orgId],
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
			fileName.value = match ? decodeURIComponent(match[1] ?? match[0]) : 'download'
		},
	})

	return {
		// downloadFileToText,
		content,
		fileName,
		refreshFile,
	}
}
