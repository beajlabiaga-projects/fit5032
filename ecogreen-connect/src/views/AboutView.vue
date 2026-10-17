<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const attachment = ref(null)
const fileInput = ref(null)
const statusMessage = ref('')
const statusType = ref('')
const isSending = ref(false)

const handleAttachment = (event) => {
  const file = event.target.files[0] || null

  if (file && file.size > 2 * 1024 * 1024) {
    attachment.value = null
    event.target.value = ''
    statusType.value = 'error'
    statusMessage.value = 'The attachment must be 2 MB or smaller.'
    return
  }

  attachment.value = file
  statusMessage.value = ''
}

const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result.split(',')[1])
    }

    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const submitForm = async () => {
  statusMessage.value = ''
  statusType.value = ''
  isSending.value = true

  try {
    let encodedAttachment = null

    if (attachment.value) {
      encodedAttachment = {
        name: attachment.value.name,
        type: attachment.value.type,
        content: await convertFileToBase64(attachment.value),
      }
    }

    const response = await fetch(import.meta.env.VITE_EMAIL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData.value,
        attachment: encodedAttachment,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'The email could not be sent.')
    }

    statusType.value = 'success'
    statusMessage.value = 'Your message has been sent successfully.'

    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }

    attachment.value = null

    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (error) {
    statusType.value = 'error'
    statusMessage.value = error.message || 'The email could not be sent. Please try again.'
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <main class="support-page">
    <p class="eyebrow">SUPPORT</p>
    <h1>Contact our team</h1>
    <p>Send us a question or request assistance with an initiative.</p>
    <form class="support-form" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="support-name">Name</label>
        <input id="support-name" v-model="formData.name" type="text" />
      </div>

      <div class="form-group">
        <label for="support-email">Email address</label>
        <input id="support-email" v-model="formData.email" type="email" />
      </div>

      <div class="form-group">
        <label for="support-subject">Subject</label>
        <input id="support-subject" v-model="formData.subject" type="text" />
      </div>

      <div class="form-group">
        <label for="support-message">Message</label>
        <textarea id="support-message" v-model="formData.message" rows="6"></textarea>
      </div>

      <div class="form-group">
        <label for="support-attachment">Attachment</label>
        <input
          id="support-attachment"
          type="file"
          accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
          @change="handleAttachment"
        />
      </div>

      <button type="submit">Send message</button>
    </form>
  </main>
</template>

<style scoped></style>
