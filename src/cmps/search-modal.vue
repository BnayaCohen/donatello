<template>
  <div class="search-modal flex flex-column align-center justify-center" @click.stop="''">
    <h3 class="small-title">Boards</h3>
    <ul class="clean-list" v-if="filteredBoards.length">
      <li
        v-for="board in filteredBoards"
        :key="board._id"
        @click="boardClicked(board._id)"
      >
        <div class="board-img flex">
          <img
            v-if="board.style?.background"
            :src="board.style.background"
            alt=""
          />
          <h3>{{ board.title }}</h3>
        </div>
      </li>
    </ul>
    <div v-else>No boards matching</div>
  </div>
</template>
<script>
export default {
  props: {
    filteredBoards: Array,
  },
  methods: {
    boardClicked(boardId) {
      console.log('hi')
      this.$router.push(`${boardId}`)
      setTimeout(() => {
          window.location.reload()
      }, 100)
    },
  },
}
</script>
<style></style>
