<template>
	<div>
		<header class="mb-8">
			<p class="text-sm font-medium text-primary">
				{{ title }}
			</p>
			<h1 class="mt-2">
				{{ header }}
			</h1>
			<p class="mt-2 text-base-content/70">
				{{ description }}
			</p>
		</header>
	</div>
</template>

<script lang="ts" setup>
interface HeaderLayout {
	title: string
	header: string
	description: string
}

defineProps<HeaderLayout>()
</script>

<style>

</style>
