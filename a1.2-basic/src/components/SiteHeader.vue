<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <RouterLink class="brand" to="/"> EcoGreen Connect Melbourne </RouterLink>

    <nav aria-label="Main navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/discover">Discover</RouterLink>
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
  background-color: #ffffff;
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
nav a.route-link-exact-active {
  color: #1f7a43;
  text-decoration: underline;
  text-underline-offset: 0.3rem;
}

@media (max-width: 575px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
