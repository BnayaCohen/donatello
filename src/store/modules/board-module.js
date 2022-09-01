import { boardService } from '../../services/board-service.js'
import { utilService } from '../../services/util-service.js'
import {
  socketService,
  SOCKET_EMIT_SET_TOPIC,
  SOCKET_EMIT_UPDATE_BOARD,
} from '../../services/socket-service'
import { userService } from '../../services/user-service.js'
// import { styleType } from 'element-plus/es/components/table-v2/src/common.js'

export default {
  state: {
    boards: null,
    currBoard: null,
    scene: {
      type: 'container',
      props: { orientation: 'horizontal' },
      children: null,
    },
    firstGroup: null,
    secondGroup: null,
    lastGroup: null,
    lastTasks: [],
    showLabelsOnTask: false,
    currTask: null,
    newActivity: null,
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
    getTaskCoverColors() {
      return [
        '#7BC86C',
        '#F5DD29',
        '#FFAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#29CCE5',
        '#6DECA9',
        '#FF8ED4',
        '#172B4D',
      ]
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
    labelsDataChart({ currBoard }) {
      const boardLabels = currBoard.labels
      let labelsCount = currBoard.groups.reduce((acc, group) => {
        group.tasks.forEach((task) => {
          task.labelIds.forEach((labelId) => {
            const { id } = boardLabels.find((label) => label.id === labelId)
            if (acc[id]) acc[id]++
            else acc[id] = 1
          })
        })
        return acc
      }, {})
      const labelsMap = { data: [], backgroundColor: [], labels: [] }
      Object.keys(labelsCount).forEach((key) => {
        const currLabel = boardLabels.find((label) => label.id === key)
        labelsMap.data.push(labelsCount[key])
        labelsMap.labels.push(currLabel.title)
        labelsMap.backgroundColor.push(currLabel.color)
      })
      return labelsMap
    },
    taskStatusMap({ currBoard }) {
      let statusMap = {}
      currBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          const { status } = task
          if (!statusMap[status]) statusMap[status] = 0
          statusMap[status]++
        })
      })
      return statusMap
    },
    doneTasksPerGroup({ currBoard }) {
      let dueDateMap = { 'over-due': 0, 'due-soon': 0, 'No date assigned': 0 }
      let dueDateDataSets = []
      const diff = 172800000
      currBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          const { dueDate } = task
          if (dueDate) {
            if (Date.now() > dueDate && task.status !== 'done')
              dueDateMap['over-due']++
            else if (dueDate - Date.now() <= diff) dueDateMap['due-soon']++
          } else dueDateMap['No date assigned']++
        })
      })
      for (const dateStatus in dueDateMap) {
        const dataSet = {
          label: dateStatus,
          data: [dueDateMap[dateStatus]],
          backgroundColor:
            dateStatus === 'over-due'
              ? '#eb5a46'
              : dateStatus === 'due-soon'
              ? '#f2d600'
              : '#61bd4f',
        }
        dueDateDataSets.push(dataSet)
      }
      return dueDateDataSets
    },
    taskPerMemberMap({ currBoard }) {
      const boardMembers = currBoard.members
      let memberCount = currBoard.groups.reduce((acc, group) => {
        group.tasks.forEach((task) => {
          task.memberIds.forEach((memberId) => {
            const { _id } = boardMembers.find(
              (member) => member._id === memberId
            )
            if (acc[_id]) acc[_id]++
            else acc[_id] = 1
          })
        })
        return acc
      }, {})
      const membersMap = { data: [], backgroundColor: [], labels: [] }
      Object.keys(memberCount).forEach((key) => {
        const currMember = boardMembers.find((member) => member._id === key)
        membersMap.data.push(memberCount[key])
        membersMap.labels.push(currMember.fullname)
        membersMap.backgroundColor = [
          '#f2d600',
          '#eb5a46',
          '#c377e0',
          '#00c2e0',
          '#51e898',
          '#ff9f1a',
        ]
        membersMap.borderColor = '#172b4d'
        membersMap.borderWidth = 0.7
      })
      return membersMap
    },
    taskOverdueCount({ currBoard }) {
      return currBoard.groups.reduce(
        (acc, group) =>
          (acc += group.tasks.reduce(
            (acc, task) =>
              task.dueDate &&
              Date.now() > task.dueDate &&
              task.status !== 'done'
                ? acc + 1
                : acc,
            0
          )),
        0
      )
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
    setTask(state, { task }) {
      state.currTask = task
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
    changeGroupPos(
      state,
      { dropResult: { addedIndex, removedIndex }, reverse }
    ) {
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
      if (!state.firstGroup) {
        state.firstGroup = group
        state.newActivity = null
      } else {
        state.secondGroup = group
        state.newActivity = {
          id: utilService.makeId(),
          txt: `Changed card from ${state.firstGroup.title} to ${group.title}`,
          createdAt: Date.now(),
          byMember: userService.getLoggedInUser(),
        }
      }
    },
    undoGroupChanges(state, { itemIndex }) {
      if (state.firstGroup) {
        state.currBoard.groups.splice(itemIndex, 1, state.firstGroup)
        state.firstGroup = null
      } else {
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
        const idx = state.currBoard.groups.findIndex(
          (curGroup) => group.id === curGroup.id
        )
        if (idx !== -1) {
          const oldGroup = state.currBoard.groups.splice(idx, 1, group)
          state.lastGroup = oldGroup
        } else {
          state.currBoard.groups.push(group)
          state.lastGroup = { ...group }
          group.id = utilService.makeId()
        }
      } else {
        const idx = state.currBoard.groups.findIndex(
          (curGroup) => group.id === curGroup.id
        )
        if (idx !== -1) {
          !state.lastGroup.id && state.currBoard.groups.splice(idx, 1)
          state.lastGroup.id &&
            state.currBoard.groups.splice(idx, 1, state.lastGroup)
        }
        state.lastGroup = null
      }
    },
    saveTask(state, { groupId, task, reverse = false }) {
      const group = state.currBoard.groups.find((group) => group.id === groupId)
      if (!reverse) {
        const idx = group.tasks.findIndex((curTask) => curTask.id === task.id)
        if (idx !== -1) {
          const oldTask = group.tasks.splice(idx, 1, task)[0]
          state.lastTasks.push(oldTask)
        } else {
          group.tasks.push(task)
          const taskToUndo = { ...task }
          taskToUndo.remove = true
          state.lastTasks.push(taskToUndo)
        }
      } else {
        const idx = group.tasks.findIndex((curTask) => curTask.id === task.id)
        const taskUndoIdx = state.lastTasks.findIndex(
          (taskToUndo) => taskToUndo.id === task.id
        )
        if (idx !== -1) {
          state.lastTasks[taskUndoIdx].remove && group.tasks.splice(idx, 1)
          !state.lastTasks[taskUndoIdx].remove &&
            group.tasks.splice(idx, 1, state.lastTasks[taskUndoIdx])
        }
      }
    },
    removeFromTasksArray(state, { taskId }) {
      const idx = state.lastTasks.findIndex((task) => task.id === taskId)
      state.lastTasks.splice(idx, 1)
    },
    removeGroup(state, { groupId, reverse = false }) {
      if (!reverse) {
        const groups = state.currBoard.groups
        const idx = groups.findIndex((group) => group.id === groupId)
        if (idx !== -1) {
          groups.splice(idx, 1)
          state.removedGroup = { idx, group: groups[idx] }
        }
      } else {
        const { idx, group } = state.removedGroup
        state.currBoard.groups.splice(idx, 0, group)
        state.removedGroup = null
      }
    },
    removeTask(state, { groupId, taskId, reverse = false }) {
      if (!reverse) {
        const group = state.currBoard.groups.find(
          (group) => group.id === groupId
        )
        const idx = group.tasks.findIndex((task) => task.id === taskId)
        if (idx !== -1) {
          group.tasks.splice(idx, 1)
          state.removedTask = { idx, task: group.tasks[idx] }
        }
      } else {
        const { idx, task } = state.removedTask
        const group = state.currBoard.groups.find(
          (group) => groupId === group.id
        )
        group.splice(idx, 0, task)
        state.removedTask = null
      }
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
      const actionType = board._id ? 'setBoard' : 'addBoard'
      try {
        const savedBoard = await boardService.saveBoard(board)
        if (actionType === 'setBoard') {
          socketService.emit(SOCKET_EMIT_UPDATE_BOARD, savedBoard)
          commit({ type: 'updateBoard', board: savedBoard })
        } else commit({ type: actionType, board: savedBoard })
        commit({ type: 'setBoard', board: savedBoard })
        return savedBoard
      } catch (err) {
        console.log('couldnt save/update board', err)
      }
    },
    async saveGroup({ commit, state }, { group, activityTxt }) {
      commit({ type: 'saveGroup', group })

      try {
        const board = await boardService.saveGroup(
          state.currBoard._id,
          group,
          activityTxt
        )
        socketService.emit(SOCKET_EMIT_UPDATE_BOARD, board)
        commit({ type: 'setBoard', board })
      } catch (err) {
        console.log("Couldn't save group", err)
        commit({ type: 'saveGroup', group, reverse: true })
      }
    },
    async saveTask({ commit, state }, { groupId, task, activityTxt }) {
      commit({ type: 'saveTask', groupId, task })

      try {
        const board = await boardService.saveTask(
          state.currBoard._id,
          groupId,
          task,
          activityTxt
        )
        socketService.emit(SOCKET_EMIT_UPDATE_BOARD, board)
        commit({ type: 'setBoard', board })
      } catch (err) {
        console.log("Couldn't save task", err)
        commit({ type: 'saveTask', groupId, task, reverse: true })
      } finally {
        commit({ type: 'removeFromTasksArray', taskId: task.id })
      }
    },
    async removeTask({ commit, state }, { groupId, taskId }) {
      commit({ type: 'removeTask', groupId, taskId })

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
        commit({ type: 'removeTask', groupId, taskId, reverse: true })
      }
    },
    async removeGroup({ commit, state }, { groupId }) {
      commit({ type: 'removeGroup', groupId })

      try {
        const board = await boardService.removeGroup(
          state.currBoard._id,
          groupId
        )
        socketService.emit(SOCKET_EMIT_UPDATE_BOARD, board)
        commit({ type: 'setBoard', board })
      } catch (err) {
        commit({ type: 'removeGroup', groupId, reverse: true })
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
        socketService.emit(SOCKET_EMIT_UPDATE_BOARD, board)
        commit({ type: 'setBoard', board })
      } catch (err) {
        console.log(err)
        commit({ type: 'changeGroupPos', dropResult, reverse: true })
      }
    },
    async updateGroups({ commit, state }, { itemIndex, newColumn }) {
      commit({ type: 'updateGroups', itemIndex, newColumn })
      try {
        const board = await boardService.saveBoard(
          JSON.parse(JSON.stringify(state.currBoard)),
          state.newActivity
        )
        socketService.emit(SOCKET_EMIT_UPDATE_BOARD, board)
        state.newActivity && commit({ type: 'setBoard', board })
      } catch (err) {
        console.log(err)
        commit({ type: 'undoGroupChanges', itemIndex, newColumn })
      }
    },
    async searchBoards({}, { filterBy }) {
      try {
        var filteredBoards = await boardService.query(filterBy)
        var miniBoards = []
        filteredBoards.forEach((board) => {
          const { _id, title, style } = board
          miniBoards.push({ _id, title, style })
        })
        return miniBoards
      } catch (err) {
        console.log('couldnt get boards for search', err)
      }
    },
  },
}
