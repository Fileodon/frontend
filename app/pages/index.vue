<template>
    <div>
        <h1>Home</h1>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Home',
    layout: 'un-authenticated'
})

const mockOrgs = ref<string[]>([
    'Cool',
    'Praktikantdd'
])
const currentSelected = ref(mockOrgs.value[0])
const textTypeShit = ref("")

</script>

<style scoped>

</style>