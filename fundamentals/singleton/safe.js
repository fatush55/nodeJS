"use strict"

const Singleton = (function () {
  const single  = this

  return function () {
    return single
  }
})()

const singleton1 = new Singleton()
const singleton2 = new Singleton()

console.log(singleton1, singleton2, singleton1 === singleton2)