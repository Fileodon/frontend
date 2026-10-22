<template>
    <div class="card w-full max-w-md rounded-2xl border border-base-300 bg-base-100 shadow-xl">
        <section class="card-body gap-6">
            <header class="space-y-1 text-center">
                <h1 class="text-3xl font-bold">{{ view ? 'Welcome back' : 'Create your account' }}</h1>
                <p class="text-sm text-base-content/70">
                    {{ view ? 'Sign in to continue to Fileodon.' : 'Get started with your Fileodon account.' }}
                </p>
            </header>

            <div class="relative isolate grid grid-cols-2 rounded-xl bg-base-200 p-1"
                aria-label="Choose an account action">
                <span class="auth-indicator" :class="{ 'is-register': !view }" aria-hidden="true"></span>
                <button type="button" class="auth-tab login-tab" :class="{ 'is-active': view }" :aria-pressed="view"
                    @click="view = true">
                    Login
                </button>
                <button type="button" class="auth-tab register-tab" :class="{ 'is-active': !view }"
                    :aria-pressed="!view" @click="view = false">
                    Register
                </button>
            </div>

            <section class="auth-panel flex flex-col" aria-live="polite">
                <div v-if="view" class="flex flex-col gap-4">
                    <input v-model="loginForm.email" type="email" autocomplete="email" placeholder="Email"
                        aria-label="Email" class="input input-bordered w-full" />
                    <input v-model="loginForm.password" type="password" autocomplete="current-password"
                        placeholder="Password" aria-label="Password" class="input input-bordered w-full" />
                </div>
                <div v-else class="flex flex-col gap-4">
                    <input v-model="registerForm.username" type="text" autocomplete="username" placeholder="Username"
                        aria-label="Username" class="input input-bordered w-full" />
                    <input v-model="registerForm.email" autocomplete="email" type="email" placeholder="Email"
                        aria-label="Email" class="input input-bordered w-full" />
                    <input v-model="registerForm.password" type="password" autocomplete="new-password"
                        placeholder="Password" aria-label="Password" class="input input-bordered w-full" />
                </div>

                <button v-if="view" type="button" class="btn btn-primary mt-auto w-full"
                    @click="emits('login', loginForm)">
                    Login
                </button>
                <button v-else type="button" class="btn btn-primary mt-auto w-full"
                    @click="emits('register', registerForm)">
                    Register
                </button>
            </section>

            <section v-if="errors && Object.keys(errors).length > 0"
                class="rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error" role="alert">
                <ul class="list-inside list-disc">
                    <li v-for="(error, field) in errors" :key="field">{{ field }}: {{ error }}</li>
                </ul>
            </section>
        </section>
    </div>
</template>

<script setup lang="ts">
const view = ref(true);

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
defineProps<{ errors: Record<string, string> | null | undefined }>();
</script>

<style scoped>
.auth-tab {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    min-height: 2.75rem;
    border-radius: 0.625rem;
    background: transparent;
    color: color-mix(in srgb, var(--color-base-content) 75%, transparent);
    font-weight: 600;
    transition: color 200ms ease;
}

.auth-indicator {
    position: absolute;
    top: 0.25rem;
    bottom: 0.25rem;
    left: 0.25rem;
    width: calc(50% - 0.25rem);
    z-index: 0;
    border-radius: 0.625rem;
    background: var(--color-primary);
    pointer-events: none;
    transition: transform 250ms ease;
}

.auth-indicator.is-register {
    transform: translateX(100%);
}

.login-tab::before {
    transform-origin: left;
}

.register-tab::before {
    transform-origin: right;
}

.auth-tab.is-active {
    color: var(--color-primary-content);
}

.auth-tab.is-active::before {
    transform: scaleX(1);
}

.auth-panel {
    min-height: 17rem;
}

@media (prefers-reduced-motion: reduce) {

    .auth-tab,
    .auth-tab::before {
        transition: none;
    }
}
</style>
