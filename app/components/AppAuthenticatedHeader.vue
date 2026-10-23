<template>
    <header class="navbar bg-base-50 border-b border-b-neutral-200">
        <div class="flex-1">
            <div>
                <BreadCrumbs :previous-pages="['home', 'connections']" />
            </div>
        </div>
        <div class="flex flex-row items-center gap-2">

            <label class="swap swap-rotate">
                <!-- this hidden checkbox controls the state -->
                <input type="checkbox" class="theme-controller" value="light" />
                <!-- sun icon -->
                <Icon name="material-symbols-light:light-mode-outline" class="swap-on size-5" />
                <!-- moon icon -->
                <Icon name="material-symbols-light:dark-mode-outline" class="swap-off size-5" />
            </label>

            <!-- Avatar and dropdown -->
            <div class="flex flex-row gap-2 items-center justify-center">
                <div class="avatar avatar-placeholder">
                    <div class="rounded-full bg-accent-content text-accent w-8 border border-accent/50 ">
                        <span class="text-sm">JE</span>
                    </div>
                </div>
                <button popovertarget="avatar-popover" style="anchor-name:--avatar-anchor-1" class="flex items-center justify-center">
                    <Icon name="material-symbols-light:keyboard-arrow-down"/>
                </button>
                <ul class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm mt-1"
                    popover id="avatar-popover" style="position-anchor:--avatar-anchor-1">
                    <p>Info about user</p>
                    <li class="flex flex-row items-center" @click="navigateProfile"><Icon name="material-symbols-light:person-outline-rounded"></Icon><p>Profile settings</p></li>
                    <li class="flex flex-row items-center" @click="logout"><Icon name="material-symbols-light:logout"></Icon><p>Logout</p></li>
                </ul>
            </div>

        </div>
    </header>
</template>

<script setup lang="ts">
import BreadCrumbs from './BreadCrumbs.vue';

// TODO implement loading states and skeleton loaders

function logout(){
    alert("logout")
}

function navigateProfile(){
    alert("navigate profile")
}

</script>

<style scoped>

</style>