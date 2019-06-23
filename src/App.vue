<template>
  <div id="app">
    <div id="nav">
      <navigation-menu />
      <notification-alert v-if="notify">
        {{ notifyMessage }}
      </notification-alert>
      <span v-if="loading" class="spinner"></span>
    </div>
    <router-view />
  </div>
</template>

<script>
import NavigationMenu from "./components/NavigationMenu";
import NotificationAlert from "./components/NotificationAlert";

export default {
  computed: {
    loading() {
      // console.log("Loading...", this.$store.getters.loading);
      return this.$store.getters.loading;
    },
    notify() {
      return this.$store.getters.notify;
    },
    notifyMessage() {
      return this.$store.getters.notifyMessage;
    }
  },
  components: {
    NavigationMenu,
    NotificationAlert
  }
};
</script>

<style>
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
@import "./assets/css/main.css";
</style>
