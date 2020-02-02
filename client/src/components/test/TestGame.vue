<template>
  <div>
    <v-card class="pb-3 mb-6">
      <v-card-title>
        <v-layout>
          <v-flex sm12>
            <p class="font-weight-light text-sm-center subheading">
              {{ questionsAnswered + 1 }} / {{ questions.length }}
            </p>
            <v-progress-linear v-model="progressBarCount"></v-progress-linear>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>

    <v-layout>
      <v-flex>
        <fade-transition mode="out-in">
          <QuestionInTest
            :key="currentQuestionID"
            :id="currentQuestionID"
            @questionAnswered="
              manageCorrectAnswers(arguments[0]), proceed.next()
            "
          ></QuestionInTest>
        </fade-transition>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { FadeTransition } from "vue2-transitions";
import QuestionInTest from "./../question/QuestionInTest";

export default {
  name: "TestGame",
  components: {
    FadeTransition,
    QuestionInTest
  },
  props: {
    currentProps: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      questionsAnswered: 0,
      questionsAnsweredCorrectly: 0,
      currentQuestionID: null,
      proceed: null,
      isGameOver: false
    };
  },
  computed: {
    questions() {
      return this.currentProps;
    },
    progressBarCount() {
      return Math.floor(
        ((this.questionsAnswered + 1) / this.questions.length) * 100
      );
    }
  },
  created() {
    this.proceed = this.questionsGenerator(this.questions);
    this.proceed.next();
  },
  watch: {
    isGameOver() {
      if (this.isGameOver) {
        this.$emit("gameOver", {
          noOfQuestions: this.questions.length,
          correctlyAnswered: this.questionsAnsweredCorrectly
        });
      }
    }
  },
  methods: {
    questionsGenerator: function*(questions) {
      for (let i = 0; i < questions.length; i++) {
        this.questionsAnswered = i;
        this.currentQuestionID = questions[i]._id;
        yield;
      }
      this.isGameOver = true;
    },
    manageCorrectAnswers(isAnswerCorrect) {
      isAnswerCorrect && this.questionsAnsweredCorrectly++;
    }
  }
};
</script>
