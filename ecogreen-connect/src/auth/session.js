import { computed, ref } from 'vue'
// Name to store current login session
const SESSION_KEY = 'ecogreenCurrentUser'
// Retrieve previously logged in user when the app starts
const savedUser = JSON.parse(localStorage.getItem(SESSION_KEY))
// Contains the logged-in user, or null when nobody is logged in
export const currentUser = ref(savedUser)

export const isAuthenticated = computed(() => currentUser.value !== null)

export const startSession = (user) => {
  currentUser.value = {
    name: user.name,
    email: user.email,
    role: user.role || 'EcoGreen Member',
  }
  //Preserve current session with Web Storage API
  //https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
  localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser.value))
}
// Remove current user when logged out
export const endSession = () => {
  currentUser.value = null
  localStorage.removeItem(SESSION_KEY)
}
