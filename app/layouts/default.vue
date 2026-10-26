<template>
    <div class="w-full h-full flex flex-row">
        <LayoutAuthenticatedSideBar/>
        <div class="flex flex-col grow">
            <LayoutAuthenticatedHeader/>
            <div class=" p-1 sm:p-2">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// const {$auth} = useNuxtApp()
// onMounted(() => {
//     const response = $auth('/auth/register',)
//     console.log(response)    
// })


</script>

<style scoped>

</style>