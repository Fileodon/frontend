<template>
	<div>
		<label
			:for="id"
			class="floating-label"
		>
			<span>{{ label }}</span>
			<slot />
		</label>
		<p
			class="text-sm text-base-content/70"
		>
			{{ info }}
		</p>
		<p
			v-for="(error, idx) in errors"
			:key="idx"
			class="validator-hint hidden"
		>
			{{ error }}
		</p>
	</div>
</template>

<script lang="ts" setup>
interface FormInput {
	id: string
	label: string
	errors: string[] | undefined
	info: string
}
defineProps<FormInput>()
</script>

<style></style>
