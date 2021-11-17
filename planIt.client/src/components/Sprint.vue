<template>
  <div class="sprint p-3">
    <h4>Sprints</h4>
    <h6>
      Group your tasks into sprints for over-arching collections for better
      organization
    </h6>
    <div class="mt-5">
      <div class="card m-2 w-50 p-3" v-for="s in sprints" :key="s.id">
        <div class="d-flex justify-content-between">
          <i
            @click="remove(s.id)"
            class="
              selectable
              bg-danger
              mdi mdi-trash-can-outline
              rounded
              align-self-center
            "
          ></i>
          <h4>{{ s.name }}</h4>
          <i class="mdi mdi-dumbbell mx-2">weight</i>
        </div>
        <ul>
          <li>tasks</li>
          <li>task2</li>
        </ul>
        <p class="selectable mdi mdi-plus p-1 m-1 rounded bg-success">
          Add task
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { sprintService } from "../services/SprintService"

import Pop from "../utils/Pop"
import { useRoute } from "vue-router"
export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await sprintService.getAll('api/projects/' + route.params.projectId + '/sprints')
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, 'error')
      }
    })
    return {
      sprints: computed(() => AppState.sprints),
      active: computed(() => AppState.activeProject),

      async remove(sprintId) {

        try {
          await sprintService.remove(sprintId, route.params.projectId)
        } catch (error) {
          logger.error(error)
        }

      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>