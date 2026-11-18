<template>
	<div
		id="breadcrumbs"
		class="breadcrumbs text-sm"
	>
		<ul>
			<li
				v-for="(breadcrumb, index) in resolvedBreadCrumbs"
				:key="index"
			>
				<NuxtLink :to="breadcrumb.route">
					{{ breadcrumb.label }}
				</NuxtLink>
			</li>
			<li>
				{{ route.meta.title }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import type { RouteRecordNameGeneric } from 'vue-router'

const route = useRoute()
const router = useRouter()
const routes = computed(() => router.getRoutes())
interface IBreadcrumb {
	label: string
	route: string
	icon?: string
}

// To generate Breadcrumbs
// Find route names in the nuxt dev tools
// set the routes in order from their metadata breadcrumbs
const resolvedBreadCrumbs = computed<IBreadcrumb[]>(() => {
	const route = router.currentRoute
	if (!route.value.meta.breadcrumbs || !routes.value) return []

	const breadCrumbs = route.value.meta.breadcrumbs as RouteRecordNameGeneric[]

	return breadCrumbs
		.map(name => routes.value.find(r => r.name === name))
		.filter((routeRecord): routeRecord is NonNullable<typeof routeRecord> => !!routeRecord)
		.map(routeRecord => ({
			label: routeRecord.meta.title ?? routeRecord.name,
			route: routeRecord.path,
		}) as IBreadcrumb)
})
</script>

<style scoped>

</style>
