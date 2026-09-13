<script setup>
import { computed, ref } from 'vue'
import { currentUser, isAuthenticated } from '../auth/session'

const props = defineProps({
  initiativeId: {
    type: Number,
    required: true,
  },
})

const selectedRating = ref('')
const message = ref('')

const savedRatings = JSON.parse(localStorage.getItem('ecogreenRatings')) || []
const ratings = ref(savedRatings)
//Keep only the ratings that belong to this initiative
const initiativeRatings = computed(() =>
  ratings.value.filter((rating) => rating.initiativeId === props.initiativeId),
)
//Calculate aggregated avg from all ratings for this initiatives
//https://vuejs.org/guide/essentials/computed.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
const averageRating = computed(() => {
  if (initiativeRatings.value.length === 0) return null

  const total = initiativeRatings.value.reduce((sum, rating) => sum + rating.score, 0)
  return (total / initiativeRatings.value.length).toFixed(1)
})

const submitRating = () => {
  message.value = ''

  if (!isAuthenticated.value) {
    message.value = 'Please log in to rate this initiative.'
    return
  }

  const score = Number(selectedRating.value)
  //Accept only whole number ratings from 1 to 5
  if (!Number.isInteger(score) || score < 1 || score > 5) {
    message.value = 'Please select a number rating from 1 to 5.'
    return
  }
  //Only allow one rating per user for each initiative
  const existingRating = ratings.value.find(
    (rating) =>
      rating.initiativeId === props.initiativeId && rating.email === currentUser.value.email,
  )
  //Instead of duplicating, update an existing rating when user edits their rating
  if (existingRating) {
    existingRating.score = score
    message.value = 'Your rating has been updated.'
  } else {
    ratings.value.push({
      initiativeId: props.initiativeId,
      email: currentUser.value.email,
      score,
    })

    message.value = 'Thank you for your rating.'
  }
  // Save ratings in the browser using Web Storage API
  //https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
  localStorage.setItem('ecogreenRatings', JSON.stringify(ratings.value))
}
</script>

<template>
  <section class="rating-section" aria-label="Initiative rating">
    <p v-if="averageRating">
      Average rating: <strong>{{ averageRating }} / 5</strong> ({{ initiativeRatings.length }}
      {{ initiativeRatings.length === 1 ? 'rating' : 'ratings' }})
    </p>

    <p v-else>No ratings yet.</p>
    <!--Only logged in users can see rating form-->
    <form v-if="isAuthenticated" @submit.prevent="submitRating">
      <label :for="`rating-${initiativeId}`">Your rating</label>

      <select :id="`rating-${initiativeId}`" v-model="selectedRating">
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <button type="submit">Submit rating</button>
    </form>

    <p v-else class="rating-message">Please log in to rate this initiative.</p>

    <p v-if="message" class="rating-message" role="status">
      {{ message }}
    </p>
  </section>
</template>

<style scoped>
.rating-section {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #d9e2dc;
}

.rating-section form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

select,
button {
  padding: 0.6rem 0.75rem;
  font: inherit;
}

button {
  color: white;
  background-color: #1f7a43;
  border: 0;
  border-radius: 0.4rem;
  cursor: pointer;
}

.rating-message {
  color: #2f6f44;
  font-weight: 700;
}
</style>
