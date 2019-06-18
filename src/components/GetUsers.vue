<template>
  <div class="container mx-auto flex flex-col">
    <span v-if="loading" class="spinner"></span>
    <ul>
      <li v-for="(user, index) in users" :key="index" class="m-3 px-6 py-4 rounded shadow">
        <div class="flex flex-row content-between">
          <div class="font-bold mb-1">{{ user.userData.name }}</div>
          <div class="mb-2">{{ user.userData.team }}</div>

          <!-- <button
            v-if="isAuthenticated && isPlayer"
            @click="playUser(index)"
            class="btn btn-blue"
          >Play</button>-->
          <button
            v-if="isAuthenticated && isMaster"
            @click="editUser(index)"
            class="btn btn-green ml-auto"
          >Edit</button>
        </div>
      </li>
    </ul>
    <p class="text-center text-gray-500 text-xs">©2019 Fox Hunts. All rights reserved.</p>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isMaster() {
      return this.$store.getters.isMaster;
    },
    isPlayer() {
      return this.$store.getters.isPlayer;
    },
    loading() {
      return this.$store.getters.loading;
    },
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    editUser(index) {
      // eslint-disable-next-line
      console.log("(1)...editUser: ", index);
      this.$store
        .dispatch("editCurrentUser", { index: index, mode: "edit" })
        .then(() => {
          console.log("(6)...Current user got:", this.$store.state.currentUser);
          this.$router.push({ name: "edituser", params: { index } });
        });
    }

    // playHunt(index) {
    //   // eslint-disable-next-line
    //   console.log("(1)...playHunt: ", this.hunts[index]);
    //   this.$store
    //     .dispatch("playCurrentHunt", { index: index, mode: "play" })
    //     .then(() => {
    //       console.log(
    //         "(6)...Current hunt got in home/playhunt:",
    //         this.$store.state.currentHunt
    //       );
    //       this.$router.push({ name: "playhunt", params: { index } });
    //     });
    // }
  },
  name: "GetUsers",
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

