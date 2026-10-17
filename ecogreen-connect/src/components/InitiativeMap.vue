<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

// store the html element that will contain the map
const mapElement = ref(null)

// store the Leaflet map so it can be removed when leaving the page
let map = null

// message shown after the user requests their location
const locationMessage = ref('')

// ask Leaflet to find the user's current location
const findMyLocation = () => {
  locationMessage.value = 'Finding your location...'

  map.locate({
    setView: true,
    maxZoom: 15,
  })
}

// locations displayed in discover page (initiatives)
// for everything in here: https://leafletjs.com/examples/quick-start/
const initiativeLocations = [
  {
    title: 'Community Tree Planting',
    location: 'Carlton Gardens',
    coordinates: [-37.8055, 144.9714],
  },
  {
    title: 'Native Habitat Restoration',
    location: 'Merri Creek',
    coordinates: [-37.778, 144.992],
  },
  {
    title: 'Urban Garden Working Bee',
    location: 'Fitzroy Community Garden',
    coordinates: [-37.798, 144.978],
  },
  {
    title: 'Adopt-a-Tree',
    location: 'Melbourne SkyFarm',
    coordinates: [-37.822, 144.935],
  },
  {
    title: 'Pollinator Pathway Gardening',
    location: 'Melbourne Zoo',
    coordinates: [-37.7841, 144.9516],
  },
  {
    title: 'Vertical Green Wall',
    location: 'Carlton Neighbourhood Learning Centre',
    coordinates: [-37.783, 144.969],
  },
]
onMounted(() => {
  // leaflet was loaded through the CDN in index.html
  const L = window.L

  // create the map and center it on Melbourne
  map = L.map(mapElement.value).setView([-37.8136, 144.9631], 12)

  // display the OpenStreetMap map layer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  // add a clickable icon(?) and information popup for each initiative
  initiativeLocations.forEach((initiative) => {
    L.marker(initiative.coordinates)
      .addTo(map)
      .bindPopup(`<strong>${initiative.title}</strong><br>${initiative.location}`)
  })

  // show the user's location when it is found
  map.on('locationfound', (event) => {
    L.marker(event.latlng).addTo(map).bindPopup('You are here').openPopup()

    locationMessage.value = 'Your location was found.'
  })

  // show an accessible error if location permission is denied
  map.on('locationerror', () => {
    locationMessage.value = 'Your location could not be found. Please allow location access.'
  })
})

onBeforeUnmount(() => {
  // clean up the map when the user leaves the page
  if (map) {
    map.remove()
  }
})
</script>

<template>
  <section class="map-section" aria-labelledby="map-heading">
    <h2 id="map-heading">Initiative map</h2>
    <p>Explore environmental initiatives across Melbourne.</p>

    <button type="button" class="location-button" @click="findMyLocation">Find my location</button>

    <p class="location-message" aria-live="polite">
      {{ locationMessage }}
    </p>

    <div
      ref="mapElement"
      class="initiative-map"
      aria-label="Map showing environmental initiatives in Melbourne"
    ></div>
  </section>
</template>

<style scoped>
.map-section {
  margin-bottom: 2rem;
}

.initiative-map {
  width: 100%;
  height: 450px;
  border: 1px solid #9daf9f;
  border-radius: 0.75rem;
}

.location-button {
  margin-bottom: 0.75rem;
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 0.4rem;
  background: #247a45;
  color: white;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.location-message {
  min-height: 1.5rem;
}
</style>
