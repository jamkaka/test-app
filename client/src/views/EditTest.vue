<template>
  <fade-transition mode="out-in">
    <router-view
      @addTest="navToAddTestForm"
      @editTest="navToEditTestForm"
      @deleteTest="deleteTest"
      @formSubmit="handleFormSubmit"
    >
      <template
        #--TestForm--submitBtnText
      >{{ $route.name === "AddTestForm" ? "Add Test" : "Edit Test" }}</template>
      <template #--TestForm--headingInForm>
        {{
        $route.name === "AddTestForm" ? "Add Test" : "Edit Test"
        }}
      </template>
    </router-view>
  </fade-transition>
</template>

<script>
import { mapActions } from "vuex";
import { FadeTransition } from "vue2-transitions";

export default {
  name: "EditTests",
  components: {
    FadeTransition
  },
  methods: {
    ...mapActions({
      addTestToDB: "tests/addTestToDB",
      editTestInDB: "tests/editTestInDB",
      deleteTestFromDB: "tests/deleteTestFromDB"
    }),
    navToAddTestForm() {
      this.$router.push({
        name: "AddTestForm"
      });
    },
    navToEditTestForm(testId) {
      this.$router.push({
        name: "EditTestForm",
        params: { id: testId },
        query: { test: testId }
      });
    },
    async handleFormSubmit({ from, name, questions, _id }) {
      from === "AddTestForm" && (await this.addTest({ name, questions }));
      from === "EditTestForm" &&
        (await this.editTest({ name, questions, _id }));
      this.$router.push({
        name: "TestList"
      });
    },
    addTest(testData) {
      this.addTestToDB(testData);
    },
    editTest({ _id, ...testData }) {
      this.editTestInDB({ _id, testData });
    },
    deleteTest(_id) {
      this.deleteTestFromDB(_id);
    }
  }
};
</script>
