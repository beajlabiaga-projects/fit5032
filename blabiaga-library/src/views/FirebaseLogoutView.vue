<template>
  <div>
    <h1>Firebase Logout</h1>
    <p>Click below to sign out of your account.</p>
    <button @click="logout">Sign Out</button>
  </div>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const auth = getAuth()
const router = useRouter()

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('Firebase Logout Successful!')
      console.log('Current user:', auth.currentUser)
      router.push('/FireLogin')
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>

<style scoped>
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
