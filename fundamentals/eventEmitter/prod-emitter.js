"use strict"

const eventEmitter = () => {
  const listenersMap = new Map()
  const listenersCallbackWrapper = new Map()

  const eventEmitterAction = {
    on: (name, callback) => {
      const listeners = listenersMap.get(name)

      if (!listeners) {
        listenersMap.set(name, [callback])
      } else {
        listeners.push(callback)
      }
    },

    once: (name, callback) => {
      const callbackWrapper = (...data) => {
        eventEmitterAction.off(name, callbackWrapper)
        callback(...data)
      }

      listenersCallbackWrapper.set(callback, callbackWrapper)
      eventEmitterAction.on(name, callbackWrapper)
    },

    off: (name, callback) => {
      const listeners = listenersMap.get(name)

      if (!listeners) {
        return new Error("listeners map does not exist")
      }

      const indexCallback = listeners.indexOf(callback)

      if (indexCallback !== -1) {
        listeners.splice(indexCallback, 1)
        eventEmitterAction._removeEmptyListenersMapItem(name)

        return
      }

      const callbackWrappers = listenersCallbackWrapper.get(callback)

      if (!callbackWrappers) {
        return new Error("callback map does not exist")
      }

      const indexCallbackWrappers = listeners.indexOf(callbackWrappers)

      if (indexCallback !== -1) {
        listeners.splice(indexCallbackWrappers, 1)
        eventEmitterAction._removeEmptyListenersMapItem(name)
      }
    },

    countListeners: (name) => {
      const listeners = listenersMap.get(name)

      return listeners ? listeners.length : 0
    },

    eventsName: (name) => {
      return listenersMap.keys()
    },

    emit: (name, ...data) => {
      const listeners = listenersMap.get(name)

      if (!listeners && Array.isArray(listeners)) {
        throw new Error("listeners must be defined")
      }


      console.log("listeners =>",  listeners)

      listeners.forEach(listener => {
        listener(...data)
      })
    },

    _removeEmptyListenersMapItem: (name) => {
      const listeners = listenersMap.get(name)

      if (listeners.length === 0) {
        listenersMap.delete(name)
      }
    },
  }

  return eventEmitterAction
}

const emitter = eventEmitter()

emitter.once("data", console.dir)
emitter.on("data", console.dir)

console.log("eventsName", emitter.eventsName())
console.log("countListeners(\"data\"", emitter.countListeners("data"))

emitter.emit("data", { name: "Dima" })

console.log("eventsName", emitter.eventsName())
console.log("countListeners(\"data\"", emitter.countListeners("data"))
