import { boardService } from '../../services/board-service.js'

export default {
  state: {
    boards: [],
    currBoard: null,
    scene: {
      type: 'container',
      props: { orientation: 'horizontal' },
      children: null,
    },
    lastGroup: null,
    showLabelsOnTask: false,
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
    showLabelsOnTask({ showLabelsOnTask }) {
      return showLabelsOnTask
    },
    board({ currBoard }) {
      return JSON.parse(JSON.stringify(currBoard))
    },
    scene({ scene }) {
      return JSON.parse(JSON.stringify(scene))
    },
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
    changeGroupPos(state, { dropResult, reverse }) {
      const { addedIndex, removedIndex } = dropResult
      if (!reverse) {
        const group = state.currBoard.groups.splice(removedIndex, 1)[0]
        state.currBoard.groups.splice(addedIndex, 0, group)
        // state.scene.children.splice(removedIndex, 1)[0]
        // state.scene.children.splice(addedIndex, group)
      } else {
        const group = state.currBoard.groups.splice(addedIndex, 1)[0]
        state.currBoard.groups.splice(removedIndex, 0, group)
      }
    },
    updateGroups(state, { newColumn, itemIndex }) {
      const group = state.currBoard.groups.splice(itemIndex, 1, newColumn)
      state.lastGroup = group
    },
    undoChanges(state, { itemIndex }) {
      state.currBoard.groups.splice(itemIndex, 1, state.lastGroup)
      state.lastGroup = null
      state.scene = state.currBoard.groups
    },
    toggleTaskLabels(state) {
      state.showLabelsOnTask = !state.showLabelsOnTask
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
        return board
      } catch (err) {
        console.log('cannot get board', err)
      }
    },
    async saveBoard({ commit }, { board }) {
      const actionType = board._id ? 'updateBoard' : 'addBoard'
      try {
        const savedBoard = await boardService.saveBoard(board)
        // const savedBoard = await boardService.getById(savedBoard._id)
        commit({ type: actionType, board: savedBoard })
        return savedBoard
      } catch (err) {
        console.log('couldnt save/update board', err)
      }
    },
    async saveGroup({ commit, state }, { group }) {
      try {
        const board = await boardService.saveGroup(state.currBoard._id, group)
        commit({ type: 'setBoard', board })
      } catch (err) {
        console.log("Couldn't save group", err)
      }
    },
    async saveTask({ commit, state }, { groupId, task, activity }) {
      try {
        const board = await boardService.saveTask(
          state.currBoard._id,
          groupId,
          task,
          activity
        )
        commit({ type: 'setBoard', board })
      } catch (err) {
        console.log("Couldn't save task", err)
      }
    },
    async removeTask({ commit, state }, { groupId, taskId }) {
      try {
        const board = await boardService.removeTask(
          state.currBoard._id,
          groupId,
          taskId
        )
        commit({ type: 'setBoard', board })
      } catch (err) {
        console.log("couldn't remove task", err)
      }
    },
    async removeGroup({ commit }, { groupId }) {
      try {
        const board = await boardService.removeGroup(board, groupId)
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
        const board = await boardService.changeGroupPos(
          state.currBoard._id,
          dropResult
        )
        commit({ type: 'setBoard', board })
      } catch (err) {
        console.log(err)
        commit({ type: 'changeGroupPos', dropResult, reverse: true })
      }
    },
    async updateGroups({ commit, state }, { itemIndex, newColumn }) {
      commit({ type: 'updateGroups', itemIndex, newColumn })
      try {
        const board = await boardService.updateGroups(state.currBoard)
        commit({ type: 'setBoard', board })
      } catch (err) {
        console.log(err)
        commit({ type: 'undoGroupChanges', itemIndex, newColumn })
      }
    },
  },
}
