// import axios from 'axios'
// axios.defaults.withCredentials= true

// const TOY_URL = (process.env.NODE_ENV !== 'development')
//   ? '/api/board/'
//   : '//localhost:3030/api/board/'

// export const boardService = {
//   getLabels,
//   query,
//   getById,
//   remove,
//   save,
//   getEmptyBoard,
// }

// function getLabels() {
//   return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
// }

// async function query(filterBy) {
//   try {
//     const res = await axios.get(TOY_URL, { params: filterBy })
//     return res.data
//   } catch (err) {
//     console.log('Cannot get boards', err)
//   }
// }

// async function getById(boardId) {
//   try {
//     const res = await axios.get(TOY_URL + boardId)
//     return res.data
//   } catch (err) {
//     console.log('Cannot get the board', err)
//   }
// }

// async function remove(boardId) {
//   await axios.delete(TOY_URL + boardId)
// }

// async function save(board) {
//   try {
//     const savedBoard = board._id
//       ? await axios.put(TOY_URL, board)
//       : await axios.post(TOY_URL, board)
//     return savedBoard.data
//   } catch {
//     console.log('cannot save board')
//   }
// }

// function getEmptyBoard() {
//   return {
//     _id: '',
//     name: '',
//     price: 0,
//     labels: [],
//     reviewes: [],
//     createdAt: 0,
//     inStock: true
//   }
// }
