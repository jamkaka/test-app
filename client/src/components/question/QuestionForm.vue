<template>
  <v-card>
    <CardHeading>
      <slot name="--QuestionForm--headingInForm"></slot>
    </CardHeading>
    <v-card-text>
      <v-form>
        <v-flex xs12>
          <v-text-field
            :error-messages="
              isFormSubmitted && $v.title.$invalid
                ? 'This field is required!'
                : ''
            "
            label="Title of the question"
            hint="Type in the question you want to ask"
            v-model="$v.title.$model"
          ></v-text-field>
        </v-flex>
        <v-layout wrap justify-space-between>
          <v-flex v-for="(v, index) in $v.answers.$each.$iter" :key="index" xs5>
            <v-text-field
              :error-messages="
                isFormSubmitted && v.text.$invalid
                  ? 'This field is required!'
                  : ''
              "
              :label="`Answer no.${parseInt(index) + 1}`"
              hint="Type in answer"
              v-model.trim="v.text.$model"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12>
            <p class="font-weight-light subheading ma-0">
              Which answer is correct?
            </p>
          </v-flex>
          <v-flex xs12>
            <v-radio-group
              v-model="$v.correctAnswer.$model"
              :error-messages="
                isFormSubmitted && $v.correctAnswer.$invalid
                  ? 'You need to choose correct answer!'
                  : ''
              "
              row
            >
              <v-radio
                v-for="n in answers.length"
                light
                :key="`radio-${n}`"
                :label="`Answer ${n}`"
                :value="n - 1"
              ></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
        <v-btn class="mt-2" color="primary" @click.prevent="formSubmit">
          <slot name="--QuestionForm--submitBtnText--"></slot>
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import CardHeading from "./../generic/CardHeading";

function formDefault() {
  return {
    title: null,
    answers: Array(4)
      .fill("")
      .map(() => ({
        text: ""
      })),
    correctAnswer: null,
    isFormSubmitted: false
  };
}

export default {
  name: "QuestionForm",
  components: {
    CardHeading
  },
  props: {
    id: String
  },
  data() {
    return formDefault();
  },
  validations: {
    title: {
      required
    },
    answers: {
      $each: {
        text: {
          required
        }
      }
    },
    correctAnswer: {
      required
    }
  },
  computed: {
    ...mapGetters("questions", ["getQuestionDataById"])
  },
  created() {
    if (this.$route.name === "EditQuestionForm") {
      const currentQuestion = this.getQuestionDataById(this.id);
      const { title, correctAnswer } = currentQuestion;
      const answers = currentQuestion.answers.map(answer => ({
        text: answer.text
      }));
      [this.title, this.answers, this.correctAnswer] = [
        title,
        answers,
        correctAnswer
      ];
    }
  },
  methods: {
    formSubmit() {
      this.isFormSubmitted = true;
      if (this.$v.$invalid) return;
      this.$emit("formSubmit", {
        id: this.id,
        title: this.title,
        answers: this.answers,
        correctAnswer: this.correctAnswer
      });
    },
    resetForm() {
      Object.assign(this.$data, formDefault());
    }
  }
};
</script>
