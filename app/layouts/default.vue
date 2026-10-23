<template>
    <div class="w-full h-full flex flex-row">
        <AppAuthenticatedSideBar/>
        <div class="flex flex-col grow">
            <AppAuthenticatedHeader/>
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppAuthenticatedHeader from '~/components/AppAuthenticatedHeader.vue';


</script>

<style scoped>

</style>