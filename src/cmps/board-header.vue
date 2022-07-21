<template>
  <header class="main-layout">
    <nav class="flex justify-between board-header">

      <section class="board-options flex align-center justify-center">
        <input class="board-name-input clean-input btn-background" type="text" v-model="board.title" placeholder="Board name..."  @keyup.enter="updateBoardTitle" />
        <button class="btn-background starred-btn" :class="isBoardStarred"  @click="toggleStarBoard"><i class="fa-regular fa-star"></i></button>

        <div class="members-container flex align-center">
          <p>(board members)</p>
        </div>
        <button class="btn-background">Invite</button>
      </section>

      <section v-if="!isSideBarOpen" class="more-options flex align-center justify-center">
        <button class="btn-background">Dashboard</button>
        <button class="btn-background" @click="$emit('sideBarOpened')">Show menu</button>
      </section>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'boardHeader',
  props: {
    board: Object,
    isSideBarOpen: Boolean
  },
  data() {
    return {
      isCurrBoardStarred:this.board.isStarred
    }
  },
  methods: {
    toggleStarBoard() {
      this.isCurrBoardStarred=!this.isCurrBoardStarred
      this.board.isStarred = !this.board.isStarred
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
    },
    updateBoardTitle(){
       if (this.board.title === '') return
           this.$store.dispatch({ type: 'saveBoard', board: this.board })
    }
  },
  computed: {
    isBoardStarred() {
      return { starred: this.isCurrBoardStarred }
    }
  }
}
</script>
<style>
</style>
