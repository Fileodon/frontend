<template>
	<div class="w-full h-full flex flex-row">
		<LayoutAuthenticatedSideBar />
		<div class="flex flex-col grow">
			<LayoutAuthenticatedHeader />
			<main class="mx-auto w-full p-5 sm:p-10">
				<slot />
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()

type RegisterRequest = Schema<'RegisterRequest'>

onMounted(async () => {
	const request: RegisterRequest = {
		email: 'file@shark.dk',
		password: 'bus',
	}
	const response = await $api('/api/auth/register', {
		method: 'POST',
		body: request,
	})
	console.log(response)
})
</script>

<style scoped>

</style>
