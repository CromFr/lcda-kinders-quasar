import * as types from './mutation-types'

export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER)
}

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER)
}

// SESSION
export const setSession = ({ commit }, payload) => {
  commit(types.SET_SESSION, payload)
}

export const purgeSession = ({ commit }) => {
  commit(types.PURGE_SESSION)
}

// CHARACTERS
// export const addCharacter = ({ commit }, payload) => {
//   commit(types.ADD_CHARACTER, payload)
// }

export const initLists = ({ commit }, payload) => {
  commit(types.INIT_LISTS, payload)
}

// export const setDetails = ({ commit }, payload) => {
//   commit(types.SET_DETAILS, payload)
// }

// NAV
export const setNav = ({ commit }, payload) => {
  commit(types.SET_NAV, payload)
}
