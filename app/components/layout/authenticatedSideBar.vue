<template>
	<div class="side-bar hidden sm:flex sm:w-52 h-full border-r border-r-neutral-200 flex-col">
		<div class="flex items-center justify-center h-24">
			<NuxtLink :to="'/'">
				<Icon
					name="custom-icons:fileodon-haj"
					size="2rem"
				/>
			</NuxtLink>
		</div>
		<div>
			<ul class="menu rounded-box w-full">
				<P class="mb-2 text-gray-400">
					ORGANIZATION
				</P>
				<li>
					<div
						class="sidebar-connections-row"
						:class="isActive('connections') ? 'menu-active' : ''"
					>
						<NuxtLink
							class="sidebar-connections-link"
							:to="'/connections'"
						>
							<Icon name="material-symbols-light:cable" />
							<span>Connections</span>
						</NuxtLink>
						<button
							class="sidebar-connections-toggle"
							type="button"
							:aria-expanded="connectionsOpen"
							aria-controls="connections-dropdown"
							aria-label="Toggle connections list"
							@click="connectionsOpen = !connectionsOpen"
						>
							<span class="sidebar-connections-chevron" />
						</button>
					</div>
					<div
						id="connections-dropdown"
						class="sidebar-connections-dropdown bg-transparent"
						:hidden="!connectionsOpen"
					>
						<span
							v-for="server in mockData"
							:key="server.id"
							class="sidebar-connections-server link link-hover"
						>
							{{ server.name }}
						</span>
					</div>
				</li>
				<li>
					<NuxtLink
						:class="isActive('users') ? 'menu-active' : ''"
						:to="'/users'"
					>
						<Icon name="material-symbols-light:group-outline-rounded" />
						Users
					</NuxtLink>
				</li>
				<li>
					<NuxtLink
						:class="isActive('audit-logs') ? 'menu-active' : ''"
						:to="'/auditLogs'"
					>
						<Icon name="material-symbols-light:quick-reference-all-outline-rounded" />
						Audit
					</NuxtLink>
				</li>
				<li>
					<NuxtLink
						:class="isActive('settings') ? 'menu-active' : ''"
						:to="'/settings'"
					>
						<Icon name="material-symbols-light:settings-outline-rounded" />
						Settings
					</NuxtLink>
				</li>
				<!-- <li>
                    <NuxtLink :class="isActive('test') ? 'menu-active': ''" :to="'/test'">
                        <Icon  name="material-symbols-light:settings-outline-rounded"/>
                        Test
                   </NuxtLink>
                </li>
                <li>
                    <NuxtLink :class="isActive('test') ? 'menu-active': ''" :to="'/test/Foo'">
                        <Icon  name="material-symbols-light:settings-outline-rounded"/>
                        Foo
                   </NuxtLink>
                </li> -->
			</ul>
		</div>
		<div class="mt-auto px-2 mb-4">
			<div>
				<!-- TODO: tilføj noget info her måske? -->
			</div>
			<div class="divider -mx-2" />
			<select
				v-model="currentSelected"
				class="select"
			>
				<option
					disabled
					value=""
				>
					Your organizations
				</option>
				<option
					v-for="org in mockOrgs"
					:key="org"
					:value="org"
				>
					{{ org }}
				</option>
			</select>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { RouteRecordNameGeneric } from 'vue-router'

const route = useRoute()
const connectionsOpen = ref(false)
const mockOrgs = ref<string[]>([
	'Cool',
	'Ikke ligeså cool',
])
const currentSelected = ref(mockOrgs.value[0])

function isActive(name: RouteRecordNameGeneric): boolean {
	return route.name === name
}

interface MockType {
	id: number
	name: string
}

const mockData: MockType[] = [
	{ id: 1, name: 'Contabo server' },
	{ id: 2, name: 'Hetzner server' },
	{ id: 3, name: 'seb wsl laptop' },
]
</script>

<style scoped>

</style>
