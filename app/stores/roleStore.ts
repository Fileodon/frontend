export const useRoleStore = defineStore('roles', () => {
	const { $api } = useNuxtApp()

	const organizationStore = useOrganizationStore()
	const orgId = computed(() => organizationStore.currentSelectedOrganizationId)
	const { data: roles, refresh: refreshRoles, pending: rolesPending } = useLazyApi('/organization/{organizationId}/role', {
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
				onResponse: (response) => {
					if (!response.response.ok || response.error?.message) {
						alert(response.error?.message)
						return
					}
					refreshRoles()
				},
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
				onResponse: (response) => {
					if (!response.response.ok || response.error?.message) {
						alert(response.error?.message)
						return
					}
					refreshRoles()
				},
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

	async function deleteRole(role: Schema<'GetRoleResponse'>) {
		await $api('/organization/{organizationId}/role/{id}', {
			method: 'DELETE',
			path: {
				organizationId: orgId.value,
				id: role.id.toString(),
			},
			onResponse: (response) => {
				if (!response.response.ok || response.error?.message) {
					alert(response.error?.message)
					return
				}
				refreshRoles()
			},
		})
	}
	return {
		roles,
		rolesPending,
		createNewRole,
		updateRole,
		deleteRole,
	}
})
