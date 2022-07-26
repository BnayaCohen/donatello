import { boardService } from '../../services/board-service.js'
import { utilService } from '../../services/util-service.js'
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_UPDATE_TASK, SOCKET_EMIT_UPDATE_GROUP, SOCKET_EMIT_UPDATE_BOARD } from '../../services/socket-service'
import { userService } from '../../services/user-service.js'

export default {
  state: {
    boards: [],
    currBoard: null,
    scene: {
      type: 'container',
      props: { orientation: 'horizontal' },
      children: null,
    },
    firstGroup: null,
    secondGroup: null,
    lastGroup: null,
    lastTask: null,
    showLabelsOnTask: false,
    currTask: null,
    isDarkTheme:false,
  },
  getters: {
    boardsForDisplay({ boards }) {
      return JSON.parse(JSON.stringify(boards))
    },
    starredBoards({ boards }) {
      return JSON.parse(
        JSON.stringify(boards.filter((board) => board.isStarred))
      )
    },
    getLabels({ currBoard }) {
      return JSON.parse(JSON.stringify(currBoard.labels))
    },
    getMembers({ currBoard }) {
      return JSON.parse(JSON.stringify(currBoard.members))
    },
    getCoverColors({ currBoard }) {
      return JSON.parse(JSON.stringify(currBoard.coverColors))
    },
    showLabelsOnTask({ showLabelsOnTask }) {
      return showLabelsOnTask
    },
    board({ currBoard }) {
      return JSON.parse(JSON.stringify(currBoard))
    },
    scene({ scene }) {
      return JSON.parse(JSON.stringify(scene))
    },
    task({ currTask }) {
      return JSON.parse(JSON.stringify(currTask))
    },
    isDarkTheme({ isDarkTheme }) {
      return isDarkTheme
    }
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
    },
    setBoard(state, { board }) {
      state.currBoard = board
      state.scene.children = board.groups
    },
    addBoard(state, { board }) {
      state.boards.push(board)
    },
    setTask(state, { task }) {
      state.currTask = task
    },
    setDarkTheme(state, { isDark }) {
      state.isDarkTheme = isDark
    },
    updateBoard(state, { board }) {
      const idx = state.boards.findIndex(
        (currBoard) => currBoard._id === board._id
      )
      state.boards.splice(idx, 1, board)
    },
    removeBoard(state, { boardId }) {
      const idx = state.boards.findIndex((board) => board._id === boardId)
      state.boards.splice(idx, 1)
    },
    changeGroupPos(state, { dropResult: { addedIndex, removedIndex }, reverse }) {
      if (!reverse) {
        const group = state.currBoard.groups.splice(removedIndex, 1)[0]
        state.currBoard.groups.splice(addedIndex, 0, group)
      } else {
        const group = state.currBoard.groups.splice(addedIndex, 1)[0]
        state.currBoard.groups.splice(removedIndex, 0, group)
      }
    },
    updateGroups(state, { newColumn, itemIndex }) {
      const group = state.currBoard.groups.splice(itemIndex, 1, newColumn)[0]
      if (!state.firstGroup) state.firstGroup = group
      else state.secondGroup = group
    },
    undoGroupChanges(state, { itemIndex }) {
      if (state.firstGroup) {
        state.currBoard.groups.splice(itemIndex, 1, state.firstGroup)
        state.firstGroup = null
      }
      else {
        state.currBoard.groups.splice(itemIndex, 1, state.secondGroup)
        state.secondGroup = null
      }
      state.scene = state.currBoard.groups
    },
    toggleTaskLabels(state) {
      state.showLabelsOnTask = !state.showLabelsOnTask
    },
    saveGroup(state, { group, reverse = false }) {
      if (!reverse) {
        const idx = state.currBoard.groups.findIndex(curGroup => group.id === curGroup.id)
        if (idx !== -1) state.currBoard.groups.splice(idx, 1, group)
        else state.currBoard.groups.push(group)

        state.lastGroup = { ...group }
        group.id = group.id || utilService.makeId()
      }
      else {
        const idx = state.currBoard.groups.findIndex(curGroup => group.id === curGroup.id)
        if (idx !== -1) {
          !state.lastGroup.id && state.currBoard.groups.splice(idx, 1)
          state.lastGroup.id && state.currBoard.groups.splice(idx, 1, state.lastGroup)
        }
        state.lastGroup = null
      }
    },
    saveTask(state, { groupId, task, reverse = false }) {
      const group = state.currBoard.groups.find(group => group.id === groupId)
      if (!reverse) {
        const idx = group.tasks.findIndex(curTask => curTask.id === task.id)
        if (idx !== -1) group.tasks.splice(idx, 1, task)
        else group.tasks.push(task)

        state.lastTask = { ...task }
        task.id = task.id || utilService.makeId()
      }
      else {
        const idx = group.tasks.findIndex(curTask => curTask.id === task.id)
        if (idx !== -1) {
          !state.lastTask.id && group.tasks.splice(idx, 1)
          state.lastTask.id && group.tasks.splice(idx, 1, state.lastTask)
        }
        state.lastTask = null
      }
    },
    addActivity(state, { memberId, task }) {
      const byMember = state.currBoard.members.find(member => member._id === memberId)
      const newActivity = {
        id: utilService.makeId(),
        txt: task ? 'Modified a card' : 'Modified a list',
        createdAt: Date.now(),
        byMember: byMember || userService.getDefaultGuest(),
        task: task || '',
      }
      state.currBoard.activities.unshift(newActivity)
    },

  },
  actions: {
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query()
        commit({ type: 'setBoards', boards })
        return boards
      } catch (err) {
        console.log("couldn't get boards for display", err)
      }
    },
    async loadBoard({ commit }, { boardId }) {
      try {
        const board = await boardService.getById(boardId)
        commit({ type: 'setBoard', board })
        socketService.emit(SOCKET_EMIT_SET_TOPIC, boardId)
        return board
      } catch (err) {
        console.log('cannot get board', err)
      }
    },
    async loadTask({ commit }, { boardId, groupId, taskId }) {
      try {
        const task = await boardService.getTaskById(boardId, groupId, taskId)
        commit({ type: 'setTask', task })
      } catch (err) {
        console.log('cannot load task: ' + err)
      }
    },
    async saveBoard({ commit }, { board }) {
      const actionType = board._id ? 'updateBoard' : 'addBoard'
      try {
        const savedBoard = await boardService.saveBoard(board)
        if (actionType === 'updateBoard') socketService.emit(SOCKET_EMIT_UPDATE_BOARD, savedBoard)
        commit({ type: actionType, board: savedBoard })
        return savedBoard
      } catch (err) {
        console.log('couldnt save/update board', err)
      }
    },
    async saveGroup({ commit, state }, { group }) {
      commit({ type: 'saveGroup', group })
      socketService.emit(SOCKET_EMIT_UPDATE_GROUP, group)
      try {
        await boardService.saveGroup(state.currBoard._id, group)
      } catch (err) {
        console.log("Couldn't save group", err)
        commit({ type: 'saveGroup', group, reverse: true })
      }
    },
    async saveTask({ commit, state }, { groupId, task }) {
      commit({ type: 'saveTask', groupId, task })
      socketService.emit(SOCKET_EMIT_UPDATE_TASK, task)
      try {
        await boardService.saveTask(
          state.currBoard._id,
          groupId,
          task
        )
      } catch (err) {
        console.log("Couldn't save task", err)
        commit({ type: 'saveTask', groupId, task, reverse: true })
      }
    },
    async removeTask({ commit, state }, { groupId, taskId }) {
      try {
        const board = await boardService.removeTask(
          state.currBoard._id,
          groupId,
          taskId
        )
        socketService.emit(SOCKET_EMIT_UPDATE_BOARD, board)
        commit({ type: 'setBoard', board })
      } catch (err) {
        console.log("couldn't remove task", err)
      }
    },
    async removeGroup({ commit, state }, { groupId }) {
      try {
        const board = await boardService.removeGroup(
          state.currBoard._id,
          groupId
        )
        socketService.emit(SOCKET_EMIT_UPDATE_BOARD, board)
        commit({ type: 'setBoard', board })
      } catch (err) {
        console.log("couldn't remove group", err)
      }
    },
    async removeBoard({ commit }, { boardId }) {
      try {
        await boardService.remove(boardId)
        commit({ type: 'removeBoard', boardId })
      } catch (err) {
        console.log('couldnt remove board', err)
      }
    },
    async swap({ commit, state }, { dropResult }) {
      commit({ type: 'changeGroupPos', dropResult })
      try {
        await boardService.changeGroupPos(
          state.currBoard._id,
          dropResult
        )
        socketService.emit(SOCKET_EMIT_UPDATE_BOARD, state.currBoard)
      } catch (err) {
        console.log(err)
        commit({ type: 'changeGroupPos', dropResult, reverse: true })
      }
    },
    async updateGroups({ commit, state }, { itemIndex, newColumn }) {
      commit({ type: 'updateGroups', itemIndex, newColumn })
      try {
        await boardService.saveBoard(JSON.parse(JSON.stringify(state.currBoard)))
        socketService.emit(SOCKET_EMIT_UPDATE_BOARD, state.currBoard)
      } catch (err) {
        console.log(err)
        commit({ type: 'undoGroupChanges', itemIndex, newColumn })
      }
    },
  },
}
