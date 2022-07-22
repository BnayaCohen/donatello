<template>
  <main class="boards-page main-layout">
    <section v-if="starredBoards" class="boards-container">
      <div class="boards-title flex">
        <div class="board-title-icon"></div>
        <h3>Starred boards</h3>
      </div>
      <ul class="board-list clean-list">
        <span
          v-for="board in starredBoards"
          class="board-page-display"
          :key="board._id"
          @click="openTask(board._id)"
        >
          <li
            :style="board.style"
            style="height: 150px; width: 150px"
            @mouseenter="showRemoveBtn(board._id, true)"
            @mouseleave="hideRemoveBtn"
          >
            <span
              v-show="board._id === removeBtn && starred"
              class="remove-board-btn"
              href="#"
              @click.stop="removeBoard(board._id)"
            >
              <i class="fa-regular fa-trash-can"></i
            ></span>
          </li>
        </span>
      </ul>
    </section>
    <section class="boards-container">
      <div class="boards-title flex">
        <div class="board-title-icon"></div>
        <h3>Board templates</h3>
      </div>
      <ul class="board-list clean-list">
        <span
          v-for="board in boards"
          class="board-page-display"
          :key="board._id"
          @click="openTask(board._id)"
        >
          <li
            :style="board.style"
            style="height: 150px; width: 150px"
            @mouseenter="showRemoveBtn(board._id)"
            @mouseleave="hideRemoveBtn"
          >
            {{ board._id }}
            <span
              v-show="board._id === removeBtn && !starred"
              class="remove-board-btn"
              href="#"
              @click.stop="removeBoard(board._id)"
            >
              <i class="fa-regular fa-trash-can"></i
            ></span>
          </li>
        </span>
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
      starred: false,
    }
  },

  methods: {
    setBoard(boardId) {
      this.$store.dispatch({ type: 'loadBoard', boardId })
    },
    showRemoveBtn(boardId, starred = false) {
      this.removeBtn = boardId
      this.starred = starred
    },
    hideRemoveBtn() {
      this.removeBtn = null
    },
    removeBoard(boardId) {
      this.$store.dispatch({ type: 'removeBoard', boardId })
    },
    openTask(boardId) {
      this.$router.push('/board/' + boardId)
    },
  },
  computed: {
    starredBoards() {
      return this.$store.getters.starredBoards
    },
    boards() {
      return this.$store.getters.boardsForDisplay
    },
  },
  components: {},
}
</script>
