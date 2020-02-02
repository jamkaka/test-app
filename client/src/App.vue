<template>
  <div id="app">
    <v-app>
      <TheMobileMenu :is-drawer-open="isDrawerOpen" />
      <v-content>
        <TheNavbar @toggleDrawer="isDrawerOpen = !isDrawerOpen" />
        <v-container fluid>
          <v-layout justify-center>
            <v-flex xs12 md8>
              <fade-transition mode="out-in">
                <router-view></router-view>
              </fade-transition>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import TheMobileMenu from "./components/generic/TheMobileMenu";
import TheNavbar from "./components/generic/TheNavbar";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    TheNavbar,
    TheMobileMenu,
    FadeTransition
  },
  data() {
    return {
      isDrawerOpen: false
    };
  }
};
</script>

<style lang="scss">
// global overrides
.v-list-item--active .v-icon {
  color: rgba(0, 0, 0, 0.54) !important;
}
@media screen and (min-width: 960px) {
  .v-app-bar__nav-icon {
    display: none;
  }
}
</style>
