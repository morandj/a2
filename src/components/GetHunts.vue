<template>
  <div class="container mx-auto flex flex-col items-center">
    <span v-if="loading" class="spinner"></span>
    <ul>
      <li
        v-for="(hunt, index) in hunts"
        :key="index"
        class="m-3 px-6 py-4 rounded shadow"
      >
        <div class="flex flex-col">
          <div class="font-bold mb-1">{{ hunt.huntData.title }}</div>
          <div class="mb-2">{{ hunt.huntData.description }}</div>

          <button
            v-if="isAuthenticated && isPlayer"
            @click="playHunt(index)"
            class="btn btn-blue"
          >
            Play
          </button>
          <button
            v-if="isAuthenticated && isMaster"
            @click="editHunt(index)"
            class="btn btn-green"
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
    hunts() {
      return this.$store.getters["hunt/hunts"];
    }
  },
  methods: {
    async editHunt(index) {
      await this.$store
        .dispatch("hunt/editCurrentHunt", { index: index, mode: "edit" })
        .then(() => {
          this.$router.push({ name: "edithunt", params: { index } });
        });
    },

    async playHunt(index) {
      await this.$store
        .dispatch("huntPlay/playCurrentHunt", {
          index: index,
          mode: "play"
        })
        .then(() => {
          this.$router.push({ name: "playhunt", params: { index } });
        });
    }
  },
  name: "GetHunts",
  components: {}
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
