<template>
  <div
    class="container mx-auto h-full flex flex-col justify-center items-center m-2"
  >
    <template>
      <div
        v-for="(clue, index) in clues"
        :clue="clue"
        :key="index"
        class="shadow border rounded w-full py-2 px-3 flex flex-col"
      >
        <div class="flex flex-row py-1">
          <div class="flex flex-col justify-between mr-2 py-2">
            <div>Clue No.</div>
            <div class="text-center text-5xl">{{ clue.number }}</div>
            <div class>Answer</div>
          </div>
          <div class="flex flex-col flex-auto">
            <textarea
              name="question"
              v-model="clue.question"
              rows="6"
              class="py-2 px-3 border rounded-t"
            ></textarea>
            <input
              name="answer"
              v-model="huntSolution.clueAnswers[index].answer"
              class="px-3 py-1 border border-gray-500 rounded-b"
            />
          </div>
        </div>
        <div>
          <button
            @click="deleteClue(index)"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
    <!-- Add New Clue -->
    <template>
      <div
        class="shadow appearance-none border rounded mt-2 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
      >
        <button @click="addClue" class="btn btn-green" type="button">
          Add Clue
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "EditClues",
  props: [],
  data() {
    return {
      question: "",
      answer: ""
    };
  },
  computed: {
    clues() {
      return this.$store.getters["hunt/clues"];
    },
    huntSolution() {
      return this.$store.getters["hunt/huntSolution"];
    },
    huntClueAnswers() {
      return this.$store.getters["hunt/huntClueAnswers"];
    }
  },
  methods: {
    addClue() {
      let clueNumber = this.clues.length + 1;
      let newClue = { number: null, question: null };
      newClue.number = clueNumber;
      let newAnswer = { number: null, answer: null };
      newAnswer.number = clueNumber;
      this.clues.push(newClue);
      this.huntSolution.clueAnswers.push(newAnswer);
      this.question = "";
      this.answer = "";
    },
    deleteClue(index) {
      let idx; // for re-numbering
      this.clues.splice(index, 1);

      // re-number clues
      idx = 0;
      this.clues.forEach(element => {
        idx += 1;
        element.number = idx;
      });

      this.huntSolution.clueAnswers.splice(index, 1);

      // re-number answers
      idx = 0;
      this.huntSolution.clueAnswers.forEach(element => {
        idx += 1;
        element.number = idx;
      });
    }
  },
  components: {}
};
</script>
