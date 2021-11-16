<template>
  <div class="project">
    <Project />
  </div>
</template>


<script>
import { onMounted, watchEffect } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import { projectService } from "../services/ProjectService"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
export default {
  setup() {

    const route = useRoute()


    // REVIEW watchEffect
    watchEffect(async () => {

      try {
        await projectService.setActive(route.params.projectId)
      } catch (error) {
        logger.error(error)
      }

    })
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>