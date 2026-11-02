<template>
	<section
		id="table"
		class="card w-full h-fit border border-gray-600 p-2"
	>
		<div class="flex flex-col gap-4 h-fit">
			<div class="flex flex-row">
				<slot name="head" />
			</div>
		</div>
		<slot />
		<div class="flex flex-row align-center justify-between">
			<slot name="footer" />
		</div>
	</section>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
