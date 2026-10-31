<template>
	<section
		id="table"
		class="card w-full h-fit border border-gray-600"
	>
		<div class="flex-1 h-fit m-2">
			<div class="flex flex-row p-2">
				<input
					type="search"
					placeholder="Search..."
					class="w-sm rounded-md border border-gray-600 pl-2.5 outline-0 bg-black/35"
				>
				<div class="ml-auto">
					<button class="btn btn-soft btn-accent p-[0.6rem]">
						<!-- <Icon name="material-symbols-light:add" /> --> Invite
					</button>
				</div>
			</div>
			<table class="table bg-black/35 border border-gray-600">
				<thead>
					<tr>
						<th>ID</th>
						<th>Username</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="user in mockUsers"
						:key="user.id"
						class="hover:bg-gray-600/50"
					>
						<td>{{ user.id }}</td>
						<td>{{ user.username }}</td>
						<td>{{ user.role }}</td>
						<td>Edit</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'Users',
	breadcrumbs: ['index'],
})

interface MockUser {
	id: number
	username: string
	role: string
}

const mockUsers: MockUser[] = [
	{ id: 1, username: 'Jakob Espersen', role: 'admin' },
	{ id: 1, username: 'Sebastian JenseN?', role: 'editor' },
	{ id: 1, username: 'Tobias Tobiassen', role: 'editor' },
	{ id: 1, username: 'Nicklas LobaDK', role: 'viewer' },
	{ id: 1, username: 'Flemming lære', role: 'guest' },
]
</script>

<style scoped></style>
