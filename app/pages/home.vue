<template>
	<div class="flex flex-col gap-16">
		<div>
			<h1 class="mb-4">
				{{ orgName }}
			</h1>
			<info-field
				label="Contact Email"
				:info="organizationStore.currentOrganization?.contactEmail ?? 'no name'"
			/>
		</div>
		<div>
			<div class="stats gap-2 shadow">
				<div
					class="stat stat-lg hover:bg-primary bg-primary/75 cursor-pointer select-none"
					@click="navigateTo('/connections')"
				>
					<div class="stat-title">
						Total connections
					</div>
					<div class="stat-value font-normal">
						{{ sftpConnectionStore.sftpConnections?.length }}
					</div>
					<div class="stat-figure">
						<Icon
							name="material-symbols-light:cable"
							size="3rem"
						/>
					</div>
					<div class="stat-desc">
						In {{ orgName }}
					</div>
				</div>
				<div
					class="stat bg-secondary/75 hover:bg-secondary  cursor-pointer select-none"
					@click="navigateTo('/users')"
				>
					<div class="stat-title">
						Total Users
					</div>
					<div class="stat-value font-normal">
						{{ organizationStore.userOrganizations?.length }}
					</div>
					<div class="stat-figure">
						<Icon
							name="material-symbols-light:group-outline-rounded"
							size="3rem"
						/>
					</div>
					<div class="stat-desc">
						In {{ orgName }}
					</div>
				</div>
				<div
					class="stat hover:bg-accent bg-accent/75 cursor-pointer select-none"
					@click="navigateTo('/audit')"
				>
					<div class="stat-title">
						Total Audit logs
					</div>
					<div class="stat-value font-normal">
						{{ auditLogStore.allOrganizationAuditLogs?.total }}
					</div>
					<div class="stat-figure">
						<Icon
							name="material-symbols-light:quick-reference-all-outline-rounded"
							size="3rem"
						/>
					</div>
					<div class="stat-desc">
						In {{ orgName }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'Home',
})

const organizationStore = useOrganizationStore()
const sftpConnectionStore = useSftpConnectionStore()
const auditLogStore = useAuditLogStore()

const orgName = computed(() => organizationStore.currentOrganization?.orgName)
</script>

<style scoped>

</style>
