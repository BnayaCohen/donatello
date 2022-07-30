import { httpService } from './http-service'
import { userService } from './user-service'
import { utilService } from './util-service'

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

async function query(filterBy = {}) {
  try {
    return await httpService.get('board', { params: filterBy })
  } catch (err) {
    console.log('Cannot get boards', err)
  }
}

async function getById(boardId) {
  try {
    return await httpService.get(`board/${boardId}`)
  } catch (err) {
    console.log('Cannot get the board', err)
  }
}
async function remove(boardId) {
  await httpService.delete(`board/${boardId}`)
}

async function saveBoard(board) {
  try {
    return board._id ?
      await httpService.put(`board/${board._id}`, board)
      : await httpService.post('board', board)
  } catch {
    console.log('cannot save board')
  }
}

function getEmptyBoard(title) {
  return {
    title,
    createdAt: Date.now(),
    labels: [],
    createdBy: userService.getLoggedInUser(),
    style: {},
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
    id: utilService.makeId(),
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
async function saveGroup(boardId, group, txt) {
  try {
    const board = await getById(boardId)

    var activity = createActivity(txt)
    const idx = board.groups.findIndex((curGroup) => group.id === curGroup.id)
    if (idx !== -1) board.groups.splice(idx, 1, group)
    else board.groups.push(group)

    board.activities.unshift(activity)
    return await saveBoard(board)
  } catch (err) {
    throw err
  }
}

async function saveTask(boardId, groupId, task, activityTxt) {
  try {
    const board = await getById(boardId)
    const group = board.groups.find((group) => group.id === groupId)
    const idx = group.tasks.findIndex(curTask => curTask.id === task.id)
    let activity
    if (idx !== -1) {
      group.tasks.splice(idx, 1, task)
      activity = createActivity(activityTxt)
    }
    else {
      activity = createActivity(activityTxt)
      group.tasks.push(task)
    }

    board.activities.unshift(activity)
   return await saveBoard(board)
  } catch (err) {
    throw err
  }
}

function createActivity(txt = '') {
  return {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: userService.getLoggedInUser(),
  }
}

async function removeGroup(boardId, groupId) {
  try {
    const board = await getById(boardId)

    const idx = board.groups.findIndex((group) => group.id === groupId)
    if (idx !== -1) {
      const activity = createActivity('Deleted list ' + board.groups[idx].title)
      board.groups.splice(idx, 1)
      board.activities.unshift(activity)
    }
    return await saveBoard(board)
  } catch (err) {
    throw err
  }
}

async function removeTask(boardId, groupId, taskId) {
  try {
    const board = await getById(boardId)
    const group = board.groups.find((group) => group.id === groupId)
    const idx = group.tasks.findIndex((task) => task.id === taskId)
    if (idx !== -1) {
      const activity = createActivity(`Deleted card ${group.tasks[idx].title}`)
      group.tasks.splice(idx, 1)
      board.activities.unshift(activity)
    }
    return await saveBoard(board)
  } catch (err) {
    throw err
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

async function changeGroupPos(boardId, { removedIndex, addedIndex }) {
  // TODO: fix bug
  try {
    const board = await getById(boardId)
    const toGroup = board.groups[addedIndex]
    const group = board.groups.splice(removedIndex, 1)[0]
    board.groups.splice(addedIndex, 0, group)
    const activity = createActivity(`List ${group.title} swaped with list ${toGroup.title}`)
    board.activities.unshift(activity)
    return await saveBoard(board)
  } catch (err) {
    throw err
  }
}


