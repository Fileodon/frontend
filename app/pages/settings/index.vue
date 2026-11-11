<template>
	<views-page-loading v-if="orgStore.currentOrganizationPending" />
	<div
		v-else
		class="flex flex-col gap-4"
	>
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
			:pending="pending"
			@submit="updateOrganization"
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
import { useDebounceFn } from '@vueuse/core'

definePageMeta({
	title: 'Settings',
	breadcrumbs: ['index'],
})
const orgStore = useOrganizationStore()
const pending = useState('org-edit-pending', () => false)

const updateOrganization = useDebounceFn(async (editedStore: Schema<'CreateOrganizationRequest'>) => {
	console.log('form:', editedStore)
	pending.value = true
	// await orgStore.editOrganization(editedStore)
	pending.value = false
}, 500)

const deleteOrganization = useDebounceFn(async () => {
	pending.value = true
	if (!orgStore.currentOrganization) {
		alert('Could not find organization')
		return
	}
	const confirm = window.confirm('Are you sure my man?')
	if (confirm === true) {
		await orgStore.deleteOrganization(orgStore.currentOrganization)
	}
	pending.value = true
}, 500)
</script>

<style scoped></style>
