"use strict"

const { seedTets, LOOP_NUMBER } = require("./speed-check.js")
const { fibFn } = require("./fib-tets.js")
const { generateKey } = require("./generateKey")


const memoizeLimitCache = (fn, limit = 10) => {
  const cache = new Map()

  return (...args) => {
    const key = generateKey(args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn(...args)

    if (cache.size >= limit) {
      const firstKey = cache.keys().next().value

      cache.delete(firstKey)
    }

    cache.set(key, result)

    return result
  }
}

const fibMemo = memoizeLimitCache(fibFn, 10)

seedTets("memoizeLimitCache(fibFn, 10)", fibMemo, [15], LOOP_NUMBER)
seedTets("fibFn", fibFn, [15], LOOP_NUMBER)