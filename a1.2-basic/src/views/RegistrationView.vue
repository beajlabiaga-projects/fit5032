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

const validatePassword = (blur) => {
  const password = formData.value.password
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)

  if (!password) {
    if (blur) errors.value.password = 'Password is required.'
  } else if (password.length < 8) {
    if (blur) errors.value.password = 'Password must contain at least 8 characters.'
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  const confirmPassword = formData.value.confirmPassword

  if (!confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Please confirm your password.'
  } else if (confirmPassword !== formData.value.password) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const submitForm = () => {
  successMessage.value = ''

  validateName(true)
  validateEmail(true)
  validatePassword(true)
  validateConfirmPassword(true)

  const hasErrors = Object.values(errors.value).some((error) => error !== null)

  if (!hasErrors) {
    successMessage.value = 'Registration details are valid. Registration form has been submitted.'
  }
}

const clearForm = () => {
  formData.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  errors.value = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  }

  successMessage.value = ''
}
</script>
