"use strict"

const LOOP_NUMBER = 100_000

const seedTets = (name ,fn , args, count) => {
  const tmp = []
  const start = new Date().getTime()

  for (let i = 0; i < count; i++) {
    tmp.push(fn(...args))
  }

  const end = new Date().getTime()
  const time = end - start
  console.log(name, time, tmp.length)
}

module.exports = {
  LOOP_NUMBER,
  seedTets,
}