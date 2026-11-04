<template>
	<div>
		<layout-header
			title="Audit"
			header="Audit logs"
			description="View your teams actions"
		/>
		<section
			id="overview"
			class="card w-full h-fit border border-base-300 bg-base-100 shadow-sm mt-5"
		>
			<section
				id="header"
				class="flex flex-row p-2"
			>
				<input
					type="search"
					placeholder="Search..."
					class="w-sm input input-md input-bordered outline-0 bg-base-300"
				>
				<div class="ml-auto">
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
				</div>
			</section>
			<section
				id="table"
				class="flex-1 h-fit bg-black/35 border-gray-600 border m-2"
			>
				<table class="table table-sm w-full h-fit text-center">
					<thead>
						<tr>
							<th
								v-for="item in headerMockData"
								:key="item"
							>
								{{ item }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="item in mockData"
							:key="item.name"
							class="hover:bg-gray-600/50"
						>
							<td>
								<div
									class="badge badge-soft"
									:class="statusClasses[item.action].badge"
								>
									<div
										:aria-label="item.action"
										class="status"
										:class="statusClasses[item.action].indicator"
									/>
									{{ item.action }}
								</div>
							</td>
							<td>
								{{ item.name }}
							</td>

							<td>{{ item.message }}</td>
							<td>
								{{ item.timestamp }}
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		</section>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	title: 'Connections',
	breadcrumbs: ['index'],
})

enum ActionType {
	CREATE = 'CREATE',
	MODIFIED = 'MODIFIED',
	DELETE = 'DELETE',
}

const statusClasses: Record<ActionType, { badge: string, indicator: string }> = {
	[ActionType.CREATE]: { badge: 'badge-success', indicator: 'status-success' },
	[ActionType.MODIFIED]: { badge: 'badge-warning', indicator: 'status-warning' },
	[ActionType.DELETE]: { badge: 'badge-error', indicator: 'status-error' },
}

interface MockType {
	name: string
	action: ActionType
	message: string
	timestamp: string
}

const dropdownMockdata: string[] = [
	'Database',
	'Files',
	'Servers',
]

const headerMockData: string[] = [
	'Action',
	'User',
	'Message',
	'Timestamp',
]

const mockData: MockType[] = [
	{ name: 'Nicklas', action: ActionType.CREATE, message: 'Created audit_backup.json', timestamp: new Date().toLocaleString() },
	{ name: 'Jakob', action: ActionType.MODIFIED, message: 'Modified index.html', timestamp: new Date().toLocaleString() },
	{ name: 'Sebastian', action: ActionType.DELETE, message: 'Deleted docker_setup.yml', timestamp: new Date().toLocaleString() },
]
</script>

<style scoped></style>
