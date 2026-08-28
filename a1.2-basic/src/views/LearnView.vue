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
      <article v-for="fact in facts" :key="fact.id" class="fact-section">
        <img :src="fact.image" :alt="fact.imageAlt" class="fact-image" />

        <div class="fact-content">
          <p class="fact-number">{{ fact.number }}</p>
          <h2>{{ fact.title }}</h2>
          <p>{{ fact.description }}</p>

          <a :href="fact.sourceURL" target="_blank" rel="noopener noreferrer" class="source-link">
            Source: {{ fact.sourceName }}
          </a>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
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
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.fact-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  overflow: hidden;
  background-color: #fff;
  border-radius: 0.75rem;
}

.fact-section:nth-child(even) .fact-image {
  order: 2;
}

.fact-image {
  width: 100%;
  height: 380px;
  object-fit: cover;
}

.fact-content {
  padding: 3rem;
}

.fact-number {
  margin: 0 0 0.75rem;
  color: #2f7d4b;
  font-size: clamp(2.5rem, 4vw, 4rem);
  font-weight: 700;
  line-height: 1;
}

.fact-section h2 {
  margin: 0 0 1rem;
  color: #183d28;
  font-size: clamp(2.5rem, 4vw, 3rem);
  line-height: 1.2;
}

.source-link {
  display: inline-block;
  margin-top: 1rem;
  color: #24733f;
  font-weight: 600;
}

@media (max-width: 768px) {
  .learn-page {
    padding: 3rem 5%;
  }
  .fact-section {
    grid-template-columns: 1fr;
  }
  /* Alternates image postion for even numbered facts section*/
  /*https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-classes*/
  .fact-section:nth-child(even) .fact-image {
    order: 0;
  }

  .fact-image {
    height: 250px;
  }

  .fact-content {
    padding: 2rem;
  }
}
</style>
