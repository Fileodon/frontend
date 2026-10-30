<template>
	<main class="mx-auto w-full p-4 sm:p-8">
		<header class="mb-8">
			<p class="text-sm font-medium text-primary">
				Organization
			</p>
			<h1 class="mt-2">
				Create an organization
			</h1>
			<p class="mt-2 text-base-content/70">
				A dedicated home for your team, connections, and file transfers.
			</p>
		</header>

		<form class="card border border-base-300 bg-base-100 shadow-sm">
			<div class="border-b border-base-300 px-6 py-5">
				<h2 class="card-title">
					Organization details
				</h2>
				<p class="mt-1 text-sm text-base-content/70">
					You can update these details later.
				</p>
			</div>

			<div class="card-body gap-6 p-6">
				<div class="space-y-2">
					<label for="organization-name" class="floating-label">
						<span class="label-text font-medium">Organization name</span>
					</label>
					<input id="organization-name" v-model="form.name" type="text" placeholder="Fileodon A/S"
						class="input input-md input-bordered w-full outline-0 bg-base-300"
						aria-describedby="organization-name-help">
					<p id="organization-name-help" class="text-sm text-base-content/70">
						Use a name your team and partners will recognize.
					</p>
				</div>

				<div class="space-y-2">
					<label for="workspace-url" class="floating-label">
						<span class="label-text font-medium">Workspace URL</span>
					</label>
					<input id="workspace-url" v-model="form.url" type="text" placeholder="fileodon"
						class="input input-bordered w-full outline-0 bg-base-300" aria-describedby="workspace-url-help">
					<p id="workspace-url-help" class="text-sm text-base-content/70">
						Use lowercase letters, numbers, and hyphens.
					</p>
				</div>

				<div class="space-y-2">
					<label for="contact-email" class="floating-label">
						<span class="label-text font-medium">Contact email</span>
					</label>
					<input id="contact-email" v-model="form.email" type="email" placeholder="team@example.com"
						class="input input-bordered w-full outline-0 bg-base-300" aria-describedby="contact-email-help">
					<p id="contact-email-help" class="text-sm text-base-content/70">
						Connection requests and security notices will be sent here.
					</p>
				</div>
			</div>

			<div class="flex justify-end border-t border-base-300 px-6 py-4">
				<button type="submit" class="btn btn-soft btn-accent" @click="createOrg">
					Create organization
				</button>
			</div>
		</form>
	</main>
</template>

<script lang="ts" setup>
definePageMeta({
	title: 'Settings',
	breadcrumbs: ['index'],
})

interface CreateOrganization {
	name: string
	email: string
	url: string
}

const form = ref<CreateOrganization>({
	name: '',
	email: '',
	url: '',
})
function createOrg() {
	console.log('form:', form.value)
}
</script>

<style scoped></style>
