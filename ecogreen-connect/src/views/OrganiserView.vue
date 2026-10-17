<script setup>
import { currentUser } from '../auth/session'
import { computed } from 'vue'
import { initiatives } from '../data/initiatives'

// retrive the locally stored members' profile for the admin dashboard.
const registeredUsers = computed(() => {
  return JSON.parse(localStorage.getItem('ecogreenUsers')) || []
})

// Summary information displayed on the organiser dashboard.
const dashboardStats = computed(() => [
  {
    label: 'Total users',
    value: registeredUsers.value.length + 1,
  },
  {
    label: 'Members',
    value: registeredUsers.value.length,
  },
  {
    label: 'Organisers',
    value: 1,
  },
  {
    label: 'Initiatives',
    value: initiatives.length,
  },
])
</script>

<template>
  <main class="organiser-page">
    <p class="eyebrow">Organiser</p>
    <h1>Organiser Dashboard</h1>
    <p>Welcome, {{ currentUser.name }}.</p>

    <section class="summary-section" aria-labelledby="summary-heading">
      <h2 id="summary-heading">System overview</h2>

      <div class="summary-grid">
        <article v-for="stat in dashboardStats" :key="stat.label" class="summary-card">
          <p class="summary-value">{{ stat.value }}</p>
          <h3>{{ stat.label }}</h3>
        </article>
      </div>
    </section>

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

.summary-section {
  margin-top: 2rem;
}

.summary-section h2 {
  color: #174b2d;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.summary-card {
  padding: 1.5rem;
  border: 1px solid #c8d2c9;
  border-radius: 12px;
  background-color: white;
}

.summary-card h3 {
  margin: 0.25rem 0 0;
  font-size: 1rem;
}

.summary-value {
  margin: 0;
  color: #18753c;
  font-size: 2.25rem;
  font-weight: 700;
}
</style>
