<template>
  <header>
    <Navbar />
    <div class="grad"></div>
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
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

  .grad {
    width: 100%;
    height: 4px;
    background: rgb(145, 8, 243);
    background: linear-gradient(90deg, rgba(145, 8, 243, 1) 4%, rgba(243, 140, 12, 1) 98%);
  }
</style>