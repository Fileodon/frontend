<template>
	<div>
		<layout-header
			:title="name"
			header="File editor"
			description="Edit file content from your browser"
		/>
		<section
			id="overview"
			class="card w-full h-fit border border-base-300 bg-base-100 shadow-sm mt-5"
		>
			<button
				class="btn btn-soft btn-error w-xs"
				@click="returnToOverview"
			>
				Go back
			</button>
			<section
				id="table"
				class="flex-1 h-full bg-black/35 border-gray-600 border m-2"
			>
				<!-- <VueMonacoEditor
					v-model:value="code"
					theme="vs-dark"
					height="70vh"
					@mount="handleEditorMount"
				/> -->
			</section>
		</section>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'File editor',
	breadcrumbs: ['index', 'connection-connection'],
})

const route = useRoute()
const name = computed(() => String(route.params.path ?? 'File editor'))
useHead({
	title: name,
})

function returnToOverview() {
	navigateTo(`/connection-${route.params.connection}`)
}
</script>

<style scoped>

</style>
