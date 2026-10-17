<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import loginImage from '../assets/images/login.jpg'
import { startSession } from '../auth/session'
import { useRouter } from 'vue-router'
import { organiserAccount } from '../data/accounts'
// Authenticate submitted credentials through Firebase instead of stored passwords.
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'

const googleProvider = new GoogleAuthProvider()
const formData = ref({
  email: '',
  password: '',
})

const errors = ref({
  email: null,
  password: null,
})

const successMessage = ref('')

const showPassword = ref(false)

const router = useRouter()

// Sign in with Google and save the authenticated user in the application session.
const signInWithGoogle = async () => {
  errors.value.email = null
  errors.value.password = null

  try {
    const userCredential = await signInWithPopup(auth, googleProvider)
    const firebaseUser = userCredential.user
    const isOrganiser = firebaseUser.email === organiserAccount.email

    startSession({
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || 'Member',
      email: firebaseUser.email,
      role: isOrganiser ? 'organiser' : 'member',
    })

    router.push('/')
  } catch (error) {
    if (error.code !== 'auth/popup-closed-by-user') {
      errors.value.password = 'Google sign-in could not be completed. Please try again.'
    }
  }
}

// Validate the email and provide feedback when user leaves field.//
const validateEmail = (blur) => {
  const email = formData.value.email.trim()
  const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!email) {
    if (blur) errors.value.email = 'Email is required.'
  } else if (email.length > 200) {
    if (blur) errors.value.email = 'Email must be under 200 characters'
  } else if (!validFormat) {
    if (blur) errors.value.email = 'Please enter a valid email address.'
  } else {
    errors.value.email = null
  }
}

// Check that password has been entered without showing the value.//
const validatePassword = (blur) => {
  const password = formData.value.password

  if (!formData.value.password) {
    if (blur) errors.value.password = 'Password is required.'
  } else if (password.length > 60) {
    if (blur) errors.value.password = 'Password length must be under 60 characters.'
  } else {
    errors.value.password = null
  }
}

// Validates the form before sending credentials to firebase.//
const submitForm = async () => {
  successMessage.value = ''

  validateEmail(true)
  validatePassword(true)

  const hasErrors = Object.values(errors.value).some((error) => error !== null)

  if (!hasErrors) {
    const normalisedEmail = formData.value.email.trim().toLowerCase()

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        normalisedEmail,
        formData.value.password,
      )

      const firebaseUser = userCredential.user
      const storedUsers = JSON.parse(localStorage.getItem('ecogreenUsers')) || []

      const storedProfile = storedUsers.find(
        (user) => user.uid === firebaseUser.uid || user.email === firebaseUser.email,
      )

      const isOrganiser = firebaseUser.email === organiserAccount.email

      // Combine firebase identity with the role information used by the application.
      const sessionUser = {
        uid: firebaseUser.uid,
        name:
          firebaseUser.displayName ||
          (isOrganiser ? organiserAccount.name : storedProfile?.name || 'Member'),
        email: firebaseUser.email,
        role: isOrganiser ? 'organiser' : storedProfile?.role || 'member',
      }

      startSession(sessionUser)
      router.push('/')
    } catch (error) {
      if (error.code === 'auth/too-many-requests') {
        errors.value.password = 'Too many login attempts. Please try again later.'
      } else {
        errors.value.password = 'Email or password is incorrect.'
      }
    }
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
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            maxlength="60"
            required
            :aria-invalid="Boolean(errors.password)"
            aria-describedby="login-password-error"
            @blur="validatePassword(true)"
            @input="validatePassword(false)"
          />
          <!--Vue v-model bound checkbox-->
          <!--https://vuejs.org/guide/essentials/forms.html-->
          <label class="show-password">
            <input v-model="showPassword" type="checkbox" />
            Show password
          </label>

          <p v-if="errors.password" id="login-password-error" class="error-message" role="alert">
            {{ errors.password }}
          </p>
        </div>

        <button type="submit">Log in</button>

        <p class="login-divider"><span>or</span></p>
        <button type="button" class="google-button" @click="signInWithGoogle">
          Continue with Google
        </button>

        <p class="register-link">
          Don't have an account?
          <RouterLink to="/register">Create an account</RouterLink>
        </p>
      </form>
    </div>

    <img class="login-image" :src="loginImage" alt="Pretty buttefly resting on white flower." />
  </section>
</template>

<style scoped>
.login-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.8fr);
  min-height: calc(100vh - 75px);
  background-color: #f3f1e8;
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

.login-image {
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
/* Stack the login content on smaller screens*/
/*Guide on CSS responsivenes and media queries*/
/* https://developer.mozilla.org/en-US/docs/Web/CSS */
@media (max-width: 768px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .login-panel {
    padding: 3rem 1.25rem;
  }

  .login-image {
    display: none;
  }
}
</style>
