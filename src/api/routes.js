const apiUrl = process.env.API_URL

function login (usr, pwd) {
  let route = apiUrl +
              'login/?login=' +
              encodeURIComponent(usr) +
              '&password=' +
              encodeURIComponent(pwd)
  return route
}

function actives (session) {
  let route = apiUrl +
              session.account +
              '/characters/?private-token=' +
              session.token
  return route
}

function inactives (session) {
  let route = apiUrl +
              session.account +
              '/deletedchars/?private-token=' +
              session.token
  return route
}

function details (char, session) {
  let sub = char.status === 'active' ? '/characters/' : '/deletedchars/'
  let route = apiUrl +
              session.account +
              sub +
              char.bicFileName +
              '?private-token=' +
              session.token
  return route
}

function activate (char, session) {
  let route = apiUrl +
              session.account +
              '/deletedchars/' +
              char.bicFileName +
              '/activate/' +
              '?private-token=' +
              session.token
  return route
}

function deactivate (char, session) {
  let route = apiUrl +
              session.account +
              '/characters/' +
              char.bicFileName +
              '/delete/' +
              '?private-token=' +
              session.token
  return route
}

export default {
  login,
  actives,
  inactives,
  details,
  activate,
  deactivate
}
