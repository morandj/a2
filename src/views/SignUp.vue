<template>
  <div id="signup" class="container mx-auto flex justify-center m-4">
    <div class="w-full max-w-xs">
      <form
        @submit.prevent
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label
            class="block text-gray-800 text-sm font-bold mb-2"
            for="username"
            >Name</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            v-model.trim="signUpForm.name"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="email"
            >Email</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            v-model.trim="signUpForm.email"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-800 text-sm font-bold mb-2"
            for="password"
            >Password</label
          >
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            v-model.trim="signUpForm.password"
          />
          <p class="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-around">
          <button
            @click="signUp"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign Up
          </button>
          <button
            @click="cancel"
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Cancel
          </button>
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
      signUpForm: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  computed: {
    currentPlayer() {
      return this.$store.getters["auth/currentPlayer"];
    }
  },
  methods: {
    async signUp() {
      // eslint-disable-next-line
      console.log(
        "signUp:",
        this.signUpForm.name,
        this.signUpForm.email,
        this.signUpForm.password
      );
      await this.$store.dispatch("auth/playerSignUp", {
        // name: this.signUpForm.name,
        email: this.signUpForm.email,
        password: this.signUpForm.password
      });

      if (this.currentPlayer.uid) {
        await this.$store.dispatch("user/setUserProfile", {
          userId: this.currentPlayer.uid,
          userName: this.signUpForm.name
        });
      }
    },
    cancel() {
      this.$router.push("/");
    }
  }
};
</script>
