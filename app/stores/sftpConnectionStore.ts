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

	return {
		sftpConnectionsPending: computed(() => sftpConnectionsPending.value || organizationStore.currentOrganizationPending),
		sftpConnections,
		generateCode,
		updateStatus,
	}
})
