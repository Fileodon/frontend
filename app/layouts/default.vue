<template>
    <div class="w-full h-full flex flex-row">
        <LayoutAppAuthenticatedSideBar/>
        <div class="flex flex-col grow">
            <LayoutAppAuthenticatedHeader/>
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">


</script>

<style scoped>

</style>