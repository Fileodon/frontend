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
				<p class="mb-2 text-gray-400">
					ORGANIZATION
				</p>
				<li>
					<NuxtLink
						:class="isActive('connections') ? 'menu-active' : ''"
						:to="'/connections'"
					>
						<Icon name="material-symbols-light:cable" />
						Connections
					</NuxtLink>
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
						:to="'/audit'"
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
					<ul>
						<li>
							<NuxtLink
								:class="isActive('settings-roles') ? 'menu-active' : ''"
								:to="'/settings/roles'"
							>
								Roles & permissions
							</NuxtLink>
						</li>
					</ul>
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
			<button class="btn btn-soft w-full mt-2 p-1">
				Create new
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { RouteRecordNameGeneric } from 'vue-router'

const route = useRoute()
const mockOrgs = ref<string[]>([
	'Cool',
	'Ikke ligeså cool',
])
const currentSelected = ref(mockOrgs.value[0])

function isActive(name: RouteRecordNameGeneric): boolean {
	return route.name === name
}
</script>

<style scoped></style>
