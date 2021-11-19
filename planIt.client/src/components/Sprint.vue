<template>
  <div class="sprint p-3">
    <div class="mt-5">

      <div class="container card m-2 w-50">
        <div class="row d-flex justify-content-between">
          <div class="col-md-3 m-0 p-0">
            <i @click="remove()" class="
              selectable
              bg-danger
              mdi mdi-close
              rounded-circle
              align-self-center

            "></i>
          </div>
          <div class="col-md-6 p-3">
            <h4>{{ sprint.name }} </h4>
          </div>
          <div class="col-md-3 p-3 text-end d-flex justify-content-end">
            <i class="mdi mdi-weight mx-2 ">
            </i>
            <p>{{ weight }}</p>
          </div>
        </div>
        <ul>
          <Task v-for="t in tasks" :key="t.id" :task="t" />
        </ul>

        <form @submit.prevent="createTask()">
          <div class="row">
            <div class="col-8">
              <input v-model="editable.name" type="text" class="form-control" placeholder="Task Name"
                aria-label="Example text with button addon" aria-describedby="button-addon1" required />
            </div>
            <div class="col-4">
              <input v-model="editable.weight" type="number" min="1" max="5" pattern=".{1, 5}" class="form-control"
                placeholder="Weight" aria-label="Example text with button addon" aria-describedby="button-addon1"
                required />
            </div>
          </div>
          <button type="submit" @click.prevent="createTask()" class="btn btn-primary" data-bs-target="#createSprint"
            data-bs-dismiss="modal">
            Create
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>

  import { computed, onMounted, reactive, ref, watchEffect } from "@vue/runtime-core"
  import { AppState } from "../AppState"
  import { logger } from "../utils/Logger"
  import { sprintService } from "../services/SprintService"


  import Pop from "../utils/Pop"
  import { useRoute } from "vue-router"
  import { taskService } from "../services/TaskService"
  export default {
    props: { sprint: { type: Object, required: true } },
    setup(props) {

      const route = useRoute()
      let editable = ref({
      });


      // REVIEW watcheffect???
      onMounted(async () => {
        try {
          await taskService.getAll('api/projects/' + route.params.projectId + '/tasks')
          // AppState.tasks.forEach(t => {
          //   if (t.sprintId == props.sprint.id) {
          //     weight.value += t.weight
          //   }
          // })
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, 'error')
        }
      })
      return {
        editable,
        active: computed(() => AppState.activeProject),
        tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),
        weight: computed(() => {
          let weight = 0
          AppState.tasks.forEach(t => {
            if (t.sprintId == props.sprint.id) {
              weight += t.weight
            }
          })
          return weight
        }),


        async remove() {
          try {
            const sprintId = props.sprint.id
            await sprintService.remove(sprintId, route.params.projectId)
          } catch (error) {
            logger.error(error)
          }

        },

        async createTask() {
          try {
            editable.value.sprintId = props.sprint.id
            await taskService.createTask(route.params.projectId, editable.value)
            // logger.log('createTask', route.params.projectId, editable.value)
            Pop.toast('created', 'success')
            editable.value = {}
          } catch (error) {
            logger.error(error)
          }
        },



      }
    }
  }
</script>


<style lang="scss" scoped>
  .iSize {
    height: 10px;
    width: 10px;
  }
</style>