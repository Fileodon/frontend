export const useOrganizationStore = defineStore('organization', () => {
	// const currentOrganizationIdPick = ref<Schema<'GetOrganizationRequest'>['id']>(1)
	const { $api } = useNuxtApp()

	const currentSelectedOrganizationId = ref<number>(0)

	watch(currentSelectedOrganizationId, (newVal) => {
		if (newVal <= 0) return
		localStorage.setItem('currentOrganizationId', `${newVal}`)
	})

	const { data: currentOrganization } = useLazyApi('/organization/{organizationId}', {
		method: 'GET',
		path: {
			organizationId: currentSelectedOrganizationId,
		},
		onResponseError: (err) => {
			localStorage.removeItem('currentOrganizationId')
			if (err.response.status === 404) {
				localStorage.removeItem('currentOrganizationId')
			}
		},
	})

	const { data: userOrganizations, refresh: refreshUserOrganizations } = useLazyApi('/userorganization', {
		method: 'GET',
	})

	onMounted(() => {
		const previousOrganizationId = localStorage.getItem('currentOrganizationId')
		if (previousOrganizationId && Number(previousOrganizationId)) {
			currentSelectedOrganizationId.value = Number(previousOrganizationId)
		}
	})

	watch(userOrganizations, () => {
		if (currentOrganization.value) return

		const previousOrganizationId = localStorage.getItem('currentOrganizationId')?.trim()
		if (previousOrganizationId && Number(previousOrganizationId)) {
			currentSelectedOrganizationId.value = Number(previousOrganizationId)
		}
		else if (userOrganizations.value && userOrganizations.value[0]?.organization && userOrganizations.value[0]?.organization.id) {
			currentSelectedOrganizationId.value = userOrganizations.value[0]?.organization.id
		}
	})

	async function createNewOrganization(newOrg: Schema<'CreateOrganizationRequest'>) {
		const response = await $api('/organization', {
			method: 'POST',
			body: newOrg,
		})
		console.log(response)
		// refresh()
	}

	async function editOrganization(editOrganization: string) {
		alert('not implemented')
	}

	async function deleteOrganization(organization: Schema<'GetOrganizationResponse'>) {
		if (!organization.id) {
			throw new Error('Could not find organization ID')
		}

		await $api('/organization/{organizationId}', {
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
					if (userOrganizations.value && userOrganizations.value[0]?.organization && userOrganizations.value[0]?.organization.id) {
						currentSelectedOrganizationId.value = userOrganizations.value[0]?.organization.id
					}
				}
				refreshUserOrganizations()
			},
		})
	}

	return {
		currentOrganization,
		userOrganizations,
		createNewOrganization,
		currentSelectedOrganizationId,
		editOrganization,
		deleteOrganization,
	}
})
