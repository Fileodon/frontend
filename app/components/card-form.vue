<template>
    <div class="aura aura-dual w-full max-w-md rounded-2xl border border-base-300 bg-base-100 shadow-xl">
        <div class="card w-full max-w-md rounded-2xl border border-base-300 bg-base-100 shadow-xl">
            <section class="card-body gap-6">
                <header class="space-y-1 text-center">
                    <slot name="header" />
                </header>
                <slot name="body" />
            </section>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>