<template>
  <h1>Add a Book</h1>

  <form @submit.prevent="addBook">
    <p>
      <input type="text" inputmode="numeric" placeholder="ISBN" v-model.number="isbn" required />
    </p>

    <p>
      <input type="text" placeholder="Book Name" v-model="name" required />
    </p>

    <button type="submit">Add Book</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import db from '../firebase/init'
import { collection, addDoc } from 'firebase/firestore'

const isbn = ref(null)
const name = ref('')

const addBook = async () => {
  try {
    await addDoc(collection(db, 'books'), {
      isbn: isbn.value,
      name: name.value,
    })

    console.log('Book added successfully!')
  } catch (error) {
    console.error('Error adding book:', error)
  }
}
</script>

<style scoped>
input {
  background-color: #ffffff;
  color: #1e293b;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  padding: 12px 16px;
  width: 300px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px #dbeafe;
}

button {
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #1d4ed8;
}
</style>
