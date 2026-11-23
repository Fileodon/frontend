<template>
	<views-page-loading v-if="sftpConnectionStore.sftpConnectionsPending" />
	<div v-else>
		<layout-header
			title="Connections"
			header="Manage connections"
			description="Manage your SFTP servers and review incoming connection requests"
		/>
		<section
			id="stats"
			class="stat-section"
		>
			<div class="stats">
				<div class="stat">
					<div class="stat-title">
						Total connections
					</div>
					<div class="stat-value font-normal">
						{{ sftpConnectionStore.sftpConnections?.length }}
					</div>
					<div class="stat-desc">
						Across your organisation
					</div>
				</div>
			</div>
			<div class="stats">
				<div class="stat">
					<div class="stat-title">
						Active
					</div>
					<div class="stat-value text-success font-normal">
						{{ acceptedConnectionsCount }}
					</div>
					<div class="stat-desc">
						Ready for file transerfs
					</div>
				</div>
			</div>
			<div class="stats">
				<div class="stat">
					<div class="stat-title">
						Pending approval
					</div>
					<div class="stat-value text-warning font-normal">
						{{ pendingConnectionsCount }}
					</div>
					<div class="stat-desc">
						Review incoming requests
					</div>
				</div>
			</div>
		</section>
		<table-card>
			<template #head>
				<input
					type="search"
					placeholder="Search..."
					class="w-sm input input-md input-bordered outline-0 bg-base-300"
				>
				<div class="ml-auto">
					<button
						class="btn btn-soft btn-accent p-[0.6rem]"
						@click="newConnectionModal?.show()"
					>
						<!-- <Icon name="material-symbols-light:add" /> --> New Connection
					</button>
				</div>
			</template>

			<table class="resource-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="item in sftpConnectionStore.sftpConnections"
						:key="item.displayName"
						class="resource-table-row"
					>
						<td>
							<!-- <Icon name="material-symbols-light:dns-outline" class="bg-green-300 pr-5"></Icon> -->
							{{ item.displayName }}
							<p class="text-gray-500 italic">
								{{ item.displayName }}
							</p>
						</td>
						<td>
							<div
								class="badge badge-soft"
								:class="getStatusClasses(item.status).badge"
							>
								<div
									:aria-label="item.status"
									class="status"
									:class="getStatusClasses(item.status).indicator"
								/>
								{{ item.status }}
							</div>
						</td>
						<td>
							<div v-if="item.status == 'Accepted'">
								<button
									class="btn btn-sm btn-info btn-link"
									@click="handleViewDetails(item)"
								>
									View
								</button>
							</div>
							<div v-else-if="item.status == 'Pending'">
								<button
									class="btn btn-sm btn-outline btn-error mr-2"
									@click="updateConnectionStatus({
										newStatus: 'Rejected',
										sftpConnectionId: item.id,
									})"
								>
									Reject
								</button>
								<button
									class="btn btn-sm btn-success"
									@click="updateConnectionStatus({
										newStatus: 'Accepted',
										sftpConnectionId: item.id,
									})"
								>
									Accept
								</button>
							</div>
							<div v-else>
								<button class="btn btn-sm btn-outline btn-warning">
									Reconnect
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</table-card>
		<form-modal
			id="connection-code-modal"
			ref="connection-code-modal"
		>
			<card-form>
				<template #header>
					<h3>Connect a new server</h3>
				</template>
				<template #body>
					<views-new-connection-code />
				</template>
			</card-form>
		</form-modal>
	</div>
</template>

<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'
import { useSftpConnectionStore } from '~/stores/sftpConnectionStore'

definePageMeta({
	title: 'Connections',
	breadcrumbs: ['home'],
})

const sftpConnectionStore = useSftpConnectionStore()

const newConnectionModal = useTemplateRef('connection-code-modal')
const pending = useState('role-api-pending', () => false)

usePolling(sftpConnectionStore.refreshSftpConnections)

const acceptedConnectionsCount = computed(() => {
	return sftpConnectionStore.sftpConnections?.filter(con => con.status === 'Accepted').length ?? 0
})
const pendingConnectionsCount = computed(() => {
	return sftpConnectionStore.sftpConnections?.filter(con => con.status === 'Pending').length ?? 0
})

function getStatusClasses(action: Schema<'SFTPConnectionStatus'>) {
	switch (action) {
		case 'Accepted': {
			return { badge: 'badge-success', indicator: 'status-success' }
		}
		case 'Pending':{
			return { badge: 'badge-warning', indicator: 'status-warning' }
		}
		case 'Rejected':{
			return { badge: 'badge-error', indicator: 'status-error' }
		}
		default: {
			return { badge: 'badge-info', indicator: 'status-info' }
		}
	}
}

function handleViewDetails(con: Schema<'BaseSFTPConnectionGetResponse'>) {
	navigateTo(`/connection-${con.id}`)
}

const updateConnectionStatus = useDebounceFn(async (status: Schema<'SFTPConnectionStatusUpdateRequest'>) => {
	pending.value = true
	const result = await sftpConnectionStore.updateStatus(status)
	if (result?.newStatus != status.newStatus) {
		pending.value = false
		alert('Woops something went awry')
		return
	}
	pending.value = false
}, 500)
</script>

<style scoped></style>
