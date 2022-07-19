import { boardService } from '../../services/board-service.js'

export default {
  state: {
    boards: [],
    currBoard: null,
    labels: boardService.getLabels,
  },
  getters: {
    boardsForDisplay({ boards }) {
      return JSON.parse(JSON.stringify(boards))
    },
    getLabels({ labels }) {
      return JSON.parse(JSON.stringify(labels))
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
    },
    setBoard(state, {board}) {
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
    async loadBoard({ commit }, {boardId}) {
        try {
            var board = await boardService.getBoardById(boardId)
            commit({type: 'setBoard', board})
            return board
        } catch(err) {
            console.log('cannot get board', err)
        }
    },
    async saveBoard({ commit }, { board }) {
      const actionType = board._id ? 'updateBoard' : 'addBoard'
      try {
        var savedBoardId = await boardService.save(board)
        var savedBoard = await boardService.getById(savedBoardId)
        commit({ type: actionType, board: savedBoard })
        return savedBoard
      } catch (err) {
        console.log('couldnt save/update board', err)
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
  },
}
