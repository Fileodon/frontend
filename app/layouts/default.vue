<template>
    <div class="">
        <AppAuthenticatedHeader/>
        <div class="flex flex-row">
            <AppAuthenticatedSideBar/>
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppAuthenticatedHeader from '~/components/AppAuthenticatedHeader.vue';


</script>

<style scoped>

</style>