<script setup>
import { computed, ref } from 'vue'
import InitiativeMap from '@/components/InitiativeMap.vue'
import InitiativeCard from '@/components/InitiativeCard.vue'
import { initiatives } from '@/data/initiatives.js'

//store the filter values selected by user
const search = ref('')
const selectedCategory = ref('')
const selectedAvailability = ref('')

//create category options from the initiative data
const categories = computed(() => [
  ...new Set(initiatives.map((initiative) => initiative.category)),
])

//display only initatives that match all filters
const filteredInitiatives = computed(() => {
  return initiatives.filter((initiative) => {
    const searchText = search.value.toLowerCase()
    const matchesSearch =
      initiative.title.toLowerCase().includes(searchText) ||
      initiative.location.toLowerCase().includes(searchText)

    const matchesCategory =
      !selectedCategory.value || initiative.category === selectedCategory.value

    const matchesAvailability =
      !selectedAvailability.value || initiative.availability === selectedAvailability.value

    return matchesSearch && matchesCategory && matchesAvailability
  })
})

const clearFilters = () => {
  search.value = ''
  selectedCategory.value = ''
  selectedAvailability.value = ''
}
</script>

<template>
  <section class="browse-page">
    <header class="page-heading">
      <p class="eyebrow">Discover</p>
      <h1>Browse Local Initiatives</h1>
      <p>Explore environmental activities taking place across Melbourne.</p>
    </header>
    <!-- Interactive map of Melbourne initiatives -->
    <InitiativeMap />

    <section class="filter-bar" aria-label="Filter Initiatives">
      <div class="filter-field">
        <label for="initiative-search">Search</label>
        <input
          id="initiative-seacrh"
          v-model="search"
          type="searc"
          placeholder="Search by name or location"
        />
      </div>

      <div class="filter-field">
        <label for="category-filter">Category</label>
        <select id="category-filter" v-model="selectedCategory">
          <option value="">All categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="filter-field">
        <label for="availability-filter">Availability</label>
        <select id="availability-filter" v-model="selectedAvailability">
          <option value="">All availability</option>
          <option value="Places available">Places available</option>
          <option value="Limited places">Limited places</option>
        </select>
      </div>

      <button type="button" @click="clearFilters">Clear filters</button>
    </section>
    <!-- generate one reusable card for each initiative in the data array -->
    <div v-if="filteredInitiatives.length" class="initiative-grid">
      <InitiativeCard
        v-for="initiative in filteredInitiatives"
        :key="initiative.id"
        :initiative="initiative"
      />
    </div>

    <p v-else class="no-results">No initiatives match the selected filters.</p>
  </section>
</template>

<style scoped>
.browse-page {
  width: min(1450px, 100%);
  margin: 0 auto;
  padding: 3rem 5%;
  box-sizing: border-box;
}

.page-heading {
  max-width: 700px;
  margin-bottom: 2rem;
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

.page-heading > p:last-child {
  line-height: 1.6;
}

.filter-bar {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #d9e2dc;
  border-radius: 0.75rem;
  background: #f4f7f4;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filter-field label {
  color: #183d28;
  font-weight: 700;
}

.filter-field input,
.filter-field select {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem;
  border: 1px solid #9daf9f;
  border-radius: 0.4rem;
  background: white;
  font: inherit;
}

.filter-bar button {
  padding: 0.75rem 1rem;
  border: 1px solid #2f6f44;
  border-radius: 0.4rem;
  background: white;
  color: #245c38;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.filter-field input:focus,
.filter-field select:focus,
.filter-bar button:focus-visible {
  outline: 3px solid rgba(47, 111, 68, 0.25);
  outline-offset: 2px;
}

.initiative-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.no-results {
  padding: 2rem;
  text-align: center;
  color: #526158;
}

@media (min-width: 576px) {
  .initiative-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .initiative-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .filter-bar {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 576px) {
  .filter-bar {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1400px) {
  .browse-page {
    width: min(1320px, 100%);
  }
}
</style>
