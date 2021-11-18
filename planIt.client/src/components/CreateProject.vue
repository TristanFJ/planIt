<template>
  <div class="m-3">
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#create"
    >
      Create Project
    </button>
    <div id="create" class="modal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create Project</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createProject">
              <input
                v-model="state.editable.name"
                type="text"
                class="form-control mb-3"
                placeholder="Project Name"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />

              <input
                v-model="state.editable.description"
                type="text"
                class="form-control"
                placeholder="Project Body"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
              <div class="modal-footer">
                <!-- <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button> -->
                <button
                  type="submit"
                  @click.prevent="createProject"
                  class="btn btn-primary"
                  data-bs-target="#create"
                  data-bs-dismiss="modal"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import { reactive } from "@vue/reactivity";
import { projectService } from "../services/ProjectService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../AppState";
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    // TODO set as activeProject and pass id into router push
    const state = reactive({
      editable: {},
    });
    return {
      state,
      async createProject() {
        try {
          // logger.log(state.editable)
          await projectService.createProject(state.editable)
          state.editable = {}
          router.push({
            name: "Project",
            params: { projectId: AppState.activeProject.id }
          })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, "error")
        }
      },

    }
  }
}
</script>


<style lang="scss" scoped>
</style>