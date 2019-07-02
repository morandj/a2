//import router from "../router";
import { fs } from "../firebaseConfig";
export default {
  namespaced: true,
  state: {
    players: [],
    currentPlayer: {},
    playerProfile: {}
  },
  mutations: {
    setPlayers(state, value) {
      // eslint-disable-next-line
      console.log("setPlayers: ", value);
      state.players = value;
    },
    setCurrentPlayer(state, value) {
      // eslint-disable-next-line
      console.log("currentPlayer before:", state.currentPlayer);
      state.currentPlayer = state.players[value];
      // eslint-disable-next-line
      console.log("currentPlayer after:", state.currentPlayer);
    },
    setPlayerProfile(state, payload) {
      state.playerProfile = payload;
    }
  },
  actions: {
    // set player profile in 'players' db
    async setPlayerProfile({ commit, dispatch }, { playerId, playerName }) {
      try {
        console.log("actions:player/setPlayerProfile", playerId, playerName);
        await fs
          .collection("players")
          .doc(playerId)
          .set({
            name: playerName
          });
        await dispatch("getPlayerProfile", { playerId: playerId });
      } catch (error) {
        commit("setNotify", true, { root: true });
        commit("setNotifyMessage", error.message, { root: true });
      }
    },
    // get player profile from 'players' db and set state
    async getPlayerProfile({ commit }, { playerId }) {
      try {
        const doc = await fs
          .collection("players")
          .doc(playerId)
          .get();
        commit("setPlayerProfile", doc.data());
      } catch (error) {
        commit("setNotify", true, { root: true });
        commit("setNotifyMessage", error.message, { root: true });
      }
    },
    getPlayers({ commit }) {
      // eslint-disable-next-line
      console.log("Getting players...");
      commit("setLoading", true);
      return new Promise((resolve, reject) => {
        fs.collection("players")
          .get()
          .then(snapshot => {
            const players = [];
            snapshot.forEach(doc => {
              let player = {
                playerId: null,
                playerData: {}
              };
              // eslint-disable-next-line
              console.log("doc, doc.data() in players:", doc, doc.data());
              player.playerId = doc.id;
              player.playerData = doc.data();
              // eslint-disable-next-line
              console.log("Player in getPlayers = ", player);
              players.push(player);
            });
            commit("setPlayers", players);
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

    // Get the selected Player.
    editCurrentPlayer({ commit, dispatch, state }, obj) {
      // eslint-disable-next-line
      console.log("(2)...in editCurrentPlayer", obj.index, obj.mode);
      commit("setCurrentPlayer", obj.index);
      dispatch("auth/getCustomClaims", state.currentPlayer, { root: true });
    },

    updatePlayer({ commit, dispatch, state }, obj) {
      // eslint-disable-next-line
      console.log("actions:updatePlayer", state.currentPlayer, obj);

      let playerId = obj.player.playerId;
      let playerDoc = obj.player.playerData;
      // let playerClaims = obj.claims;
      // this.$store.dispatch("setLoading", true, { root: true });

      return fs
        .collection("players")
        .doc(playerId)
        .update(playerDoc)
        .then(() => {
          // eslint-disable-next-line
          console.log(
            "action:updatePlayer",
            state.players,
            state.currentPlayer
          );
          // this.$store.dispatch("setLoading", false, { root: true });

          // eslint-disable-next-line
          console.log("committing mutation:updatePlayer");
          // commit("updatePlayer", playerDoc);
        })
        .then(() => {
          // eslint-disable-next-line
          console.log("player/updatePlayer:");
          return dispatch("auth/setUserClaims", obj, { root: true });
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log("Error updating player", error);
          // this.$store.dispatch("setLoading", false, { root: true });
        });
    }
  },
  getters: {
    players(state) {
      return state.players;
    },
    currentPlayer(state) {
      return state.currentPlayer;
    }
  }
};
