<script setup lang="ts">
import axios, { AxiosError }  from "axios";
import type { FormKitNode } from "@formkit/core";

definePageMeta({
  layout: "centered",
  middleware: ["guest"],
});

interface LoginForm {
  email: string;
  password: string;
}

const { login } = useAuth();
const loginForm = ref({
  email: "",
  password: "",
});

async function handleLogin(payload: LoginForm, node?: FormKitNode) {
  try {
    await login(payload);
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 422) {
      node?.setErrors([], err.response.data.errors);
    }
  }
}
</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <FormKit type="form" submit-label="login" @submit="handleLogin">
      <FormKit label="Email" name="email" type="email" />
      <FormKit label="Password" name="password" type="password" />
    </FormKit>

    <p>
      Don't have an account?
      <NuxtLink class="underline text-lime-600" to="/register">Register now!</NuxtLink>
    </p>
  </div>
</template>
