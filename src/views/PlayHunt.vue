<template>
  <div class="container mx-auto flex justify-center m-4">
    <!-- <p>{{ $route.params.id }}</p> -->
    <div class="w-full max-w-sm">
      <form
        @submit.prevent
        class="bg-white shadow-md rounded px-6 pt-4 pb-6 mb-4"
      >
        <!-- Title -->
        <div class="mb-4">
          <div class="font-bold w-full py-2 px-3 text-2xl leading-tight">
            {{ hunt.huntData.title }}
          </div>
        </div>

        <!-- Description -->
        <div class="mb-4">
          <button
            @click="showDescription = !showDescription"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            {{ showDescription ? "Hide" : "Show" }} Description
          </button>
          <div
            v-if="showDescription"
            class="mt-2 whitespace-pre-wrap shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          >
            {{ hunt.huntData.description }}
          </div>
        </div>

        <!-- Show / Hide Clues -->
        <div>
          <button
            @click="showClues = !showClues"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            {{ showClues ? "Hide" : "Show" }} Clues
          </button>
          <play-clues v-if="showClues"></play-clues>
        </div>

        <!-- Show / Hide Scavs -->
        <div>
          <button
            @click="showScavs = !showScavs"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            {{ showScavs ? "Hide" : "Show" }} Scavs
          </button>
          <play-scavs v-if="showScavs"></play-scavs>
        </div>

        <!-- Save Answers -->
        <div class="flex items-center justify-between">
          <button
            @click="saveAnswers"
            class="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Save Answers
          </button>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        ©2019 Fox Hunts. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
import PlayClues from "../components/PlayClues";
import PlayScavs from "../components/PlayScavs";
export default {
  computed: {
    hunt() {
      // eslint-disable-next-line
      console.log("computed:", this.$route.params.index);
      return this.$store.getters["hunt/currentHunt"];
    }
  },
  data() {
    return {
      showDescription: true,
      showClues: true,
      showScavs: true
    };
  },
  methods: {
    saveAnswers() {
      // eslint-disable-next-line
      console.log(
        "PlayHunt/updateAnswers:",
        this.hunt,
        this.hunt.huntData.title,
        this.hunt.huntData.description
      );
      this.$store.dispatch("huntPlay/updatePlayerResponse");
    }
  },
  components: {
    PlayClues,
    PlayScavs
  }
};
</script>
