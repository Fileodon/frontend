export const usePermissionStore = defineStore('permissions', () => {
	const { data: permissions } = useLazyApi('/api/permission', {
		method: 'GET',
	})
	return {
		permissions,
	}
})
