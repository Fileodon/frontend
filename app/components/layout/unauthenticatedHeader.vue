<template>
	<div class="navbar bg-neutral text-neutral-content px-48 gap-2 fixed">
		<!-- <button class="btn btn-ghost text-xl">
			daisyUI
		</button> -->

		<NuxtLink
			class="btn btn-lg rounded-3xl  btn-ghost text-xl ms-auto"
			to="/auth"
		>
			Log in
		</NuxtLink>
		<NuxtLink
			class="btn btn-lg rounded-3xl btn-accent text-xl"
			to="/auth?register=true"
		>
			Sign up
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
