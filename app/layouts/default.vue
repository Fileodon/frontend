<template>
    <div class="w-full h-full flex flex-row">
        <LayoutAppAuthenticatedSideBar/>
        <div class="flex flex-col grow">
            <LayoutAppAuthenticatedHeader/>
            <div class=" p-1 sm:p-2">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">


</script>

<style scoped>

</style>