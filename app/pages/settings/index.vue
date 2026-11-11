<template>
	<div class="flex flex-col gap-4">
		<layout-header
			title="Organization"
			header="Create an organization"
			description="A dedicated home for your team, connections, and file transfers"
		/>
		<forms-organization
			:organization="mockOrg"
			title="Organization settings"
			subtitle="Update your organizations informations"
			submit-btn-text="Submit edit"
			@submit="createOrg"
		/>
		<danger-zone>
			<div>
				<h3>Want to delete this shi?</h3>
			</div>
		</danger-zone>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	title: 'Settings',
	breadcrumbs: ['index'],
})
const orgStore = useOrganizationStore()
const mockOrg = ref<Schema<'CreateOrganizationRequest'>>({
	orgName: 'Cool',
	contactEmail: 'contact@cool.com',
	workspaceURL: 'http://gmail.com',
})
const errors = ref<string[]>()

function createOrg() {
	console.log('form:', mockOrg.value)
	orgStore.createNewOrganization(mockOrg.value)
}
</script>

<style scoped></style>
