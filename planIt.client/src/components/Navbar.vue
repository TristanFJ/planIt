<template>
  <nav class="navbar navbar-expand-lg navbar-dark lighten-10 px-3">
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
        <li>

        </li>
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
          <div class="dropdown-toggle selectable" data-bs-toggle="dropdown" aria-expanded="false" id="authDropdown">
            <img :src="user.picture" alt="user photo" height="40" class="rounded" />
            <span class="mx-3 text-dark lighten-30">{{ user.name }}</span>
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

  h1 {
    font-size: 3rem;
    font-style: italic;
    background: linear-gradient(180deg, rgba(8, 37, 243, 1) 4%, rgba(243, 140, 12, 1) 98%);
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    font-family: 'Bebas Neue', cursive;
  }

  .btngrad {
    font-style: italic;
    background: linear-gradient(180deg, rgba(8, 37, 243, 1) 4%, rgba(243, 140, 12, 1) 98%);
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    font-family: 'Bebas Neue', cursive;
  }
</style>