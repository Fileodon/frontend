<template>
    <div class="breadcrumbs text-sm">
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

interface IBreadcrumb {
    label: string,
    route: string,
    icon?: string
}

const previousPages = computed<RouteRecordNameGeneric[]>(() => {
    // when adding a new page, add what should be displayed as previous pages based on their name. You find this name in the devtools or by console.log(router.getRoutes())
    switch(route.name){
        case 'index':
            return []
        case 'test':
            return ['index']
        default:
            return []
    }
})
const resolvedBreadCrumbs = computed<IBreadcrumb[]>(() =>{
    const routes = router.getRoutes()
    const filtered = routes.filter(r => previousPages.value.includes(r.name))
    
    return filtered.map(f => ({
        label: f.meta.title ?? f.name, // fallbacks to unique name - set title in page meta
        route: f.path
    }) as IBreadcrumb)
})

</script>

<style scoped>

</style>