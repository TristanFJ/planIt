<template>
  <div class="sprint">
    <h1>Sprints</h1>
    <ul>
      <li v-for="s in sprints" :key="s.id">
        <div>
          {{ s.name }}
        </div>
      </li>
    </ul>
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

    }
  }
}
</script>


<style lang="scss" scoped>
</style>