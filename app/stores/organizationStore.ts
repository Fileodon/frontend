export const useOrganizationStore = defineStore('organization', () => {
	// const currentOrganizationIdPick = ref<Schema<'GetOrganizationRequest'>['id']>(1)
	const { $api } = useNuxtApp()
	const currentSelectedOrganizationId = ref<number>(-1)

	watch(currentSelectedOrganizationId, (newVal) => {
		if (newVal <= 0) return
		localStorage.setItem('currentOrganizationId', `${newVal}`)
	})

	const { isLoggedIn } = storeToRefs(useAuthStore())

	const { data: currentOrganization, pending: currentOrganizationPending } = useLazyApi('/api/organization/{organizationId}', {
		method: 'GET',
		path: {
			organizationId: currentSelectedOrganizationId,
		},
		watch: [isLoggedIn, currentSelectedOrganizationId],
		enabled: computed(() => currentSelectedOrganizationId.value > 0),
		key: CacheKeys.ORGANIZATION,
	})

	const organizationPermissions = computed(() => currentOrganization.value?.permissions)

	const { data: userOrganizations, refresh: refreshUserOrganizations, pending: userOrganizationsPending } = useLazyApi('/api/userorganization', {
		method: 'GET',
		watch: [isLoggedIn],
	})

	onMounted(() => {
		const previousOrganizationId = localStorage.getItem('currentOrganizationId')
		if (previousOrganizationId && Number(previousOrganizationId)) {
			currentSelectedOrganizationId.value = Number(previousOrganizationId)
		}
	})

	watch(userOrganizations, (newVal) => {
		if (!newVal) return
		const previousOrganizationId = localStorage.getItem('currentOrganizationId')?.trim()
		if (previousOrganizationId && Number(previousOrganizationId)) {
			currentSelectedOrganizationId.value = Number(previousOrganizationId)
		}
		else
			trySetCurrentOrganizationId()
	}, { immediate: true })

	async function createNewOrganization(newOrg: Schema<'CreateOrganizationRequest'>): Promise<ApiFormResponse<Schema<'GetOrganizationResponse'>>> {
		try {
			const response = await $api('/api/organization', {
				method: 'POST',
				body: newOrg,
			})
			refreshUserOrganizations()
			return {
				status: 'success',
				data: response,
			}
		}
		catch (err) {
			return handleApiFormError(err)
		}
	}

	async function editOrganization(editOrganization: Schema<'EditOrganizationRequest'>): Promise<ApiFormResponse<Schema<'GetOrganizationResponse'>>> {
		try {
			const response = await $api('/api/organization/{organizationId}', {
				method: 'PUT',
				path: {
					organizationId: editOrganization.id,
				},
				body: editOrganization,
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

	async function deleteOrganization(organization: Schema<'GetOrganizationResponse'>) {
		if (!organization.id) {
			throw new Error('Could not find organization ID')
		}

		await $api('/api/organization/{organizationId}', {
			method: 'DELETE',
			path: {
				organizationId: organization.id,
			},
			onResponse: (response) => {
				if (!response.response.ok || response.error?.message) {
					alert(response.error?.message)
					return
				}
				if (organization.id == currentOrganization.value?.id) {
					trySetCurrentOrganizationId()
				}
				refreshUserOrganizations()
			},
		})
	}

	function trySetCurrentOrganizationId() {
		if (userOrganizations.value && userOrganizations.value[0]?.organization && Number(userOrganizations.value[0]?.organization.id)) {
			currentSelectedOrganizationId.value = Number(userOrganizations.value[0]?.organization.id)
		}
	}

	function hasPermissions(permission: string): boolean {
		return !!organizationPermissions.value?.find(p => p.name == permission)
	}

	return {
		currentOrganization,
		userOrganizations,
		createNewOrganization,
		currentSelectedOrganizationId,
		editOrganization,
		deleteOrganization,
		currentOrganizationPending,
		userOrganizationsPending,
		organizationPermissions,
		hasPermissions,
	}
})
