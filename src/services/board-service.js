// import { httpService }git from './http-service'
import { storageService } from './async-storage';
import { userService } from './user-service';
import { utilService } from './util-service';
const STORAGE_KEY = 'boardDB';
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/board/'
    : '//localhost:3030/api/board/';

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
  style: {
    backgroundImage: `https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80`,
    // 'background-repeat': `no-repeat`,
  },
  labels: [
    {
      id: 'l101',
      title: 'Done',
      color: '#61bd4f',
    },
    {
      id: 'l102',
      title: 'Progress',
      color: '#008080',
    },
    {
      id: 'l103',
      title: 'Important',
      color: '#FFC300',
    },
    {
      id: 'l104',
      title: 'Urgent',
      color: '#FF5733',
    },
    {
      id: 'l105',
      title: 'Low Priority',
      color: '#1434A4',
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
          groupId: 'g101',
        },
        {
          id: 'c102',
          title: 'Add Samples',
          groupId: 'g101',
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
          groupId: 'g102',
        },
        {
          id: 'c104',
          title: 'Help me',
          status: 'in-progress',
          description: 'description',
          groupId: 'g102',
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
};
_createBoards();

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
};

function getLabels() {
  return [
    { id: 'l100', title: 'Copy Request', color: '#f2d600' },
    { id: 'l101', title: 'One more step', color: '#ff9f1a' },
    { id: 'l102', title: 'Priority', color: '#eb5a46' },
    { id: 'l103', title: 'Design Team', color: '#c377e0' },
    { id: 'l104', title: 'Product Marketing', color: '#0079bf' },
    { id: 'l105', title: 'Trello Tip', color: '#00c2e0' },
    { id: 'l106', title: 'Help', color: '#51e898' },
  ];
}

async function query(filterBy = null) {
  try {
    return await storageService.query(STORAGE_KEY);
    // const res = await httpService.get(STORAGE_KEY, { params: filterBy })
    // return res.data
  } catch (err) {
    console.log('Cannot get boards', err);
  }
}

async function getById(boardId) {
  try {
    return await storageService.get(STORAGE_KEY, boardId);
    // const res = await httpService.get(BASE_URL + boardId)
    // return res.data
  } catch (err) {
    console.log('Cannot get the board', err);
  }
}

async function remove(boardId) {
  await storageService.remove(STORAGE_KEY, boardId);
  //   await httpService.delete(BASE_URL + boardId)
}

async function saveBoard(board) {
  try {
    return board._id
      ? await storageService.put(STORAGE_KEY, board)
      : await storageService.post(STORAGE_KEY, board);
    // const savedBoard = board._id
    //   ? await httpService.put(BASE_URL, board)
    //   : await httpService.post(BASE_URL, board)
    // return savedBoard.data
  } catch {
    console.log('cannot save board');
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
      'background-image': `https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80`,
    },
    labels: [],
    members: [],
    groups: [],
    activities: [],
  };
}

function getEmptyGroup() {
  return {
    title: '',
    tasks: [],
    style: {},
  };
}

function getEmptyTask() {
  return {
    title: '',
    status: '',
    description: '',
    comments: [],
    memberIds: [],
    labelIds: [],
    createdAt: Date.now(),
    dueDate: null,
    byMember: userService.getLoggedInUser(),
    style: {},
  };
}
async function saveGroup(boardId, group) {
  const board = await getById(boardId);

  if (!group.id) {
    group.id = utilService.makeId();
    board.groups.push(group);
  } else {
    const idx = board.groups.findIndex((curGroup) => group.id === curGroup.id);
    if (idx !== -1) board.groups.splice(idx, 1, group);
  }

  return await saveBoard(board);
}

async function saveTask(boardId, groupId, task, activity) {
  const board = await getById(boardId);

  const group = board.groups.find((group) => group.id === groupId);

  if (!task.id) {
    task.id = utilService.makeId();
    group.tasks.push(task);
  } else {
    const idx = group.tasks.findIndex((curTask) => task.id === curTask.id);
    if (idx !== -1) group.tasks.splice(idx, 1, task);
  }

  board.activities.unshift(activity);
  return await saveBoard(board);
}

function _createBoard(title) {
  const board = getEmptyBoard(title);
  return board;
}
function _createBoards() {
  let boards = utilService.loadFromStorage(STORAGE_KEY) || [];
  if (!boards || !boards.length) {
    boards.push(gBoard);
    boards.push(_createBoard('Work'));
    boards.push(_createBoard('Study'));
    boards.push(_createBoard('Vacation'));
    utilService.saveToStorage(STORAGE_KEY, boards);
  }
  return boards;
}

function createActivity(txt = '', task) {
  return (activity = {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: userService.getLoggedInUser(),
    task,
  });
}

async function removeGroup(boardId, groupId) {
  const board = await getById(boardId);

  const idx = board.groups.findIndex((group) => group.id === groupId);
  if (idx !== -1) board.groups.splice(idx, 1);
  return await saveBoard(board);
}

async function removeTask(boardId, groupId, taskId) {
  const board = await getById(boardId);

  const group = board.groups.find((group) => group.id === groupId);
  const idx = group.tasks.findIndex((task) => task.id === taskId);
  if (idx !== -1) group.tasks.splice(idx, 1);
  return await saveBoard(board);
}

async function getTaskById(boardId, groupId, taskId) {
  const board = await getById(boardId);

  const group = board.groups.find((group) => group.id === groupId);
  return group.tasks.find((task) => task.id === taskId);
}

async function changeGroupPos(boardId, dropResult) {
  // TODO: fix bug
  const { removedIndex, addedIndex } = dropResult;
  const board = await getById(boardId);
  const group = board.groups.splice(removedIndex, 1)[0];
  board.groups.splice(addedIndex, 0, group);
  return await saveBoard(board);
}

async function updateGroups(board) {
  const newBoard = JSON.parse(JSON.stringify(board));
  return await saveBoard(newBoard);
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
//       task.attachment = data
//       break
//   }

//   // dispatch to store
// }
