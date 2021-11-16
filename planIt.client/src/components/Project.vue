<template>
  <div class="component p-3" v-if="active">
    <h1>{{ active.name }}</h1>
    <p>
      {{ active.description }}
    </p>
    <small>Creator: {{ active.creator.name }}</small>
  </div>
  <button class="mdi mdi-delete" @click="remove(active.id)"></button>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { projectService } from "../services/ProjectService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { router } from "../router"
export default {
  setup() {
    return {
      active: computed(() => AppState.activeProject),

      async remove(id) {
        try {
          logger.log('removed')
          await projectService.remove(id);
          router.push({
            name: "Home",
          })
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      }
    }
  }


}
</script>


<style lang="scss" scoped>
</style>