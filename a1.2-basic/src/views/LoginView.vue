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
  if (!formData.value.password) {
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

<template>
  <section class="login-page">
    <div class="login-panel">
      <header>
        <p class="eyebrow">Account</p>
        <h1>Log in</h1>
        <p>Enter your account details to continue.</p>
      </header>
      <!-- Display inline validation feedback without exiting login page-->
      <form @submit.prevent="submitForm" novalidate>
        <div class="form-field">
          <label for="login-email">Email address</label>
          <input
            id="login-email"
            v-model="formData.email"
            type="email"
            autocomplete="email"
            required
            :aria-invalid="Boolean(errors.email)"
            aria-describedby="login-email-error"
            @blur="validateEmail(true)"
            @input="validateEmail(false)"
          />

          <p v-if="errors.email" id="login-email-error" class="error-message" role="alert">
            {{ errors.email }}
          </p>
        </div>

        <div class="form-field">
          <label for="login-password">Password</label>
          <input
            id="login-password"
            v-model="formData.password"
            type="password"
            autocomplete="current-password"
            required
            :aria-invalid="Boolean(errors.password)"
            aria-describedby="login-password-error"
            @blur="validatePassword(true)"
            @input="validatePassword(false)"
          />

          <p v-if="errors.password" id="login-password-error" class="error-message" role="alert">
            {{ errors.password }}
          </p>
        </div>

        <button type="submit">Log in</button>

        <p class="register-link">
          Don't have an account?
          <RouterLink to="/register">Create an account</RouterLink>
        </p>
      </form>
    </div>

    <div class="image-placeholder" aria-hidden="true">
      <span>Photo</span>
    </div>
  </section>
</template>

<style scoped>
.login-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.8fr);
  min-height: calc(100vh - 75px);
  background-color: #ffffff;
}
.login-panel {
  padding: 4rem clamp(1.25rem, 6vw, 6rem);
}
.login-panel header,
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
  border: 1px solid #b8c8bd;
  border-radius: 0.4rem;
}

input:focus {
  border-color: #1f7a43;
  outline: 3px solid rgba(31, 122, 67, 0.2);
}

input[aria-invalid='true'] {
  border-color: #b3261e;
}

button {
  padding: 0.85rem 1.5rem;
  color: #ffffff;
  font-weight: 700;
  background-color: #1f7a43;
  border: 0;
  border-radius: 0.4rem;
  cursor: pointer;
}

button:hover {
  background-color: #185f35;
}

button:focus-visible,
a:focus-visible {
  outline: 3px solid #2167d5;
  outline-offset: 3px;
}

.error-message {
  margin: 0.4rem 0 0;
  color: #b3261e;
  font-size: 0.9rem;
}

.success-message {
  color: #1f7a43;
  font-weight: 700;
}

.register-link {
  margin-top: 1.5rem;
}

.register-link a {
  color: #1f7a43;
  font-weight: 700;
}

.image-placeholder {
  display: grid;
  place-items: center;
  color: #607468;
  background-color: #e8efea;
}

/* Stack the login content on smaller screens*/
@media (max-width: 768px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .login-panel {
    padding: 3rem 1.25rem;
  }

  .image-placeholder {
    display: none;
  }
}
</style>
