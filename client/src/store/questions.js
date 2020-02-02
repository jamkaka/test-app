import { catchAsyncVuex } from "../utils/error";
import { authedHttp } from "../utils/http";

export const namespaced = true;

export const state = {
  questions: []
};

export const mutations = {
  CLEAR_STATE(state) {
    state.questions = [];
  },
  REPLACE_STATE(state, questionArray) {
    state.questions = [...questionArray];
  }
};

export const actions = {
  fetchAndPopulateStoreWithQuestions: catchAsyncVuex(
    async ({ commit, getters }) => {
      commit("TOGGLE_PROGRESS_BAR", null, { root: true });
      const questionArray = (await authedHttp(getters.getToken).get(
        "questions"
      )).data.data;
      commit("REPLACE_STATE", questionArray);
    }
  ),
  addQuestionToDB: catchAsyncVuex(async ({ commit, getters }, questionData) => {
    commit("TOGGLE_PROGRESS_BAR", null, { root: true });
    await authedHttp(getters.getToken).post(`questions`, questionData);
  }),
  editQuestionInDB: catchAsyncVuex(
    async ({ commit, getters }, { id, ...questionData }) => {
      commit("TOGGLE_PROGRESS_BAR", null, { root: true });
      await authedHttp(getters.getToken).patch(`questions/${id}`, questionData);
    }
  ),
  deleteQuestionFromDB: catchAsyncVuex(
    async ({ commit, getters, dispatch }, questionId) => {
      commit("TOGGLE_PROGRESS_BAR", null, { root: true });
      await authedHttp(getters.getToken).delete(`questions/${questionId}`);
      // need to dispatch as it i delete and immidiatelly need to see result.
      await dispatch("fetchAndPopulateStoreWithQuestions");
    }
  ),
  reinitState({ commit }) {
    commit("CLEAR_STATE");
  }
};

export const getters = {
  getQuestionDataById: state => questionId => {
    return state.questions.find(question => question._id === questionId);
  },
  getQuestionsArrayByIds: (state, getters) => questionsIdArray => {
    return questionsIdArray.map(questionId =>
      getters.getQuestionDataById(questionId)
    );
  },
  getAllQuestionsIds: state => {
    return state.questions.map(question => question._id);
  },
  getToken: (state, getters, rootState, rootGetters) => {
    return rootGetters["auth/getToken"];
  }
};
