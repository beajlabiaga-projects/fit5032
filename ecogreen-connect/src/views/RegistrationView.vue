<script setup>
import { ref } from 'vue'
import registrationImage from '../assets/images/registration.jpg'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { startSession } from '../auth/session'

const router = useRouter()

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

const showPassword = ref(false)
// Validate each field so users can receive an error message//
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
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password)

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
  } else if (!hasSpecialCharacter) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
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
// Run every validation before accepting the registration form//
const submitForm = () => {
  successMessage.value = ''

  validateName(true)
  validateEmail(true)
  validatePassword(true)
  validateConfirmPassword(true)

  const hasErrors = Object.values(errors.value).some((error) => error !== null)
  // Stores and retrieves registered users using WEB Storage API//
  //https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API //
  if (!hasErrors) {
    const storedUsers = JSON.parse(localStorage.getItem('ecogreenUsers')) || []
    const normalisedEmail = formData.value.email.trim().toLowerCase()

    const accountExists = storedUsers.some((user) => user.email == normalisedEmail)

    if (accountExists) {
      errors.value.email = 'An account already exists with this email address.'
      return
    }

    const newUser = {
      name: formData.value.name.trim(),
      email: normalisedEmail,
      password: formData.value.password,
      role: 'member',
    }

    storedUsers.push(newUser)

    localStorage.setItem('ecogreenUsers', JSON.stringify(storedUsers))

    successMessage.value = 'Registration successful. Log in with your account.'
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

<template>
  <section class="registration-page">
    <div class="registration-panel">
      <header>
        <p class="eyebrow">Account</p>
        <h1>Create an account</h1>
        <p>Enter your details to complete your registration.</p>
      </header>

      <form @submit.prevent="submitForm" novalidate>
        <div class="form-field">
          <label for="name">Full Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            autocomplete="name"
            required
            :aria-invalid="Boolean(errors.name)"
            aria-describedby="name-error"
            @blur="validateName(true)"
            @input="validateName(false)"
          />

          <p v-if="errors.name" id="name-error" class="error-message" role="alert">
            {{ errors.name }}
          </p>
        </div>

        <div class="form-field">
          <label for="email">Email address</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            autocomplete="email"
            required
            :aria-invalid="Boolean(errors.email)"
            aria-describedby="email-error"
            @blur="validateEmail(true)"
            @input="validateEmail(false)"
          />

          <p v-if="errors.email" id="email-error" class="error-message" role="alert">
            {{ errors.email }}
          </p>
        </div>

        <div class="form-field">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            minlength="8"
            required
            :aria-invalid="Boolean(errors.password)"
            aria-describedby="password-error"
            @blur="validatePassword(true)"
            @input="validatePassword(false)"
          />

          <p v-if="errors.password" id="password-error" class="error-message" role="alert">
            {{ errors.password }}
          </p>
        </div>

        <div class="form-field">
          <label for="confirm-password">Confirm password</label>
          <input
            id="confirm-password"
            v-model="formData.confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            required
            :aria-invalid="Boolean(errors.confirmPassword)"
            aria-describedby="confirm-password-error"
            @blur="validateConfirmPassword(true)"
            @input="validateConfirmPassword(false)"
          />
          <!--Vue v-model bound checkbox-->
          <!--https://vuejs.org/guide/essentials/forms.html-->
          <label class="show-password">
            <input v-model="showPassword" type="checkbox" />
            Show Passwords
          </label>

          <p
            v-if="errors.confirmPassword"
            id="confirm-password-error"
            class="error-message"
            role="alert"
          >
            {{ errors.confirmPassword }}
          </p>
        </div>

        <div class="form-actions">
          <button type="submit">Create account</button>
          <button type="button" class="secondary-button" @click="clearForm">Clear</button>
        </div>

        <p v-if="successMessage" class="success-message" role="status">
          {{ successMessage }}
        </p>

        <p class="login-link">
          Already have an account?
          <RouterLink to="/login">Log in</RouterLink>
        </p>
      </form>
    </div>

    <img
      class="registration-image"
      :src="registrationImage"
      alt="Blue and yellow bird perched on a branch."
    />
  </section>
</template>

<style scoped>
.registration-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.8fr);
  min-height: calc(100vh - 75px);
  background-color: #f3f1e8;
}

.registration-panel {
  padding: 4rem clamp(1.25rem, 6vw, 6rem);
}

.registration-panel header,
form {
  width: min(560px, 100%);
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: #2f6f44;
  font-weight: 700;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 0.75rem;
  color: #183d28;
  font-size: clamp(2rem, 5vw, 3.25rem);
}

form {
  margin-top: 2rem;
}

.form-field {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 700;
}

input {
  width: 100%;
  padding: 0.85rem;
  color: #26352c;
  background-color: #ffffff;
  border: 1px solid #9aaba0;
  border-radius: 0.4rem;
}

input:focus {
  outline: 3px solid rgba(47, 111, 68, 0.2);
  border-color: #2f6f44;
}

input[aria-invalid='true'] {
  border-color: #b42318;
}

.error-message {
  margin: 0.4rem 0 0;
  color: #b42318;
  font-size: 0.9rem;
}

.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

button {
  padding: 0.85rem 1.5rem;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  background-color: #1f6a3a;
  border: 1px solid #1f6a3a;
  border-radius: 0.4rem;
}

button:hover {
  background-color: #174f2c;
}

.secondary-button {
  color: #1f5132;
  background-color: #ffffff;
}

.secondary-button:hover {
  background-color: #edf5ef;
}

.success-message {
  padding: 1rem;
  color: #174f2c;
  background-color: #e5f4e9;
  border-radius: 0.4rem;
}

.login-link {
  margin-top: 1.5rem;
}

.login-link a {
  color: #1f7a43;
  font-weight: 700;
}

.registration-image {
  width: 100%;
  height: 100%;
  min-height: 100%;
  object-fit: cover;
}
.show-password {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  font-weight: 700;
  cursor: pointer;
}

.show-password input {
  width: auto;
}
/* Stack form into one column on smaller screens, to avoid horizontal scrolling. */
/*Guide on CSS responsiveness and media queriess*/
/* https://developer.mozilla.org/en-US/docs/Web/CSS */
@media (max-width: 768px) {
  .registration-page {
    grid-template-columns: 1fr;
  }

  .registration-panel {
    padding: 3rem 1.25rem;
  }

  .registration-image {
    display: none;
  }
}
</style>
