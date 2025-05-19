"use strict"

const Singleton = (function () {
  let instance = null

  function Singleton(){
    if (!instance) {
      instance = this
    }

    return instance
  }

  return Singleton
})()

const singleton1 = new Singleton()
const singleton2 = new Singleton()

console.log(singleton1, singleton2, singleton1 === singleton2)
