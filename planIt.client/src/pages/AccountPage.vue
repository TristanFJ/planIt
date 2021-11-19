<template>
  <div class="about row text-center justify-content-center mt-4">
    <div class="col-md-5 text-center">
      <img class="rounded height" :src="account.picture" alt="" />
      <h1>Welcome, {{ account.name }}</h1>
      <div v-if="account.graduated == true"><i class="mdi mdi-school f-20"></i>{{account.class}}</div>
      <p>{{ account.email }}</p>
      <p>{{account.bio}}</p>
      <a :href="account.linkedin" target="_blank"><i class="mdi mdi-linkedin f-24" title="linkedIn"></i></a>
      <a :href="account.github" target="_blank"><i class="mdi mdi-xml f-24" title="github"></i>Github</a>
      <a :href="account.resume" target="_blank"><i class="mdi mdi-file-account f-24" title="Resume"></i></a>
    </div>
  </div>
  <button class="btn btn-round border-dark mb-auto text-end me-2" data-bs-target="#accountModal"
    data-bs-toggle="modal"><i class="mdi mdi-pencil f-24" title="Edit Account"></i>
  </button>
  <!-- <div class="row justify-content-center"> -->
  <!-- <div class="col-md-6 mt-4">
      <h5>My projects:</h5>
    </div>
  </div>
  <Thread />

  <AccountModal /> -->
</template>

<script>
  import { computed } from 'vue'
  import { AppState } from '../AppState'
  export default {
    name: 'Account',
    setup() {
      return {
        account: computed(() => AppState.account)
      }
    }
  }
</script>

<style scoped>
  img {
    max-width: 100px;
  }
</style>