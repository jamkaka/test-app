import { catchAsyncVuex } from "../utils/error";
import { authedHttp } from "../utils/http";

export const namespaced = true;

export const state = {
  tests: []
};

export const mutations = {
  REPLACE_STATE(state, testArray) {
    state.tests = [...testArray];
  }
};

export const actions = {
  cleanUpTest() {},
  fetchAndPopulateStoreWithTests: catchAsyncVuex(
    async ({ commit, getters }) => {
      commit("TOGGLE_PROGRESS_BAR", null, { root: true });
      const testArray = (await authedHttp(getters.getToken).get("tests")).data
        .data;
      commit("REPLACE_STATE", testArray);
    }
  ),
  addTestToDB: catchAsyncVuex(async ({ commit, getters }, testData) => {
    commit("TOGGLE_PROGRESS_BAR", null, { root: true });
    await authedHttp(getters.getToken).post(`tests`, { ...testData });
  }),
  editTestInDB: catchAsyncVuex(
    async ({ commit, getters }, { _id, ...testData }) => {
      commit("TOGGLE_PROGRESS_BAR", null, { root: true });
      // ! check if destructuring is compulsory!
      await authedHttp(getters.getToken).patch(`tests/${_id}`, testData);
    }
  ),
  deleteTestFromDB: catchAsyncVuex(
    async ({ commit, getters, dispatch }, _id) => {
      commit("TOGGLE_PROGRESS_BAR", null, { root: true });
      await authedHttp(getters.getToken).delete(`tests/${_id}`);
      dispatch("fetchAndPopulateStoreWithTests");
    }
  )
};

export const getters = {
  getTestDataById: state => testId => {
    return { ...state.tests.find(test => testId === test._id) };
  },
  getQuestionsIdsFromTest: (state, getters) => testId => {
    const { questions: questionIds } = getters.getTestDataById(testId);
    return questionIds;
  },
  getToken: (state, getters, rootState, rootGetters) => {
    return rootGetters["auth/getToken"];
  }
};
