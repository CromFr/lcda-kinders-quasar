import axios from 'axios'
// import store from '../vuex/store'
import routes from './routes'
import RequestQueue from './RequestQueue'

function login (usr, pwd) {
  return axios.post(routes.login(usr, pwd))
}

function activateChar (char, session) {
  return axios.post(routes.activate(char, session))
}

function deactivateChar (char, session) {
  return axios.post(routes.deactivate(char, session))
}

function getActives (session) {
  return axios.get(routes.actives(session))
}

function getInactives (session) {
  return axios.get(routes.inactives(session))
}

function getDetails (args) {
  if (args.char === undefined) {
    throw new Error('api.getDetails: args.char undefined')
  }
  if (args.session === undefined) {
    throw new Error('api.getDetails: args.session undefined')
  }
  return axios.get(routes.details(args.char, args.session))
}

function loadCharLists (session) {
  let charlistReq = [getActives, getInactives]
  let charlistArgs = [session, session]

  let onError = (error) => {
    console.log(error)
    return true
  }

  let queue = new RequestQueue(charlistReq, charlistArgs, onError)

  return new Promise((resolve) => {
    queue.start()
    .then((data) => {
      for (let i in data[0]) {
        data[0][i].status = 'active'
      }
      for (let i in data[1]) {
        data[1][i].status = 'inactive'
      }
      resolve({
        session: session,
        characters: { active: data[0], inactive: data[1] }
      })
    })
  })
}

// function loadAllCharDetails (args) {
//   let detailsReq = []
//   let detailsArgs = []
//
//   for (let i in args.characters.active) {
//     detailsReq.push(getDetails)
//     detailsArgs.push({ char: args.characters.active[i], session: args.session })
//   }
//   for (let i in args.characters.inactive) {
//     detailsReq.push(getDetails)
//     detailsArgs.push({ char: args.characters.inactive[i], session: args.session })
//   }
//
//   let onError = (error) => {
//     console.log(error)
//     return true
//   }
//
//   let queue = new RequestQueue(detailsReq, detailsArgs, onError)
//
//   return new Promise((resolve) => {
//     queue.start()
//     .then((data) => {
//       for (var i in args.characters.active) {
//         args.characters.active[i].god = data[i].god
//         args.characters.active[i].abilities = data[i].abilities
//         args.characters.active[i].alignment = data[i].alignment
//         args.characters.active[i].dungeons = data[i].dungeons
//         args.characters.active[i].journal = data[i].journal
//         args.characters.active[i].leveling = data[i].leveling
//       }
//       for (let j in args.characters.inactive) {
//         i++
//         args.characters.inactive[j].god = data[i].god
//         args.characters.inactive[j].abilities = data[i].abilities
//         args.characters.inactive[j].alignment = data[i].alignment
//         args.characters.inactive[j].dungeons = data[i].dungeons
//         args.characters.inactive[j].journal = data[i].journal
//         args.characters.inactive[j].leveling = data[i].leveling
//       }
//       resolve(args)
//     })
//   })
// }
//
// function loadAll (session) {
//   return new Promise((resolve) => {
//     loadCharLists(session)
//     .then(loadAllCharDetails)
//     .then((data) => {
//       store.dispatch('initLists', data.characters)
//       resolve('done')
//     })
//   })
// }

export default {
  login,
  activateChar,
  deactivateChar,
  loadCharLists,
  getDetails
}
