<template>
  <v-stepper v-model="step" alt-labels>
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1"
        >Add question</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step :complete="step > 2" step="2"
        >Check question</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step step="3">Done!</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <QuestionForm ref="addQuestionForm" @formSubmit="fillWithFormData">
          <template #--QuestionForm--headingInForm
            >Add Question</template
          >
          <template #--QuestionForm--submitBtnText--
            >Continue</template
          >
        </QuestionForm>
      </v-stepper-content>

      <v-stepper-content step="2">
        <p>{{ title ? title : "No text question attached!" }}</p>
        <p v-for="(answer, index) in answers" :key="index">
          {{ answer.text ? answer.text : "No answer attached!" }}
          <v-icon v-text="correctAnswer === index ? 'check' : 'close'"></v-icon>
        </p>

        <v-btn color="primary" @click="addQuestion">Continue</v-btn>
        <v-btn color="error" @click="step = 1">Back</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <p>
          {{
            didErrorOccur
              ? "Something went wrong. Try again!"
              : "Congratulations. You added the question!"
          }}
        </p>
        <v-btn
          @click="reinitForm"
          :color="didErrorOccur ? 'error' : 'success'"
          >{{ didErrorOccur ? "Try Again" : "Add new question" }}</v-btn
        >
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapActions } from "vuex";
import QuestionForm from "./../components/question/QuestionForm";

// ! reactivity caveat => for reactivy to work i need to either create factory function which returns defaultData object or define this.$data as Object.assign({}, defaultData). suggested way -> use factory function.
// const defaultData = {
//   step: 1,
//   title: null,
//   answers: null,
//   correctAnswer: null
// };

function defaultData() {
  return {
    didErrorOccur: false,
    step: 1,
    title: null,
    answers: null,
    correctAnswer: null
  };
}

export default {
  name: "AddQuestion",
  components: {
    QuestionForm
  },
  props: {
    questionData: {
      type: Object
    }
  },
  data() {
    // return Object.assign({}, defaultData);
    return defaultData();
  },
  methods: {
    ...mapActions("questions", ["addQuestionToDB"]),
    fillWithFormData({ title, answers, correctAnswer }) {
      [this.title, this.answers, this.correctAnswer] = [
        title,
        answers,
        correctAnswer
      ];
      this.step = 2;
    },
    async addQuestion() {
      const { title, answers, correctAnswer } = this;
      try {
        await this.addQuestionToDB({
          title,
          answers,
          correctAnswer
        });
      } catch (err) {
        this.didErrorOccur = true;
      } finally {
        this.step = 3;
      }
    },
    reinitForm() {
      Object.assign(this.$data, defaultData());
      this.$refs.addQuestionForm.resetForm();
    }
  }
};
</script>
