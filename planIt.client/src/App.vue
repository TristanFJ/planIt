<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-cDark">
    <div class="text-center p-4">
      <!-- TODO githubs -->
      Made with 💖 by Team Best
    </div>
  </footer>
</template>

<script>
  import { computed } from 'vue'
  import { AppState } from './AppState'
  export default {
    name: 'App',
    setup() {
      return {
        appState: computed(() => AppState)


      }
    }
  }
</script>
<style lang="scss">
  @import "./assets/scss/main.scss";
</style>