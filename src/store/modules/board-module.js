import { boardService } from '../../services/board-service.js'

export default {
  state: {
    boards: [],
    currBoard: null,
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
    board({ currBoard }) {
      return JSON.parse(JSON.stringify(currBoard))
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
    },
    setBoard(state, { board }) {
      state.currBoard = board
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
  },
  actions: {
    async loadBoards({ commit }) {
      try {
        var boards = await boardService.query()
        commit({ type: 'setBoards', boards })
        return boards
      } catch (err) {
        console.log('couldnt get boards for display', err)
      }
    },
    async loadBoard({ commit }, { boardId }) {
      try {
        var board = await boardService.getById(boardId)
        commit({ type: 'setBoard', board })
        return board
      } catch (err) {
        console.log('cannot get board', err)
      }
    },
    async saveBoard({ commit }, { board }) {
      const actionType = board._id ? 'updateBoard' : 'addBoard'
      try {
        const savedBoardId = await boardService.save(board)
        const savedBoard = await boardService.getById(savedBoardId)
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
    async storeSaveTask({ commit, state }, { groupId, task, activity }) {
      try {
        const board = await boardService.saveTask(
          state.currBoard._id,
          groupId,
          task,
          activity
        )
        commit('setBoard', board)
      } catch (err) {
        console.log("Couldn't save task", err)
      }
    },
  },
}
