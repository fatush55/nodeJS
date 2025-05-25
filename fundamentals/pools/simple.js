"use strict"

const { bufferFn, getBufferSize } = require("./buffer.js")

const poolSimple = (factory, size) => {
  const pool = new Array(size)
    .fill(null)
    .map(factory)

  return (item = null) => {

    if (!item) {
      const item = pool.pop() ?? factory()

      console.log("poolSimple => get", getBufferSize(pool))

      return item
    } else {
      pool.push(item)

      console.log("poolSimple => put", getBufferSize(pool))
    }
  }
}

const pool = poolSimple(bufferFn, 5)

const bufferConsumers = []

for (let i = 0; i < 10; i++) {
  const bufferItem = pool()
  bufferConsumers.push(bufferItem)
  console.log("get => bufferItem", getBufferSize(bufferItem))
}



bufferConsumers.forEach(bufferItem => {
  pool(bufferItem)
  console.log("bufferConsumers => pull", bufferItem.length * 32)
})