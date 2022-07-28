<template>
  <main v-if="board" class="main-layout board-container">
    <board-header
      :board="board"
      :isSideBarOpen="isSideBarOpen"
      @sideBarOpened="openSideBar"
      :isDark="isDark"
    />
    <board-side-bar
      :activities="board.activities"
      :isSideBarOpen="isSideBarOpen"
      @sideBarClosed="closeSideBar"
    />
    <group-list :groups="board.groups" :isSideBarOpen="isSideBarOpen" />
    <router-view />
  </main>
  <img v-else style="height:calc(100vh - 49px);object-fit: cover;" src="../assets/img/loading.gif">
</template>

<script>
import groupList from '../cmps/group-list.vue'
import boardHeader from '../cmps/board-header.vue'
import boardSideBar from '../cmps/board-side-bar.vue'
import {
  socketService,
  SOCKET_EVENT_TASK_UPDATED,
  SOCKET_EVENT_GROUP_UPDATED,
  SOCKET_EVENT_BOARD_UPDATED,
} from '@/services/socket-service'

export default {
  name: 'board-details',
  props: {
    isDark: Boolean,
  },
  data() {
    return {
      isSideBarOpen: false,
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
  async created() {
    try {
      const { boardId } = this.$route.params
      await this.$store.dispatch({ type: 'loadBoard', boardId })
      await this.$store.dispatch({ type: 'getUsers'})
      if(this.board.style.background)
      this.$emit('setBackground', this.board.style.background)
      socketService.on(SOCKET_EVENT_TASK_UPDATED, this.updateTaskFromSocket)
      socketService.on(SOCKET_EVENT_GROUP_UPDATED, this.updateGroupFromSocket)
      socketService.on(SOCKET_EVENT_BOARD_UPDATED, this.updateBoardFromSocket)
    } catch (err) {
      console.log('Cannot load board to front', err)
    }
  },
  methods: {
    openSideBar() {
      this.isSideBarOpen = true
    },
    closeSideBar() {
      this.isSideBarOpen = false
    },
    updateTaskFromSocket(data) {
      this.$store.commit({
        type: 'saveTask',
        task: data.task,
        groupId: data.task.groupId,
      })
      this.$store.commit({
        type: 'addActivity',
        task: data.task,
        memberId: data.memberId,
      })
    },
    updateGroupFromSocket(data) {
      this.$store.commit({
        type: 'saveGroup',
        group: data.group,
      })
      this.$store.commit({
        type: 'addActivity',
        group: data.group,
        memberId: data.memberId,
      })
    },
    updateBoardFromSocket(board) {
      this.$store.commit({
        type: 'setBoard',
        board,
      })
      // this.$store.commit({
      //   type: 'addActivity',
      //   group:data.group,
      //   memberId:data.userId
      // })
    },
  },
  unmounted() {
    this.$store.commit({ type: 'setBoard', board: '' })
    socketService.off(SOCKET_EVENT_TASK_UPDATED, this.updateTaskFromSocket)
    socketService.off(SOCKET_EVENT_GROUP_UPDATED, this.updateGroupFromSocket)
    socketService.off(SOCKET_EVENT_BOARD_UPDATED, this.updateBoardFromSocket)
  },
  watch: {
    board() {
      this.$emit('setBackground', this.board.style?.background)
    }
  },
  components: {
    groupList,
    boardHeader,
    boardSideBar,
  },
  // emits: ['setBackground'],
}
</script>
