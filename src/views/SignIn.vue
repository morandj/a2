<template>
  <div id="signin" class="container mx-auto flex justify-center m-4">
    <!-- <h1 class="w-full max-w-xs">SIGNIN</h1> -->
    <div class="w-full max-w-xs">
      <form
        @submit.prevent
        class="container mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
            >Username</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            v-model.trim="signInForm.email"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
            >Password</label
          >
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            v-model.trim="signInForm.password"
          />
          <p class="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-around">
          <button
            @click="signIn"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
          <button
            @click="cancel"
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Cancel
          </button>
          <!-- <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700"
            href="#"
          >Forgot Password?</a>-->
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        ©2019 Hunts. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signInForm: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/currentUser"];
    },
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  },
  methods: {
    async signIn() {
      try {
        this.$store.dispatch("setLoading", true, { root: true });

        await this.$store.dispatch("auth/userSignIn", {
          email: this.signInForm.email,
          password: this.signInForm.password
        });
        if (this.isAuthenticated) {
          await this.$store.dispatch("auth/getUserClaims");
          await this.$store.dispatch("player/getPlayerProfile", {
            playerId: this.currentUser.uid
          });
          await this.$store.dispatch("hunt/getHunts", {});
          await this.$store.dispatch("player/getPlayers", {}); //if master!!
          this.$store.dispatch("setLoading", false, { root: true });
          this.$router.push("/"); // change to: "/showhunts"
        } else {
          this.$store.dispatch("setLoading", false, { root: true });
        }
      } catch (error) {
        this.$store.dispatch("setLoading", false, { root: true });
        this.$store.dispatch("auth/setIsAuthenticated", false);
      }
    },

    cancel() {
      this.$router.push("/");
    }
  }
};
</script>
