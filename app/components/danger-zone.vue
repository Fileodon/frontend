<template>
	<h3 class="font-bold text-error">
		{{ title }}
	</h3>
	<label class="card border-error/75 border-2 ">
		<div class="card-body">
			<div>
				<slot />
			</div>
		</div>
	</label>
</template>

<script setup lang="ts">
const { title = 'Danger zone' } = defineProps<{
	title?: string
}>()
</script>

<style scoped>

</style>
