<template>
  <div class="py-1 border border-dark d-flex justify-content-between">
    {{ note.body }}
    <i
      @click="remove()"
      class="selectable mdi mdi-trash-can-outline bg-danger"
    ></i>
  </div>
  <br />
  <div class="pb-3 d-flex justify-content-end">
    <img :src="note.creator.picture" alt="" /> {{ note.creator.name }}
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