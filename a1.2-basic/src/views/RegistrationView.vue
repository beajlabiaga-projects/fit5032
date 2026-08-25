<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = ref({
  name: null,
  email: null,
  password: null,
  confirmPassword: null,
})

const successMessage = ref('')

const validateName = (blur) => {
  const name = formData.value.name.trim()

  if (!name) {
    if (blur) errors.value.name = 'Name required.'
  } else if (name.length < 3) {
    if (blur) errors.value.name = 'Name must contain at least 3 characters.'
  } else {
    errors.value.name = null
  }
}

const validateEmail = (blur) => {
  const email = formData.value.email.trim()
  const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!email) {
    if (blur) errors.value.email = 'Email is required.'
  } else if (!validFormat) {
    if (blur) errors.value.email = 'Please enter a valid email address.'
  } else {
    errors.value.email = null
  }
}
</script>
