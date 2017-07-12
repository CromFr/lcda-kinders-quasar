import _ from 'lodash'

export const mainCounter = state => state.counters.main

// session
export const session = state => state.session.main

// nav
export const nav = state => state.nav.main

// characters
export const characters = state => state.characters.main

export const character = (state, getters) => (bicFileName) => {
  let character
  let characters = getters.characters
  for (let status in characters) {
    character = _.find(characters[status], { 'bicFileName': bicFileName })
    if (character !== undefined) {
      break
    }
  }
  return character
}

export const charStatsJournal = (state, getters) => (bicFileName) => {
  let log = getters.character(bicFileName).journal
  let stats = [0, 0, 0, 0]
  for (let i in log) {
    stats[3]++
    stats[log[i].state]++
  }
  return stats
}

export const charStatsKinders = (state, getters) => (bicFileName) => {
  let dungeons = getters.character(bicFileName).dungeons
  let stats = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
  for (let i in dungeons) {
    for (let j in dungeons[i].lootedChests) {
      stats[j][1]++
      if (dungeons[i].lootedChests[j]) {
        stats[j][0]++
      }
    }
  }
  return stats
}
