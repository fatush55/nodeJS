"use strict"

const { seedTets, LOOP_NUMBER } = require("./speed-check.js")
const { fibFn } = require("./fib-tets.js")
const { generateKey } = require("./generateKey")

const memoize = (fn) => {
  const cache = new Map()

  return (...args) => {
    const key = generateKey(args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn(...args)

    cache.set(key, result)

    return result
  }
}

const fibMemo = memoize(fibFn)

seedTets("fibMemo", fibMemo, [15], LOOP_NUMBER)
seedTets("fibFn", fibFn, [15], LOOP_NUMBER)

