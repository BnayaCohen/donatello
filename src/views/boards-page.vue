<template>
  <main class="boards-page main-layout">
    <div class="boards-page-container">
      <section v-if="starredBoards.length" class="boards-container">
        <div class="boards-title flex">
          <h3><i class="fa-regular fa-star"></i> Starred boards</h3>
        </div>
        <ul class="board-list clean-list">
          <span v-for="board in starredBoards" style="height: 96px; width: 196px" :style="board.style"
            class="board-page-display" :key="board._id" @click="openTask(board._id)">
            <h3>{{ board.title }}</h3>
            <span :style="board.isStarred ? getStyle : ''" class="star-board-btn trellicons trellicons-star"
              :class="board.isStarred ? 'starred' : ''" @click.stop="toggleStarred(board)">
            </span>
          </span>
        </ul>
      </section>
      <section class="boards-container">
        <div class="boards-title flex">
          <h3>
            <i class="board-title-icon fa-brands fa-flipboard"></i> Board
            templates
          </h3>
        </div>
        <ul class="board-list clean-list">
          <span class="create-board-item" @click="toggleModal" style="height: 96px; width: 196px">
            <h3>Create new board</h3>
          </span>
          <span v-for="board in boards" :style="board.style" style="height: 96px; width: 196px"
            class="board-page-display" :key="board._id" @click="openTask(board._id)">
            <h3>{{ board.title }}</h3>
            <span :class="board.isStarred ? 'starred' : ''" :style="board.isStarred ? getStyle : ''"
              class="star-board-btn trellicons trellicons-star" @click.stop="toggleStarred(board)">
            </span>
          </span>
        </ul>
      </section>
    </div>
  </main>
  <board-create v-if="isModalOpen" v-click-outside="toggleModal" @toggleModal="toggleModal" @addBoard="createBoard"
    :style="getCords" />
</template>

<script>
import boardCreate from '../cmps/board-create.vue'
import { boardService } from '../services/board-service'
import { userService } from '../services/user-service'
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
    console.log(this.$store.getters.user)
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
    async createBoard(data) {
      const board = boardService.getEmptyBoard(data.title)
      board.style = data.style
      board.createdBy = userService.getLoggedInUser()
      const newBoard = await this.$store.dispatch({ type: 'saveBoard', board })
      this.$router.push('/board/' + newBoard._id)
    },
  },
  computed: {
    starredBoards() {
      return this.$store.getters.starredBoards
    },
    board() {
      return this.$store.getters.board
    },
    boards() {
      return this.$store.getters.boardsForDisplay
    },
    getCords() {
      return { top: this.y + 'px', left: this.x - 228 + 'px' }
    },
    getStyle() {
      return {
        position: 'absolute',
        fontSize: `1rem`,
        zIndex: 10,
        opacity: 1,
        right: `9px`,
        bottom: `9px`,
        transition: `0.18s ease`,
        color: `#f2d600`,
      }
    },
  },

  unmounted() {
    document.body.classList.remove('app-header-background-color-blue')
  },
}
</script>
