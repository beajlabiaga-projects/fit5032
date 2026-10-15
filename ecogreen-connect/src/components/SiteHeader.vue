<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { currentUser, endSession, isAuthenticated } from '../auth/session'
// End the Firebase session when the user logs out of the application.
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const accountMenu = ref(null)

const router = useRouter()

const closeAccountMenu = () => {
  accountMenu.value?.removeAttribute('open')
}
// Log user out of firebase and remove their saved data (login details) from this app.
const logOut = async () => {
  try {
    await signOut(auth)
  } finally {
    endSession()
    closeAccountMenu()
    router.push('/')
  }
}
</script>

<template>
  <header class="site-header">
    <RouterLink class="brand" to="/"> EcoGreen Connect Melbourne </RouterLink>

    <nav aria-label="Main navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/discover">Discover</RouterLink>
      <!--Only show 'organise' link to logged in organisers-->
      <RouterLink v-if="isAuthenticated && currentUser.role == 'organiser'" to="/organise"
        >Organise</RouterLink
      >
      <details ref="accountMenu" class="account-menu">
        <summary>
          {{ isAuthenticated ? currentUser.name : 'Account' }}
        </summary>
        <!--Account menu changes depending on whether user is logged in-->
        <div class="account-options">
          <template v-if="isAuthenticated">
            <RouterLink to="/profile" @click="closeAccountMenu">My Profile</RouterLink>
            <button type="button" @click="logOut">Log out</button>
          </template>

          <template v-else>
            <RouterLink to="/login" @click="closeAccountMenu">Log in</RouterLink>
            <RouterLink to="/register" @click="closeAccountMenu">Register</RouterLink>
          </template>
        </div>
      </details>

      <RouterLink to="/about">About & Support</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 5%;
  background-color: #fff;
  border-bottom: 1px solid #d9e2dc;
}

.brand {
  color: #1f5132;
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
}

nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

nav a {
  display: inline-block;
  color: #26352c;
  text-decoration: none;
}

nav a:hover,
nav a.router-link-exact-active {
  color: #1f7a43;
  text-decoration: underline;
  text-underline-offset: 0.3rem;
}

.account-menu {
  position: relative;
}

.account-menu summary {
  cursor: pointer;
  list-style: none;
}

.account-menu summary::-webkit-details-marker {
  display: none;
}

.account-menu summary:hover {
  color: #1f7a43;
  text-decoration: underline;
  text-underline-offset: 0.3rem;
}

.account-menu summary:focus-visible {
  outline: 3px solid #2167d5;
  outline-offset: 3px;
}

.account-options {
  position: absolute;
  z-index: 10;
  top: calc(100% + 0.75rem);
  right: 0;
  display: grid;
  min-width: 140px;
  padding: 0.5rem;
  background-color: #fff;
  border: 1px solid #d9e2dc;
  border-radius: 0.4rem;
  box-shadow: 0 0.4rem 1rem rgba(24, 61, 40, 0.12);
}

.account-options button {
  padding: 0.65rem 0.75rem;
  color: #26352c;
  font: inherit;
  text-align: left;
  white-space: nowrap;
  background: none;
  border: 0;
  cursor: pointer;
}

.account-options button:hover {
  color: #1f7a43;
  text-decoration: underline;
  text-underline-offset: 0.3rem;
}

.account-options a {
  padding: 0.65rem 0.75rem;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }

  nav {
    width: 100%;
  }

  .account-options {
    right: auto;
    left: 0;
  }
}
</style>
