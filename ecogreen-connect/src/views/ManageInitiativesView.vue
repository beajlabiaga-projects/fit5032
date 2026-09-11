<template>
  <main class="manage-page">
    <header>
      <p class="eyebrow">Organiser</p>
      <h1>Manage Initiatives</h1>
      <p>Create new initiatives and manage listings.</p>
    </header>
  </main>
</template>

<style scoped>
.manage-page {
  width: min(1320px, 100%);
  min-height: calc(100vh - 70px);
  margin: 0 auto;
  padding: 3rem 5%;
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
</style>
