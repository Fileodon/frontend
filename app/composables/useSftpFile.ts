export default function useSftpFile(sftpConnectionId: Schema<'BaseSFTPConnectionGetResponse'>['id'], remotePath: string) {
	const { $api } = useNuxtApp()

	const organizationStore = useOrganizationStore()
	const orgId = computed(() => organizationStore.currentSelectedOrganizationId)

	// const content = useState('editable-content-text', () => '')

	const { data: content } = useLazyApi('/organization/{organizationid}/sftpaction/{sftpconnectionid}/download', {
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
	})

	// async function downloadFileToText(remoteFilePath: string) {
	// 	try {
	// 		await $api('/organization/{organizationid}/sftpaction/{sftpconnectionid}/download', {
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
	// 				content.value = response._data
	// 			},
	// 		})
	// 	}
	// 	catch (err) {
	// 		console.log('SOmething epicly failed', err)
	// 	}
	// }

	return {
		// downloadFileToText,
		content,
	}
}
