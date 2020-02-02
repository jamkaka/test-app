<template>
  <v-app-bar color="light-blue darken-1">
    <v-app-bar-nav-icon
      class="ma-1 white"
      @click="$emit('toggleDrawer')"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="white--text font-weight-thin headline"
      >Vue Test App</v-toolbar-title
    >
    <v-progress-linear
      :active="this.$store.state.loading"
      :indeterminate="this.$store.state.loading"
      absolute
      bottom
      color="deep-purple accent-4"
    ></v-progress-linear>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text to="/question" class="white--text">
        <v-icon class="pa-2">question_answer</v-icon>
        Learn
      </v-btn>
      <v-btn text to="/add-question" class="white--text">
        <v-icon class="pa-2">note_add</v-icon>
        Add Question
      </v-btn>
      <v-btn text to="/edit-question" class="white--text">
        <v-icon class="pa-2">edit</v-icon>
        Edit Question
      </v-btn>
      <v-btn text to="/test" class="white--text">
        <v-icon class="pa-2">fitness_center</v-icon>
        Test yourself!
      </v-btn>
      <v-btn text to="/edit-test" class="white--text">
        <v-icon class="pa-2">check</v-icon>
        Manage tests
      </v-btn>
      <v-btn text to="/settings" class="white--text">
        <v-icon class="pa-2">settings</v-icon>
        Settings
      </v-btn>
    </v-toolbar-items>
    <v-menu
      v-if="this.$store.getters['auth/isLoggedIn']"
      bottom
      transition="slide-y-transition"
      class="ml-1"
    >
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on" class="mr-0">
          <v-icon large> account_circle </v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TheNavbar",
  data() {
    return {
      items: [
        {
          title: "heh"
        },
        {
          title: "heh"
        },
        {
          title: "heh"
        }
      ]
    };
  },
  methods: {
    ...mapActions("auth", ["cleanToken"]),
    logout() {
      this.cleanToken();
      this.$router.push({ name: "Login" });
    }
  }
};
</script>
