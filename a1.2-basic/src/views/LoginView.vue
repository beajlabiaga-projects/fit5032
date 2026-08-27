<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const formData = ref({
  email: '',
  password: '',
})

const errors = ref({
  email: null,
  password: null,
})

const successMessage = ref('')

// Validate the email and provide feedback when user leaves field.//
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

// Check that password has been entered without showing the value.//
const validatePassword = (blur) => {
  if (!formatData.value.password) {
    if (blur) errors.value.password = 'Password is required.'
  } else {
    errors.value.password = null
  }
}

// Validates details but cant confirm if the account already exists (has no database yet to store registered details)//
const submitForm = () => {
  successMessage.value = ''

  validateEmail(true)
  validatePassword(true)

  const hasErrors = Object.values(errors.value).some((error) => error !== null)

  if (!hasErrors) {
    successMessage.value = 'Login details are valid.'
  }
}
</script>
