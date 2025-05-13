"use strict"

const curryFn = (fn, ...parms) => {
  const curry = (...args) => {
    if (fn.length === args.length) {
      return fn(...args)
    }

    return curry.bind(null, ...args)
  }

  return parms.length ? curry(...parms) : curry
}

const sum = (num1, num2, num3) => console.log(num1 + num2 + num3)

const sumCurry = curryFn(sum)

curryFn(sum, -1, -2, -3) // -6
sumCurry(1, 2, 3) // 6
sumCurry(10, 20)(30) // 60
sumCurry(100)(200)(300) // 600