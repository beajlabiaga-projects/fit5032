<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const attachment = ref(null)

// Store the file selected by user so it can be attached to the email
const handleAttachment = (event) => {
  attachment.value = event.target.files[0] || null
}
</script>

<template>
  <main class="support-page">
    <p class="eyebrow">SUPPORT</p>
    <h1>Contact our team</h1>
    <p>Send us a question or request assistance with an initiative.</p>
    <form class="support-form">
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
