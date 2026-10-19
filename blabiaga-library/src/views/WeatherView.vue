<template>
  <div class="container text-center mt-4">
    <h1>WEATHER APP</h1>

    <div class="weather-search mt-4">
      <input v-model="city" type="text" class="form-control" placeholder="Enter city name" />

      <button @click="searchByCity" class="btn btn-primary">Search</button>
    </div>

    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>

    <div v-if="weatherData" class="mt-4">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>

      <img
        :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
        alt="Weather icon"
      />

      <h3>{{ Math.round(weatherData.main.temp) }}°C</h3>

      <p>{{ weatherData.weather[0].description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const city = ref('')

const weatherData = ref(null)
const errorMessage = ref('')

const searchByCity = async () => {
  if (!city.value.trim()) {
    errorMessage.value = 'Please enter a city name.'
    return
  }

  try {
    errorMessage.value = ''

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city.value.trim(),
        appid: apiKey,
        units: 'metric',
      },
    })

    weatherData.value = response.data
  } catch (error) {
    weatherData.value = null
    errorMessage.value = 'Unable to find weather for this city.'
    console.error(error)
  }
}

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
</script>

<style scoped>
.weather-search {
  display: flex;
  justify-content: center;
  gap: 10px;
  max-width: 450px;
  margin: 0 auto;
}

.form-control {
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 10px 15px;
}

.form-control:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}

.btn-primary {
  border-radius: 8px;
  padding: 10px 22px;
}
</style>
