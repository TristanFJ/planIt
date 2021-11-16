<template>
  <div class="component p-3">
    {{ active.name }}
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