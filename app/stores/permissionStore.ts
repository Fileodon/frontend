export const usePermissionStore = defineStore('permissions', () => {
	const { data: permissions } = useLazyApi('/permission', {
		method: 'GET',
	})
	return {
		permissions,
	}
})
