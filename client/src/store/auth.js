export const namespaced = true;

export const state = {
  token: null,
  isLoggedIn: false
};

export const mutations = {
  ADD_TOKEN(state, token) {
    state.token = token;
  },
  CLEAN_TOKEN(state) {
    state.token = null;
  },
  TOGGLE_LOGIN(state) {
    state.isLoggedIn = !state.isLoggedIn;
  }
};

export const actions = {
  storeToken({ commit }, token) {
    localStorage.setItem("token", token);
    commit("ADD_TOKEN", token);
    commit("TOGGLE_LOGIN");
  },
  cleanToken({ commit }) {
    localStorage.removeItem("token");
    commit("CLEAN_TOKEN");
    commit("TOGGLE_LOGIN");
  },
  authenticateOnInit({ dispatch }) {
    const token = localStorage.getItem("token");
    if (token) dispatch("storeToken", token);
  }
};

export const getters = {
  getToken: state => {
    return state.token;
  },
  isLoggedIn: state => {
    return state.token ? true : false;
  }
};
