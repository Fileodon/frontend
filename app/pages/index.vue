<template>
	<div>
		<h1>Home</h1>
		<p>{{ orgStore.currentOrganization }}</p>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'Home',
	layout: 'un-authenticated',
})

const orgStore = useOrganizationStore()
</script>

<style scoped>

</style>
