import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDQZL4MDKmU2IVaLzKPYJeawrExBABT19I',
  authDomain: 'efolio-fit5032-a2206.firebaseapp.com',
  projectId: 'efolio-fit5032-a2206',
  storageBucket: 'efolio-fit5032-a2206.firebasestorage.app',
  messagingSenderId: '358921193976',
  appId: '1:358921193976:web:af4207ac9c4c32cd836e0d',
}

initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.use(router)

app.mount('#app')
