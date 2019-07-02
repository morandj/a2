//import router from "../router";
import { fs } from "../firebaseConfig";
export default {
  namespaced: true,
  state: {
    users: [],
    currentUser: {},
    userProfile: {}
  },
  mutations: {
    setUsers(state, value) {
      // eslint-disable-next-line
      console.log("setUsers: ", value);
      state.users = value;
    },
    setCurrentUser(state, value) {
      // eslint-disable-next-line
      console.log("currentUser before:", state.currentUser);
      state.currentUser = state.users[value];
      // eslint-disable-next-line
      console.log("currentUser after:", state.currentUser);
    },
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
    },
    getUsers({ commit }) {
      // eslint-disable-next-line
      console.log("Getting users...");
      commit("setLoading", true);
      return new Promise((resolve, reject) => {
        fs.collection("users")
          .get()
          .then(snapshot => {
            const users = [];
            snapshot.forEach(doc => {
              let user = {
                userId: null,
                userData: {}
              };
              // eslint-disable-next-line
              console.log("doc, doc.data() in users:", doc, doc.data());
              user.userId = doc.id;
              user.userData = doc.data();
              // eslint-disable-next-line
              console.log("User in getUsers = ", user);
              users.push(user);
            });
            commit("setUsers", users);
            commit("setLoading", false);
            resolve();
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error);
            commit("setLoading", false);
            reject();
          });
      });
    },

    // Get the selected User.
    editCurrentUser({ commit, dispatch, state }, obj) {
      // eslint-disable-next-line
      console.log("(2)...in editCurrentUser", obj.index, obj.mode);
      commit("setCurrentUser", obj.index);
    },

    updateUser({ commit, dispatch, state }, obj) {
      // eslint-disable-next-line
      console.log("actions:updateUser", state.currentUser, obj);

      let userId = state.currentUser.userId;
      let userDoc = state.currentUser.userData;

      commit("setLoading", true);

      return fs
        .collection("users")
        .doc(userId)
        .update(userDoc)
        .then(() => {
          // eslint-disable-next-line
          console.log("action:updateUser", state.users, state.currentUser);

          // dispatch("updateMasterClueAnswers");

          commit("setLoading", false);

          // eslint-disable-next-line
          console.log("committing mutation:updateUser");
          commit("updateUser", userDoc);
        })
        .then(() => {
          if (obj.makeMaster) {
            // eslint-disable-next-line
            console.log("Will make this user a MASTER");
            return dispatch("addUserRoles");
          }
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log("Error updating user", error);
          commit("setLoading", false);
        });
    }
  },
  getters: {
    users(state) {
      return state.users;
    },
    currentUser(state) {
      return state.currentUser;
    }
  }
};
