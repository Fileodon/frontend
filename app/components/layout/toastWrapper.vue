<template>
	<div>
		<slot />
		<TransitionGroup
			tag="div"
			class="toast toast-end flex-col-reverse"
			appear
			enter-active-class="transition-all duration-300 ease-out"
			enter-from-class="translate-y-4 opacity-0"
			enter-to-class="translate-y-0 opacity-100"
			appear-active-class="transition-all duration-300 ease-out"
			appear-from-class="translate-y-4 opacity-0"
			appear-to-class="translate-y-0 opacity-100"
			leave-active-class="transition-all duration-200 ease-in"
			leave-from-class="translate-y-0 opacity-100"
			leave-to-class="translate-y-4 opacity-0"
		>
			<div
				v-for="toast in toastStore.toasts"
				:key="toast.id"
				class="alert"
				:class="getStyling(toast.type)"
			>
				<span>{{ toast.message }}</span>
			</div>
		</TransitionGroup>
	</div>
</template>

<script setup lang="ts">
const toastStore = useToastStore()

onMounted(() => {
	toastStore.toasts.forEach(toast => toastStore.scheduleToastRemoval(toast.id))
})

function getStyling(type: Toast['type']) {
	switch (type) {
		case 'success': {
			return 'alert-success'
		}
		case 'error': {
			return 'alert-error'
		}
		default: {
			return 'alert-info'
		}
	}
}
</script>

<style scoped>

</style>
