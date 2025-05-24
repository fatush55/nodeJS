
const factory = (fields) => {
  function Pre(data) {
    Pre.values = data;
  }

  for (let key in fields) {
    Object.defineProperty(Pre, key, {
      get() {
        return fields[key]
      },
      set(value) {
        const def = fields[key]

        if (def.type !== typeof value) {
          console.log("This value is not valid")
          return null
        }

        fields[key] = value
      },
    })
  }

  Pre.prototype.toString = function() {
    let values = this.constructor.name + ":"

    console.dir(this, { depth: null })

    for (let key in fields) {
      console.log("this =>", this.values)
      values +=  this.fields[key]
    }
  }


  return Pre;
}


const Person = factory(
  {
    name: { type: String, value: "Dima" },
    age: { type: Number, value: 10 },
  }
);

const user = new Person({ name: "Oleg", age: 20 });

console.dir(user.toString(), { depth: null });