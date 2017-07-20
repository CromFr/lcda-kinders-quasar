
// session
export const session = state => state.session.main

// nav
export const nav = state => state.nav.main

// characterLists
export const characterLists = state => state.characterLists.main

// characters
export const characters = state => state.characters.main
export const character = (state, getters) => (bicFileName) => {
  return getters.characters[bicFileName]
}

// questLogs
export const questLogs = state => state.questLogs.main
export const charQuestLog = (state, getters) => (bicFileName) => {
  return getters.questLogs[bicFileName]
}
export const charQuestLogStats = (state, getters) => (bicFileName) => {
  let log = getters.charQuestLog(bicFileName)
  let stats = [0, 0, 0, 0]
  for (let i in log) {
    stats[3]++
    stats[log[i].state]++
  }
  return stats
}

// kinders
export const kinders = state => state.kinders.main
export const charKinders = (state, getters) => (bicFileName) => {
  return getters.kinders[bicFileName]
}
export const charKindersStats = (state, getters) => (bicFileName) => {
  let k = getters.charKinders(bicFileName)
  let stats = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
  for (let i in k) {
    for (let j in k[i].lootedChests) {
      stats[j][1]++
      if (k[i].lootedChests[j]) {
        stats[j][0]++
      }
    }
  }
  stats[5][0] = stats[0][0] + stats[1][0] + stats[2][0] + stats[3][0] + stats[4][0]
  stats[5][1] = stats[0][1] + stats[1][1] + stats[2][1] + stats[3][1] + stats[4][1]
  return stats
}

// levelings
export const levelings = state => state.levelings.main
export const charLeveling = (state, getters) => (bicFileName) => {
  return getters.levelings[bicFileName]
}
