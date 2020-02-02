import Vue from "vue";
import Vuex from "vuex";
import * as questions from "./questions";
import * as tests from "./tests";
import * as auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    questions,
    tests,
    auth
  },
  state: {
    loading: false,
    settings: {
      howManyInDefaultTest: 5
    }
  },
  mutations: {
    TOGGLE_PROGRESS_BAR(state) {
      state.loading = !state.loading;
    },
    UPDATE_SETTINGS(state, settingsData) {
      state.settings = { ...settingsData };
    }
  },
  actions: {
    updateSettings({ commit }, settingsData) {
      commit("UPDATE_SETTINGS", settingsData);
    }
  }
});
