"use strict"

const { getBufferSize, bufferFn } = require("./buffer");
const poolified = Symbol("poolified")

const maxFlag = { [poolified]: true }

const duplicate = (factory, n) => new Array(n)
  .fill(null)
  .map(() =>
    Object.assign( factory(), maxFlag)
  )

const provide = callback => item => {
  callback(item)
}

const poolify = (factory, { min, max, def }) => {
  const pool = duplicate(factory, def)

  const callQueue = []
  let allocated = def

  return (action) => {
    if (action[poolified]) {
      const item  = action
      const callback = callQueue.shift()

      if (callback) {
        callback(item)
      } else {
        pool.push(item)
      }
      return
    }

    if (pool.length < min && allocated < max) {
      const grow = Math.min(max - allocated, def - pool.length)
      allocated += grow

      const instance = duplicate(factory, grow)

      pool.push(...instance)
    }

    const callback = provide(action)
    const item = pool.pop()

    if (item) {
      callback(item)
    } else {
      callQueue.push(callback)
    }


  }
}

const pool = poolify(bufferFn, { min: 5, max: 10, def: 5 })

const bufferConsumers = []

for (let i = 0; i < 15; i++) {
  pool((item) => {
    bufferConsumers.push(item)
    console.log("getBufferSize(item)", i, getBufferSize(item))

  })
}

bufferConsumers.forEach(bufferItem => {
  console.log("xxx bufferItem =>", getBufferSize(bufferItem))
  pool(bufferItem)
})