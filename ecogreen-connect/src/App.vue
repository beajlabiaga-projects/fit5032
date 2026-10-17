<script setup>
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <!-- WCAG 2.1 Technique G1
  https://www.w3.org/WAI/WCAG21/Techniques/general/G1 -->

  <!-- Allows keyboard users to bypass the repeated navigation menu -->
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <SiteHeader />

  <!-- tabindex allows this section to receive focus from the skip link. -->
  <div id="main-content" tabindex="-1">
    <RouterView />
  </div>
</template>

<style scoped>
#main-content {
  width: 100%;
}

/* Keep the link off screen until it receives keyboard focus. */
.skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
  z-index: 1000;
  padding: 0.75rem 1rem;
  border-radius: 0 0 6px 6px;
  background: #174b2d;
  color: white;
  font-weight: bold;
}

/* Display the link when selected using the Tab key. */
.skip-link:focus {
  top: 0;
}
</style>
