export default function useForm<T>(model: T) {
	function cloneModel(value: T): T {
		return value !== null && typeof value === 'object' ? { ...value } as T : value
	}

	const dirtyObject = ref<T>(cloneModel(model))
	const isDirty = computed(() => {
		return JSON.stringify(dirtyObject.value) !== JSON.stringify(model)
	})

	function reset() {
		dirtyObject.value = cloneModel(model)
	}

	return {
		reset,
		dirtyObject,
		isDirty,
	}
}
