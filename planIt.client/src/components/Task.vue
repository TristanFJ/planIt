<template>
  <div class="task my-3 d-flex justify-content-between border border-dark">
    <i
      class="selectable bg-warning mdi mdi-pencil rounded align-self-center"
      data-bs-toggle="modal"
      data-bs-target="#edit"
      title="Edit"
    ></i>
    {{ task.name }}, Weight: {{ task.weight }}
    <i
      @click="remove()"
      class="selectable mdi mdi-trash-can-outline bg-danger"
    ></i>
  </div>

  <div id="edit" class="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Task</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="edit()">
            <div class="row">
              <div class="col-8">
                <input
                  v-model="editable.name"
                  type="text"
                  class="form-control"
                  placeholder="Task Name"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  required
                />
              </div>
              <div class="col-4">
                <input
                  v-model="editable.weight"
                  type="number"
                  min="1"
                  max="5"
                  pattern=".{1, 5}"
                  class="form-control"
                  placeholder="Weight"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              @click.prevent="edit"
              class="btn btn-primary"
              data-bs-target="#createSprint"
              data-bs-dismiss="modal"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, reactive, ref } from "@vue/runtime-core"
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { taskService } from "../services/TaskService"
import { useRoute } from "vue-router";
import { AppState } from "../AppState";

export default {
  props: {
    task: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    let editable = ref({
    });

    return {
      editable,
      tasks: computed(() => AppState.tasks),

      async remove() {
        try {
          const taskId = props.task.id
          await taskService.remove(taskId, route.params.projectId)
        } catch (error) {
          logger.error(error)

        }
      },
      // BUG only edits the first task
      async edit() {
        try {
          const taskId = props.task.id
          await taskService.edit(taskId, route.params.projectId, editable.value)
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