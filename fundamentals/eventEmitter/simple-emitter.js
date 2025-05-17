"use strict"

const EventEmitter = function () {
  /**@type {{ [strict]: [function] }} */
  this.events = {}
}

EventEmitter.prototype.on = function (name, fn ) {
  /**@type {[function] | undefined} */
  const evenListeners = this.events[name]

  if (!evenListeners) {
    this.events[name] = [fn]
  } else {
    evenListeners.push(fn)
  }
}

EventEmitter.prototype.emit = function (name, ...data) {
  /**@type {[function] | undefined} */
  const evenListeners = this.events[name]

  if (!evenListeners) {
    throw new Error("No event emitter found with name '" + name + "'")
  }

  evenListeners.forEach(listener => {
    listener(...data)
  })
}

const eventEmitter = new EventEmitter()


eventEmitter.on("change", (data) => {
  console.log("Emitter change", data)
})

eventEmitter.on("create", (data) => {
  console.log("Emitter create", data)
})

eventEmitter.emit("change", { name: "Kosta" })

process.nextTick(() => {
  eventEmitter.emit("create", { name: "Oleg" })
})

eventEmitter.emit("change", { name: "Dima" })

