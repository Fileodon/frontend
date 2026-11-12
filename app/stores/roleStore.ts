export const useRoleStore = defineStore('roles', () => {
	const { $api } = useNuxtApp()

	const organizationStore = useOrganizationStore()
	const orgId = computed(() => organizationStore.currentSelectedOrganizationId)
	const { data: roles } = useLazyApi('/organization/{organizationId}/role', {
		method: 'GET',
		path: {
			organizationId: orgId,
		},
		watch: [orgId],
		immediate: !!orgId.value,
	})

	async function createNewRole(newRole: Schema<'CreateRoleRequest'>): Promise<ApiFormResponse<Schema<'GetRoleResponse'>>> {
		try {
			const response = await $api('/organization/{organizationId}/role', {
				method: 'POST',
				path: {
					organizationId: orgId.value,
				},
				body: newRole,
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

	async function updateRole(role: Schema<'EditRoleRequest'>): Promise<ApiFormResponse<Schema<'GetRoleResponse'>>> {
		try {
			const response = await $api('/organization/{organizationId}/role/{id}', {
				method: 'PUT',
				path: {
					organizationId: orgId.value,
					id: role.id,
				},
				body: role,
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
		roles,
		createNewRole,
		updateRole,
	}
})
