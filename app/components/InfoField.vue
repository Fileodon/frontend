<template>
	<div class="flex flex-col text-left w-full min-w-0">
		<label
			class="font-bold"
			:for="label.toLowerCase()"
		>
			{{ label }}
		</label>
		<div class="flex flex-row justify-between items-center min-w-0">
			<h5
				:name="label.toLowerCase()"
				class="min-w-0 break-all"
			>
				{{ info }}
			</h5>
			<button
				v-if="copy && isSupported"
				class="btn btn-sm btn-soft"
				@click="copyToClipboard(info)"
			>
				<Icon
					name="material-symbols-light:content-copy-outline-rounded"
					size="2rem"
				/>
			</button>
		</div>
		<p
			v-if="description"
			class="text-base-content/50"
		>
			{{ description }}
		</p>
	</div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const { info } = defineProps<{
	label: string
	info: string
	description?: string
	copy?: boolean
}>()

const { copy: copyToClipboard, isSupported, copied } = useClipboard()
watch(copied, (newVal) => {
	if (newVal === true)alert('copied')
})
</script>

<style scoped>

</style>
