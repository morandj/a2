// import router from "../router";
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
      // eslint-disable-next-line
      // console.log("auth/setCurrentPlayer:", state.currentPlayer);
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    }
  },
  actions: {
    // Signup Players (including Master)
    async playerSignUp({ commit }, { email, password }) {
      // eslint-disable-next-line
      console.log("actions:auth/playerSignUp...");
      commit("setCurrentPlayer", {});
      commit("setIsAuthenticated", false);
      // eslint-disable-next-line
      console.log("Sign Up... 1.");
      try {
        const cred = await fa.createUserWithEmailAndPassword(email, password);
        // eslint-disable-next-line
        console.log("Sign Up... 2.");
        commit("setCurrentPlayer", cred.user); //uid
        commit("setIsAuthenticated", true);
        // return cred.user.uid;
      } catch (error) {
        // eslint-disable-next-line
        console.log("Sign Up...2a. error:", error.message);
        commit("setNotify", true, { root: true });
        commit("setNotifyMessage", error.message, { root: true });
      }
    },
    // Signin Master & Players
    async playerSignIn({ commit }, { email, password }) {
      // eslint-disable-next-line
      console.log("actions:auth/playerSignIn...0-start");
      try {
        const cred = await fa.signInWithEmailAndPassword(email, password);
        // eslint-disable-next-line
        console.log("actions:auth/playerSignIn...1-finish", cred);
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
        // eslint-disable-next-line
        console.log("Sign In error", error);
        commit("setNotify", true, { root: true });
        commit("setNotifyMessage", error.message, { root: true });
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
