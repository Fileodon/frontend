<template>
	<div>
		<header class="mb-8">
			<p class="text-sm font-medium text-primary">
				Connections
			</p>
			<h1 class="mt-2">
				Manage connections
			</h1>
			<p class="mt-2 text-base-content/70">
				Manage your SFTP servers and review incoming connection requests
			</p>
		</header>
		<section
			id="cards"
			class="w-full pt-5 h-fit flex flex-row"
		>
			<div class="stats connection-stat">
				<div class="stat">
					<div class="stat-title">
						Total connections
					</div>
					<div class="stat-value font-normal">
						03
					</div>
					<div class="stat-desc">
						Across your organisation
					</div>
				</div>
			</div>
			<div class="stats connection-stat">
				<div class="stat">
					<div class="stat-title">
						Active
					</div>
					<div class="stat-value text-success font-normal">
						01
					</div>
					<div class="stat-desc">
						Ready for file transerfs
					</div>
				</div>
			</div>
			<div class="stats connection-stat">
				<div class="stat">
					<div class="stat-title">
						Pending approval
					</div>
					<div class="stat-value text-warning font-normal">
						01
					</div>
					<div class="stat-desc">
						Review incoming requests
					</div>
				</div>
			</div>
			<div class="stats connection-stat">
				<div class="stat">
					<div class="stat-title">
						Offline
					</div>
					<div class="stat-value text-error font-normal">
						01
					</div>
					<div class="stat-desc">
						Last checked {{ new Date().toLocaleString() }}
					</div>
				</div>
			</div>
		</section>
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
					<button class="btn btn-soft btn-accent p-[0.6rem]">
						<!-- <Icon name="material-symbols-light:add" /> --> New Connection
					</button>
				</div>
			</section>
			<section
				id="table"
				class="flex-1 h-fit bg-black/35 border-gray-600 border m-2"
			>
				<table class="table table-sm w-full h-fit text-center">
					<thead>
						<tr>
							<th>Name</th>
							<th>Status</th>
							<th>Ip</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="item in mockData"
							:key="item.name"
							class="hover:bg-gray-600/50"
						>
							<td>
								<div class="flex-1">
									<!-- <Icon name="material-symbols-light:dns-outline" class="bg-green-300 pr-5"></Icon> -->
									{{ item.name }}
									<p class="text-gray-500 italic">
										{{ item.username }}
									</p>
								</div>
							</td>
							<td>
								<div
									class="badge badge-soft"
									:class="statusClasses[item.status].badge"
								>
									<div
										:aria-label="item.status"
										class="status"
										:class="statusClasses[item.status].indicator"
									/>
									{{ item.status }}
								</div>
							</td>
							<td>{{ item.ip }}</td>
							<td>
								<div v-if="item.status == StatusType.ACTIVE">
									<div class="dropdown">
										<div
											tabindex="0"
											role="button"
											class="btn-ghost hover:cursor-pointer m-1"
										>
											<Icon name="material-symbols-light:more-vert" />
										</div>
										<ul
											tabindex="-1"
											class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 border-gray-600 border shadow-sm"
										>
											<li class="border-gray-600 border rounded p-0.5 mb-1 bg-black/35">
												<a>Item 1</a>
											</li>
											<li class="border-gray-600 border rounded p-0.5 mb-1 bg-black/35">
												<a>Item 2</a>
											</li>
										</ul>
									</div>
								</div>
								<div v-else-if="item.status == StatusType.PENDING">
									<button class="btn btn-sm btn-outline btn-error mr-2">
										Reject
									</button>
									<button class="btn btn-sm btn-success">
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
			</section>
		</section>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	title: 'Connections',
	breadcrumbs: ['index'],
})

enum StatusType {
	ACTIVE = 'ACTIVE',
	PENDING = 'PENDING',
	OFFLINE = 'OFFLINE',
}

const statusClasses: Record<StatusType, { badge: string, indicator: string }> = {
	[StatusType.ACTIVE]: { badge: 'badge-success', indicator: 'status-success' },
	[StatusType.PENDING]: { badge: 'badge-warning', indicator: 'status-warning' },
	[StatusType.OFFLINE]: { badge: 'badge-error', indicator: 'status-error' },
}

interface MockType {
	name: string
	status: StatusType
	username: string
	ip: string
	port: number
}

const mockData: MockType[] = [
	{ name: 'Contabo server', status: StatusType.ACTIVE, username: 'root', ip: '158.220.124.100', port: 22 },
	{ name: 'Hetzner server', status: StatusType.PENDING, username: 'Jakob', ip: '155.163.181.218', port: 22 },
	{ name: 'seb wsl laptop', status: StatusType.OFFLINE, username: 'seb', ip: '118.184.121.243', port: 20 },
]
</script>

<style scoped></style>
