<template>
  <main class="main-layout board-container">
    <board-header
      v-if="board"
      :board="board"
      :isSideBarOpen="isSideBarOpen"
      @sideBarOpened="openSideBar"
    />
    <board-side-bar
      v-if="board"
      :activities="board.activities"
      :isSideBarOpen="isSideBarOpen"
      @sideBarClosed="closeSideBar"
    />
    <group-list v-if="board" :groups="groups" @add-task="addTask" :isSideBarOpen="isSideBarOpen" />
    <router-view />
  </main>
</template>

<script>
import groupList from '../cmps/group-list.vue'
import boardHeader from '../cmps/board-header.vue'
import boardSideBar from '../cmps/board-side-bar.vue'

export default {
  name: 'board-details',
  data() {
    return {
      isSideBarOpen: false,
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    }
  },
  async created() {
    try {
      const { boardId } = this.$route.params
      await this.$store.dispatch({ type: 'loadBoard', boardId })
      this.board = this.$store.getters.board
      this.$emit('setBackground', this.board?.style?.background)
    } catch(err) {
      console.log('Cannot load board to front', err)
    }
  },
  methods: {
    // x(board){
    //   console.log(board)
    //   this.board = board
    // },
    addTask(groupId) {
      console.log(groupId)
    },
    openSideBar() {
      this.isSideBarOpen = true
    },
    closeSideBar() {
      this.isSideBarOpen = false
    },
  },
  components: {
    groupList,
    boardHeader,
    boardSideBar,
  },
  emits: ['setBackground'],
}
</script>
