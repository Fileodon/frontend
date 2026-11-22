<template>
	<div class="flex flex-col gap-6">
		<p>
			To connect a new server to fileodon. Download the CLI on the server you wish to connect, and use the generated code to validate the connection. <br>
			Read more <NuxtLink
				class="underline"
				to="https://github.com/Fileodon/CLI/blob/main/InstallationGuide.md"
			>here</NuxtLink>
		</p>
		<div
			v-if="generatedCode"
			:key="generatedCode.createdAt"
			class="flex flex-col gap-4"
		>
			<info-field
				label="Code"
				:info="generatedCode.verificationCode"
				:description="`This code expires in ${expiresIn}`"
				copy
			/>
		</div>
		<button
			class="btn btn-warning"
			:disabled="pending"
			@click="getNewCode"
		>
			New Code
		</button>
	</div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const sftpConnectionStore = useSftpConnectionStore()
const pending = useState('sftp-connection-code-api-pending', () => false)

const generatedCode = useState<Schema<'SFTPConnectionAuthCodeResponse'> | undefined>('generated-connection-code')

const getNewCode = useDebounceFn(async () => {
	pending.value = true
	const result = await sftpConnectionStore.generateCode()
	console.log(result)
	generatedCode.value = result
	pending.value = false
}, 500)

const expiresIn = computed(() => {
	if (!generatedCode.value?.expiresAt) return ''
	const expiresDate = new Date(generatedCode.value?.expiresAt)
	const now = new Date()
	const differenceInMilliseconds = expiresDate.getTime() - now.getTime()
	const differenceInMinutes = Math.floor(differenceInMilliseconds / 60_000) // 60_000 svare til 60 * 1000
	return `${differenceInMinutes} minute${differenceInMinutes === 1 ? '' : 's'}`
})
</script>

<style scoped>

</style>
