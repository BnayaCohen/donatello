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
          class="board-page-display"
          :key="board._id"
          :to="'/board/' + board._id"
        >
          <li
            :style="board.style"
            @mouseenter="showRemoveBtn(board._id)"
            @mouseleave="hideRemoveBtn"
            @click="setBoard(board._id)"
          >
            {{ board._id }}
            <span
              v-show="board._id === removeBtn"
              class="remove-board-btn"
              href="#"
              @click.stop="removeBoard(board._id)"
            >
              <i class="fa-regular fa-trash-can"></i
            ></span>
          </li>
        </router-link>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  name: 'boards-container',
  data() {
    return {
      removeBtn: null,
    }
  },

  methods: {
    setBoard(boardId) {
      this.$store.dispatch({ type: 'loadBoard', boardId })
    },
    showRemoveBtn(boardId) {
      this.removeBtn = boardId
    },
    hideRemoveBtn() {
      this.removeBtn = null
    },
    removeBoard(boardId) {
      this.$store.dispatch({ type: 'removeBoard', boardId })
    },
  },
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
