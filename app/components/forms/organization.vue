<template>
	<div>
		<form class="card border border-base-300 bg-base-100 shadow-sm">
			<div class="border-b border-base-300 px-6 py-5">
				<h2 class="card-title">
					{{ title }}
				</h2>
				<p class="mt-1 text-sm text-base-content/70">
					{{ subtitle }}
				</p>
			</div>

			<div class="card-body gap-6 p-6">
				<div class="space-y-2">
					<form-input
						id="organization-name"
						label="Organization name"
						info="Use a name your team and partners will recognize"
						:errors="errors"
					>
						<input
							id="organization-name"
							v-model="organizationForm.orgName"
							type="text"
							placeholder="Fileodon A/S"
							class="input input-md input-bordered w-full outline-0 bg-base-300"
							aria-describedby="organization-name-help"
						>
					</form-input>
				</div>
				<div class="space-y-2">
					<form-input
						id="workspace-url"
						label="Workspace URL"
						info="Use lowercase letters, numbers, and hyphens."
						:errors="errors"
					>
						<input
							id="workspace-url"
							v-model="organizationForm.workspaceURL"
							type="text"
							placeholder="fileodon"
							class="input input-bordered w-full outline-0 bg-base-300"
							aria-describedby="workspace-url-help"
						>
					</form-input>
				</div>

				<div class="space-y-2">
					<form-input
						id="contact-email"
						label="Contact email"
						info="Connection requests and security notices will be sent here."
						:errors="errors"
					>
						<input
							id="contact-email"
							v-model="organizationForm.contactEmail"
							type="email"
							placeholder="team@example.com"
							class="input input-bordered w-full outline-0 bg-base-300"
							aria-describedby="contact-email-help"
						>
					</form-input>
				</div>
			</div>

			<div class="flex justify-end border-t border-base-300 px-6 py-4">
				<button
					type="submit"
					class="btn btn-soft btn-accent"
					@click="submitForm"
				>
					{{ submitBtnText }}
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	title: string
	subtitle: string
	submitBtnText: string
	organization: Schema<'CreateOrganizationRequest'>
}>()

const errors = ref<string[]>()

const emit = defineEmits<{
	submit: [organization: Schema<'CreateOrganizationRequest'>]
}>()

const { dirtyObject: organizationForm } = useForm(props.organization)

async function submitForm() {
	// TODO: validation
	await nextTick()
	emit('submit', organizationForm.value)
}
</script>

<style scoped>

</style>
