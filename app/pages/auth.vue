<template>
  <div>
    <auth-form @register="handleRegister" :errors="errors" @login="handleLogin" />
  </div>
</template>

<script lang="ts" setup>

let errors = ref<Record<string, string>>();
function handleRegister(registerForm: { username: string; email: string; password: string }) {
  console.log('Register form submitted:', registerForm);
  if (!registerForm) {
    errors.value = { form: "Register form is not found!" };
    return;
  }

  const emailError = validateEmail(registerForm.email);
  if (emailError) {
    errors.value = { email: emailError };
    return;
  }

  const passwordError = validatePassword(registerForm.password);
  if (passwordError) {
    errors.value = {password: passwordError};
    return;
  }

  if (registerForm.username.trim().length < 0) {
    errors.value = {username: "The username length must not be empty!"};
    return;
  }
}

function handleLogin(loginForm: { email: string; password: string }) {
  console.log('Login form submitted:', loginForm);
  if (!loginForm) {
    errors.value = {form: "Login form is not found!"};
    return;
  }
  const emailError = validateEmail(loginForm.email);
  if (emailError) {
    errors.value = { email: emailError };
    return;
  }

  const passwordError = validatePassword(loginForm.password);
  if (passwordError) {
    errors.value = {password: passwordError};
    return;
  }
}


function validateEmail(email: string): (string | null | undefined) {
  if (!email || email.trim().length == 0) {
    return "Email input must not be empty!";
  }

  if (!email.includes('@')) {
    return "Email must contain '@'!";
  }

  if (!email.includes('.')) {
    return "Email must contain '.'!";
  }
}

function validatePassword(password: string): (string | null | undefined) {
  if (!password) {
    return "Password must not be empty!";
  }

  if (password.trim().length < 8) {
    return "The required length of the password must be greater or equal to 8";
  }

  if (!password.search("[0-9]")) {
    return "The password must contain a number!";
  }

  if (!password.search("[a-z]") || !password.search("[A-Z]")) {
    return "The password must contain a letter!";
  }
}
</script>

<style scoped></style>