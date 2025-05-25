"use strict"

const { bufferFn, getBufferSize } = require("./buffer.js")

const pollAsync = (factory, {
  pollLength = 0,
  minPollLength = 5,
  maxPollLength = 10,
}) => {
  const callbackQueue = []

  const pool = new Array(pollLength ?? minPollLength)
    .fill(null)
    .map(factory)

  console.log("Created pool with length:", pool.length)

  return (action) => {
    if (!action) {
      return
    }

    if (typeof action === "function") {
      const callback = action

      console.log("pool.length:", pool.length, pool.length <= maxPollLength)
      if (pool.length <= 0) {
        callbackQueue.push(callback)

        console.log("Callback puts in queue:", callback)

        return
      } else {
        const item = pool.pop() ?? factory()

        callback(item)
        console.log("Callback calls with poll item:", getBufferSize(item))
        return
      }
    }

    if (typeof action === "object") {
      const item = action
      const callback = callbackQueue.shift()

      if (callback) {
        callback(item)
        console.log("Callback has been taken from call callbackQueue, and called with item:", getBufferSize(item))
        return
      }


      if (pool.length < maxPollLength) {
        pool.push(item)
        console.log("Item has been putting in poll, it's:", getBufferSize(item))

      } else {
        console.log("Item hasn't been putting in poll, poll is full")
      }
    }

  }
}

const pool = pollAsync(bufferFn, {
  maxPollLength: 10,
  minPollLength: 5,
  pollLength: 5,
})

const bufferConsumers = []

for (let i = 0; i < 10; i++) {
  pool((item) => {
    bufferConsumers.push(item)
    console.log("getBufferSize(item)", i, getBufferSize(item))
  })
}



bufferConsumers.forEach(bufferItem => {
  pool(bufferItem)
  console.log("bufferConsumers => pull", bufferItem.length * 32)
})