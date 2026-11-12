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
			:errors="formErrors"
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
const formErrors = useState<Schema<'ValidationProblemDetails'>['errors']>('org-create-form-errors')

const createOrganization = useDebounceFn(async (newOrgForm: Schema<'CreateOrganizationRequest'>) => {
	pending.value = true
	const result = await orgStore.createNewOrganization(newOrgForm)
	if (result.status === 'success') {
		console.log(result)
		orgStore.currentSelectedOrganizationId = result.data.id
		navigateTo('/settings')
	}
	else if (result.status === 'bad_request') {
		formErrors.value = result.data.errors
	}
	pending.value = false
}, 500)
</script>

<style scoped>

</style>
