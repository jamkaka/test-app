<template>
  <v-card>
    <CardHeading>Prepare your test</CardHeading>
    <v-divider></v-divider>
    <v-card-text>Choose the test you want to train and click 'Begin' to begin! If you can't see your test, it probably has no questions attached!</v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <v-select v-model="chosenTestId" :items="testsForSelect" label="Choose your test"></v-select>
      <v-btn
        block
        color="purple darken-1 white--text"
        @click="$emit('gameInit', chosenTestId)"
      >Begin</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import CardHeading from "./../generic/CardHeading";

export default {
  name: "TestQuestionsInit",
  components: {
    CardHeading
  },
  data() {
    return {
      chosenTestId: null
    };
  },
  computed: {
    ...mapState("tests", {
      tests: state => state.tests
    }),
    testsForSelect() {
      const allTests = [
        ...this.tests.map(test => ({
          text: test.name,
          value: test._id,
          questions: test.questions
        }))
      ];
      const filteredTests = this.filterOutTestsWithoutQuestions(allTests);
      return [
        {
          text: "<default test>",
          value: null
        },
        ...filteredTests
      ];
    }
  },
  methods: {
    filterOutTestsWithoutQuestions(tests) {
      return tests.filter(test => !!test.questions.length);
    }
  }
};
</script>
