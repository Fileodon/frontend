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
const authStore = useAuthStore()
</script>

<style scoped>

</style>
