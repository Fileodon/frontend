<template>
    <div id="breadcrumbs" class="breadcrumbs text-sm">
        <ul>
            <li v-for="(breadcrumb, index) in resolvedBreadCrumbs">
                <NuxtLink :to="breadcrumb.route" >
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
import type { RouteRecordNameGeneric } from 'vue-router';

const route= useRoute()
const router = useRouter()
const routes = computed(() => router.getRoutes())
interface IBreadcrumb {
    label: string,
    route: string,
    icon?: string
}

// To generate Breadcrumbs
// Find route names in the nuxt dev tools
// set the routes in order from their metadata breadcrumbs
const resolvedBreadCrumbs = computed<IBreadcrumb[]>(() =>{
    const route = router.currentRoute; 
    if(!route.value.meta.breadcrumbs || !routes.value)return [];
    const filtered = routes.value.filter(r => (route.value.meta.breadcrumbs as RouteRecordNameGeneric[])?.includes(r.name))
    return filtered.map(f => ({
        label: f.meta.title ?? f.name, // fallbacks to unique name - set title in page meta
        route: f.path
    }) as IBreadcrumb)
})

</script>

<style scoped>

</style>