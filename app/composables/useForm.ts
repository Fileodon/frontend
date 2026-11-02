export default function useForm<T>(model: T) {
	const dirtyObject = ref<T>({ ...model })

	function reset() {
		dirtyObject.value = { ...model }
	}

	return {
		reset,
		dirtyObject,
	}
}
