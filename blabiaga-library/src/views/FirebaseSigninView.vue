<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value).then(() => {
    console.log('Firebase Sign in Successful!')

    const currentUser = auth.currentUser
    console.log(currentUser)
    console.log('Logged-in email:', currentUser.email)

    const role = currentUser.email?.trim().toLowerCase() === 'admin@library.com' ? 'Admin' : 'User'

    console.log('Signed in as:', role)
    console.log('Signed in as:', role)

    router.push('/')
  })
}
</script>

<style scoped>
input {
  background-color: #ffffff;
  color: #1e293b;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  padding: 12px 16px;
  width: 300px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px #dbeafe;
}

button {
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #1d4ed8;
}
</style>
