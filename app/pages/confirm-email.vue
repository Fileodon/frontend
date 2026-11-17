<template>
	<div>
		<div class="card card-border bg-info-content">
			<h2>Approving yo dumbass account</h2>
			<p>{{ route.query.userId }}</p>
			<p>{{ route.query.token }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'un-authenticated',
})
const { $api } = useNuxtApp()
const route = useRoute()

onMounted(() => {
	console.log(route.query)
	if (route.query.userId && route.query.token) {
		approveEmail()
	}
})

async function approveEmail() {
	try {
		const response = await $api('/auth/email/confirm', {
			method: 'POST',
			body: {
				userId: `${route.query.userId}`,
				token: `${route.query.token}`,
			},
		})
		console.log(response)
	}
	catch (err) {
		const errors = handleApiFormError(err)
		if (errors.status === 'bad_request') {
			alert(errors.data.title)
		}
	}
}
</script>

<style scoped>

</style>
