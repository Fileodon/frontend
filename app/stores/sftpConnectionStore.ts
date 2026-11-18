import type { FetchError } from 'ofetch'

export const useSftpConnectionStore = defineStore('sftp-connections', () => {
	const { $api } = useNuxtApp()

	const organizationStore = useOrganizationStore()
	const orgId = computed(() => organizationStore.currentSelectedOrganizationId)

	const { data: sftpConnections, pending: sftpConnectionsPending } = useLazyApi('/organization/{organizationid}/sftpconnection/all', {
		method: 'GET',
		path: {
			organizationid: orgId,
		},
		watch: [orgId],
		immediate: !!orgId.value,
		key: CacheKeys.SFTP_CONNECTIONS,
	})

	async function generateCode() {
		try {
			const response = await $api('/organization/{organizationid}/sftpconnection/requestcode', {
				method: 'POST',
				path: {
					organizationid: orgId.value,
				},
			})
			return response
		}
		catch (err) {
			const error: FetchError = err as FetchError
			console.log(error)
		}
	}

	async function updateStatus(form: Schema<'SFTPConnectionStatusUpdateRequest'>) {
		try {
			const response = await $api('/organization/{organizationid}/sftpconnection/status', {
				method: 'PATCH',
				path: {
					organizationid: orgId.value,
				},
				body: form,
			})
			return response
		}
		catch (err) {
			const error: FetchError = err as FetchError
			console.log(error)
		}
	}

	async function distributeFiles(files: File[], locations: Schema<'SFTPActionDistributeLocation'>[]) {
		try {
			const response = await $api('/organization/{organizationid}/sftpaction/distribute', {
				method: 'post',
				path: {
					organizationid: orgId.value,
				},
				body: {
					Files: files.map(file => file.name),
					Locations: locations,
				},
				bodySerializer() {
					const formRequest = new FormData()
					for (const file of files) {
						formRequest.append('Files', file)
					}
					for (const location of locations) {
						formRequest.append('Locations', JSON.stringify([location]))
					}
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

	return {
		sftpConnectionsPending: computed(() => sftpConnectionsPending.value || organizationStore.currentOrganizationPending),
		sftpConnections,
		generateCode,
		updateStatus,
		distributeFiles,
	}
})
