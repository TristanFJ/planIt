<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-cDark px-3 bg-flow">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <img src="../assets/img/rocket.png" height="65" alt="Logo" />
      <h1 class="grad px-2 mb-0 mt-2 align-self-center">PlanIt</h1>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>
    <!-- <a
      class="btn btn-primary"
      data-bs-toggle="offcanvas"
      href="#offcanvasExample"
      role="button"
      aria-controls="offcanvasExample"
    >
      Link with href
    </a> -->
    <!-- <button class="btn btngrad selectable" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
      aria-controls="offcanvasExample">
      Projects
    </button> -->
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li></li>
      </ul>
      <span class="navbar-text">
        <button class="
            btn
            selectable
            text-dark
            lighten-30
            text-uppercase
            my-2 my-lg-0
          " @click="login" v-if="!user.isAuthenticated">
          Login
        </button>

        <div class="dropdown my-2 my-lg-0" v-else>
          <div class="selectable" data-bs-target="#accountModal" data-bs-toggle="modal" aria-expanded="false"
            id="authDropdown">
            <img :src="account.picture" alt="user photo" height="40" class="rounded-circle profile-img" />
            <span class="mx-3 text-white">{{ account.name }}</span>
          </div>
          <div class="dropdown-menu p-0 list-group w-100" aria-labelledby="authDropdown">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Manage Account
              </div>
            </router-link>
            <div class="
                list-group-item list-group-item-action
                hoverable
                text-danger
              " @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
  <OffCanvas />
  <AccountModal />
</template>

<script>
  import { AuthService } from '../services/AuthService'
  import { AppState } from '../AppState'
  import { computed, onMounted } from 'vue'
  import { logger } from "../utils/Logger"
  import Pop from "../utils/Pop"
  import { projectService } from "../services/ProjectService"
  export default {
    setup() {
      return {
        user: computed(() => AppState.user),
        account: computed(() => AppState.account),

        async login() {
          AuthService.loginWithPopup()
        },
        async logout() {
          AuthService.logout({ returnTo: window.location.origin })
        }
      }
    }
  }
</script>

<style scoped>
  .bg-flow {
    /* background: rgb(131, 58, 180);
  background: linear-gradient(
    359deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  ); */
  }

  .dropdown-menu {
    user-select: none;
    display: block;
    transform: scale(0);
    transition: all 0.15s linear;
  }

  .dropdown-menu.show {
    transform: scale(1);
  }

  .hoverable {
    cursor: pointer;
  }

  a:hover {
    text-decoration: none;
  }

  .nav-link {
    text-transform: uppercase;
  }

  .navbar-nav .router-link-exact-active {
    border-bottom: 2px solid var(--bs-success);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .profile-img {
    height: 50px;
    width: 50px;
    object-fit: cover;
  }
</style>