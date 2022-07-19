import axios from 'axios'
axios.defaults.withCredentials= true

const USER_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/user/'
    : '//localhost:3030/api/user/'
const AUTH_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/auth/'
    : '//localhost:3030/api/auth/'

export const userService = {
    query,
    remove,
    getById,
    signup,
    login,
    logout,
    getLoggedInUser,
}

const STORAGE_KEY = "loggedinUser";

function query() {
    return axios.get(USER_URL).then((res) => res.data)
}

function remove(userId) {
    return axios.delete(USER_URL + userId).then((res) => res.data)
}

function getById(userId) {
    return axios.get(USER_URL + userId).then(res => res.data)
}

function signup(signupInfo) {
    return axios.post(AUTH_URL + 'signup', signupInfo)
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
            return user
        })
}

function login(credentials) {
    return axios.post(AUTH_URL + 'login', credentials)
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
            return user
        })
}

async function logout() {
    try {
        await axios.post(AUTH_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY)
    } catch {
        console.log('cannot logout')
    }
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}