export const useAuditLogStore = defineStore('audit-log', () => {
	// const { $api } = useNuxtApp()
	const organizationStore = useOrganizationStore()

	const orgId = computed(() => organizationStore.currentSelectedOrganizationId)

	const { data: allOrganizationAuditLogs, pending: auditLogsPending } = useLazyApi('/auditlog/all/{organizationId}', {
		method: 'GET',
		path: {
			organizationId: orgId,
		},
		query: {
			filter: 'none',
		},
		watch: [orgId],
		immediate: !!orgId.value,
	})

	return {
		allOrganizationAuditLogs,
		auditLogsPending: computed(() => (auditLogsPending.value || organizationStore.currentOrganizationPending)),
		orgId,
	}
})
