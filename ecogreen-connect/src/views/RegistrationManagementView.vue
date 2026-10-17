<script setup>
import InteractiveTable from '../components/InteractiveTable.vue'

// Define the columns displayed in the registration table.
const registrationColumns = [
  { key: 'id', label: 'ID' },
  { key: 'participant', label: 'Participant' },
  { key: 'email', label: 'Email' },
  { key: 'initiative', label: 'Initiative' },
  { key: 'registered', label: 'Registered' },
  { key: 'status', label: 'Status' },
]

// Sample registrations that organisers can search and review.
const registrationRows = [
  {
    id: 1,
    participant: 'Alex Chen',
    email: 'alex.chen@example.com',
    initiative: 'Community Tree Planting',
    registered: '1 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 2,
    participant: 'Mia Patel',
    email: 'mia.patel@example.com',
    initiative: 'Native Habitat Restoration',
    registered: '2 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 3,
    participant: 'Noah Williams',
    email: 'noah.williams@example.com',
    initiative: 'Urban Garden Working Bee',
    registered: '3 Sep 2026',
    status: 'Waitlisted',
  },
  {
    id: 4,
    participant: 'Sophie Nguyen',
    email: 'sophie.nguyen@example.com',
    initiative: 'Yarra River Clean-up',
    registered: '4 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 5,
    participant: 'Liam Brown',
    email: 'liam.brown@example.com',
    initiative: 'Pollinator Garden Project',
    registered: '5 Sep 2026',
    status: 'Cancelled',
  },
  {
    id: 6,
    participant: 'Grace Lee',
    email: 'grace.lee@example.com',
    initiative: 'Community Compost Workshop',
    registered: '6 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 7,
    participant: 'Ethan Taylor',
    email: 'ethan.taylor@example.com',
    initiative: 'Coastal Dune Restoration',
    registered: '7 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 8,
    participant: 'Isla Wilson',
    email: 'isla.wilson@example.com',
    initiative: 'Native Seed Collection',
    registered: '8 Sep 2026',
    status: 'Waitlisted',
  },
  {
    id: 9,
    participant: 'Lucas Martin',
    email: 'lucas.martin@example.com',
    initiative: 'Neighbourhood Clean-up',
    registered: '9 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 10,
    participant: 'Zoe Anderson',
    email: 'zoe.anderson@example.com',
    initiative: 'Waterwise Gardening',
    registered: '10 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 11,
    participant: 'Oliver Thomas',
    email: 'oliver.thomas@example.com',
    initiative: 'Wetland Planting Day',
    registered: '11 Sep 2026',
    status: 'Cancelled',
  },
  {
    id: 12,
    participant: 'Ava Robinson',
    email: 'ava.robinson@example.com',
    initiative: 'Summer Sustainability Fair',
    registered: '12 Sep 2026',
    status: 'Confirmed',
  },
]
</script>

<template>
  <main class="organiser-page">
    <header>
      <p class="eyebrow">Organiser</p>
      <h1>Registration Management</h1>
      <p>Search, sort and review participant registrations for EcoGreen initiatives.</p>
    </header>

    <InteractiveTable :columns="registrationColumns" :rows="registrationRows" />
  </main>
</template>

<style scoped>
.organiser-page {
  min-height: calc(100vh - 70px);
  padding: 3rem 5%;
  background-color: #f3f1e8;
  color: #26352c;
  box-sizing: border-box;
}

header {
  width: min(1320px, 100%);
  margin: 0 auto;
}

.organiser-page > :deep(.table-panel) {
  width: min(1320px, 100%);
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

.eyebrow {
  margin-bottom: 0.5rem;
  color: #2f6f44;
  font-weight: 700;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #174b2d;
  font-size: clamp(2rem, 5vw, 3.25rem);
}

header > p:last-child {
  max-width: 700px;
}
</style>
