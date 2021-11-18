<template>
  <div class="note">
    {{ note.body }}
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: { note: { type: Object, required: true } },
  setup() {
    return {
      // notes: computed(() => AppState.notes.filter(n => n.taskId == AppState.tasks.id)),
    }
  }
}
</script>


<style lang="scss" scoped>
</style>