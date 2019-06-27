import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import user from "./user";
import hunt from "./hunt";
import huntPlay from "./huntPlay";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, user, hunt, huntPlay },
  state: {
    loading: false,
    notify: false,
    notifyMessage: ""
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
    setNotify(state, value) {
      state.notify = value;
    },
    setNotifyMessage(state, value) {
      state.notifyMessage = value;
    }
  },
  actions: {
    updateNotify({ commit }) {
      commit("setNotify", false);
      commit("setNotifyMessage", "");
    },
    setLoading({ commit }, payload) {
      commit("setLoading", payload);
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    notify(state) {
      return state.notify;
    },
    notifyMessage(state) {
      return state.notifyMessage;
    },
    isMaster(state) {
      return state.isMaster;
    },
    isPlayer(state) {
      return state.isPlayer;
    }
  }
});
