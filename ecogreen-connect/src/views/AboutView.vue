<script setup>
import { ref, watch } from 'vue'

// Keep an unfinished support message in the browser.
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
const CONTACT_DRAFT_KEY = 'ecogreenContactDraft'
const savedDraft = JSON.parse(localStorage.getItem(CONTACT_DRAFT_KEY) || 'null')

const formData = ref(
  savedDraft || {
    name: '',
    email: '',
    subject: '',
    message: '',
  },
)

watch(
  formData,
  (newFormData) => {
    const hasContent = Object.values(newFormData).some((value) => value.trim())

    if (hasContent) {
      localStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify(newFormData))
    } else {
      localStorage.removeItem(CONTACT_DRAFT_KEY)
    }
  },
  { deep: true },
)

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
        <label for="support-email">User email address</label>
        <input id="support-email" v-model="formData.email" type="email" />
        <small>We’ll use this address to reply to your inquiry.</small>
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
        <small>Options for attachment include: PDF, Word document or image.</small>
      </div>

      <button type="submit" :disabled="isSending">
        {{ isSending ? 'Sending…' : 'Send message' }}
      </button>

      <p
        v-if="statusMessage"
        class="status-message"
        :class="statusType"
        role="status"
        aria-live="polite"
      >
        {{ statusMessage }}
      </p>
    </form>
  </main>
</template>

<style scoped>
.support-page {
  min-height: calc(100vh - 76px);
  padding: 64px 24px;
  background: #f4f2e9;
  color: #173c2b;
}

.support-page > * {
  width: min(100%, 760px);
  margin-left: auto;
  margin-right: auto;
}

.eyebrow {
  margin-bottom: 10px;
  color: #287548;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

h1 {
  margin: 0 0 14px;
  color: #123d2a;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  line-height: 1.1;
}

.support-page > p:not(.eyebrow) {
  margin-bottom: 32px;
  color: #415248;
  font-size: 1.05rem;
}

.support-form {
  padding: 32px;
  border: 1px solid #d6ddd6;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 30px rgba(19, 61, 42, 0.08);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

label {
  font-weight: 700;
}

input,
textarea {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid #9eafa5;
  border-radius: 8px;
  background: #ffffff;
  color: #24362c;
  font: inherit;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: 3px solid rgba(40, 117, 72, 0.2);
  border-color: #287548;
}

textarea {
  resize: vertical;
}

input[type='file'] {
  padding: 10px;
}

small {
  color: #5e6d64;
}

button {
  padding: 13px 22px;
  border: 0;
  border-radius: 8px;
  background: #1f7141;
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background: #175a33;
}

button:disabled {
  cursor: wait;
  opacity: 0.65;
}

.status-message {
  margin: 18px 0 0;
  padding: 12px 14px;
  border-radius: 8px;
}

.status-message.success {
  background: #e5f4e9;
  color: #155d35;
}

.status-message.error {
  background: #fde8e7;
  color: #a12622;
}

@media (max-width: 600px) {
  .support-page {
    padding: 40px 16px;
  }

  .support-form {
    padding: 22px 18px;
  }
}
</style>
