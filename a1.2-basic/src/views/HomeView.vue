<template>
  <section class="hero">
    <div class="hero-content">
      <p class="eyebrow">Discover, Participate, Learn, Connect</p>

      <h1>Take local action for a greener Melbourne</h1>

      <p class="introduction">
        Find environmental initiatives, learn about urban biodiversity, and connect with people
        working to make Melbourne greener.
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  min-height: 70vh;
  padding: 4rem 8%;
  background-color: #e8f3eb;
}

.hero-content {
  max-width: 720px;
}

.eyebrow {
  color: #2f6f44;
  font-weight: 700;
  letter-spacing: 0.05rem;
}

h1 {
  max-width: 650px;
  margin: 1rem 0;
  color: #183d28;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.1;
}

.introduction {
  max-width: 620px;
  color: #405448;
  font-size: 1.15rem;
  line-height: 1.7;
}

@media (max-width: 575px) {
  .hero {
    align-items: flex-start;
    min-height: auto;
    padding: 3rem 1.25rem;
  }

  .introduction {
    font-size: 1rem;
  }
}
</style>
