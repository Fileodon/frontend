export default function useSftpConnection(sftpConnectionId: Schema<'BaseSFTPConnectionGetResponse'>['id'], initialDir: string) {
	const { $api } = useNuxtApp()

	const organizationStore = useOrganizationStore()
	const orgId = computed(() => organizationStore.currentSelectedOrganizationId)

	const currentDir = ref<string>(initialDir)

	const { data: list, error: listErrors, status: listStatus, refresh: refreshList, pending: listPending } = useLazyApi('/organization/{organizationid}/sftpaction/{sftpconnectionid}/list',
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

	function changeDir(dir?: string | null) {
		if (!dir) return
		console.log(dir)
		currentDir.value = dir
	}

	async function updateConnection(form: Schema<'SFTPConnectionUpdateRequest'>): Promise<ApiFormResponse<Schema<'SFTPConnectionUpdateResponse'>>> {
		try {
			const response = await $api('/organization/{organizationid}/sftpconnection/{sftpconnectionid}', {
				method: 'PATCH',
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
		list,
		listErrors,
		listStatus,
		changeDir,
		currentDir,
		refreshList,
		initialPending: computed(() => organizationStore.userOrganizationsPending || (listPending.value && !list.value)),
		listPending,
		updateConnection,
	}
}
