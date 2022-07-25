<template>
  <main v-if="board" class="main-layout board-container">
    <board-header :board="board" :isSideBarOpen="isSideBarOpen" @sideBarOpened="openSideBar"
      @toggleInvite="toggleInvite" />
    <board-side-bar :activities="board.activities" :isSideBarOpen="isSideBarOpen" @sideBarClosed="closeSideBar" />
    <group-list :groups="board.groups" @add-task="addTask" :isSideBarOpen="isSideBarOpen" />
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
    } catch (err) {
      console.log('Cannot load board to front', err)
    }
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
