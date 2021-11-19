<template>
  <div class="d-flex justify-content-between border-bottom border-dark">
    <div class="note">
      <img :src="note.creator.picture" alt="" />
      {{ note.creator.name }} - {{ note.body }}
    </div>
    <i
      v-if="account.id == note.creatorId"
      @click="remove()"
      class="selectable mdi mdi-trash-can-outline bg-danger"
    ></i>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
import { noteService } from "../services/NoteService"
import { logger } from "../utils/Logger"
export default {
  props: { note: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async remove() {
        try {
          const noteId = props.note.id
          await noteService.remove(noteId, route.params.projectId)
        } catch (error) {
          logger.error(error)

        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 20px;
}
</style>