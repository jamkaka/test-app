<template>
  <v-card class="pb-5">
    <CardHeading>
      Questions list
    </CardHeading>

    <v-divider></v-divider>

    <v-card-text>
      <slot name="--QuestionList--infoText"></slot>
    </v-card-text>

    <v-divider></v-divider>

    <v-list flat>
      <v-list-item-group multiple v-model="selectedQuestions">
        <template v-for="question in questions">
          <v-list-item
            :key="question._id"
            :value="question._id"
            :ripple="isListItemActive"
            :inactive="!isListItemActive"
            @click="$emit('questionClicked', question._id)"
          >
            <template v-slot:default="{ active, toggle }">
              <v-icon flat class="pa-2">question_answer</v-icon>
              <v-list-item-content>
                <v-list-item-title v-text="question.title"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-layout align-center>
                  <template v-if="hasCrudIcons">
                    <v-flex>
                      <v-btn icon @click="$emit('editQuestion', question._id)">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        @click="$emit('deleteQuestion', question._id)"
                      >
                        <v-icon>
                          delete
                        </v-icon>
                      </v-btn>
                    </v-flex>
                  </template>
                  <template v-if="hasCheckbox">
                    <v-flex pl-3>
                      <v-checkbox
                        :input-value="active"
                        :true-value="question._id"
                        color="deep-purple accent-4"
                        @click="toggle"
                      ></v-checkbox>
                    </v-flex>
                  </template>
                </v-layout>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider :key="`divider-${question._id}`"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import CardHeading from "./../generic/CardHeading";

export default {
  name: "QuestionList",
  components: {
    CardHeading
  },
  props: {
    questionsToEdit: {
      type: Array,
      default: () => []
    },
    hasCheckbox: {
      type: Boolean,
      default: false
    },
    hasCrudIcons: {
      type: Boolean,
      default: false
    },
    isListItemActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isSelected: false,
      selectedQuestions: []
    };
  },
  computed: {
    ...mapState("questions", {
      questions: state => state.questions
    })
  },
  watch: {
    selectedQuestions() {
      this.$emit("questionSelected", this.selectedQuestions);
    }
  },
  created() {
    if (!this.questionsToEdit.length) return;
    this.selectedQuestions = this.questionsToEdit;
  }
};
</script>
