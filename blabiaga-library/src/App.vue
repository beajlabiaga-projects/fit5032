<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>

    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.main-container {
  width: 100%;
}

.main-box {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
