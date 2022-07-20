<template>
  <main class="boards-page main-layout">
    <section v-if="starredBoards" class="boards-container">
      <div class="boards-title flex">
        <div class="board-title-icon"><!--img --></div>
        <h3>Starred boards</h3>
      </div>
    </section>
    <section class="boards-container">
      <div class="boards-title flex">
        <div class="board-title-icon"><!--img --></div>
        <h3>Board templates</h3>
      </div>
      <ul class="board-list clean-list">
        <router-link
          v-for="board in boards"
          :key="board._id"
          :to="'/board/' + board._id"
        >
          <li :style="board.style">{{ board._id }}</li>
        </router-link>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  name: 'boards-container',
  data() {
    return {}
  },

  methods: {},
  computed: {
    starredBoards() {
      //   this.$store.getters.starredBoards
      return false
    },
    boards() {
      return this.$store.getters.boardsForDisplay
    },
  },
  components: {},
}
</script>
