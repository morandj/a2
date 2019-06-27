import { fs } from "../firebaseConfig";

export default {
  namespaced: true,
  state: {
    hunts: [],
    currentHunt: {
      huntData: {
        clues: []
      },
      huntId: ""
    },
    huntSolution: {
      clueAnswers: [],
      scavAnswers: []
    },
    currentClueAnswers: {},
    curentScavAnswers: {},
    currentScavs: {},
    currentScavStatuses: {}
  },
  mutations: {
    setHunts(state, value) {
      state.hunts = value;
    },
    setCurrentHunt(state, value) {
      state.currentHunt = state.hunts[value];
    },
    setHuntSolution(state, value) {
      if ("clueAnswers" in value === true) {
        state.huntSolution.clueAnswers = value.clueAnswers;
      } else {
        state.huntSolution.clueAnswers = [];
      }
      if ("scavAnswers" in value === true) {
        state.huntSolution.scavAnswers = value.scavAnswers;
      } else {
        state.huntSolution.scavAnswers = [];
      }
    },
    addHunt(state, value) {
      state.hunts.push(value);
    },
    updateHunt(state, value) {
      // ? maybe set update status for hunt, i.e. changes made but not yet saved to db?
      // eslint-disable-next-line
      console.log(
        "currentHunt references object in 'hunts array",
        state,
        value
      );
    }
  },
  actions: {
    async addHunt({ commit }, { title, description }) {
      let hunt = {
        id: null,
        title: title,
        description: description,
        rules: null,
        map: null,
        clues: [],
        scavs: [],
        limerick: null,
        date: null,
        notes: ""
      };
      try {
        const docRef = await fs.collection("hunts").add(hunt);
        let newHunt = {
          huntId: docRef.id,
          huntData: hunt
        };
        commit("addHunt", newHunt);
        //router.push("/");
      } catch (error) {
        // eslint-disable-next-line
        console.log("Error adding hunt", error);
      }
    },
    getHunts({ commit }) {
      // commit("setLoading", true);
      return new Promise((resolve, reject) => {
        fs.collection("hunts")
          .get()
          .then(snapshot => {
            const hunts = [];
            snapshot.forEach(doc => {
              let hunt = {
                huntId: null,
                huntData: {}
              };

              hunt.huntId = doc.id;

              hunt.huntData = doc.data();
              // hunt["date"] = doc.data().date.toDate();
              // hunts.push(doc.data());
              // eslint-disable-next-line
              console.log("Hunt in getHunts = ", hunt);
              hunts.push(hunt);
            });
            commit("setHunts", hunts);
            // commit("setLoading", false);
            resolve();
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error);
            // commit("setLoading", false);
            reject();
          });
      });
    },
    // Get the selected hunt and then get the MASTER solution for that hunt.

    async editCurrentHunt({ commit, dispatch }, obj) {
      commit("setCurrentHunt", obj.index);
      try {
        const solution = await dispatch("getHuntSolution");
        commit("setHuntSolution", solution);
      } catch (error) {
        // eslint-disable-next-line
        console.log("Error in action:hunt/getHuntSolution", error);
      }
    },

    async getHuntSolution({ state }) {
      let huntId = state.currentHunt.huntId;
      let docRef = fs
        .collection("hunts")
        .doc(huntId)
        .collection("solutions")
        .doc("solution");
      try {
        const doc = await docRef.get();
        if (doc.exists) {
          return doc.data();
        } else {
          return { clueAnswers: [], scavAnswers: [] };
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log("Error in action:hunt/getHuntSolution", error);
      }
    },
    async updateHunt({ commit, dispatch, state }) {
      let huntId = state.currentHunt.huntId;
      let huntDoc = state.currentHunt.huntData;

      // commit("setLoading", true);
      try {
        await fs
          .collection("hunts")
          .doc(huntId)
          .update(huntDoc);

        await dispatch("updateHuntClueAnswers");
        await dispatch("updateHuntScavAnswers");
        // commit("setLoading", false);
        commit("updateHunt", huntDoc);
      } catch (error) {
        // eslint-disable-next-line
        console.log("Error updating hunt", error);
        // commit("setLoading", false);
      }
    },
    updateHuntClueAnswers({ state }) {
      let clueAnswers = state.huntSolution.clueAnswers;
      // eslint-disable-next-line
      console.log(clueAnswers.length > 0 ? "ok" : "not ok");
      let huntId = state.currentHunt.huntId;
      // let huntDoc = state.currentHunt.huntData;
      // let userId = state.currentUser.uid;

      if (clueAnswers.length > 0) {
        // commit("setLoading", true);
        return fs
          .collection("hunts")
          .doc(huntId)
          .collection("solutions")
          .doc("solution")
          .set({ clueAnswers }, { merge: true }) // Note object wrap {}
          .then(() => {
            // commit("setLoading", false);
          });
      } else {
        // eslint-disable-next-line
        console.log("no clue answers yet...", clueAnswers);
        // commit("setLoading", false);
        return [];
      }
    },
    updateHuntScavAnswers({ commit, state }) {
      // eslint-disable-next-line

      let scavAnswers = state.huntSolution.scavAnswers;
      // eslint-disable-next-line
      console.log(scavAnswers.length > 0 ? "ok" : "not ok");
      let huntId = state.currentHunt.huntId;
      // let huntDoc = state.currentHunt.huntData;
      // let userId = state.currentUser.uid;

      if (scavAnswers.length > 0) {
        //let ans = { scavAnswers };
        // commit("setLoading", true);
        return fs
          .collection("hunts")
          .doc(huntId)
          .collection("solutions")
          .doc("solution")
          .set({ scavAnswers }, { merge: true })
          .then(() => {
            commit("setLoading", false);
          });
      } else {
        // eslint-disable-next-line
        console.log("no scav answers yet...", scavAnswers);
        // commit("setLoading", false);
        return [];
      }
    }
  },
  getters: {
    hunts(state) {
      return state.hunts;
      // return state.hunts.sort((huntA, huntB) => {
      //   return huntA.date > huntB.date;
      // });
    },
    hunt: state => idx => {
      return state.hunts[idx];
    },
    currentHunt(state) {
      return state.currentHunt;
    },
    clues(state) {
      return state.currentHunt.huntData.clues;
    },
    currentClueAnswers(state) {
      return state.currentClueAnswers; // answers
    },
    scavs(state) {
      return state.currentHunt.huntData.scavs;
    },
    huntSolution(state) {
      return state.huntSolution;
    },
    huntClueAnswers(state) {
      return state.huntSolution.clueAnswers;
    }
  }
};
