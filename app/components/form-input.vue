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
			role="alert"
			class="text-sm text-error"
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
const { errors } = defineProps<FormInput>()

watch(() => errors, (newVal) => {
	console.log(newVal)
})
</script>

<style></style>
