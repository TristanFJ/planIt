<template>
  <div class="component p-3">
    <h1>{{ active.name }}</h1>
    <p>
      {{ active.description }}
    </p>
    <small>Creator: {{ active.creator.name }}</small>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    return {
      active: computed(() => AppState.activeProject)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>