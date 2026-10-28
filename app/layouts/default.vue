<template>
	<div class="w-full h-full flex flex-row">
		<LayoutAuthenticatedSideBar />
		<div class="flex flex-col grow">
			<LayoutAuthenticatedHeader />
			<div class=" p-1 sm:p-2">
				<slot />
			</div>
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
