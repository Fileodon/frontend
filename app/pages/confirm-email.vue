<template>
	<div class="flex min-h-screen flex-1 flex-col items-center justify-center p-4">
		<card-form>
			<template #header>
				<h2>{{ verifiedSuccess ? 'Confirmed': 'Attempting confirm' }}</h2>
			</template>
			<template #body>
				<Icon
					v-show="!verifiedSuccess"
					name="custom-icons:fileodon-haj"
					class="animate-pulse self-center"
				/>

				<NuxtLink
					v-show="verifiedSuccess"
					class="btn btn-info"
					to="/auth"
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
