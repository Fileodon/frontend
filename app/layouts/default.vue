<template>
	<div class="flex h-dvh w-full overflow-hidden">
		<LayoutAuthenticatedSideBar />
		<div class="flex min-w-0 grow flex-col">
			<LayoutAuthenticatedHeader />
			<main class="min-h-0 flex-1 overflow-y-auto">
				<div class="mx-auto w-full p-5 sm:p-10">
					<slot />
				</div>
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>
