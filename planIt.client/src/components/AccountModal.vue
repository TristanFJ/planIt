<template>
  <div class="modal fade" id="accountModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Account</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex">
            <img :src="user.picture" alt="user photo" height="60" class="rounded-circle profile-img" />
            <h4 class="mx-3 text-white align-items-center">{{ user.name }}</h4>
          </div>
          <form @submit.prevent="edit">
            <div class="mb-3 d-flex justify-content-between">
              <div>

                <div>
                  <label for="title" class="form-label">Title</label>
                  <input type="text" class="form-control" name="title" id="title" aria-describedby="title"
                    placeholder="Title..." v-model="editable.title" />
                </div>
                <div>
                  <label for="picture" class="form-label">Image URL</label>
                  <input type="url" class="form-control" name="picture" id="picture" aria-describedby="picture"
                    placeholder="Image URL..." v-model="editable.picture" />
                </div>
              </div>
              <div class="justify-content-center">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" name="name" id="name" aria-describedby="name"
                  placeholder="Name..." v-model="editable.name" />
              </div>
            </div>
            <div class="modal-footer">
              <button data-bs-target="#accountModal" data-bs-toggle="modal" type="submit" class="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import { ref } from '@vue/reactivity'
  import { logger } from '../utils/Logger'
  import { accountService } from '../services/AccountService'
  import Pop from '../utils/Pop'
  import { Modal } from 'bootstrap'
  import { useRouter } from 'vue-router'
  import { AppState } from '../AppState'
  import { watchEffect, computed } from '@vue/runtime-core'
  export default {
    props: {
      account: {
        type: String,
      }
    },
    setup(props) {
      const editable = ref({});
      const account = computed(() => AppState.account)
      watchEffect(() => {
        editable.value = { ...props.account }
      });
      return {
        user: computed(() => AppState.user),
        editable,
        async edit() {
          try {
            logger.log("account", AppState.account.id)
            await accountService.edit(editable.value, AppState.account.id)
          } catch (error) {
            logger.error(error)
            Pop.toast('Failed to Edit', 'error')
          }
        }
      }
    }
  }
</script>


<style lang="scss" scoped>

</style>