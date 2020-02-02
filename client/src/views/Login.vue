<template>
  <v-card>
    <CardHeading>Login</CardHeading>
    <v-divider></v-divider>
    <v-card-text>
      <v-form class="px-4 pb-3">
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
        ></v-text-field>
        <p>
          You don't have account? Register
          <router-link to="/register">here</router-link>
        </p>
        <v-btn color="primary" @click.prevent="login">Login</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import http from "./../utils/http";
//
import CardHeading from "./../components/generic/CardHeading";

export default {
  name: "Login",
  components: {
    CardHeading
  },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    ...mapActions("auth", ["storeToken", "addTokenToLocalStorage"]),
    async login() {
      const loginResponse = await http.post("/auth/login", {
        email: this.email,
        password: this.password
      });
      const token = loginResponse.data.data.token;
      this.storeToken(token);
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
