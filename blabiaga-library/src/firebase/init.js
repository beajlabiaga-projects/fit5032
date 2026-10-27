import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDQZL4MDKmU2IVaLzKPYJeawrExBABT19I',
  authDomain: 'efolio-fit5032-a2206.firebaseapp.com',
  projectId: 'efolio-fit5032-a2206',
  storageBucket: 'efolio-fit5032-a2206.firebasestorage.app',
  messagingSenderId: '358921193976',
  appId: '1:358921193976:web:af4207ac9c4c32cd836e0d',
}

initializeApp(firebaseConfig)

const db = getFirestore()
export default db
