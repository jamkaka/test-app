<template>
  <v-card>
    <CardHeading>Register</CardHeading>
    <v-divider></v-divider>
    <v-card-text>
      <v-form class="px-4 pb-3">
        <v-text-field
          v-model="$v.email.$model"
          :error-messages="emailErrors"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="$v.password.$model"
          :error-messages="passwordErrors"
          type="password"
          label="Password"
        ></v-text-field>
        <v-text-field
          v-model="$v.confirmPassword.$model"
          :error-messages="confirmPasswordErrors"
          type="password"
          label="Confirm password"
        ></v-text-field>
        <v-btn class="mt-2" color="red white--text" @click.prevent="register"
          >Register</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
//
import http from "./../utils/http";
//
import { mapActions } from "vuex";
//
import CardHeading from "./../components/generic/CardHeading";

const strongPassword = pass => {
  return pass.match(
    RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")
  )
    ? true
    : false;
};

export default {
  name: "Register",
  components: {
    CardHeading
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      isFormSubmitted: false
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(10),
      strongPassword
    },
    confirmPassword: {
      required,
      sameAs: sameAs("password")
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.isFormSubmitted) return errors;
      if (!this.$v.email.required) errors.push("This field is required!");
      if (!this.$v.email.email) errors.push("You must use valid email!");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.isFormSubmitted) return errors;
      if (!this.$v.password.required) errors.push("This field is required!");
      if (!this.$v.password.minLength)
        errors.push("Password is too short! Min. 6 characters");
      if (!this.$v.password.maxLength)
        errors.push("Password is too long! Max. 10 characters");
      if (!this.$v.password.strongPassword)
        errors.push(
          "Password is not strong enough! At least one uppercase, lowercase, alphanumeric and special character."
        );
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.isFormSubmitted) return errors;
      if (!this.$v.confirmPassword.required)
        errors.push("This field is required!");
      if (!this.$v.confirmPassword.sameAs)
        errors.push("Passwords are not the same!");
      return errors;
    }
  },
  methods: {
    ...mapActions("auth", ["storeToken"]),
    async register() {
      this.isFormSubmitted = true;
      if (this.$v.$invalid) return;
      const registerResponse = await http.post("/auth/register", {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      });
      const token = registerResponse.data.data.token;
      this.storeToken(token);
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
