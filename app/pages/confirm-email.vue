<template>
	<div class="flex min-h-screen flex-1 flex-col items-center justify-center p-4">
		<card-form>
			<template #header>
				<h2>Approving yo dumbass account</h2>
			</template>
			<template #body>
				<div>
					{{ route.query }}
				</div>
				<NuxtLink

					class="btn btn-info"
				>
					Go to login
				</NuxtLink>
			</template>
		</card-form>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'un-authenticated',
})
const { $api } = useNuxtApp()
const route = useRoute()

const verifiedSuccess = useState('verified-succes', () => false)

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
		verifiedSuccess.value = true
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
