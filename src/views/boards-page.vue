<template>
  <main class="boards-page main-layout">
    <div class="boards-page-container">
      <section v-if="starredBoards" class="boards-container">
        <div class="boards-title flex">
          <h3>
            <span><i class="fa-regular fa-star"></i></span> Starred boards
          </h3>
        </div>
        <ul class="board-list clean-list">
          <span
            v-for="board in starredBoards"
            style="height: 100px; width: 150px"
            class="board-page-display"
            :key="board._id"
            @click="openTask(board._id)"
          >
            <li :style="board.style" style="height: 100px; width: 150px">
              <h3>{{ board.title }}</h3>
              <span
                class="remove-board-btn trellicons trellicons-star starred"
                @click.stop="toggleStarred(board)"
              >
              </span>
            </li>
          </span>
        </ul>
      </section>
      <section class="boards-container">
        <div class="boards-title flex">
          <h3>
            <span class="board-title-icon fa-brands fa-flipboard"></span> Board
            templates
          </h3>
        </div>
        <ul class="board-list clean-list">
          <span
            v-for="board in boards"
            style="height: 100px; width: 150px"
            class="board-page-display"
            :key="board._id"
            @click="openTask(board._id)"
          >
            <li :style="board.style" style="height: 100px; width: 150px">
              <h3>{{ board.title }}</h3>
              <span
                class="remove-board-btn trellicons trellicons-star"
                @click.stop="toggleStarred(board)"
              >
              </span>
            </li>
          </span>
        </ul>
      </section>
    </div>
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
  created() {
    document.body.classList.add('app-header-background-color-blue')
  },
  methods: {
    setBoard(boardId) {
      this.$store.dispatch({ type: 'loadBoard', boardId })
    },
    toggleStarred(board) {
      board.isStarred = !board.isStarred
      this.$store.dispatch({
        type: 'saveBoard',
        board,
      })
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
  unmounted() {
    document.body.classList.remove('app-header-background-color-blue')
  },
}
</script>
