<template>
	<div class="flex flex-col gap-4">
		<layout-header
			title="Organization"
			:header="`Edit ${orgStore.currentOrganization?.orgName}`"
			description="Manage your organizations settings"
		/>
		<forms-organization
			v-if="orgStore.currentOrganization"
			id="organization-form"
			:key="orgStore.currentOrganization.id"
			:organization="orgStore.currentOrganization"
			title="Organization settings"
			subtitle="Update your organizations informations"
			submit-btn-text="Submit edit"
			@submit="orgStore.createNewOrganization"
		/>
		<danger-zone>
			<div class="flex flex-row justify-between">
				<div>
					<h3>Delete this organization</h3>
					<p>If tyou delete, this organization and its related resources will be gone forever</p>
				</div>
				<button
					class="btn btn-error"
					@click="deleteOrganization"
				>
					Delete this organization
				</button>
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

function updateOrganization(editedStore: Schema<'CreateOrganizationRequest'>) {
	console.log('form:', editedStore)
	orgStore.editOrganization(editedStore)
}

function deleteOrganization() {
	if (!orgStore.currentOrganization) {
		alert('Could not find organization')
		return
	}
	const confirm = window.confirm('Are you sure my man?')
	if (confirm === true) {
		orgStore.deleteOrganization(orgStore.currentOrganization)
	}
}
</script>

<style scoped></style>
