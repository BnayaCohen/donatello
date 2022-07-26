<template>
  <header class="main-layout">
    <nav class="flex justify-between board-header">

      <section class="board-options flex align-center justify-center">
        <input class="board-name-input clean-input btn-background" :class="{ 'dark-theme': isDark }" type="text"
          v-model="board.title" @keyup.enter="updateBoardTitle" />
        <button class="btn-background starred-btn" :class="isBoardStarred"
          style="padding-bottom: 1.5px;padding-right: 9px;" @click="toggleStarBoard"><i
            class="fa-regular fa-star"></i></button>

        <div v-if="board.members.length" class="members-container flex align-center">
          <avatar-preview v-for="member in board.members" :key="member._id" :member="member" :avatarSize="'small'" />
        </div>

        <button @click="toggleInvite" class="btn-background" style="position:relative;" :class="{ 'dark-theme': isDark }">Invite
          <users-modal v-if="isInviteOpen" @toggleUser="toggleUser" v-click-outside="toggleInvite"
            @toggleInvite="toggleInvite" />
        </button>
      </section>

      <section v-if="!isSideBarOpen" class="more-options flex align-center justify-center">
        <button class="btn-background" :class="{ 'dark-theme': isDark }">Dashboard</button>
        <button class="btn-background" :class="{ 'dark-theme': isDark }" @click="$emit('sideBarOpened')">Show
          menu</button>
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
      console.log('madeIt')
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

