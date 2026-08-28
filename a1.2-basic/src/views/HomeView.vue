<script setup>
import homePageImage from '../assets/images/home-page.jpg'
</script>

<template>
  <section class="home">
    <div class="home-content">
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
.home {
  display: flex;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3rem;
  align-items: center;
  min-height: calc(100vh - 70px);
  padding: 4rem 8%;
  /* apply a gradient coat to keep the text readable */
  background-image:
    linear-gradient(
      90deg,
      rgba(15, 48, 31, 0.92%) 0%,
      rgba(15, 48, 31, 0.78%) 45%,
      rgba(15, 48, 31, 0.15%) 100%
    ),
    url('../assets/images/home-page.jpg');
  background-size: cover;
  background-position: center;
}

.home-content {
  max-width: 720px;
  transform: translateY(-4rem);
}

.eyebrow,
h1 {
  color: #d8f0df;
  font-weight: 700;
  letter-spacing: 0.05rem;
}

h1 {
  max-width: 650px;
  margin: 1rem 0;
  color: #ffffff;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.1;
}

.introduction {
  max-width: 620px;
  color: #f1f7f3;
  font-size: 1.15rem;
  line-height: 1.7;
}

@media (max-width: 575px) {
  .home {
    transform: none;
  }

  .home-image-container {
    height: 300px;
  }

  .introduction {
    font-size: 1rem;
  }
}
</style>
