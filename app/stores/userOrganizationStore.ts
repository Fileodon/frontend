export const useUserOrganizationStore = defineStore('user-organization', () => {
	const organizationStore = useOrganizationStore()
	const orgId = computed(() => organizationStore.currentSelectedOrganizationId)

	const { data: organizationUsers, pending: pendingOrganizationUsers } = useLazyApi('/organization/{organizationId}/userorganization', {
		method: 'GET',
		path: {
			organizationId: orgId,
		},
		watch: [orgId],
		immediate: !!orgId.value,
	})

	return {
		organizationUsers,
		pendingOrganizationUsers,

	}
})
