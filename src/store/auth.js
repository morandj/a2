import { fa, ff } from "../firebaseConfig";
export default {
  namespaced: true,
  state: {
    users: [],
    currentUser: {},
    isAuthenticated: false,
    customClaims: {
      master: false,
      player: false
    },
    isMaster: true,
    isPlayer: true
  },
  mutations: {
    setUsers(state, value) {
      // eslint-disable-next-line
      console.log("auth/setUsers: ", value);
      state.users = value;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setCurrentUserClaims(state, value) {
      state.currentUser.claims = value;
      state.isMaster = value.master;
      state.isPlayer = value.player;
      // eslint-disable-next-line
      console.log(
        "value:",
        value,
        "setCurrentUserClaims:",
        state.currentUser,
        "isMaster",
        state.isMaster
      );
    },
    setCustomClaims(state, value) {
      state.customClaims = value;
    },
    updateIsMaster(state, value) {
      state.isMaster = value;
    }
  },
  actions: {
    setIsAuthenticated({ commit }, payload) {
      commit("setIsAuthenticated", payload);
    },
    // Signup Users (including Master)
    async userSignUp({ commit }, { email, password }) {
      commit("setCurrentUser", {});
      commit("setIsAuthenticated", false);
      try {
        const cred = await fa.createUserWithEmailAndPassword(email, password);
        commit("setCurrentUser", cred.user); //uid
        commit("setIsAuthenticated", true);
      } catch (error) {
        commit("setNotify", true, { root: true });
        commit("setNotifyMessage", error.message, { root: true });
      }
    },
    // SignIn Users
    async userSignIn({ commit }, { email, password }) {
      try {
        const cred = await fa.signInWithEmailAndPassword(email, password);
        commit("setCurrentUser", cred.user); //uid
        commit("setIsAuthenticated", true);

        // eslint-disable-next-line
        // console.log("actions:auth/userSignIn...2, getting user profile");
        // return dispatch("getUserProfile");
        // })
        // .then(() => {
        //   // eslint-disable-next-line
        //   console.log("actions:userSignIn...3, getting user claims");
        //   return dispatch("getUserClaims");
        // })
        // .then(() => {
        //   // eslint-disable-next-line
        //   console.log("actions:userSignIn...4, getting hunts");
        //   return dispatch("getHunts");
        // })
        // .then(() => {
        //   // eslint-disable-next-line
        //   console.log(
        //     "actions:userSignIn...5, getting users",
        //     state.currentUser.claims
        //   );
        //   if (state.currentUser.claims.master) {
        //     return dispatch("getUsers");
        //   }
        // })
        // .then(() => {
        //   // eslint-disable-next-line
        //   console.log("actions:userSignIn...6, push to showhunts");
        //   router.push("/showhunts");
        //   // eslint-disable-next-line
        //   console.log("Signed in:...7", state.currentUser);
        // })
      } catch (error) {
        commit("setIsAuthenticated", false);
        commit("setNotify", true, { root: true });
        commit("setNotifyMessage", error.message, { root: true });
      }
    },
    // Signout User
    async userSignOut({ commit }) {
      try {
        fa.signOut();
        commit("setCurrentUser", null);
        commit("setIsAuthenticated", false);
      } catch (error) {
        commit("setCurrentUser", null);
        commit("setIsAuthenticated", false);
      }
    },

    // cloud function
    getCustomClaims({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line
        console.log("auth/getCustomClaims:", state, payload);
        let userId = payload.playerId;
        // let userName = payload.player.playerData.name;
        // let userClaims = payload.claims;
        const getClaims = ff.httpsCallable("getCustomClaims");
        getClaims({ uid: userId })
          .then(result => {
            // eslint-disable-next-line
            console.log("auth/getCustomClaims:", result, payload);
            commit("setCustomClaims", result.data);
            resolve();
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error);
            reject();
          });
      });
    },

    setUserClaims({ state }, payload) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line
        console.log("auth/setUserClaims:", state, payload);
        let userId = payload.player.playerId;
        let userName = payload.player.playerData.name;
        let userClaims = payload.claims;
        const updateClaims = ff.httpsCallable("setCustomClaims");
        updateClaims({ uid: userId, name: userName, claims: userClaims })
          .then(result => {
            // eslint-disable-next-line
            console.log("auth/setUserClaims:", result);
            resolve();
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error);
            reject();
          });
      });
    },

    getUserClaims({ commit, state }) {
      // eslint-disable-next-line
      console.log("actions:auth/getUserClaims...");
      return new Promise((resolve, reject) => {
        fa.currentUser
          .getIdTokenResult()
          .then(idTokenResult => {
            // eslint-disable-next-line
            console.log(
              "Token: ",
              idTokenResult,
              "currentUser: ",
              state.currentUser
            );
            commit("setCurrentUserClaims", idTokenResult.claims);
            resolve();
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error);
            reject();
          });
      });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    customClaims(state) {
      return state.customClaims;
    },
    isMaster(state) {
      return state.isMaster;
    },
    isPlayer(state) {
      return state.isPlayer;
    },
    currentUser(state) {
      return state.currentUser;
    }
  }
};
