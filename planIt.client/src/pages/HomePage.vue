<template>
  <h1>Projects</h1>
  <CreateProject />
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { projectService } from "../services/ProjectService"
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";

export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await projectService.getAll('api/projects')
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, 'error')
      }
    });

  }
}
</script>

<style scoped lang="scss">
</style>
