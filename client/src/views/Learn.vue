<template>
  <fade-transition mode="out-in">
    <router-view
      @questionClicked="navigateToQuestion"
      @questionAnswered="navigateToQuestionList"
    >
      <template #--QuestionList--infoText
        >Here you test yourself! Click question and try!</template
      >
    </router-view>
  </fade-transition>
</template>

<script>
import { FadeTransition } from "vue2-transitions";

export default {
  name: "Learn",
  components: {
    FadeTransition
  },
  methods: {
    navigateToQuestion(id) {
      this.$router.push({
        name: "LearnSingleQuestion",
        params: { id },
        query: { question: id }
      });
    },
    navigateToQuestionList() {
      this.$router.push({ name: "LearnQuestionList" });
    }
  }
};
</script>

<style></style>
