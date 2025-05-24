"use strict"

const { generateKeyHash } = require("./generateKey.js")

const fn = require("node:fs")

const memoizeAsync = (lib, fnName) => {
  const fn = lib[fnName]
  const cache = new Map()

  lib[fnName] = (...args) => {
    const cb = args.pop()

    console.log("cache =>", cache)

    const key = generateKeyHash(args)

    if (cache.has(key)) {
      const { data, error } = cache.get(key)
      return cb(data, error)
    }

    fn(...args, (error, data) => {
      cache.set(key, { data, error })
      cb(data, error)
    })
  }
}

memoizeAsync(fn, "readFile")

fn.readFile("./fib-tets.js", "utf8", (data, err) => {
  console.log(data, err)

  fn.readFile("./fib-tets.js", "utf8", (data, err) => {
    console.log(data, err)
  })
})