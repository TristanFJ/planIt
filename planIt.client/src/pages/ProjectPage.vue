<template>
  <div class="component p-3" v-if="active">
    <h1>{{ active.name }}</h1>
    <p>
      {{ active.description }}
    </p>
    <small>Creator: {{ active.creator.name }}</small>
  </div>
  <button class="mdi mdi-delete" @click="remove(active.id)"></button>
  <button
    class="btn btn-rounded btn-dark mdi mdi-plus"
    data-bs-toggle="modal"
    data-bs-target="#createSprint"
  ></button>
  <Sprint />
  <CreateSprint />
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { projectService } from "../services/ProjectService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { router } from "../router"
import { onMounted } from "@vue/runtime-core"
import { useRoute } from "vue-router"
export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await projectService.getAll('api/projects')
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      active: computed(() => AppState.projects.find(p => p.id == route.params.projectId)),
      sprints: computed(() => AppState.sprints),

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