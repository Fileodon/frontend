export const useRoleStore = defineStore('roles', () => {
	const { $api } = useNuxtApp()
	const { isLoggedIn } = storeToRefs(useAuthStore())
	const { currentSelectedOrganizationId: orgId } = storeToRefs(useOrganizationStore())

	const { data: roles, refresh: refreshRoles, pending: rolesPending } = useLazyApi('/api/organization/{organizationId}/role', {
		method: 'GET',
		path: {
			organizationId: orgId,
		},
		watch: [orgId, isLoggedIn],
	})

	async function createNewRole(newRole: Schema<'CreateRoleRequest'>): Promise<ApiFormResponse<Schema<'GetRoleResponse'>>> {
		try {
			const response = await $api('/api/organization/{organizationId}/role', {
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
			const response = await $api('/api/organization/{organizationId}/role/{id}', {
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
		await $api('/api/organization/{organizationId}/role/{id}', {
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
