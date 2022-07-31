<template>
  <header class="main-layout app-header"
    :style="{ background: bgColor, position: 'relative', zIndex: isModalOpen ? 100 : 5  }">
    <div class="flex justify-between align-center">
      <section class="nav-container">
        <div class="logo-side flex">
          <button class="logo btn btn-background" @click="goToHome" :class="{ 'dark-theme': isDark }">
            <i class="fa-brands fa-trello"></i>
            <span class="logo-text"> Donatello</span>
          </button>
          <button class="btn btn-background" :class="{ 'dark-theme': isDark }" @click="goToBoards">
            Boards
          </button>
          <button @click="toggleModal" class="btn btn-background create-board-btn" :class="{ 'dark-theme': isDark }">
            <span>Create</span>
            <board-create v-if="isModalOpen" v-click-outside="toggleModal" @toggleModal="toggleModal"
              @addBoard="createBoard" :style="getCords" />
          </button>
        </div>
      </section>
      <section class=" user-actions flex">
        <board-filter :class="{ 'dark-theme': isDark }" @searchBoards="searchBoards"
          @closeSearchModal="$emit('closeSearchModal')" />
        <button class="btn btn-background" :class="{ 'dark-theme': isDark }">
          <i class="fa-solid fa-bell"></i>
        </button>
        <avatar-preview @click="$emit('toggleUserMenu', $event)" :member="user" :avatarSize="'big'"
          :style="{ cursor: 'pointer' }" />
      </section>
    </div>
  </header>
</template>

<script>
import boardCreate from './board-create.vue'
import avatarPreview from './avatar-preview.vue'
import boardFilter from './board-filter.vue'
export default {
  name: 'appHome',
  props: {
    bgColor: String,
    isDark: Boolean,
  },
  data() {
    return {
      isModalOpen: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    goToBoards() {
      this.$router.push('/board')
    },
    searchBoards(filterBy) {
      this.$emit('searchBoards', filterBy)
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    },
    async createBoard(data) {
      const board = boardService.getEmptyBoard(data.title)
      board.style = data.style
      board.createdBy = userService.getLoggedInUser()
      const { _id } = await this.$store.dispatch({ type: 'saveBoard', board })
      this.$router.push('/board/' + { _id })
    },
  },
  components: {
    boardFilter,
    avatarPreview,
    boardCreate
  },
}
</script>
