export const useToastStore = defineStore('toast', () => {
	const toasts = ref<Toast[]>([])
	const timers = new Map<string, ReturnType<typeof setTimeout>>()

	function addToast(toast: Omit<Toast, 'id'>) {
		const newToast: Toast = {
			...toast,
			id: crypto.randomUUID(),
			timer: 3000,
		}
		toasts.value.push(newToast)
		scheduleToastRemoval(newToast.id)
	}

	function scheduleToastRemoval(id: string) {
		if (!import.meta.client || timers.has(id)) {
			return
		}

		const toast = toasts.value.find(t => t.id === id)
		if (!toast) {
			return
		}

		const timer = setTimeout(() => {
			timers.delete(id)
			toasts.value = toasts.value.filter(t => t.id !== id)
		}, toast.timer ?? 3000)
		timers.set(id, timer)
	}

	return {
		addToast,
		scheduleToastRemoval,
		toasts,
	}
})
