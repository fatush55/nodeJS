"use strict"

class QueueNode {
  constructor(value) {
    this.next = null
    this.value = value
  }
}

class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  enqueue = (value) => {
    const item = new QueueNode(value)

    if (this.head) {
      this.tail.next = item
      this.tail = item
    } else {
      this.tail = item
      this.head = item
    }

    this.length++
  }

  dequeue = () => {
    const current = this.head
    this.head = current.next

    if (this.length === 1) {
      this.tail = null
    }

    this.length--

    return current
  }
}


const queue = new Queue()

console.dir(queue, { depth: null })

queue.enqueue({ data: 1 })
queue.enqueue({ data: 2 })
queue.enqueue({ data: 3 })

console.dir(queue, { depth: null })
console.dir(queue.dequeue(), { depth: null })
console.dir(queue.dequeue(), { depth: null })
console.dir(queue.dequeue(), { depth: null })
console.dir(queue, { depth: null })
