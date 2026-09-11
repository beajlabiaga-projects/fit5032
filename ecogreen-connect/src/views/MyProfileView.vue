<script setup>
import { currentUser } from '../auth/session'
</script>

<!--Reads the user saved by startSession() and then displays the user's name, email and role-->
<template>
  <main class="profile-page">
    <header>
      <p class="eyebrow">Account</p>
      <h1>My Profile</h1>
      <p>Your EcoGreen account information</p>
    </header>

    <section class="profile-card" aria-label="Profile Information">
      <dl>
        <div>
          <dt>Name</dt>
          <dd>{{ currentUser.name }}</dd>
        </div>

        <div>
          <dt>Email</dt>
          <dd>{{ currentUser.email }}</dd>
        </div>

        <div>
          <dt>Account type</dt>
          <dd>{{ currentUser.role }}</dd>
        </div>
      </dl>
    </section>
  </main>
</template>

<style scoped>
.profile-page {
  min-height: calc(100vh - 75px);
  padding: 4rem 8%;
  background-color: #f3f1e8;
}

.profile-page header {
  max-width: 700px;
  margin-bottom: 2rem;
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

.profile-card {
  width: min(650px, 100%);
  padding: 2rem;
  background-color: #ffff;
  border-radius: 0.75rem;
}

dl {
  margin: 0;
}

dl div {
  padding: 1rem 0;
  border-bottom: 1px solid #d9e2dc;
}
/* https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:last-child */
dl div:last-child {
  border-bottom: 0;
}

dt {
  margin-bottom: 0.35rem;
  color: #2f6f44;
  font-weight: 700;
}

dd {
  margin: 0;
}
</style>
