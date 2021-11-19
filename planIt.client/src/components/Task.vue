<template>
  <div
    class="
      row
      task
      my-3
      text-center
      justify-content-evenly
      border border-warning
      pt-2
      align-self-center
    "
  >
    <div class="col-md-1 p-0">
      <i
        v-if="account.id == task.creatorId"
        class="selectable mdi mdi-pencil"
        data-bs-toggle="modal"
        :data-bs-target="'#edit-' + task.id"
        title="Edit"
      ></i>
    </div>
    <div class="col-md-1 p-0">
      <i
        class="
          selectable
          bg-primary
          mdi mdi-message-bulleted
          rounded
          align-self-center
        "
        data-bs-toggle="modal"
        :data-bs-target="'#note-' + task.id"
        title="Note"
      ></i>
    </div>
    <div class="col-md-1 p-0">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        @click="completedTask(task.id)"
        v-model="task.completed"
      />
    </div>
    <div class="col-md-6 text-start">{{ task.name }},</div>
    <div class="col-md-2 p-0 d-flex">
      <i class="mdi mdi-weight"> </i>
      <p class="ms-2">{{ task.weight }}</p>
    </div>
    <div class="col-md-1 p-0">
      <i
        v-if="account.id == task.creatorId"
        @click="remove()"
        class="selectable mdi mdi-trash-can-outline text-danger"
      ></i>
    </div>
  </div>
  <Note v-for="n in notes" :key="n.id" :note="n" />
  <!-- EDIT -->
  <div :id="'edit-' + task.id" class="modal" tabindex="-1">
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
                <!-- </div> -->
                <!-- <div class="dropdown">
                <button
                  class="btn btn-primary my-2 dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Move task
                </button> -->
                <select
                  v-model="editable.sprintId"
                  class="form-select mt-2"
                  aria-label="select"
                >
                  <!-- <option selected>Choose Sprint...</option> -->
                  <option
                    v-for="s in sprints"
                    :key="s.id"
                    :sprint="s"
                    class="dropdown-item selectable"
                    v-bind:value="s.id"
                  >
                    {{ s.name }}
                  </option>
                </select>
              </div>
            </div>
            <button
              v-if="account.id == task.creatorId"
              type="submit"
              @click.prevent="edit()"
              class="btn btn-primary"
              :data-bs-target="'#edit-' + task.id"
              data-bs-dismiss="modal"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Notes -->
  <div :id="'note-' + task.id" class="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create Note</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createNote()">
            <div class="row">
              <textarea v-model="newNote.body"> </textarea>
              <button
                type="submit"
                @click.prevent="createNote()"
                class="btn btn-primary"
                :data-bs-target="'#edit-' + task.id"
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, reactive, ref, watchEffect } from "@vue/runtime-core"
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { taskService } from "../services/TaskService"
import { noteService } from "../services/NoteService"
import { useRoute } from "vue-router";
import { AppState } from "../AppState";

export default {
  props: {
    task: { type: Object, required: true },
    // sprint: { type: Object, required: true },
    // note: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({
    });
    const newNote = ref({})

    watchEffect(() => {
      editable.value = { ...props.task };
    });

    return {
      editable,
      newNote,
      tasks: computed(() => AppState.tasks),
      sprints: computed(() => AppState.sprints),
      // sprintsFilter: computed(() => AppState.sprints.filter(s => route.params.projectId == s.projectId)),
      notes: computed(() => AppState.notes.filter(n => n.taskId == props.task.id)),
      account: computed(() => AppState.account),

      async completedTask(id) {
        try {
          await taskService.completedTask(route.params.projectId, id)
        } catch (error) {
          logger.error(error)
          Pop.toast('Something went wrong', 'error')
        }
      },

      async remove() {
        try {
          const taskId = props.task.id
          await taskService.remove(taskId, route.params.projectId)
        } catch (error) {
          logger.error(error)
        }
      },
      async edit() {
        try {
          const taskId = props.task.id
          await taskService.edit(taskId, route.params.projectId, editable.value)
        } catch (error) {
          logger.error(error)
        }
      },
      // FILTER based on the taskId 
      async createNote() {
        try {
          newNote.value.taskId = props.task.id
          // newNote.value.sprintId = props.sprint.id
          await noteService.createNote(route.params.projectId, newNote.value)
          // logger.log('create note', newNote.value)
          Pop.toast('created', 'success')
          newNote.value = {}
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