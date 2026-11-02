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
</script>

<style scoped>

</style>
