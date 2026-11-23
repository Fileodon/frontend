<template>
	<div>
		<h1>hello</h1>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'Test',
	breadcrumbs: ['index'],
	layout: 'none',
})

// useHead({
// 	title: 'Title</title><script>alert("xss")< ' + '/script>',
// })
const untrustedValue = ref('<script>alert("XSS demo")<' + '/script>')

useHead({
	script: [{ innerHTML: untrustedValue.value }],
})
</script>

<style scoped>

</style>
