"use strict"

const list = () => {
  let elements

  return {
    push: (data) => {
      elements = {
        data,
        prev: elements,
      }

      return elements
    },

    last: () => elements,

    [Symbol.iterator]: () => ({
      current: elements,
      next() {
        const elements = this.current

        if (!elements) {
          return {
            done: true,
            value: null
          }
        }

        this.current = elements.prev

        return  {
          done: false,
          value: elements.data
        }
      }
    }),
  }
}

const li = list()

li.push({ data: 1 })
li.push({ data: 2 })
li.push({ data: 3 })


console.dir(li.last())

for (const item of li) {
  console.dir(item)
}