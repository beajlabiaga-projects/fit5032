<script setup>
import InitiativeCard from '@/components/InitiativeCard.vue'
import { initiatives } from '@/data/initiatives.js'
</script>

<template>
  <section class="browse-page">
    <header class="page-heading">
      <p class="eyebrow">Discover</p>
      <h1>Browse Local Initiatives</h1>
      <p>Explore environmental activities taking place across Melbourne.</p>
    </header>
    <!-- Generate one reusable card for each initiative in the data array -->
    <div class="initiative-grid">
      <InitiativeCard
        v-for="initiative in initiatives"
        :key="initiative.id"
        :initiative="initiative"
      />
    </div>
  </section>
</template>

<style scoped>
.browse-page {
  width: min(1450px, 100%);
  margin: 0 auto;
  padding: 3rem 5%;
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

.initiative-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
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

@media (min-width: 1400px) {
  .browse-page {
    width: min(1320px, 100%);
  }
}
</style>
