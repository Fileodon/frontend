export const useOrganizationStore = defineStore('organization', () => {
	// const currentOrganizationIdPick = ref<Schema<'GetOrganizationRequest'>['id']>(1)
	const { $api } = useNuxtApp()

	const currentSelectedOrganizationId = ref<number>(0)

	watch(currentSelectedOrganizationId, (newVal) => {
		if (newVal <= 0) return
		localStorage.setItem('currentOrganizationId', `${newVal}`)
	})

	const { data: currentOrganization } = useLazyApi('/api/organization/{organizationId}', {
		method: 'GET',
		path: {
			organizationId: currentSelectedOrganizationId,
		},
	})

	const { data: userOrganizations } = useLazyApi('/api/userorganization', {
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

		const previousOrganizationId = localStorage.getItem('currentOrganizationId')
		if (previousOrganizationId && Number(previousOrganizationId)) {
			currentSelectedOrganizationId.value = Number(previousOrganizationId)
		}
		else if (userOrganizations.value && userOrganizations.value?.userOrganizationRequests && userOrganizations.value.userOrganizationRequests[0]?.id) {
			currentSelectedOrganizationId.value = userOrganizations.value.userOrganizationRequests[0]?.id
		}
	})

	async function createNewOrganization(newOrg: Schema<'CreateOrganizationRequest'>) {
		const response = await $api('/api/organization', {
			method: 'POST',
			body: newOrg,
		})
		console.log(response)
		// refresh()
	}

	return {
		currentOrganization,
		userOrganizations,
		createNewOrganization,
		currentSelectedOrganizationId,
	}
})
