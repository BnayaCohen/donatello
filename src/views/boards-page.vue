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
            :style="board.style"
            class="board-page-display"
            :key="board._id"
            @click="openTask(board._id)"
          >
            <h3>{{ board.title }}</h3>
            <span
              :class="board.isStarred ? 'starred' : ''"
              class="star-board-btn trellicons trellicons-star"
              @click.stop="toggleStarred(board)"
            >
            </span>
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
            class="create-board-item"
            @click="toggleModal"
            style="height: 100px; width: 150px"
          >
            <h3>Create new board</h3>
          </span>
          <span
            v-for="board in boards"
            :style="board.style"
            style="height: 100px; width: 150px"
            class="board-page-display"
            :key="board._id"
            @click="openTask(board._id)"
          >
            <h3>{{ board.title }}</h3>
            <span
              :class="board.isStarred ? 'starred' : ''"
              class="star-board-btn trellicons trellicons-star"
              @click.stop="toggleStarred(board)"
            >
            </span>
          </span>
        </ul>
      </section>
    </div>
  </main>
  <board-create
    v-if="isModalOpen"
    v-click-outside="toggleModal"
    @toggleModal="toggleModal"
    :style="getCords"
  />
</template>

<script>
import boardCreate from '../cmps/board-create.vue'
export default {
  components: { boardCreate },
  name: 'boards-container',
  data() {
    return {
      isModalOpen: false,
      x: null,
      y: null,
    }
  },
  created() {
    document.body.classList.add('app-header-background-color-blue')
  },
  methods: {
    toggleModal(ev) {
      this.x = ev?.clientX
      this.y = ev?.clientY - 230
      this.isModalOpen = !this.isModalOpen
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
    createBoard(data) {},
  },
  computed: {
    starredBoards() {
      return this.$store.getters.starredBoards
    },
    boards() {
      return this.$store.getters.boardsForDisplay
    },
    getCords() {
      return { top: this.y + 'px', left: this.x - 228 + 'px' }
    },
  },
  unmounted() {
    document.body.classList.remove('app-header-background-color-blue')
  },
}
</script>
