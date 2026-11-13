<template>
	<dialog
		:id="id"
		ref="modal"
		class="modal"
	>
		<div class="modal-box bg-none bg-transparent shadow-none p-0 w-fit">
			<slot />
		</div>
		<form
			method="dialog"
			class="modal-backdrop"
		>
			<button>close</button>
		</form>
	</dialog>
</template>

<script setup lang="ts">
const { id } = defineProps<{
	id: string
}>()
const modal = useTemplateRef('modal')
function show() {
	modal.value?.showModal()
}
function close() {
	modal.value?.close()
}
defineExpose({ show, close })
</script>

<style scoped>

</style>
