<template>
  <v-layout>
    <v-flex>
      <v-alert
        :value="isAlertShown"
        :type="alertType"
        transition="scale-transition"
        dismissible
        outlined
        >{{ alertText }}</v-alert
      >
      <v-card>
        <CardHeading>Login</CardHeading>
        <v-divider></v-divider>
        <v-card-text>
          <v-form class="px-4 pb-3" @keyup.enter.native="login">
            <v-text-field
              v-model="email"
              label="Email"
              :error-messages="
                isFormSubmitted && $v.email.$invalid ? emailErrors : ''
              "
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              :error-messages="
                isFormSubmitted && $v.password.$invalid
                  ? 'This field is required!'
                  : ''
              "
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
            <p>
              You don't have account? Register
              <router-link to="/register">here</router-link>
            </p>
            <v-btn color="primary" @click.prevent="login">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import http from "./../utils/http";
//
import CardHeading from "./../components/generic/CardHeading";

export default {
  name: "Login",
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  components: {
    CardHeading
  },
  data() {
    return {
      email: null,
      password: null,
      alertText: "",
      isFormSubmitted: false,
      alertType: "error",
      isAlertShown: false
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      !this.$v.email.email && errors.push("Please provide valid email!");
      !this.$v.email.required && errors.push("Email is required.");
      return errors;
    }
  },
  methods: {
    ...mapActions("auth", ["storeToken", "addTokenToLocalStorage"]),
    manageAlert(type, text) {
      this.isAlertShown = true;
      this.alertType = type;
      this.alertText = text;
      setTimeout(() => {
        this.isAlertShown = false;
      }, 2500);
    },
    async login() {
      this.isFormSubmitted = true;
      if (this.$v.$invalid) return;
      try {
        const loginResponse = await http.post("/auth/login", {
          email: this.email,
          password: this.password
        });
        const token = loginResponse.data.data.token;
        this.storeToken(token);
        this.manageAlert("success", "You have successfully logged in!");
        setTimeout(() => this.$router.push({ name: "Home" }), 1500);
      } catch (err) {
        this.manageAlert("error", err.response.data.data.message);
      }
    }
  }
};
</script>
