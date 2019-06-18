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
      // eslint-disable-next-line
      console.log("user/setUserProfile:", state.userProfile);
    }
  },
  actions: {
    // set user profile in 'users' db
    async setUserProfile({ commit, dispatch }, { userId, userName }) {
      // eslint-disable-next-line
      console.log("actions:user/setUserProfile...0-start");
      try {
        await fs
          .collection("users")
          .doc(userId)
          .set({
            name: userName
          });
        // eslint-disable-next-line
        console.log("actions:user/setUserProfile...1");
        await dispatch("getUserProfile", { userId: userId });
        // eslint-disable-next-line
        console.log("actions:user/setUserProfile...2-finish");
      } catch (error) {
        commit("setNotify", true, { root: true });
        commit("setNotifyMessage", error.message, { root: true });
      }
    },
    // get user profile from 'users' db and set state
    async getUserProfile({ commit }, { userId }) {
      // eslint-disable-next-line
      console.log("actions:user/getUserProfile...0-start");
      try {
        const doc = await fs
          .collection("users")
          .doc(userId)
          .get();

        // eslint-disable-next-line
        console.log("actions:user/getUserProfile...1-finish");
        commit("setUserProfile", doc.data());
      } catch (error) {
        commit("setNotify", true, { root: true });
        commit("setNotifyMessage", error.message, { root: true });
      }
    }
  },
  getters: {}
};
