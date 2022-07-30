<template>
  <header class="main-layout">
    <nav class="flex justify-between board-header">

      <section class="board-options flex align-center justify-center">
        <input class="board-name-input clean-input btn-background" :class="{ 'dark-theme': isDark }" type="text"
          v-model="board.title" @keyup.enter="updateBoardTitle" />
        <button class="btn-background starred-btn" :class="isBoardStarred"
          style="padding-bottom: 1.5px;padding-right: 9px;" @click="toggleStarBoard"><span
            class="trellicons trellicons-star"></span></button>
        <span class="header-buffer" :style="{ borderLeft: isDark ? '1px solid #ffffff3d' : '1px solid #0003' }"></span>
        <div v-if="board.members.length" class="members-container flex align-center">
          <avatar-preview v-for="member in board.members" :key="member._id" :member="member" :avatarSize="'small'" />
          <button @click="toggleInvite" class="btn-background" style="position:relative;"
            :style="{ marginInlineStart: board.members.length ? `8px` : 0 }"
            :class="{ 'dark-theme': isDark }"><span><svg style="position:relative;top:3px;" width="16" height="16"
                role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 9.44777 7.61532 10.7518 8.59871 11.6649C5.31433 13.0065 3 16.233 3 20C3 20.5523 3.44772 21 4 21H12C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19H5.07089C5.55612 15.6077 8.47353 13 12 13ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
                  fill="currentColor"></path>
                <path
                  d="M17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H17V14Z"
                  fill="currentColor"></path>
              </svg></span> <span class="text">Share</span>
            <users-modal v-if="isInviteOpen" @toggleUser="toggleUser" v-click-outside="toggleInvite"
              @toggleInvite="toggleInvite" />
          </button>
        </div>

      </section>

      <section v-if="!isSideBarOpen" class="more-options flex align-center justify-center">
        <button class="btn-background" :class="{ 'dark-theme': isDark }" @click.stop="openDashboard">Dashboard</button>
        <a class="board-header-menu-btn" :class="{ 'dark-theme': isDark }" @click="$emit('sideBarOpened')"><span
            class="trellicons trellicons-options"></span>
          <span class="text">Show menu</span></a>
      </section>
    </nav>
  </header>
</template>
<script>
import avatarPreview from './avatar-preview.vue'
import usersModal from './users-modal.vue'

export default {
  name: 'boardHeader',
  props: {
    board: Object,
    isSideBarOpen: Boolean,
    isDark: Boolean,
  },
  data() {
    return {
      isCurrBoardStarred: this.board.isStarred,
      isInviteOpen: false,
    }
  },
  methods: {
    toggleInvite() {
      this.isInviteOpen = !this.isInviteOpen
    },
    toggleStarBoard() {
      this.isCurrBoardStarred = !this.isCurrBoardStarred
      this.board.isStarred = !this.board.isStarred
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
    },
    updateBoardTitle() {
      if (this.board.title === '') return
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
    },
    toggleUser(user) {
      const idx = this.board.members.findIndex(member => member._id === user._id)
      if (idx !== -1) this.board.members.splice(idx, 1)
      else this.board.members.push(user)
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
    },
    openDashboard() {
      const currentRoute = this.$route.fullPath
      this.$router.push(currentRoute + '/dashboard')
    }
  },
  computed: {
    isBoardStarred() {
      return {
        starred: this.isCurrBoardStarred,
        'dark-theme': this.isDark,
      }
    }
  },
  components: {
    avatarPreview,
    usersModal,

  },
}
</script>

