<template>
  <div class="grad"></div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-1 p-0 m-0">
        <div
          class="btngrad2 bg-cDark text-center text-warning selectable mt-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          P
        </div>
      </div>
      <div class="col-md-10">
        <div class="row component p-3" v-if="active">
          <div class="col-md-6">
            <h1>{{ active.name }}</h1>
            <p>
              {{ active.description }}
            </p>
            <small>Created By: {{ active.creator.name }}</small>
          </div>
          <div class="col-md-3">
            <button
              class="mdi mdi-delete-forever f-24 btn text-danger"
              @click="remove(active.id)"
            ></button>
          </div>
          <button
            class="btn btn-rounded btn-dark mdi mdi-plus ms-3 w-50"
            data-bs-toggle="modal"
            data-bs-target="#createSprint"
          >
            Create Sprint
          </button>
        </div>
        <h4>Sprints</h4>
        <h6>
          Group your tasks into sprints for over-arching collections for better
          organization
        </h6>
        <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
        <CreateSprint />
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>
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
  /* background: linear-gradient(180deg,
        rgba(8, 37, 243, 1) 4%,
        rgba(243, 140, 12, 1) 98%); */
  /* background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    -webkit-text-fill-color: transparent; */
  font-family: "Bebas Neue", cursive;
  max-width: 65%;
  height: 60px;
  font-size: 3em;
}
</style>