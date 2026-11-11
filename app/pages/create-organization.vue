<template>
	<div>
		<layout-header
			title="Create Organization"
			header="Create an organization"
			description=""
		/>
		<forms-organization
			id="organization-form"
			title="New organization"
			subtitle="creating a new organization"
			submit-btn-text="Submit edit"
			:pending="pending"
			@submit="createOrganization"
		/>
	</div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

definePageMeta({
	title: 'Create Organization',
	breadcrumbs: ['index'],
})

const orgStore = useOrganizationStore()
const pending = useState('org-create-pending', () => false)

const createOrganization = useDebounceFn(async (editedStore: Schema<'CreateOrganizationRequest'>) => {
	console.log('form:', editedStore)
	pending.value = true
	const newOrganization = await orgStore.createNewOrganization(editedStore)
	pending.value = false
	console.log(newOrganization)
	navigateTo('/settings')
	// TODO: navigate to new Organization when response type is fixed.
}, 500)
</script>

<style scoped>

</style>
