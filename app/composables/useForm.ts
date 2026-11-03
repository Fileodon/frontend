export default function useForm<T>(model: T) {
	const dirtyObject = ref<T>({ ...model })
	const isDirty = computed(() => {
		return JSON.stringify(dirtyObject.value) !== JSON.stringify(model)
	})

	function reset() {
		dirtyObject.value = { ...model }
	}

	return {
		reset,
		dirtyObject,
		isDirty,
	}
}
