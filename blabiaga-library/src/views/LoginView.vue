<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../router'

const username = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  if (username.value === 'admin' && password.value === 'password') {
    login()
    router.push('/about')
  } else {
    alert('Invalid username or password.')
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4">Login</h1>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input id="username" v-model="username" type="text" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input id="password" v-model="password" type="password" class="form-control" required />
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
