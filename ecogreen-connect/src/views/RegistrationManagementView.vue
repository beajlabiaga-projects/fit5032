<script setup>
import { computed, ref } from 'vue'
import InteractiveTable from '../components/InteractiveTable.vue'

const registeredUsers = JSON.parse(localStorage.getItem('ecogreenUsers') || '[]')

const selectedEmails = ref([])
const bulkSubject = ref('')
const bulkMessage = ref('')
const bulkStatus = ref('')
const isSending = ref(false)

const canSendBulkEmail = computed(
  () => selectedEmails.value.length > 0 && bulkSubject.value.trim() && bulkMessage.value.trim(),
)

const sendBulkEmail = async () => {
  bulkStatus.value = ''
  isSending.value = true

  try {
    const response = await fetch(import.meta.env.VITE_EMAIL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'bulk',
        recipients: selectedEmails.value,
        subject: bulkSubject.value,
        message: bulkMessage.value,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'The bulk email could not be sent.')
    }

    bulkStatus.value = `Email sent to ${selectedEmails.value.length} selected users.`
    selectedEmails.value = []
    bulkSubject.value = ''
    bulkMessage.value = ''
  } catch (error) {
    bulkStatus.value = error.message
  } finally {
    isSending.value = false
  }
}

// define the columns displayed in the registration table
const registrationColumns = [
  { key: 'id', label: 'ID' },
  { key: 'participant', label: 'Participant' },
  { key: 'email', label: 'Email' },
  { key: 'initiative', label: 'Initiative' },
  { key: 'registered', label: 'Registered' },
  { key: 'status', label: 'Status' },
]

// sample registrations that organisers can search and review.
const registrationRows = [
  {
    id: 1,
    participant: 'Alex Chen',
    email: 'alex.chen@example.com',
    initiative: 'Community Tree Planting',
    registered: '1 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 2,
    participant: 'Mia Patel',
    email: 'mia.patel@example.com',
    initiative: 'Native Habitat Restoration',
    registered: '2 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 3,
    participant: 'Noah Williams',
    email: 'noah.williams@example.com',
    initiative: 'Urban Garden Working Bee',
    registered: '3 Sep 2026',
    status: 'Waitlisted',
  },
  {
    id: 4,
    participant: 'Sophie Nguyen',
    email: 'sophie.nguyen@example.com',
    initiative: 'Yarra River Clean-up',
    registered: '4 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 5,
    participant: 'Liam Brown',
    email: 'liam.brown@example.com',
    initiative: 'Pollinator Garden Project',
    registered: '5 Sep 2026',
    status: 'Cancelled',
  },
  {
    id: 6,
    participant: 'Grace Lee',
    email: 'grace.lee@example.com',
    initiative: 'Community Compost Workshop',
    registered: '6 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 7,
    participant: 'Ethan Taylor',
    email: 'ethan.taylor@example.com',
    initiative: 'Coastal Dune Restoration',
    registered: '7 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 8,
    participant: 'Isla Wilson',
    email: 'isla.wilson@example.com',
    initiative: 'Native Seed Collection',
    registered: '8 Sep 2026',
    status: 'Waitlisted',
  },
  {
    id: 9,
    participant: 'Lucas Martin',
    email: 'lucas.martin@example.com',
    initiative: 'Neighbourhood Clean-up',
    registered: '9 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 10,
    participant: 'Zoe Anderson',
    email: 'zoe.anderson@example.com',
    initiative: 'Waterwise Gardening',
    registered: '10 Sep 2026',
    status: 'Confirmed',
  },
  {
    id: 11,
    participant: 'Oliver Thomas',
    email: 'oliver.thomas@example.com',
    initiative: 'Wetland Planting Day',
    registered: '11 Sep 2026',
    status: 'Cancelled',
  },
  {
    id: 12,
    participant: 'Ava Robinson',
    email: 'ava.robinson@example.com',
    initiative: 'Summer Sustainability Fair',
    registered: '12 Sep 2026',
    status: 'Confirmed',
  },
]
</script>

<template>
  <main class="organiser-page">
    <header>
      <p class="eyebrow">Organiser</p>
      <h1>Registration Management</h1>
      <p>Search, sort and review (sample) participant registrations for EcoGreen initiatives.</p>
    </header>

    <section class="bulk-email-panel">
      <h2>Send bulk email</h2>
      <p>Select registered website accounts and send the same message to all selected users.</p>

      <form @submit.prevent="sendBulkEmail">
        <fieldset>
          <legend>Select recipients</legend>

          <label v-for="user in registeredUsers" :key="user.email" class="recipient-option">
            <input v-model="selectedEmails" type="checkbox" :value="user.email" />
            {{ user.name }} — {{ user.email }}
          </label>

          <p v-if="registeredUsers.length === 0">No registered website accounts are available.</p>
        </fieldset>

        <label class="bulk-field">
          Subject
          <input v-model="bulkSubject" type="text" required />
        </label>

        <label class="bulk-field">
          Message
          <textarea v-model="bulkMessage" rows="5" required></textarea>
        </label>

        <button type="submit" :disabled="!canSendBulkEmail || isSending">
          {{ isSending ? 'Sending…' : 'Send to selected users' }}
        </button>

        <p v-if="bulkStatus" role="status" aria-live="polite">
          {{ bulkStatus }}
        </p>
      </form>
    </section>

    <InteractiveTable :columns="registrationColumns" :rows="registrationRows" />
  </main>
</template>

<style scoped>
.organiser-page {
  min-height: calc(100vh - 70px);
  padding: 3rem 5%;
  background-color: #f3f1e8;
  color: #26352c;
  box-sizing: border-box;
}

header {
  width: min(1320px, 100%);
  margin: 0 auto;
}

.organiser-page > :deep(.table-panel) {
  width: min(1320px, 100%);
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

.eyebrow {
  margin-bottom: 0.5rem;
  color: #2f6f44;
  font-weight: 700;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #174b2d;
  font-size: clamp(2rem, 5vw, 3.25rem);
}

header > p:last-child {
  max-width: 700px;
}

.bulk-email-panel {
  width: min(1320px, 100%);
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #d6ddd6;
  border-radius: 12px;
  background: white;
  box-sizing: border-box;
}

.bulk-email-panel h2 {
  margin-top: 0;
  color: #174b2d;
}

.bulk-email-panel form {
  display: grid;
  gap: 1rem;
}

.bulk-email-panel fieldset {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #9daf9f;
  border-radius: 8px;
}

.recipient-option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.recipient-option input {
  width: auto;
}

.bulk-field {
  display: grid;
  gap: 0.4rem;
  font-weight: 700;
}

.bulk-field input,
.bulk-field textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #9daf9f;
  border-radius: 6px;
  font: inherit;
}

.bulk-email-panel button {
  justify-self: start;
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 6px;
  background: #2f6f44;
  color: white;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.bulk-email-panel button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
