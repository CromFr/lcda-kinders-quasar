import * as types from './mutation-types'

// SESSION
export const setSession = ({ commit }, payload) => {
  commit(types.SET_SESSION, payload)
}

export const purgeSession = ({ commit }) => {
  commit(types.PURGE_SESSION)
}

// CHARACTERLISTS
export const syncCharLists = ({ commit }, payload) => {
  commit(types.SYNC_CHAR_LISTS, payload)
}

// CHARACTERS
export const setCharacter = ({ commit }, payload) => {
  commit(types.SET_CHARACTER, payload)
}

// QUESTLOGS
export const setQuestLog = ({ commit }, payload) => {
  commit(types.SET_QUEST_LOG, payload)
}

// KINDERS
export const setKinders = ({ commit }, payload) => {
  commit(types.SET_KINDERS, payload)
}

// LEVELINGS
export const setLeveling = ({ commit }, payload) => {
  commit(types.SET_LEVELING, payload)
}

// NAV
export const setNav = ({ commit }, payload) => {
  commit(types.SET_NAV, payload)
}
