export const useAuditLogStore = defineStore('audit-log', () => {
	// const { $api } = useNuxtApp()
	const { isLoggedIn } = storeToRefs(useAuthStore())
	const { currentSelectedOrganizationId: orgId, currentOrganizationPending } = storeToRefs(useOrganizationStore())

	const { data: allOrganizationAuditLogs, pending: auditLogsPending } = useLazyApi('/api/organization/{organizationId}/auditlog/all', {
		method: 'GET',
		path: {
			organizationId: orgId,
		},
		query: {
			filter: 'none',
		},
		watch: [orgId, isLoggedIn],
		enabled: isLoggedIn,
		immediate: orgId.value > 0,
	})

	return {
		allOrganizationAuditLogs,
		auditLogsPending: computed(() => (auditLogsPending.value || currentOrganizationPending.value)),
		orgId,
	}
})
