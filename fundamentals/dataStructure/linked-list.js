"use strict"

function LinkedListNode(value) {
  this.next = null
  this.value = value
}

function LinkedList() {
  this.head = null
  this.length = 0
}

LinkedList.prototype.pushNode = function (value) {
  const node = new LinkedListNode(value)

  if (this.length === 0) {
    this.head = node
  } else {
    let current = this.head

    while(current.next !== null) {
      current = current.next
    }

    current.next = node
  }

  this.length++
}

LinkedList.prototype.insertNodeByPosition = function (position, value) {
  if (position < 0 || position > this.length) {
    throw new Error("Insertion of LinkedList must be greater than 0");
  }

  const node = new LinkedListNode(value)

  if (position === 0) {
    node.next = this.head
    this.head = node
  } else {
    let current = this.head
    let prev = null
    let index = 0

    while (index < position) {
      prev = current
      current = current.next
      index++
    }

    prev.next = node
    node.next = current
  }

  this.length++
}

LinkedList.prototype.getNodeByPosition = function (position) {
  if (position < 0 || position > this.length) {
    throw new Error("Insertion of LinkedList must be greater than 0")
  }

  let index = 0
  let current = this.head

  while (index < position) {
    current = current.next
    index++
  }

  return current
}

LinkedList.prototype.removeNodeByPosition= function (position) {
  if (position < 0 || position > this.length) {
    throw new Error("Insertion of LinkedList must be greater than 0")
  }

  let current = this.head

  if (position === 0) {
    this.head = current.next
  } else {
    let index = 0
    let prev = null

    while (index < position) {
      prev = current
      current = current.next
      index++
    }

    prev.next = current.next

    this.length--
  }
}

const linkedList = new LinkedList()

linkedList.pushNode({ value: 1 })
linkedList.pushNode({ value: 2 })
linkedList.pushNode({ value: 3 })
linkedList.pushNode({ value: 4 })

console.dir(linkedList, { depth: null })

linkedList.removeNodeByPosition(1)

console.dir(linkedList, { depth: null })

linkedList.insertNodeByPosition(2, { value: 5 })

console.dir(linkedList, { depth: null })

console.dir(linkedList.getNodeByPosition(4), { depth: null })
