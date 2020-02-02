<template>
  <fade-transition mode="out-in">
    <router-view
      @deleteQuestion="deleteQuestionFromDB"
      @editQuestion="navigateToEditQuestionsForm"
      @formSubmit="editQuestion"
    >
      <template #--QuestionForm--headingInForm
        >Edit Question</template
      >
      <template #--QuestionForm--submitBtnText--
        >Continue</template
      >
      <template #--QuestionList--infoText>
        Here you can edit or delete your questions. Just click on
        <v-icon>edit</v-icon>to edit and on <v-icon>delete</v-icon>to delete!
      </template>
    </router-view>
  </fade-transition>
</template>

<script>
import { mapActions } from "vuex";
import { FadeTransition } from "vue2-transitions";

export default {
  name: "EditQuestion",
  components: {
    FadeTransition
  },
  data() {
    return {
      questionId: null
    };
  },
  methods: {
    ...mapActions("questions", ["deleteQuestionFromDB", "editQuestionInDB"]),
    navigateToEditQuestionsForm(questionId) {
      this.$router.push({
        name: "EditQuestionForm",
        params: { id: questionId },
        query: { question: questionId }
      });
    },
    async editQuestion(payload) {
      try {
        await this.editQuestionInDB(payload);
        this.$router.push({ name: "EditQuestionList" });
      } catch {
        console.log("Something went wrong!");
      }
    }
  }
};
</script>
