<template>
  <div
    class="container mx-auto h-full flex flex-col justify-center items-center m-2"
  >
    <template>
      <div
        v-for="(scav, index) in scavs"
        :scav="scav"
        :key="index"
        class="shadow border rounded w-full py-2 px-3 flex flex-col"
      >
        <div class="flex flex-row py-1">
          <div class="flex flex-col justify-between mr-2 py-2">
            <div>Scav No.</div>
            <div class="text-center text-5xl">{{ scav.number }}</div>
            <div class>Answer</div>
          </div>
          <div class="flex flex-col flex-auto">
            <textarea
              name="question"
              v-model="scav.question"
              rows="6"
              class="py-2 px-3 border rounded-t"
            ></textarea>
            <input
              name="answer"
              v-model="huntSolution.scavAnswers[index].answer"
              class="px-3 py-1 border border-gray-500 rounded-b"
            />
          </div>
        </div>
        <div>
          <button
            @click="deleteScav(index)"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
    <!-- Add New Scavenger -->
    <template>
      <div
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
      >
        <textarea name="question" required v-model="question"></textarea>
        <input name="answer" required v-model="answer" />
        <button @click="addScav" class="btn btn-green" type="button">
          Add Scavenger
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "EditScavs",
  props: [],
  data() {
    return {
      question: "",
      answer: ""
    };
  },
  computed: {
    scavs() {
      return this.$store.getters["hunt/scavs"];
    },
    huntSolution() {
      return this.$store.getters["hunt/huntSolution"];
    }
  },
  methods: {
    addScav() {
      let scavNumber = this.scavs.length + 1;
      let newScav = { number: null, question: null };
      newScav.number = scavNumber;
      let newAnswer = { number: null, answer: null };
      newAnswer.number = scavNumber;
      this.scavs.push(newScav);
      this.huntSolution.scavAnswers.push(newAnswer);
      this.question = "";
      this.answer = "";
    },
    deleteScav(index) {
      let idx; // for re-numbering
      this.scavs.splice(index, 1);
      // re-number scavs
      idx = 0;
      this.scavs.forEach(element => {
        idx += 1;
        element.number = idx;
      });

      this.huntSolution.scavAnswers.splice(index, 1);

      // re-number answers
      idx = 0;
      this.huntSolution.scavAnswers.forEach(element => {
        idx += 1;
        element.number = idx;
      });
    }
  },
  components: {}
};
</script>
