
export default function (requests, args, handleError) {
  this.idx = 0
  this.requests = requests
  this.args = args
  this.handleError = handleError
  this.start = start
  this.tick = tick
  this.data = []

  function start () {
    return new Promise((resolve) => {
      this.tick(this.requests[this.idx], this.args[this.idx], this.handleError, (next, data) => {
        if (this.idx >= this.requests.length - 1) {
          next = false
        }
        resolve({ next: next, data: data })
      })
    })
    .then((res) => {
      this.idx++
      this.data.push(res.data)
      return res.next ? this.start() : this.data
    })
  }

  function tick (request, arg, handleError, callback) {
    request(arg)
    .then((response) => {
      let next = true
      if (response.data === undefined) {
        next = handleError(new Error('response.data is undefined'))
      }
      callback(next, response.data)
    })
    .catch((error) => {
      let next = handleError(error)
      callback(next, undefined)
    })
  }
}
