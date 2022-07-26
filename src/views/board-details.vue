<template>
  <main v-if="board" class="main-layout board-container">
    <board-header :board="board" :isSideBarOpen="isSideBarOpen" @sideBarOpened="openSideBar" />
    <board-side-bar :activities="board.activities" :isSideBarOpen="isSideBarOpen" @sideBarClosed="closeSideBar" />
    <group-list :groups="board.groups" :isSideBarOpen="isSideBarOpen" />
    <router-view />
  </main>
</template>

<script>
import groupList from '../cmps/group-list.vue'
import boardHeader from '../cmps/board-header.vue'
import boardSideBar from '../cmps/board-side-bar.vue'
import { socketService, SOCKET_EVENT_TASK_UPDATED,SOCKET_EVENT_GROUP_UPDATED } from '@/services/socket-service'

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
      this.$emit('setBackground', this.board.style?.background)
      socketService.on(SOCKET_EVENT_TASK_UPDATED, this.updateTaskFromSocket)
      socketService.on(SOCKET_EVENT_GROUP_UPDATED, this.updateGroupFromSocket)
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
        task:data.task,
        memberId:data.userId
      })
    },
    updateGroupFromSocket(data) {
      this.$store.commit({
        type: 'saveGroup',
        group:data.group,
      })
      this.$store.commit({
        type: 'addActivity',
        group:data.group,
        memberId:data.userId
      })
    }
  },
  unmounted() {
    socketService.off(SOCKET_EVENT_TASK_UPDATED, this.updateTaskFromSocket)
    socketService.off(SOCKET_EVENT_GROUP_UPDATED, this.updateGroupFromSocket)
  },
  components: {
    groupList,
    boardHeader,
    boardSideBar,
  },
  // emits: ['setBackground'],
}
</script>
