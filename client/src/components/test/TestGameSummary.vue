<template>
  <v-card>
    <CardHeading>
      Test Summary
    </CardHeading>
    <v-divider></v-divider>

    <v-card-text>
      <p>
        Your result is: {{ currentProps.correctlyAnswered }} /
        {{ currentProps.noOfQuestions }}
      </p>
      <p>Keep practicing!</p>
      <v-btn
        block
        color="blue darken-3 white--text"
        @click="$emit('resetGame')"
      >
        Try again
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import CardHeading from "./../generic/CardHeading";

export default {
  name: "TestGameSummary",
  components: {
    CardHeading
  },
  props: {
    currentProps: {
      type: Object,
      required: true
    }
  }
};
</script>
