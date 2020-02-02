<template>
  <div>
    <v-card class="mb-4">
      <CardHeading>
        <slot name="--TestForm--headingInForm"></slot>
      </CardHeading>
      <v-divider></v-divider>
      <v-card-text>Type in name of the test.</v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-layout>
            <v-flex>
              <v-text-field
                v-model="$v.name.$model"
                :error-messages="
                  isFormSubmitted && $v.name.$invalid
                    ? 'You need to specify name for the test!'
                    : ''
                "
                label="Name of the test"
                hint="Type in test name"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-btn class="mt-2" color="primary" @click.prevent="formSubmit">
              <slot name="--TestForm--submitBtnText">
                Here you can choose questions you want to add to the
                test.
              </slot>
            </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>

    <v-alert
      :value="isFormSubmitted && questions.length === 0"
      type="error"
      transition="scale-transition"
      outlined
    >You have to select at least 1 question!</v-alert>

    <QuestionList
      :questions-to-edit="questions"
      has-checkbox
      is-list-item-active
      @questionSelected="updateSelectedQuestions"
    >
      <template #--QuestionList--infoText>Here you can choose questions you want to add to the test.</template>
    </QuestionList>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

import CardHeading from "./../generic/CardHeading";
import QuestionList from "./../question/QuestionList";

function formDefault() {
  return {
    isAlertShown: false,
    name: "",
    questions: [],
    isFormSubmitted: false
  };
}

export default {
  name: "TestForm",
  components: {
    CardHeading,
    QuestionList
  },
  props: {
    id: String
  },
  data() {
    return formDefault();
  },
  validations: {
    name: {
      required
    }
  },
  computed: {
    ...mapGetters("tests", ["getTestDataById"])
  },
  created() {
    if (!this.id) return;
    const { name, questions: questionIds } = this.getTestDataById(this.id);
    [this.name, this.questions] = [name, questionIds];
  },
  methods: {
    updateSelectedQuestions(selectedQuestions) {
      this.questions = selectedQuestions;
    },
    formSubmit() {
      this.isFormSubmitted = true;
      if (this.$v.$invalid || this.questions.length === 0) return;
      const formPayload = {
        name: this.name,
        questions: this.questions,
        from: this.$route.name
      };
      this.$emit(
        "formSubmit",
        this.id ? { _id: this.id, ...formPayload } : formPayload
      );
    }
  }
};
</script>
