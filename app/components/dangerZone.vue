<template>
	<label class="card bg-error-content/75   shadow-lg ">
		<div class="card-body">
			<h1 class="card-title">
				{{ title }}
			</h1>
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
