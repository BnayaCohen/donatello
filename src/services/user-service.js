import { httpService } from './http-service.js'
import { storageService } from './async-storage.js'


const STORAGE_KEY = 'userDB'

export const userService = {
  getById,
  signup,
  login,
  logout,
  getLoggedInUser,
  getDefaultGuest,
  query
}

const USER_STORAGE_KEY = 'loggedinUser'

async function query(filterBy = null) {
  try {
    return await httpService.get('user', { params: filterBy })
  } catch (err) {
    console.log('Cannot get boards', err)
  }
}

async function getById(userId) {
  try {
    return await httpService.get(`user/${userId}`)
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
    const user = httpService.post('auth/signup', signupInfo)
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
  } catch (err) {
    console.log('cannot logout', err)
  }
}

function getLoggedInUser() {
  const guest = getDefaultGuest()
  if (!sessionStorage.getItem(USER_STORAGE_KEY)) return _saveToSession(guest)
  else return JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY))
}

function _saveToSession(value) {
  sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(value))
  return value
}

function getDefaultGuest() {
  return {
    _id: "62de4d3609b63fc45f8e3541",
    username: "guest",
    fullname: "Guest",
    imgUrl: "https://cdn2.iconfinder.com/data/icons/audio-16/96/user_avatar_profile_login_button_account_member-1024.png"
  }
}