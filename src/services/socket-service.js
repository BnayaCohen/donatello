import io from 'socket.io-client'
import { userService } from './user-service'

export const SOCKET_EMIT_SET_TOPIC = 'board-set-topic'
export const SOCKET_EMIT_USER_WATCH = 'user-watch'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'
export const SOCKET_EMIT_UPDATE_BOARD = 'update-board'
export const SOCKET_EVENT_BOARD_UPDATED = 'board-updated'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

// for debugging from console
// window.socketService = socketService

socketService.setup()

function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = userService.getLoggedInUser()
        if (user) this.login(user._id)
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      data = JSON.parse(JSON.stringify(data))
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}