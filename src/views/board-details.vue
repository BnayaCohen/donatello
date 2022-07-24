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
      :activities="activities"
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
  async created() {
    const { boardId } = this.$route.params
    await this.$store.dispatch({ type: 'loadBoard', boardId })
    this.$emit('setBackground', this.board.style.background)
  },
  computed: {
    groups() {
      return this.board.groups
    },
    activities() {
      return this.board.activities
    },
    board() {
      return this.$store.getters.board
    },
  },
  methods: {
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
