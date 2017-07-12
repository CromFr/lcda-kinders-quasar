import * as types from '../mutation-types'
// import _ from 'lodash'

const state = {
  main: {
    active: [
    //   {
    //     bicFileName: 'toto',
    //     classes: [{ lvl: 30, name: 'Bard'}],
    //     lvl: 30,
    //     name: 'Toto',
    //     race: 'Aasimar',
    //     status: 'active',
    //     god: '',
    //     abilities: [],
    //     alignment: {},
    //     dungeons: [],
    //     journal: [],
    //     leveling: []
    //   }
    ],
    inactive: []
  }
}

const mutations = {
  [types.INIT_LISTS] (state, payload) {
    state.main = payload
    state.main.clear = []
  },
  // [types.ADD_CHARACTER] (state, payload) {
  // },
  // activate
  // deactivate
  // [types.SET_DETAILS] (state, payload) {
  //   for (let i in payload.details) {
  //     state.main[payload.coordinates.status][payload.coordinates.index][i] = payload.details[i]
  //   }
  // },
  [types.PURGE_SESSION] (state) {
    state.main = {
      active: [],
      inactive: []
    }
  }
}

export default {
  state,
  mutations
}
