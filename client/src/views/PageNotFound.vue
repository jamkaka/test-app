<template>
  <v-card>
    <CardHeading>Route not found!</CardHeading>
    <v-divider></v-divider>
    <v-card-text>
      <p>No route found!</p>
      <p>
        Go back to
        <router-link to="/login">login</router-link>or
        <router-link to="/">home</router-link>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import CardHeading from "./../components/generic/CardHeading";
export default {
  name: "PageNotFound",
  components: {
    CardHeading
  }
};
</script>
