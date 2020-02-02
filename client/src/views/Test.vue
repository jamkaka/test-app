<template>
  <fade-transition mode="out-in">
    <component
      :is="currentComponent"
      :current-props="currentProps"
      :key="currentComponent.name"
      @gameInit="gameInit"
      @gameOver="gameOver"
      @resetGame="resetGame"
    ></component>
  </fade-transition>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { FadeTransition } from "vue2-transitions";
import _shuffle from "lodash/shuffle";
//
import TestInit from "./../components/test/TestInit";

export default {
  name: "Test",
  components: {
    FadeTransition,
    TestInit
  },
  data() {
    return {
      TestGameSummary: () => import("./../components/test/TestGameSummary"),
      TestGame: () => import("./../components/test/TestGame"),
      TestInit,
      currentComponent: TestInit,
      gameSummary: null,
      preparedQuestionsForGame: [],
      currentProps: null
    };
  },
  computed: {
    ...mapState("questions", {
      questions: state => state.questions
    }),
    ...mapState({
      howManyInDefaultTest: state => state.settings.howManyInDefaultTest
    }),
    ...mapGetters("questions", [
      "getQuestionsArrayByIds",
      "getAllQuestionsIds"
    ]),
    ...mapGetters("tests", ["getQuestionsIdsFromTest"])
  },
  watch: {
    currentComponent() {
      const propsComponentMap = new Map()
        .set(this.TestGame, this.prepareQuestions)
        .set(this.TestGameSummary, this.gameSummary);
      this.currentProps = propsComponentMap.get(this.currentComponent);
      if (this.currentComponent === this.TestGame) {
        this.currentProps = this.preparedQuestionsForGame;
      } else if (this.currentComponent === this.TestGameSummary) {
        this.currentProps = this.gameSummary;
      }
    }
  },
  methods: {
    gameInit(chosenTestId) {
      let chosenQuestionsIds;
      // handling default test
      if (chosenTestId) {
        chosenQuestionsIds = this.getQuestionsIdsFromTest(chosenTestId);
      } else {
        chosenQuestionsIds = this.getAllQuestionsIds;
      }
      this.preparedQuestionsForGame = this.prepareQuestions(chosenQuestionsIds);
      this.currentComponent = this.TestGame;
    },
    gameOver(gameSummary) {
      this.currentComponent = this.TestGameSummary;
      this.gameSummary = gameSummary;
    },
    resetGame() {
      this.currentComponent = this.TestInit;
      this.gameSummary = null;
    },
    prepareQuestions(questionIds) {
      const chosenQuestionsArray = this.getQuestionsArrayByIds(questionIds);
      const shuffledAndTruncatedQuestions = _shuffle(
        chosenQuestionsArray
      ).splice(0, this.howManyInDefaultTest);
      return shuffledAndTruncatedQuestions;
    }
  }
};
</script>
