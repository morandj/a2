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
    }
  },
  mutations: {
    setHunts(state, value) {
      // eslint-disable-next-line
      console.log("setHunts: ", value);
      state.hunts = value;
    },
    setCurrentHunt(state, value) {
      // eslint-disable-next-line
      console.log("currentHunt before:", state.currentHunt);
      state.currentHunt = state.hunts[value];
      // eslint-disable-next-line
      console.log("currentHunt after:", state.currentHunt);
    },
    addHunt(state, value) {
      // eslint-disable-next-line
      console.log("Adding hunt to array");
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
      // eslint-disable-next-line
      console.log("actions:addHunt", title, description);
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
        // eslint-disable-next-line
        console.log("addHunt document reference:", docRef);
        let newHunt = {
          huntId: docRef.id,
          huntData: hunt
        };
        commit("addHunt", newHunt);
        //router.push("/");
        // eslint-disable-next-line
        console.log("Hunt added with ref:", newHunt);
      } catch (error) {
        // eslint-disable-next-line
        console.log("Error adding hunt", error);
      }
    },
    getHunts({ commit }) {
      // eslint-disable-next-line
      console.log("Getting hunts...");
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
              // eslint-disable-next-line
              console.log("doc, doc.data() in hunts:", doc, doc.data());

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
    }
  }
};
