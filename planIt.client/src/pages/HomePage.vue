<template>
  <h1>Projects</h1>
  <CreateProject />
  <h5 class="border-bottom">Name:</h5>
  <ul>
    <li v-for="p in projects" :key="p.id">
      <div @click="routeTo(p.id)" class="selectable">
        {{ p.name }}
      </div>
    </li>
  </ul>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { projectService } from "../services/ProjectService"
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { router } from "../router";

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

    return {
      projects: computed(() => AppState.projects),


      routeTo(id) {
        router.push({
          name: "Project",
          params: { projectId: id }
        })
      }
    }

  }
}
</script>

<style scoped lang="scss">
</style>
