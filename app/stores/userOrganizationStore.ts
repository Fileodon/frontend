export const useUserOrganizationStore = defineStore('user-organization', () => {
	const { $api } = useNuxtApp()
	const { isLoggedIn } = storeToRefs(useAuthStore())
	const { currentSelectedOrganizationId: orgId, currentOrganizationPending } = storeToRefs(useOrganizationStore())

	const { data: organizationUsers, pending: pendingOrganizationUsers, refresh: refreshOrganisationUsers } = useLazyApi('/api/userorganization/organization/{organizationId}/userorganization', {
		method: 'GET',
		path: {
			organizationId: orgId,
		},
		watch: [orgId, isLoggedIn],
		immediate: !!orgId.value,
	})

	async function inviteUser(userInvite: Schema<'CreateUserOrganizationRequest'>): Promise<ApiFormResponse<Schema<'GetUserOrganizationResponse'>>> {
		try {
			await $api('/api/userorganization/organization/{organizationId}/userorganization', {
				method: 'POST',
				path: {
					organizationId: orgId.value,
				},
				body: userInvite,
			})
			return {
				status: 'success',
			}
		}
		catch (err) {
			return handleApiFormError(err)
		}
	}

	async function updateUserOrganization(updatedUser: Schema<'EditUserOrganizationRequest'>): Promise<ApiFormResponse<Schema<'GetUserOrganizationResponse'>>> {
		try {
			const response = await $api('/api/userorganization/organization/{organizationId}/userorganization/{id}', {
				method: 'PUT',
				path: {
					organizationId: orgId.value,
					id: updatedUser.id,
				},
				body: updatedUser,
				onResponse: (response) => {
					if (!response.response.ok || response.error?.message) {
						alert(response.error?.message)
						return
					}
					refreshOrganisationUsers()
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

	async function removeUserOrganization(id: Schema<'GetUserOrganizationResponse'>['id']) {
		try {
			const response = await $api('/api/userorganization/organization/{organizationId}/userorganization/{id}', {
				method: 'DELETE',
				path: {
					organizationId: orgId.value,
					id: id,
				},
				onResponse: (response) => {
					if (!response.response.ok || response.error?.message) {
						alert(response.error?.message)
						return
					}
					refreshOrganisationUsers()
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

	return {
		organizationUsers,
		pendingOrganizationUsers: computed(() => pendingOrganizationUsers.value || currentOrganizationPending.value),
		inviteUser,
		updateUserOrganization,
		removeUserOrganization,
	}
})
