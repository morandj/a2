<template>
  <div id="app">
    <div id="nav">
      <navigation-menu />
      <notification-alert v-if="notify">
        {{ notifyMessage }}
      </notification-alert>
    </div>
    <router-view />
  </div>
</template>

<script>
import NavigationMenu from "./components/NavigationMenu";
import NotificationAlert from "./components/NotificationAlert";

export default {
  computed: {
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
@import "./assets/css/main.css";
</style>
