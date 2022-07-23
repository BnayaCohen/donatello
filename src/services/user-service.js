import { httpService } from './http-service.js'
import { storageService } from './async-storage.js'

const USER_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/user/'
    : '//localhost:3030/api/user/'
const AUTH_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/auth/'
    : '//localhost:3030/api/auth/'

const STORAGE_KEY = 'userDB'

export const userService = {
  query,
  remove,
  getById,
  signup,
  login,
  logout,
  getLoggedInUser,
}

const STORAGE_KEY_USER = 'loggedinUser'

async function query(filterBy = null) {
  try {
    return await storageService.query(STORAGE_KEY)
    // const res = await httpService.get(API, { params: filterBy })
    // return res.data
  } catch (err) {
    console.log(err)
    console.error('Something went wrong try again later')
  }
}

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

async function remove(userId) {
  try {
    return await storageService.remove(STORAGE_KEY, userId)
    // await httpService.delete(USER_URL + userId)
  } catch (err) {
    console.log(err)
    console.error('Something went wrong try again later')
  }
}

async function login(credentials) {
  try {
    // const res = await httpService.post(API + 'login', credentials)
    // return _saveToSession(res.data)
  } catch (err) {
    console.log(err)
    throw new Error('Failed to login try again later')
  }
}

async function signup(signUpInfo) {
  try {
    const user = storageService.save(STORAGE_KEY, signUpInfo)
    return _saveToSession(user)
    // const res = await httpService.post(API + 'signup', signUpInfo)
    // return _saveToSession(res.data)
  } catch (err) {
    console.log(err)
    throw new Error('Failed to signup try again later')
  }
}

async function logout() {
  try {
    // await httpService.post(AUTH_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    throw new Error('Failed to logout try again later')
  }
}

function getLoggedInUser() {
  return { _id: 'u101', fullname: 'Abi Abambi', imgUrl: 'http://some-img' }
  // return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
}

function _saveToSession(value) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  return value
}
