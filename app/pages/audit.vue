<template>
	<views-page-loading v-if="auditLogStore.auditLogsPending" />
	<div v-else>
		<layout-header
			title="Audit"
			header="Audit logs"
			description="View your teams actions"
		/>
		<section
			id="overview"
			class="card w-full h-fit border border-base-300 bg-base-100 shadow-sm mt-5"
		>
			<table-card>
				<template #head>
					<input
						type="search"
						placeholder="Search..."
						class="w-sm input input-md input-bordered outline-0 bg-base-300"
					>
					<!-- Add filters here -->
					<!-- <div class="ml-auto">
						<div class="dropdown dropdown-bottom dropdown-center">
							<div
								tabindex="0"
								role="button"
								class="btn m-1"
							>
								Select audit table
							</div>
							<ul

								tabindex="-1"
								class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
							>
								<li
									v-for="item in dropdownMockdata"
									:key="item"
								>
									<a>{{ item }}</a>
								</li>
							</ul>
						</div>
					</div> -->
				</template>
				<table class="table table-sm w-full h-fit text-center">
					<thead>
						<tr>
							<th
								v-for="item in headers"
								:key="item"
							>
								{{ item }}
							</th>
							<th>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						<template
							v-for="item in auditLogStore.allOrganizationAuditLogs?.auditLogs"
							:key="item.id"
						>
							<tr
								class="hover:bg-gray-600/50"
							>
								<td
									v-for="(_, key, index) in headers"
									:key="index"
								>
									<div
										v-if="key === 'action' && item.action"
										class="badge badge-soft"
										:class="getStatusClasses(item.action).badge"
									>
										<div
											:aria-label="item.action"
											class="status"
											:class="getStatusClasses(item.action).indicator"
										/>
										{{ item.action }}
									</div>
									<p v-else-if="key === 'timestamp'">
										{{ new Date(item.timestamp).toUTCString() }}
									</p>
									<p v-else>
										{{ item[key] }}
									</p>
								</td>
								<td>
									<button
										class="btn btn-sm btn-info btn-link"
										@click="toggleViewAuditLogInfo(item)"
									>
										View details
									</button>
								</td>
							</tr>
							<tr v-show="viewingAuditLogInfo?.id == item.id">
								<td :colspan="Object.entries(headers).length + 1">
									<div class="flex flex-col gap-6 w-full py-8">
										<info-field
											label="Old values"
											:info="item.oldData ?? 'none'"
										/>
										<info-field
											label="New values"
											:info="item.newData ?? 'none'"
										/>
									</div>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</table-card>
		</section>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	title: 'Connections',
	breadcrumbs: ['index'],
})
const auditLogStore = useAuditLogStore()

type AuditTableHeaders = Partial<Record<keyof Schema<'AuditLogDTO'>, string>>

const headers = useState<AuditTableHeaders>('audit-log-table-headers', () => ({
	actorName: 'User',
	action: 'Action',
	timestamp: 'Timestamp',
}))

const viewingAuditLogInfo = useState<Schema<'AuditLogDTO'> | null>('view-audit-log-info')

function toggleViewAuditLogInfo(auditLog: Schema<'AuditLogDTO'>) {
	if (viewingAuditLogInfo.value?.id === auditLog.id) {
		viewingAuditLogInfo.value = null
		return
	}
	viewingAuditLogInfo.value = auditLog
}

function getStatusClasses(action: string) {
	switch (action) {
		case 'Added': {
			return { badge: 'badge-success', indicator: 'status-success' }
		}
		case 'Modified':{
			return { badge: 'badge-warning', indicator: 'status-warning' }
		} default: {
			return { badge: 'badge-info', indicator: 'status-info' }
		}
	}
}
</script>

<style scoped></style>
