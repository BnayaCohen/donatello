// import axios from 'axios'
// axios.defaults.withCredentials= true

// const TOY_URL = (process.env.NODE_ENV !== 'development')
//   ? '/api/toy/'
//   : '//localhost:3030/api/toy/'

// export const toyService = {
//   getLabels,
//   query,
//   getById,
//   remove,
//   save,
//   getEmptyToy,
// }

// function getLabels() {
//   return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
// }

// async function query(filterBy) {
//   try {
//     const res = await axios.get(TOY_URL, { params: filterBy })
//     return res.data
//   } catch (err) {
//     console.log('Cannot get toys', err)
//   }
// }

// async function getById(toyId) {
//   try {
//     const res = await axios.get(TOY_URL + toyId)
//     return res.data
//   } catch (err) {
//     console.log('Cannot get the toy', err)
//   }
// }

// async function remove(toyId) {
//   await axios.delete(TOY_URL + toyId)
// }

// async function save(toy) {
//   try {
//     const savedToy = toy._id
//       ? await axios.put(TOY_URL, toy)
//       : await axios.post(TOY_URL, toy)
//     return savedToy.data
//   } catch {
//     console.log('cannot save toy')
//   }
// }

// function getEmptyToy() {
//   return {
//     _id: '',
//     name: '',
//     price: 0,
//     labels: [],
//     reviewes: [],
//     createdAt: 0,
//     inStock: true
//   }
// }