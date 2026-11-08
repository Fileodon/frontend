<template>
	<div>
		<layout-header
			:title="typeof id == 'string' ? id : ''"
			header="Directory list"
			description="Manage files"
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
					<button
						class="btn btn-soft btn-accent p-[0.6rem]"
						@click="createNew"
					>
						<!-- <Icon name="material-symbols-light:add" /> --> Create file/folder
					</button>
				</div>
			</section>
			<section class="pl-2">
				<div class="breadcrumbs text-sm">
					<ul>
						<li><a>/</a></li>
						<li
							v-for="dir in currentDestination.split('/').filter(x => x !== '')"
							:key="dir"
						>
							<a @click="currentDestination = dir">{{ dir }}</a>
						</li>
					</ul>
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
							<th>Edit timestamp</th>
							<th>Edited by</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="item in mockData"
							:key="item.name"
							class="hover:bg-gray-600/50"
							@click="(e) => clickedEvent(item, e)"
						>
							<td v-if="'ext' in item">
								{{ item.name }}.{{ item.ext }}
							</td>
							<td v-else-if="'path' in item">
								{{ item.name }}
							</td>

							<td v-if="'lastEdit' in item">
								{{ item.lastEdit }}
							</td>
							<td v-else>
								—
							</td>

							<td v-if="'editedBy' in item">
								{{ item.editedBy }}
							</td>
							<td v-else>
								—
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id)

interface DirectoryStructure extends Structure {
	name: string
	path: string
}
interface FileStructure extends Structure {
	name: string
	ext: string
	lastEdit: string
	editedBy: string | undefined | null
}

interface Structure { name: string }

const currentDestination = ref<string>('/')

const mockData: (DirectoryStructure | FileStructure)[] = [
	{
		name: '..',
		path: '/',
	},
	{
		name: 'API',
		path: '/api',
	},
	{
		name: 'Program',
		ext: 'cs',
		lastEdit: new Date().toLocaleString(),
		editedBy: 'Sebastian',
	},
	{
		name: 'main',
		ext: 'c',
		lastEdit: new Date().toLocaleString(),
		editedBy: 'Jakob',
	},
]

function clickedEvent(item: (DirectoryStructure | FileStructure), e: PointerEvent) {
	console.log('clicked:', item.name, e)
	// Is file :D
	if ('ext' in item) {
		router.push(`/server/${id.value}/file/${item.name}.${item.ext}`)
	}
	else {
		console.log('clicked', item.path.length, item.path == '.. ')
		if (item.path === '/') {
			console.log('.. if')
			if (currentDestination.value == '' || currentDestination.value == '/') {
				console.log('destination is empty', currentDestination.value)
				return
			}
			currentDestination.value = '/' + currentDestination.value?.split('/').pop()
			console.log('update destination', currentDestination.value)
			return
		}
		currentDestination.value += item.path
		console.log('update destination', currentDestination.value)
	}
}

function createNew() {
	console.log('Create new!!')
	// Modal
	/* Elementer
    * [Close]
    * Name:
    * [Create]
    */
}
</script>

<style>
</style>
