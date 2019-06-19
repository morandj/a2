<template>
  <div class="container mx-auto">
    <span v-if="loading" class="spinner"></span>
    <h1 class="text-center">Home</h1>
    <p class="text-center text-gray-500 text-xs">
      ©2019 Fox Hunts. All rights reserved..
    </p>
  </div>
</template>

<script>
// import GetHunts from "@/components/GetHunts.vue";
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
    }
  },
  methods: {},
  name: "Home",
  components: {
    // HelloWorld
    // GetHunts
    //testing
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
