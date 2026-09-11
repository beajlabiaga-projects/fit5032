<script setup>
import { currentUser } from '../auth/session'
</script>

<template>
  <main class="organiser-page">
    <p class="eyebrow">Organiser</p>
    <h1>Organiser Dashboard</h1>
    <p>Welcome, {{ currentUser.name }}.</p>

    <section class="dashboard-card">
      <h2>Manage Initiatives</h2>
      <p>Create and manage environmental initiatives.</p>
    </section>
  </main>
</template>

<style scoped>
.organiser-page {
  min-height: calc(100vh - 70px);
  padding: 4rem 8%;
  background-color: #f3f1e8;
  color: #26352c;
}

.eyebrow {
  color: #2f6f44;
  font-weight: 700;
  text-transform: uppercase;
}

.organiser-page h1 {
  color: #174b2d;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin: 0.5rem 0 1rem;
}

.dashboard-card {
  max-width: 600px;
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid #c8d2c9;
  border-radius: 12px;
  background-color: white;
}
</style>
