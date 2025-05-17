"use strict"

const eventEmitter = () => {
  const listenersMap = {}

  return {
    on: (name, fn) => {
      const listeners = listenersMap[name]

      if (!listeners) {
        listenersMap[name] = [fn]
      } else {
        listenersMap[name].push(fn)
      }
    },

    emit: (name, ...data) => {
      const listeners = listenersMap[name]

      if (!listeners) {
        throw new Error("listeners must be defined")
      }

      listeners.forEach(listener => {
        listener(...data)
      })
    }
  }
}

const emitter = eventEmitter()

emitter.on("error", (err) => {
  console.log("error", err)
})

emitter.emit("error", "error")