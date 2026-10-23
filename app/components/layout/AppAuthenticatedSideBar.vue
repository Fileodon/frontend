<template>
    <div class="side-bar w-64 h-full border-r border-r-neutral-200 flex flex-col">
        <div class="flex items-center justify-center h-24">
            <NuxtLink :to="'/'">
                <Icon name="custom-icons:fileodon-haj" size="2rem"/>
            </NuxtLink>
        </div>
        <div>
            <ul class="menu rounded-box w-full">
                <P class="mb-2 text-gray-400">ORGANIZATION</P>
                <li>
                    <NuxtLink :class="isActive('connections') ? 'menu-active': ''" :to="'/connections'">
                        <Icon  name="material-symbols-light:cable"/>
                        Connections
                   </NuxtLink> 
                </li>
                <li>
                   <NuxtLink :class="isActive('users') ? 'menu-active': ''" :to="'/users'">
                        <Icon  name="material-symbols-light:group-outline-rounded"/>
                        Users
                   </NuxtLink> 
                </li>
                <li>
                    <NuxtLink :class="isActive('settings') ? 'menu-active': ''" :to="'/settings'">
                        <Icon  name="material-symbols-light:settings-outline-rounded"/>
                        Settings
                   </NuxtLink> 
                </li>
                <!-- <li>
                    <NuxtLink :class="isActive('test') ? 'menu-active': ''" :to="'/test'">
                        <Icon  name="material-symbols-light:settings-outline-rounded"/>
                        Test
                   </NuxtLink> 
                </li> -->
            </ul>
        </div>
        <div class="mt-auto p-2">
            <select class="select" v-model="currentSelected">
                <option disabled value="">Your organizations</option>
                <option v-for="org in mockOrgs" :key="org" :value="org">{{ org }}</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { RouteRecordNameGeneric } from 'vue-router';

const route = useRoute()
const mockOrgs = ref<string[]>([
    'Cool',
    'Ikke ligeså cool'
])
const currentSelected = ref(mockOrgs.value[0])

function isActive(name: RouteRecordNameGeneric):boolean{
    return route.name === name;
}
</script>

<style scoped>
.side-bar{
    /* @apply  */
}


</style>