<script setup lang="ts">
import ToastWrapper from './components/layout/toastWrapper.vue'
</script>

<template>
	<ToastWrapper>
		<div class="h-screen w-screen">
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</div>
	</ToastWrapper>
</template>
