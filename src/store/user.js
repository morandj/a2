//import router from "../router";
import { fs } from "../firebaseConfig";
export default {
  namespaced: true,
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile(state, payload) {
      state.userProfile = payload;
    }
  },
  actions: {
    // set user profile in 'users' db
    async setUserProfile({ commit, dispatch }, { userId, userName }) {
      try {
        await fs
          .collection("users")
          .doc(userId)
          .set({
            name: userName
          });
        await dispatch("getUserProfile", { userId: userId });
      } catch (error) {
        commit("setNotify", true, { root: true });
        commit("setNotifyMessage", error.message, { root: true });
      }
    },
    // get user profile from 'users' db and set state
    async getUserProfile({ commit }, { userId }) {
      try {
        const doc = await fs
          .collection("users")
          .doc(userId)
          .get();
        commit("setUserProfile", doc.data());
      } catch (error) {
        commit("setNotify", true, { root: true });
        commit("setNotifyMessage", error.message, { root: true });
      }
    }
  },
  getters: {}
};
