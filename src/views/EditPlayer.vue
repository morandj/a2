<template>
  <div class="container mx-auto flex justify-center m-4">
    <div class="w-full max-w-sm">
      <h1 class>Edit Player</h1>
      <form
        @submit.prevent
        class="bg-white shadow-md rounded px-6 pt-4 pb-6 mb-4"
      >
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="name"
            >Name</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            v-model.trim="player.playerData.name"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="team"
            >Team</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="team"
            type="text"
            placeholder="Team"
            v-model.trim="player.playerData.team"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="master"
            >Master</label
          >
          <input
            class
            id="team"
            type="checkbox"
            v-model.trim="customClaims.master"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="player"
            >Player</label
          >
          <input
            class
            id="team"
            type="checkbox"
            v-model.trim="customClaims.player"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            @click="updatePlayer"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Update
          </button>
        </div>
        <div class="flex items-center justify-between">
          <button
            @click="updatePlayer"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Delete
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
  beforeCreate() {
    console.log("beforeCreate:");
  },
  computed: {
    customClaims() {
      let claims = this.$store.getters["auth/customClaims"];
      if (claims) {
        return claims;
      } else {
        return {
          master: false,
          player: false
        };
      }
    },
    isMaster: {
      get() {
        return this.$store.getters["auth/isMaster"];
      },
      set(value) {
        this.$store.commit("auth/updateIsMaster");
      }
    },
    isPlayer() {
      return this.$store.getters["auth/isPlayer"];
    },
    player() {
      // eslint-disable-next-line
      console.log("computed:>", this.$route.params.index);
      return this.$store.getters["player/currentPlayer"];
    }
  },
  data() {
    return {};
  },
  methods: {
    updatePlayer() {
      // eslint-disable-next-line
      console.log("EditPlayer/updatePlayer:", this.player);
      this.$store.dispatch("player/updatePlayer", {
        player: this.player,
        claims: {
          master: this.customClaims.master,
          player: this.customClaims.player
        }
      });
    }
  },
  components: {}
};
</script>
