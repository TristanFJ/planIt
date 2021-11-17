<template>
  <div class="m-3">
    <div id="createSprint" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create Sprint</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createSprint">
              <input
                v-model="state.editable.name"
                type="text"
                class="form-control"
                placeholder="Sprint Name"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  @click.prevent="createSprint"
                  class="btn btn-primary"
                  data-bs-target="#createSprint"
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
import { sprintService } from "../services/SprintService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../AppState";
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      editable: {},
    });
    return {
      state,
      async createSprint() {
        try {
          logger.log('create', state.editable)
          await sprintService.createSprint(route.params.projectId, state.editable)
          state.editable = {}
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