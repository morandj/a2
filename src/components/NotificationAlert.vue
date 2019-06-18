<template>
  <div class="flex fixed inset-0 z-50 overflow-auto">
    <div
      class="relative p-4 bg-gray-200 w-full max-w-sm m-auto flex flex-col border-2 border-gray-500 rounded-lg"
    >
      <div class="text-red-700">
        <slot></slot>
      </div>
      <div class="flex justify-around mt-4">
        <button
          @click="notifyOk"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notification",
  data() {
    return {};
  },
  computed: {
    // isAuthenticated() {
    //   return this.$store.getters.isAuthenticated;
    // },
    // isMaster() {
    //   return this.$store.getters.isMaster;
    // }
  },
  methods: {
    notifyOk() {
      this.$store.dispatch("updateNotify", null, { root: true });
    }
  }
};
</script>
