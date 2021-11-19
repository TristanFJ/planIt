<template>
  <div class="container bg-cDark rounded elevation-1 p-3 my-5">
    <div class="row justify-content-between">
      <div class="col-md-4 ps-4">
        <h3 class="mt-2 mb-0">Projects</h3>
        <p class="mt-2">Hello, {{ account.name }}</p>
      </div>
      <div class="col-md-3 me-5">
        <CreateProject />
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 ms-4">
        <h5 class="border-bottom">Name:</h5>
        <ul>
          <h6 class="py-2" v-for="p in projects" :key="p.id">
            <div @click="routeTo(p.id)" class="selectable">
              {{ p.name }}
            </div>
          </h6>
        </ul>
      </div>
    </div>
  </div>
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
      account: computed(() => AppState.account),


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