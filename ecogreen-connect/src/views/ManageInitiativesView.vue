<script setup>
import InteractiveTable from '@/components/InteractiveTable.vue'

//define the columns displayed in the initiative management table
const initiativeColumns = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Initiative' },
  { key: 'category', label: 'Category' },
  { key: 'location', label: 'Location' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
]

//sample initiative records used by organisers for listing management
const initiativeRows = [
  {
    id: 1,
    title: 'Community Tree Planting',
    category: 'Tree Planting',
    location: 'Carlton Gardens',
    date: '12 Sep 2026',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Native Habitat Restoration',
    category: 'Biodiversity',
    location: 'Merri Creek',
    date: '19 Sep 2026',
    status: 'Open',
  },
  {
    id: 3,
    title: 'Urban Garden Working Bee',
    category: 'Urban Greening',
    location: 'Fitzroy',
    date: '26 Sep 2026',
    status: 'Limited',
  },
  {
    id: 4,
    title: 'Yarra River Clean-up',
    category: 'Clean-up',
    location: 'Southbank',
    date: '3 Oct 2026',
    status: 'Open',
  },
  {
    id: 5,
    title: 'Pollinator Garden Project',
    category: 'Biodiversity',
    location: 'Brunswick',
    date: '10 Oct 2026',
    status: 'Open',
  },
  {
    id: 6,
    title: 'Community Compost Workshop',
    category: 'Education',
    location: 'Richmond',
    date: '17 Oct 2026',
    status: 'Full',
  },
  {
    id: 7,
    title: 'Coastal Dune Restoration',
    category: 'Restoration',
    location: 'St Kilda',
    date: '24 Oct 2026',
    status: 'Open',
  },
  {
    id: 8,
    title: 'Native Seed Collection',
    category: 'Biodiversity',
    location: 'Royal Park',
    date: '31 Oct 2026',
    status: 'Limited',
  },
  {
    id: 9,
    title: 'Neighbourhood Clean-up',
    category: 'Clean-up',
    location: 'Footscray',
    date: '7 Nov 2026',
    status: 'Open',
  },
  {
    id: 10,
    title: 'Waterwise Gardening',
    category: 'Education',
    location: 'Coburg',
    date: '14 Nov 2026',
    status: 'Open',
  },
  {
    id: 11,
    title: 'Wetland Planting Day',
    category: 'Tree Planting',
    location: 'Albert Park',
    date: '21 Nov 2026',
    status: 'Limited',
  },
  {
    id: 12,
    title: 'Summer Sustainability Fair',
    category: 'Community',
    location: 'Docklands',
    date: '28 Nov 2026',
    status: 'Open',
  },
]
</script>

<template>
  <main class="manage-page">
    <header>
      <p class="eyebrow">Organiser</p>
      <h1>Manage Initiatives</h1>
      <p>Search, sort and review the environmental initiatives listed on the website.</p>
    </header>

    <InteractiveTable :columns="initiativeColumns" :rows="initiativeRows" />
  </main>
</template>

<style scoped>
.manage-page {
  width: min(1320px, 100%);
  min-height: calc(100vh - 70px);
  margin: 0 auto;
  padding: 3rem 5%;
  box-sizing: border-box;
  color: #26352c;
}

.eyebrow {
  margin-bottom: 0.5rem;
  color: #2f6f44;
  font-weight: 700;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #183d28;
  font-size: clamp(2rem, 5vw, 3.25rem);
}

header > p:last-child {
  max-width: 700px;
}
</style>
