<template>
	<div>
		<footer class="footer sm:footer-horizontal border-t-accent border-t-2 text-neutral-content p-2">
			<aside>
				<NuxtLink to="/">
					<Icon
						name="custom-icons:fileodon-haj"
						size="1rem"
					/>
				</NuxtLink>
			</aside>
			<nav>
				<details class="collapse collapse-arrow">
					<summary class="footer-title collapse-title py-0">
						Policies
					</summary>
					<div class="collapse-content">
						<div class="flex flex-col items-start">
							<a class="link link-hover">Cookie</a>
							<a class="link link-hover">ToS</a>
							<a class="link link-hover">GDPR</a>
						</div>
					</div>
				</details>
			</nav>
			<nav>
				<details class="collapse collapse-arrow">
					<summary class="footer-title collapse-title py-0">
						Sign up
					</summary>
					<div class="collapse-content">
						<div class="flex flex-col items-start">
							<NuxtLink
								class="link link-hover"
								to="/auth"
							>Login</NuxtLink>
							<NuxtLink
								class="link link-hover"
								to="/auth?register=true"
							>Register</NuxtLink>
							<NuxtLink
								class="link link-hover"
								to="/auth/resetPassword"
							>Reset password</NuxtLink>
						</div>
					</div>
				</details>
			</nav>
			<nav>
				<h6 class="footer-title">
					Copyright © {{ new Date().getFullYear() }} - All right reserved by <a
						class="link link-hover"
						href="https://github.com/fileodon"
					>Fileodon</a>
				</h6>
			</nav>
		</footer>
	</div>
</template>

<script lang="ts" setup>

</script>

<style></style>
