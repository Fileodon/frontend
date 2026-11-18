<template>
	<card-form>
		<template #header>
			<h1 class="text-3xl font-bold">
				{{ view ? 'Welcome back' : 'Create your account' }}
			</h1>
			<p class="text-sm text-base-content/70">
				{{ view ? 'Sign in to continue to Fileodon.' : 'Get started with your Fileodon account.' }}
			</p>
		</template>
		<template #body>
			<div
				class="relative isolate grid grid-cols-2 rounded-xl bg-base-200 p-1"
				aria-label="Choose an account action"
			>
				<span
					class="pointer-events-none absolute inset-y-1 left-1 z-0 w-[calc(50%-0.25rem)] rounded-[0.625rem] bg-primary transition-transform duration-250 ease-[ease]"
					:class="{ 'translate-x-full': !view }"
					aria-hidden="true"
				/>
				<button
					type="button"
					class="relative isolate min-h-11 overflow-hidden rounded-[0.625rem] bg-transparent font-semibold transition-colors duration-200 ease-[ease] motion-reduce:transition-none"
					:class="view ? 'text-primary-content' : 'text-base-content/75'"
					:aria-pressed="view"
					@click="view = true"
				>
					Login
				</button>
				<button
					type="button"
					class="relative isolate min-h-11 overflow-hidden rounded-[0.625rem] bg-transparent font-semibold transition-colors duration-200 ease-[ease] motion-reduce:transition-none"
					:class="!view ? 'text-primary-content' : 'text-base-content/75'"
					:aria-pressed="!view"
					@click="view = false"
				>
					Register
				</button>
			</div>

			<form
				class="min-h-68 flex flex-col"
				aria-live="polite"
				@submit.prevent="handleSubmit"
			>
				<div
					class="flex flex-col gap-4 mb-4"
				>
					<template
						v-if="view"
					>
						<form-input
							id="login-email"
							label="Email"
							info=""
							:errors="errors?.email"
						>
							<input
								v-model="loginForm.email"
								type="email"
								autocomplete="email"
								placeholder="Email"
								aria-label="Email"
								class="form-text-input"
							>
						</form-input>
						<form-input
							id="login-password"
							label="Password"
							info=""
							:errors="errors?.password"
						>
							<input
								v-model="loginForm.password"
								type="password"
								autocomplete="current-password"
								placeholder="Password"
								aria-label="Password"
								class="form-text-input"
							>
						</form-input>
					</template>
					<template
						v-else
					>
						<form-input
							id="register-username"
							label="Username"
							info=""
							:errors="errors?.Username"
						>
							<input
								v-model="registerForm.username"
								type="text"
								autocomplete="username"
								placeholder="Username"
								aria-label="Username"
								class="form-text-input"
							>
						</form-input>
						<form-input
							id="register-email"
							label="Email"
							info=""
							:errors="errors?.email"
						>
							<input
								v-model="registerForm.email"
								autocomplete="email"
								type="email"
								placeholder="Email"
								aria-label="Email"
								class="form-text-input"
							>
						</form-input>
						<form-input
							id="register-password"
							label="Password"
							info=""
							:errors="errors?.Password"
						>
							<input
								v-model="registerForm.password"
								type="password"
								autocomplete="new-password"
								placeholder="Password"
								aria-label="Password"
								class="form-text-input"
							>
						</form-input>
						<form-input
							id="register-username"
							label="Username"
							info=""
							:errors="errors?.ConfirmPassword"
						>
							<input
								v-model="registerForm.confirmPassword"
								type="password"
								autocomplete="new-password"
								placeholder="Confirm Password"
								aria-label="Confirm Password"
								class="form-text-input"
							>
						</form-input>
					</template>
				</div>
				<button
					v-if="view"
					type="submit"
					class="btn btn-primary mt-auto w-full"
					:disabled="pending"
					@click.prevent="emits('login', loginForm)"
				>
					Login
				</button>
				<button
					v-else
					type="submit"
					class="btn btn-primary mt-auto w-full"
					:disabled="!registerForm.password || pending"
					@click.prevent="handleSubmit()"
				>
					Register
				</button>
				<section
					id="actions"
					class="card-actions mt-2"
				>
					<p v-if="view">
						Forgot your password? <NuxtLink
							to="/auth/resetPassword"
							class="underline text-primary"
						>Reset password</NuxtLink>
					</p>
					<p v-else>
						Already registered? <NuxtLink
							to="/auth"
							class="underline text-primary"
							@click="view = true"
						>Login</NuxtLink>
					</p>
				</section>
			</form>

			<section
				v-if="errors && Object.keys(errors).length > 0"
				class="rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error"
				role="alert"
			>
				<ul class="list-inside list-disc">
					<li
						v-for="(error, field) in errors"
						:key="field"
					>
						{{ field }}: {{ error }}
					</li>
				</ul>
			</section>
		</template>
	</card-form>
</template>

<script setup lang="ts">
const view = ref(true)

defineProps<{
	pending: boolean
	errors: Schema<'ValidationProblemDetails'>['errors'] | undefined
}>()
const emits = defineEmits<{
	login: [form: Schema<'LoginRequest'>]
	register: [form: Schema<'RegisterRequest'>]
}>()

defineExpose({ setView, resetForm })

const initialLoginForm = {
	email: '',
	password: '',
}
const loginForm = useState<Schema<'LoginRequest'>>('auth-form-login', () => initialLoginForm)

const initialRegisterForm = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
}
const registerForm = useState<Schema<'RegisterRequest'>>('auth-form-register', () => initialRegisterForm)

function setView(value: boolean) {
	if (view.value === value) return
	view.value = value
}

function resetForm() {
	loginForm.value = initialLoginForm
	registerForm.value = initialRegisterForm
}

function handleSubmit() {
	if (view.value) {
		emits('login', loginForm.value)
	}
	else if (registerForm.value.password) {
		emits('register', registerForm.value)
	}
}
</script>
