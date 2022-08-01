<template>
  <main v-if="boards" class="boards-page main-layout">
    <div class="boards-page-container">
      <section v-if="starredBoards.length" class="boards-container">
        <div class="boards-title flex">
          <span class="board-title-icon trellicons trellicons-star"></span>
          <h3>Starred boards</h3>
        </div>
        <ul class="board-list clean-list">
          <span v-for="board in starredBoards" style="height: 96px; width: 166px;"
            :style="{ background: getBackground(board.style.background) }" class="board-page-display" :key="board._id"
            @click="openTask(board._id)">
            <h3>{{ board.title }}</h3>
            <span :style="board.isStarred ? getStyle : ''" class="star-board-btn trellicons trellicons-full-star"
              :class="board.isStarred ? 'starred' : ''" @click.stop="toggleStarred(board)">
            </span>
          </span>
        </ul>
      </section>
      <section class="boards-container">
        <div class="boards-title flex">
          <span class="board-title-icon trellicons trellicons-clock"></span>
          <h3>
            Recently viewed
          </h3>
        </div>
        <ul class="board-list clean-list">
          <span v-for="board in boards" :style="{ background: getBackground(board.style.background) }"
            style="height: 96px; width: 166px" class="board-page-display" :key="board._id" @click="openTask(board._id)">
            <h3>{{ board.title }}</h3>
            <span :class="board.isStarred ? 'starred' : ''" :style="board.isStarred ? getStyle : ''"
              class="star-board-btn trellicons trellicons-star" @click.stop="toggleStarred(board)">
            </span>
          </span>
          <span class="create-board-item" @click="toggleModal" style="height: 96px; width: 166px">
            <h3>Create new board</h3>
          </span>
        </ul>
      </section>
    </div>
  <board-create v-if="isModalOpen" v-click-outside="toggleModal" @toggleModal="toggleModal" @addBoard="createBoard"
    :style="getCords" />
  </main>
    <div v-else class="logo-holder">
    <div class="bar"></div>
    <div class="bar fill1"></div>
    <div class="bar fill2"></div>
  </div>
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
    this.$emit('setBackground', '')
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
    getBackground(bg) {
      return bg.length > 10 ? `url(${bg}) no-repeat center center/cover` : bg
    },
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
