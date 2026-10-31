<template>
	<div class="w-full h-full flex flex-row">
		<LayoutAuthenticatedSideBar />
		<div class="flex flex-col grow">
			<LayoutAuthenticatedHeader />
			<div class="p-10 w-full h-full">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>
