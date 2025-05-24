"use strict"

const { generateKeyHash } = require("./generateKey.js")
const fn = require("node:fs")

function Memoize() {}

const memoize = (fn) => {
  const cache = new Map()

  const memoizedFn = (...args) => {
    const callBack = args.pop()
    const key = generateKeyHash(args)

    if (cache.has(key)) {
      const { err, data } =  cache.get(key)

      callBack(err, data)
    }

    fn(...args, (err, data) => {
      cache.set(key, { err, data })
      callBack(err, data)
    })
  }

  const fields = {
    cache,
    limit: 0,
    size: 0,
  }

  Object.setPrototypeOf(memoizedFn, Memoize.prototype)
  return Object.assign(memoizedFn, fields)
}

Memoize.prototype.clear = function () {
  console.log("clear =>", this)
  this.cache.clear()
}

Memoize.prototype.cacheLeght = function () {
  return  this.cache.size
}

fn.readFile = memoize(fn.readFile)


fn.readFile("./fib-tets.js", "utf8", (data, err) => {
  console.log(data, err)
})