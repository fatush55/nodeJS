const { EventEmitter, once } = require('node:events')


const emitter = () => {
  const eventEmitter = new EventEmitter()
  const emit = eventEmitter.emit

  eventEmitter.emit = (...args) => {
    if (args[0] !== "*") {
      emit.apply(eventEmitter, args)
    }

    args.unshift("*")
    emit.apply(eventEmitter, args)
  }

  return eventEmitter
}

const ee = emitter()

once(ee, "change")
  .then((data) => console.log(data))
  .catch((err) => console.error(err))

once(ee, "*")
  .then((data) => console.log(data))
  .catch((err) => console.error(err))


ee.emit("change", { name: "Kosta" })
ee.emit("change", { name: "Kosta" })
ee.emit("change", { name: "Kosta" })