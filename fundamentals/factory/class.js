"use strict"

const factory = (filed) => class FactoryInstance {
  value

  constructor(data) {
    this._initValue(data)
      ._initFields(filed)
  }

  _initValue = (data) => {
    console.log(data && "typeof data =>", typeof data)
    if (!data || typeof data !== "object") {
      throw new Error("data must be an object")
    }

    this.value = data

    return this
  }

  _initFields = () => {
    for (const key in filed) {
      Object.defineProperty(FactoryInstance.prototype, key, {
        get: () => {
          return this.value[key]
        },
        set: (value) => {
          const def = filed[key]

          const isValid = (
            typeof value === def.type &&
            def.validation(value)
          )

          if (!isValid) {
            throw new Error("This value is not valid")
          }

          this.value[key] = value
        },
      })
    }

    return this
  }

  toString = () => {
    let valuesString = this.constructor.name

    console.log("this.values =>", this.value)

    for (let key in this.value) {
      valuesString +=  "|" + key + ":" +  this.value[key]
    }

    return valuesString
  }
}

const User = factory({
  name: { type: "string", validation: (value) => value.length >= 3 },
  age: { type: "number", validation: (value) => value >= 3 }
})


const user1 = new User(null)

user1.age = 10
user1.name = "dima"

console.dir(user1.toString(), { depth: 10 })