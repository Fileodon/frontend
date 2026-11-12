<template>
	<div class="flex flex-col w-fit text-left">
		<label
			class="font-bold"
			:for="label.toLowerCase()"
		>
			{{ label }}
		</label>
		<h5 :name="label.toLowerCase()">
			{{ info }}
		</h5>
		<p v-if="description">
			{{ description }}
		</p>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	label: string
	info: string
	description?: string
}>()
</script>

<style scoped>

</style>
