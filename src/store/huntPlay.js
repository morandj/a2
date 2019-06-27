import { fs } from "../firebaseConfig";

export default {
  namespaced: true,
  state: {
    playerResponse: {
      clueResponses: [],
      scavResponses: []
    }
  },
  mutations: {
    setPlayerResponse(state, value) {
      if ("clueResponses" in value === true) {
        state.playerResponse.clueResponses = value.clueResponses;
      } else {
        state.playerResponse.clueResponses = [];
      }
      if ("scavResponses" in value === true) {
        state.playerResponse.scavResponses = value.scavResponses;
      } else {
        state.playerResponse.scavResponses = [];
      }
    }
  },
  actions: {
    // Get the selected hunt and then get the PLAYER response for that hunt.
    async playCurrentHunt({ commit, dispatch }, obj) {
      commit("hunt/setCurrentHunt", obj.index, { root: true });
      //dispatch("checkUserProfile");
      try {
        const response = await dispatch("getPlayerResponse", obj.index);
        // commit("setLoading", false);
        commit("setPlayerResponse", response);
        // router.push({ name: "edithunt", params: { index } });
      } catch (error) {
        // eslint-disable-next-line
        console.log("Error in action:huntPlay/playCurrentHunt", error);
      }
    },
    async getPlayerResponse({ rootState }) {
      // commit("setLoading", true);

      let userId = rootState.auth.currentPlayer.uid;
      let huntId = rootState.hunt.currentHunt.huntId;
      // let answers; //answers
      let docRef = fs
        .collection("hunts")
        .doc(huntId)
        .collection("players")
        .doc(userId);

      try {
        const doc = await docRef.get();
        if (doc.exists) {
          let docData = doc.data();
          return docData.playerResponse;
        } else {
          let len;

          len = rootState.hunt.currentHunt.huntData.clues.length;
          let resClues = [];
          for (let i = 0; i < len; i++) {
            let num = i + 1;
            let obj = { number: num, response: "" };
            resClues.push(obj);
          }

          len = rootState.hunt.currentHunt.huntData.scavs.length;
          let resScavs = [];
          for (let i = 0; i < len; i++) {
            let num = i + 1;
            let obj = { number: num, response: "" };
            resScavs.push(obj);
          }
          return { clueResponses: resClues, scavResponses: resScavs };
        }
      } catch (error) {
        // commit("setLoading", false);
        // router.push("/");
        // eslint-disable-next-line
        console.log("Error getting player response", error);
      }
    },
    updatePlayerResponse({ commit, state, rootState }) {
      let playerResponse = state.playerResponse;

      let huntId = rootState.hunt.currentHunt.huntId;
      let userId = rootState.auth.currentPlayer.uid;

      if (playerResponse) {
        commit("setLoading", true);
        return fs
          .collection("hunts")
          .doc(huntId)
          .collection("players")
          .doc(userId)
          .set({ playerResponse }, { merge: true })
          .then(() => {
            commit("setLoading", false);
          });
      } else {
        // eslint-disable-next-line
        console.log("no response yet...", playerResponse);
        commit("setLoading", false);
        return [];
      }
    }
  },
  getters: {
    playerResponse(state) {
      return state.playerResponse;
    }
  }
};
