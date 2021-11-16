<template>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h3 class="offcanvas-title" id="offcanvasExampleLabel">Projects</h3>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <h5 class="border-bottom">Name:</h5>
      <ul>
        <li v-for="p in projects" :key="p.id">
          <div
            @click="routeTo(p.id)"
            class="selectable"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
          >
            {{ p.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { useRouter } from "vue-router"
import { logger } from "../utils/Logger"
export default {
  setup() {
    const router = useRouter()
    return {
      projects: computed(() => AppState.projects),

      routeTo(id) {
        router.push({
          name: "Project",
          params: { projectId: id }
        })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>