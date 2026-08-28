<script setup>
import { facts } from '../data/facts'
</script>

<template>
  <main class="learn-page">
    <section class="learn-intro">
      <p class="eyebrow">Learn</p>
      <h1>Melbourne's urban environment</h1>
      <p>Discover how trees and biodiversity contribute to a healthier and more resilient city.</p>
    </section>

    <section class="facts-grid" aria-label="Environmental facts">
      <article v-for="fact in facts" :key="fact.id" class="fact-card">
        <p class="fact-number">{{ fact.number }}</p>
        <h2>{{ fact.title }}</h2>
        <p>{{ fact.description }}</p>

        <a :href="fact.sourceUrl" target="_blank" rel="noopener noreferrer" class="source-link">
          Source: {{ fact.sourceName }}
        </a>
      </article>
    </section>
  </main>
</template>

<style scope>
.learn-page {
  min-height: calc(100vh - 70px);
  padding: 4rem 8%;
  background-color: #f3f1e8;
}

.learn-intro {
  max-width: 750px;
  margin-bottom: 3rem;
}

.eyebrow {
  color: #2f6f44;
  font-weight: 700;
  letter-spacing: 0.05rem;
}

h1 {
  margin: 0.75rem 0 1rem;
  color: #183d28;
  font-size: clamp(2rem, 5vw, 4rem);
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5 rem;
}

.fact-card {
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 8px rgba(24, 61, 20, 0.08);
}

.fact-number {
  margin: 0;
  color: #2f6f44;
  font-size: 2.5rem;
  font-weight: 700;
}

.fact-card h2 {
  color: #183d28;
}

source-link {
  display: inline-block;
  margin-top: 1rem;
  color: #24733f;
  font-weight: 600;
}

@media (max-width: 768px) {
  .learn-page {
    padding: 3rem 5%;
  }
  .facts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
