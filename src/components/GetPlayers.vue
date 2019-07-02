<template>
  <div class="container mx-auto flex flex-col">
    <span v-if="loading" class="spinner"></span>
    <ul>
      <li
        v-for="(player, index) in players"
        :key="index"
        class="m-3 px-6 py-4 rounded shadow"
      >
        <div class="flex flex-row content-between">
          <div class="font-bold mb-1">{{ player.playerData.name }}</div>
          <div class="mb-2">{{ player.playerData.team }}</div>

          <!-- <button
            v-if="isAuthenticated && isPlayer"
            @click="playPlayer(index)"
            class="btn btn-blue"
          >Play</button>-->
          <button
            v-if="isAuthenticated && isMaster"
            @click="editPlayer(index)"
            class="btn btn-green ml-auto"
          >
            Edit
          </button>
        </div>
      </li>
    </ul>
    <p class="text-center text-gray-500 text-xs">
      ©2019 Fox Hunts. All rights reserved.
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    isMaster() {
      return this.$store.getters["auth/isMaster"];
    },
    isPlayer() {
      return this.$store.getters["auth/isPlayer"];
    },
    loading() {
      return this.$store.getters.loading;
    },
    players() {
      return this.$store.getters["player/players"];
    }
  },
  methods: {
    editPlayer(index) {
      // eslint-disable-next-line
      console.log("(1)...editPlayer: ", index);
      this.$store
        .dispatch("player/editCurrentPlayer", { index: index, mode: "edit" })
        .then(() => {
          console.log(
            "(6)...Current player got:",
            this.$store.state.player.currentPlayer
          );
          this.$router.push({ name: "editplayer", params: { index } });
        });
    }
  },
  name: "GetPlayers",
  components: {
    // HelloWorld
  }
};
</script>
<style scoped>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border-top: 2px solid #07d;
  border-right: 2px solid transparent;
  animation: spinner 0.6s linear infinite;
}
</style>

