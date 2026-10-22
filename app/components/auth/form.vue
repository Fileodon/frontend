<template>
    <section id="form" class="bg-gray-50 dark:bg-gray-900">
        <section id="tabs" class="flex justify-center gap-4 mb-4">
            <button class="btn btn-primary">Register</button>
            <button class="btn btn-secondary">Login</button>
        </section>
    </section>
    <section id="register">
        <input v-model="registerForm.username" type="text" placeholder="Username" class="input input-bordered w-full max-w-xs" />
        <input v-model="registerForm.email" autocomplete="email" type="email" placeholder="Email" class="input input-bordered w-full max-w-xs" />
        <input v-model="registerForm.password" type="password" autocomplete="new-password" placeholder="Password" class="input input-bordered w-full max-w-xs" />
        <button class="btn btn-primary" @click="emits('register', registerForm)">Register</button>
    </section>
    <section id="login">
        <input v-model="loginForm.email" type="email" autocomplete="email" placeholder="Email" class="input input-bordered w-full max-w-xs" />
        <input v-model="loginForm.password" type="password" autocomplete="current-password" placeholder="Password" class="input input-bordered w-full max-w-xs" />
        <button class="btn btn-primary" @click="emits('login', loginForm)">Login</button>
    </section>
    <section id="errors" v-if="Object.keys(errors).length > 0">
        <ul>
            <li v-for="(error, field) in errors" :key="field" class="text-red-500">{{ field }}: {{ error }}</li>
        </ul>
    </section>
</template>

<script setup lang="ts">

interface LoginForm {
    email: string;
    password: string;
}

interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

const loginForm = ref<LoginForm>({
    email: '',
    password: '',
});

const registerForm = ref<RegisterForm>({
    username: '',
    email: '',
    password: '',
});

const emits = defineEmits(['register', 'login']);
const props = defineProps<{ errors: Record<string, string> }>();
</script>

<style scoped></style>