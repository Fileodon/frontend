<template>
	<div class="p-2">
		<h1>Create an organization</h1>
		<p>A dedicated home for your team, connections, and source file transfers.</p>
		<div class="card w-full/50">
			<section
				id="card-header w-full"
				class="border-b-2 border-accent"
			>
				<h2 class="card-title">
					Organization details
				</h2>
			</section>
			<section class="card-body w-full">
				<label class="floating-label">
					<span>Organization name</span>
					<input
						type="text"
						placeholder="Name"
						class="input input-md w-full"
					>
				</label>
				<p>Use a name your team and partners will recognize.</p>
				<label class="floating-label">
					<span>Workspace URL</span>
					<input
						type="text"
						placeholder="Url"
						class="input input-md w-full"
					>
				</label>
				<p>Lowercase letters, and number only.</p>
				<label class="floating-label">
					<span>Contact email</span>
					<input
						type="text"
						placeholder="Email"
						class="input input-md w-full"
					>
				</label>
				<p>Coonnection requests and security notcies will be sent here.</p>
				<div class="flex flex-row w-full">
					<div class="w-full">
						<label class="floating-label">
							<span>Organization name</span>
							<input
								type="text"
								placeholder="Name"
								class="input input-md w-full"
							>
						</label>
						<p>Use a name your team and partners will recognize.</p>
					</div>
					<div class="w-full">
						<label class="floating-label">
							<span>Organization name</span>
							<input
								type="text"
								placeholder="Name"
								class="input input-md w-full"
							>
						</label>
						<p>Use a name your team and partners will recognize.</p>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script lang="ts" setup>

</script>

<style></style>
