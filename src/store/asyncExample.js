// Signup Players (including Master)
actions: {
    async playerSignUp({ commit }, { email, password }) {
      // eslint-disable-next-line
      console.log("actions:auth/playerSignUp...");
      // eslint-disable-next-line
      console.log("Sign Up... 1.");
      try {
        const cred = await fa.createUserWithEmailAndPassword(email, password);
        // eslint-disable-next-line
        console.log("Sign Up... 2.");
        commit("setCurrentPlayer", cred.user); //uid
        commit("setIsAuthenticated", true);
        return cred.user.uid;
      } catch (error) {
        // eslint-disable-next-line
        console.log("Sign Up error:", error.message);
      }
    }    
    playerSignUp2({ commit }, { email, password }) {
      // eslint-disable-next-line
      console.log("actions:auth/playerSignUp...");
      // eslint-disable-next-line
      console.log("Sign Up... 1.");
      return fa
        .createUserWithEmailAndPassword(email, password)
        .then(cred => {
          // eslint-disable-next-line
          console.log("Sign Up... 2.");
          commit("setCurrentPlayer", cred.user); //uid
          commit("setIsAuthenticated", true);
          return cred.user.uid;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log("Sign Up error:", error.message);
          //return error.message;
          //commit("setNotify", true);
          //commit("setNotifyMessage", err.message);
        });
    }
  }