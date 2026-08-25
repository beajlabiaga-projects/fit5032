<script setup>
defineProps({
  initiative: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="initiative-card">
    <div class="card-image">
      <img v-if="initiative.image" :src="initiative.image" :alt="initiative.imageAlt" />
      <span v-else>Photo</span>
    </div>

    <p class="category">{{ initiative.category }}</p>
    <h2>{{ initiative.title }}</h2>
    <p class="description">{{ initiative.description }}</p>

    <dl>
      <div>
        <dt>Location</dt>
        <dd>{{ initiative.location }}</dd>
      </div>

      <div>
        <dt>Date</dt>
        <dd>{{ initiative.date }}</dd>
      </div>
    </dl>

    <p class="availability">{{ initiative.availability }}</p>
  </article>
</template>

<style scoped>
.initiative-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: #ffffff;
  border: 1px solid #d9e2dc;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 1rem rgba(24, 61, 40, 0.08);
}

.card-image {
  display: grid;
  place-items: center;
  width: calc(100% + 3rem);
  height: 220px;
  margin: -1.5rem -1.5rem 1.5rem;
  overflow: hidden;
  color: #607468;
  background-color: #e8efea;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category {
  margin: 0 0 0.5rem;
  color: #2f6f44;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  color: #183d28;
  font-size: 1.35rem;
}

.description {
  flex-grow: 1;
  line-height: 1.6;
}

dl {
  margin: 1rem 0;
}

dl div {
  margin-top: 0.75rem;
}

dt {
  font-weight: 700;
}

dd {
  margin: 0.2rem 0 0;
}

.availability {
  margin: 0;
  color: #1f7a43;
  font-weight: 700;
}
</style>
