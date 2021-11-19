<template>
  <div class="grad"></div>
  <button
    class="btn btngrad2 text-light selectable mt-3"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasExample"
    aria-controls="offcanvasExample"
  >
    Projects
  </button>
  <div class="component p-3" v-if="active">
    <button
      v-if="account.id == active.creatorId"
      class="mdi mdi-delete bg-danger btn"
      @click="remove(active.id)"
    ></button>
    <button
      class="btn btn-rounded btn-dark mdi mdi-plus ms-3"
      data-bs-toggle="modal"
      data-bs-target="#createSprint"
    ></button>
    <h1>{{ active.name }}</h1>
    <p>
      {{ active.description }}
    </p>
    <small>Creator: {{ active.creator.name }}</small>
  </div>
  <h4>Sprints</h4>
  <h6>
    Group your tasks into sprints for over-arching collections for better
    organization
  </h6>
  <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
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
import { sprintService } from "../services/SprintService"
export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await projectService.getAll('api/projects')
        await sprintService.getAll('api/projects/' + route.params.projectId + '/sprints')
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      active: computed(() => AppState.projects.find(p => p.id == route.params.projectId)),
      sprints: computed(() => AppState.sprints),
      account: computed(() => AppState.account),

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
.btnGrad {
  background: rgb(145, 8, 243);
  background: linear-gradient(
    90deg,
    rgba(145, 8, 243, 1) 4%,
    rgba(243, 140, 12, 1) 98%
  );
}

.grad {
  width: 100%;
  height: 4px;
  background: rgb(145, 8, 243);
  background: linear-gradient(
    90deg,
    rgba(145, 8, 243, 1) 4%,
    rgba(243, 140, 12, 1) 98%
  );
}

.btngrad2 {
  font-style: italic;
  background: linear-gradient(
    180deg,
    rgba(8, 37, 243, 1) 4%,
    rgba(243, 140, 12, 1) 98%
  );
  /* background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    -webkit-text-fill-color: transparent; */
  font-family: "Bebas Neue", cursive;
}
</style>