import { httpService } from './http-service'
import { storageService } from './async-storage'
import { userService } from './user-service'
httpService.defaults.withCredentials = true
const STORAGE_KEY = 'boardDB'
const TOY_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/board/'
    : '//localhost:3030/api/board/'

export const boardService = {
  getLabels,
  query,
  getById,
  remove,
  save,
  getEmptyBoard,
}

function getLabels() {
  return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
}

async function query(filterBy = null) {
  try {
    const res = await storageService.query(STORAGE_KEY)
    // const res = await httpService.get(TOY_URL, { params: filterBy })
    return res.data
  } catch (err) {
    console.log('Cannot get boards', err)
  }
}

async function getById(boardId) {
  try {
    const res = await storageService.getById(TOY_URL + boardId)
    // const res = await httpService.get(TOY_URL + boardId)
    return res.data
  } catch (err) {
    console.log('Cannot get the board', err)
  }
}

async function remove(boardId) {
  await storageService.remove(STORAGE_KEY + boardId)
  //   await httpService.delete(TOY_URL + boardId)
}

async function save(board) {
  try {
    const savedBoard = board._id
      ? await storageService.put(STORAGE_KEY, board)
      : await storageService.post(STORAGE_KEY, board)
    // const savedBoard = board._id
    //   ? await httpService.put(TOY_URL, board)
    //   : await httpService.post(TOY_URL, board)
    return savedBoard.data
  } catch {
    console.log('cannot save board')
  }
}

function getEmptyBoard() {
  return {
    _id: '',
    title: '',
    createdAt: Date.now(),
    labels: [],
    reviewes: [],
    createdBy: userService.getLoggedInUser(),
    style: {},
    labels: [],
    members: [],
    groups: [],
    activities: [],
  }
}
