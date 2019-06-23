import { fa } from "../firebaseConfig";
export default {
  namespaced: true,
  state: {
    currentPlayer: {},
    isAuthenticated: false,
    isMaster: true,
    isPlayer: true
  },
  mutations: {
    setCurrentPlayer(state, payload) {
      state.currentPlayer = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    }
  },
  actions: {
    setIsAuthenticated({ commit }, payload) {
      commit("setIsAuthenticated", payload);
    },
    // Signup Players (including Master)
    async playerSignUp({ commit }, { email, password }) {
      commit("setCurrentPlayer", {});
      commit("setIsAuthenticated", false);
      try {
        const cred = await fa.createUserWithEmailAndPassword(email, password);
        commit("setCurrentPlayer", cred.user); //uid
        commit("setIsAuthenticated", true);
      } catch (error) {
        commit("setNotify", true, { root: true });
        commit("setNotifyMessage", error.message, { root: true });
      }
    },
    // Signin Players (including Master)
    async playerSignIn({ commit }, { email, password }) {
      try {
        const cred = await fa.signInWithEmailAndPassword(email, password);
        commit("setCurrentPlayer", cred.user); //uid
        commit("setIsAuthenticated", true);

        // eslint-disable-next-line
        // console.log("actions:auth/playerSignIn...2, getting player profile");
        // return dispatch("getPlayerProfile");
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
        //     state.currentPlayer.claims
        //   );
        //   if (state.currentPlayer.claims.master) {
        //     return dispatch("getUsers");
        //   }
        // })
        // .then(() => {
        //   // eslint-disable-next-line
        //   console.log("actions:userSignIn...6, push to showhunts");
        //   router.push("/showhunts");
        //   // eslint-disable-next-line
        //   console.log("Signed in:...7", state.currentPlayer);
        // })
      } catch (error) {
        commit("setIsAuthenticated", false);
        commit("setNotify", true, { root: true });
        commit("setNotifyMessage", error.message, { root: true });
      }
    },
    // Signout Master & Player
    async userSignOut({ commit }) {
      try {
        fa.signOut();
        commit("setCurrentPlayer", null);
        commit("setIsAuthenticated", false);
      } catch (error) {
        commit("setCurrentPlayer", null);
        commit("setIsAuthenticated", false);
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    isMaster(state) {
      return state.isMaster;
    },
    isPlayer(state) {
      return state.isPlayer;
    },
    currentPlayer(state) {
      return state.currentPlayer;
    }
  }
};
