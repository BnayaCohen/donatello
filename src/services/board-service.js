import { httpService } from './http-service'
import { storageService } from './async-storage'
import { userService } from './user-service'
import { utilService } from './util-service'
httpService.defaults.withCredentials = true
const STORAGE_KEY = 'boardDB'
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/board/'
    : '//localhost:3030/api/board/'

const gBoard = {
  _id: 'b101',
  title: 'Robot dev proj',
  archivedAt: 1589983468418,
  createdAt: 1589983468418,
  createdBy: {
    _id: 'u101',
    fullname: 'Abi Abambi',
    imgUrl: 'http://some-img',
  },
  style: {},
  labels: [
    {
      id: 'l101',
      title: 'Done',
      color: '#61bd4f',
    },
    {
      id: 'l102',
      title: 'Progress',
      color: '#61bd33',
    },
  ],
  members: [
    {
      _id: 'u101',
      fullname: 'Tal Tarablus',
      imgUrl: 'https://www.google.com',
    },
  ],
  groups: [
    {
      id: 'g101',
      title: 'Group 1',
      archivedAt: 1589983468418,
      tasks: [
        {
          id: 'c101',
          title: 'Replace logo',
        },
        {
          id: 'c102',
          title: 'Add Samples',
        },
      ],
      style: {},
    },
    {
      id: 'g102',
      title: 'Group 2',
      tasks: [
        {
          id: 'c103',
          title: 'Do that',
          archivedAt: 1589983468418,
        },
        {
          id: 'c104',
          title: 'Help me',
          status: 'in-progress',
          description: 'description',
          comments: [
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436.0,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'To Do 1',
                  isDone: false,
                },
              ],
            },
          ],
          memberIds: ['u101'],
          labelIds: ['l101', 'l102'],
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl:
              'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
          style: {
            bgColor: '#26de81',
          },
        },
      ],
      style: {},
    },
  ],
  activities: [
    {
      id: 'a101',
      txt: 'Changed Color',
      createdAt: 154514,
      byMember: {
        _id: 'u101',
        fullname: 'Abi Abambi',
        imgUrl: 'http://some-img',
      },
      task: {
        id: 'c101',
        title: 'Replace Logo',
      },
    },
  ],
}

export const boardService = {
  getLabels,
  query,
  getById,
  remove,
  saveBoard,
  getEmptyBoard,
  saveTask,
}

function getLabels() {
  return [
    { id: 'l100', title: 'Copy Request', color: '#f2d600' },
    { id: 'l101', title: 'One more step', color: '#ff9f1a' },
    { id: 'l102', title: 'Priority', color: '#eb5a46' },
    { id: 'l103', title: 'Design Team', color: '#c377e0' },
    { id: 'l104', title: 'Product Marketing', color: '#0079bf' },
    { id: 'l105', title: 'Trello Tip', color: '#00c2e0' },
    { id: 'l106', title: 'Help', color: '#51e898' },
  ]
}

async function query(filterBy = null) {
  try {
    const res = await storageService.query(STORAGE_KEY)
    // const res = await httpService.get(STORAGE_KEY, { params: filterBy })
    return res.data
  } catch (err) {
    console.log('Cannot get boards', err)
  }
}

async function getById(boardId) {
  try {
    return gBoard
    // const res = await storageService.getById(STORAGE_KEY + boardId)
    // const res = await httpService.get(BASE_URL + boardId)
    // return res.data
  } catch (err) {
    console.log('Cannot get the board', err)
  }
}

async function remove(boardId) {
  await storageService.remove(STORAGE_KEY + boardId)
  //   await httpService.delete(BASE_URL + boardId)
}

async function saveBoard(board) {
  try {
    const savedBoard = board._id
      ? await storageService.put(STORAGE_KEY, board)
      : await storageService.post(STORAGE_KEY, board)
    // const savedBoard = board._id
    //   ? await httpService.put(BASE_URL, board)
    //   : await httpService.post(BASE_URL, board)
    return savedBoard.data
  } catch {
    console.log('cannot save board')
  }
}

function getEmptyBoard() {
  return {
    _id: utilService.makeId(),
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

function saveTask(boardId, groupId, task, activity) {
  const board = getById(boardId)
  board.groups.find((group) => group.id === groupId)
  board.groups.push(task)
  board.activities.unshift(activity)
  saveBoard(board)
}
