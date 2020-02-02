<template>
  <v-layout justify-center>
    <v-flex xs8>
      <v-alert
        :value="isAlertShown"
        :type="alertType"
        transition="scale-transition"
        dismissible
        outlined
        >{{ alertText }}</v-alert
      >

      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline font-weight-light">
              {{ currentQuestion.title }}
            </h3>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-container grid-list-xl>
            <v-layout row wrap>
              <v-flex
                v-for="(answer, index) in currentQuestion.answers"
                :key="index"
                class="text-center"
                xs6
              >
                <v-btn
                  color="purple lighten-1 white--text"
                  :class="{
                    success:
                      index === currentQuestion.correctAnswer && isAlertShown,
                    error:
                      index !== currentQuestion.correctAnswer && isAlertShown
                  }"
                  @click="areListenersAttached && checkAnswer(index)"
                  >{{ answer.text }}</v-btn
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
        <v-btn
          v-show="isAlertShown"
          class="grey darken-1 white--text"
          block
          @click="questionAnswered"
          >Proceed!</v-btn
        >
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TestQuestion",
  props: {
    id: String
  },
  data() {
    return {
      isAlertShown: false,
      alertType: "success",
      areListenersAttached: true,
      activeBtnClass: null,
      isAnswerCorrect: null
    };
  },
  computed: {
    ...mapGetters("questions", ["getQuestionDataById"]),
    currentQuestion() {
      return this.getQuestionDataById(this.id);
    },
    alertText() {
      return this.alertType === "success"
        ? "It is truly correct answer!"
        : `Nah, that is wrong! Correct answer is ${
            this.currentQuestion.answers[this.currentQuestion.correctAnswer]
              .text
          }`;
    }
  },
  methods: {
    checkAnswer(index) {
      this.isAnswerCorrect = index === this.currentQuestion.correctAnswer;
      this.areListenersAttached = false;
      this.isAlertShown = true;
      this.alertType = this.isAnswerCorrect ? "success" : "error";
    },
    questionAnswered() {
      this.$emit("questionAnswered", this.isAnswerCorrect);
      this.isAlertShown = false;
      this.areListenersAttached = true;
    }
  }
};
</script>
