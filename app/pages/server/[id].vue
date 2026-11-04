<template>
	<div>
		Server {{ id }}
	</div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = computed(() => route.params.id)
</script>

<style>
</style>
