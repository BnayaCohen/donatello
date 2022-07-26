import { httpService } from './http-service'
// import { storageService } from './async-storage'
import { userService } from './user-service'
import { utilService } from './util-service'
// const STORAGE_KEY = 'boardDB'

// _createBoards()

export const boardService = {
  getLabels,
  query,
  getById,
  remove,
  saveBoard,
  getEmptyBoard,
  saveTask,
  getEmptyGroup,
  getEmptyTask,
  createActivity,
  removeGroup,
  removeTask,
  saveGroup,
  getTaskById,
  changeGroupPos,
  updateGroups,
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
    // return await storageService.query(STORAGE_KEY)
    return await httpService.get('board', { params: filterBy })
  } catch (err) {
    console.log('Cannot get boards', err)
  }
}

async function getById(boardId) {
  try {
    // return await storageService.get(STORAGE_KEY, boardId)
    return await httpService.get(`board/${boardId}`)
  } catch (err) {
    console.log('Cannot get the board', err)
  }
}

async function remove(boardId) {
  // await storageService.remove(STORAGE_KEY, boardId)
  await httpService.delete(`board/${boardId}`)
}

async function saveBoard(board) {
  try {
    // return board._id
    //   ? await storageService.put(STORAGE_KEY, board)
    //   : await storageService.post(STORAGE_KEY, board)
    if (board._id) {
      return await httpService.put(`board/${board._id}`, board)
    } else {
      return await httpService.post('board', board)
    }
  } catch {
    console.log('cannot save board')
  }
}

function getEmptyBoard(title) {
  return {
    _id: utilService.makeId(),
    title,
    createdAt: Date.now(),
    labels: [],
    reviewes: [],
    createdBy: userService.getLoggedInUser(),
    style: {
      background: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
    },
    labels: [],
    members: [],
    groups: [],
    activities: [],
  }
}

function getEmptyGroup() {
  return {
    title: '',
    tasks: [],
    style: {},
  }
}

function getEmptyTask() {
  return {
    title: '',
    status: 'in-progress',
    description: '',
    comments: [],
    memberIds: [],
    labelIds: [],
    createdAt: Date.now(),
    dueDate: null,
    byMember: userService.getLoggedInUser(),
    style: {},
  }
}
async function saveGroup(boardId, group) {
  try {
    const board = await getById(boardId)

    var activity = createActivity('created a list')
    const idx = board.groups.findIndex((curGroup) => group.id === curGroup.id)
    if (idx !== -1) board.groups.splice(idx, 1, group)
    else board.groups.push(group)

    board.activities.unshift(activity)
    saveBoard(board)
  } catch (err) {
    console.log('Cannot save group!', err)
  }
}

async function saveTask(boardId, groupId, task) {
  try {
    const board = await getById(boardId)
    const group = board.groups.find((group) => group.id === groupId)
    const idx = group.tasks.findIndex(curTask => curTask.id === task.id)
    let activity
    if (idx !== -1) {
      group.tasks.splice(idx, 1, task)
      activity = createActivity('Updated a card')
    }
    else {
      activity = createActivity('Created a card', task)
      group.tasks.push(task)
    }

    board.activities.unshift(activity)
    saveBoard(board)
  } catch (err) {
    console.log('ERROR WHILE SAVING TASK!!!', err)
  }
}

// function _createBoard(title) {
//   const board = getEmptyBoard(title)
//   return board
// }
// function _createBoards() {
//   let boards = utilService.loadFromStorage(STORAGE_KEY) || []
//   if (!boards || !boards.length) {
//     boards.push(gBoard)
//     boards.push(_createBoard('Work'))
//     boards.push(_createBoard('Study'))
//     boards.push(_createBoard('Vacation'))
//     utilService.saveToStorage(STORAGE_KEY, boards)
//   }
//   return boards
// }

function createActivity(txt = '', task = null) {
  return {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: userService.getLoggedInUser(),
    task: task || '',
  }
}

async function removeGroup(boardId, groupId) {
  try {
    const board = await getById(boardId)

    const idx = board.groups.findIndex((group) => group.id === groupId)
    if (idx !== -1) {
      const activity = createActivity('removed a list')
      board.groups.splice(idx, 1)
      board.activities.unshift(activity)
    }
    return await saveBoard(board)
  } catch (err) {
    console.log('Cannot remove group', err)
  }
}

async function removeTask(boardId, groupId, taskId) {
  try {
    const board = await getById(boardId)
    const group = board.groups.find((group) => group.id === groupId)
    const idx = group.tasks.findIndex((task) => task.id === taskId)
    if (idx !== -1) {
      const activity = createActivity('removed a card')
      group.tasks.splice(idx, 1)
      board.activities.unshift(activity)
    }
    return await saveBoard(board)
  } catch (err) {
    console.log('Cannot remove task', err)
  }
}

async function getTaskById(boardId, groupId, taskId) {
  try {
    const board = await getById(boardId)
    const group = board.groups.find((group) => group.id === groupId)
    return group.tasks.find((task) => task.id === taskId)
  } catch (err) {
    console.log('Cannot get Task!!!!', err)
  }
}

async function changeGroupPos(boardId, dropResult) {
  // TODO: fix bug
  try {
    const { removedIndex, addedIndex } = dropResult
    const board = await getById(boardId)
    const group = board.groups.splice(removedIndex, 1)[0]
    board.groups.splice(addedIndex, 0, group)
    saveBoard(board)
  } catch (err) {
    console.log('Cannot Change Group Pos', err)
  }
}

async function updateGroups(board) {
  try {
    const newBoard = JSON.parse(JSON.stringify(board))
    saveBoard(newBoard)
  } catch (err) {
    console.log('Cannot update groups', err)
  }
}

// function updateTask(cmpType, data) {
//   switch (cmpType) {
//     case 'status-picker':
//       task.status = data
//       break
//     case 'member-picker':
//       task.members = task.members ? [...task.members, data] : [data]
//       break
//     case 'date-picker':
//       task.date = data
//       break
//     case 'label-picker':
//       task.labels = task.labels ? [...task.labels, data] : [data]
//       break
//     case 'attachment-picker':
//       task.attachments = data
//       break
//   }

//   // dispatch to store
// }
