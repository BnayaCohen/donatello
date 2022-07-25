import { httpService } from './http-service.js'
import { storageService } from './async-storage.js'


const STORAGE_KEY = 'userDB'

export const userService = {
  getById,
  signup,
  login,
  logout,
  getLoggedInUser,
}

const USER_STORAGE_KEY = 'loggedinUser'

async function getById(userId) {
  try {
    return await storageService.getById(STORAGE_KEY, userId)
    // const res = await httpService.get(USER_URL + userId)
    // return res.data
  } catch (err) {
    console.log(err)
    console.error('Something went wrong try again later')
  }
}

async function login(credentials) {
  try {
    const user = await httpService.post('auth/login', credentials)
    _saveToSession(user)
    return user
  } catch (err) {
    console.log('Cannot login', err)
  }
}

async function signup(signupInfo) {
  try {
    const user = storageService.save('auth/signup', signupInfo)
    _saveToSession(user)
    return user
  } catch (err) {
    console.log(err)
    throw new Error('Failed to signup try again later')
  }
}

async function logout() {
  try {
    sessionStorage.removeItem(USER_STORAGE_KEY)
    return await httpService.post('auth/logout')
  } catch(err) {
    console.log('cannot logout', err)
  }
}

function getLoggedInUser() {
  const guest=JSON.stringify({
    _id: "62de4d3609b63fc45f8e3541",
    username: "guest",
    fullname: "Guest",
    imgUrl: "https://cdn2.iconfinder.com/data/icons/audio-16/96/user_avatar_profile_login_button_account_member-1024.png"
  })
  return JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY) || guest )
}

function _saveToSession(value) {
  sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(value))
  return value
}
