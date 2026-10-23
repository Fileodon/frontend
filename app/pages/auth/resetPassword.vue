<template>
    <div class="flex min-h-screen flex-1 flex-col items-center justify-center p-4">
        <card-form>
            <template #header>
                <h1 class="text-3xl font-bold">Reset password</h1>
                <p class="text-sm text-base-content/70">Reset your password with your email below.</p>
            </template>
            <template #body>
                <section class="auth-panel flex flex-col" aria-live="polite">
                    <div class="flex flex-col gap-4">
                        <input v-model="email" type="email" autocomplete="email" placeholder="Email" aria-label="Email"
                            class="input input-bordered w-full" />
                    </div>
                    <p class="text-sm text-base-content/70 mt-2.5">
                        Once the email is sent, you will recieve a reset password link.<br>
                        The link will be usable for 5 minutes.<br>
                        When the new password is validated, it will be updated<br>
                        and the next login shall contain the newly created password.
                    </p>
                    <section class="flex flex-col min-h-68" aria-live="polite">
                        <button type="button" class="btn btn-primary mt-auto w-full">
                            Reset
                        </button>
                        <section id="actions" class="card-actions mt-2.5">
                            <NuxtLink to="/auth">Login</NuxtLink>
                        </section>
                    </section>

                    <section v-if="errors && Object.keys(errors).length > 0"
                        class="rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error" role="alert">
                        <ul class="list-inside list-disc">
                            <li v-for="(error, field) in errors" :key="field">{{ field }}: {{ error }}</li>
                        </ul>
                    </section>
                </section>
            </template>
        </card-form>
    </div>
</template>

<script setup lang="ts">
import { emailValidation } from '~/utils/validation/email';

definePageMeta({ layout: "un-authenticated" })
let email = ref<string>();
let errors = ref<(Record<string, string> | null | undefined)>();
function resetPassword() {
    const emailError = emailValidation(email.value);
    if (emailError) {
        errors.value = { email: emailError };
        return;
    }
}
</script>

<style scoped></style>
