<script setup>
import { currentUser } from '../auth/session'
</script>

<template>
  <main class="organiser-page">
    <p class="eyebrow">Organiser</p>
    <h1>Organiser Dashboard</h1>
    <p>Welcome, {{ currentUser.name }}.</p>

    <div class="dashboard-grid">
      <RouterLink to="/organise/initiatives" class="dashboard-card">
        <h2>Manage Initiatives</h2>
        <p>Create environmental initiatives and manage listings.</p>
      </RouterLink>

      <RouterLink to="/organise/registrations" class="dashboard-card">
        <h2>Registration Management</h2>
        <p>View and manage participant registrations.</p>
      </RouterLink>

      <RouterLink to="/organise/resources" class="dashboard-card">
        <h2>Organiser Resources</h2>
        <p>Access guides and resources for organisers.</p>
      </RouterLink>
    </div>
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
  display: block;
  padding: 2rem;
  color: inherit;
  text-decoration: none;
  border: 1px solid #c8d2c9;
  border-radius: 12px;
  background-color: white;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
</style>
