/**
* Code examples from JS Design Patterns by Addy Osmani
**/
/** The constructor pattern **/
/*
const person  = Object.create(null)
const defineProp = (obj, key, value) => {
  Object.defineProperty(obj, key, { value, enumerable: true })
}

defineProp(person, 'type', 'person')

const me = Object.create(person)
defineProp(me, 'name', 'paul')

console.log(me)

*/
/**
function Person (name='') {
  this.type = 'person'
  this.name = name
}

Person.prototype.getType = function () { return this.type }

const me = new Person('paul')

console.log(me)
console.log(me.getType())

**/

/**
class Person {
  constructor(name="John") {
    this.type = 'person'
    this.name = name
  }
  
  getType = () => this.type
}

const me = new Person('paul')

console.log(me)
console.log(me.getType())
**/

/** The Module Pattern **/

// 1. Object literals
/**
const myModule = {
  data: undefined,
  init () {
    this.data = new Map()
  },
  sayHello () {
    console.log('hello') 
  },
  add(item) {
     return this.data.set(item)
  },
  remove(item) {
   return this.data.delete(item) 
  },
}

myModule.init()
myModule.sayHello()
myModule.add('hi')
myModule.add({ greeting: 'hi'})
myModule.data
//module.data()
**/
/*
** Object literal notation summary (template)
const module = {
  config: {},
  init() {},
  doSomething() {},
  doSomethingElse() {}
}
*/

// 2. Module pattern
/**
const module = (function () {
  let counter = 0
  
  return {
    increment () {
      return ++counter
    },
    reset () {
      counter = 0
    }
  }
})()

console.log(module.increment())
console.log(module.increment())
console.log(module.increment())
console.log(module.reset())
console.log(module.increment())
**/

/** Module pattern summary **/
/** const module = (function () {
  // private variables and methods
  let privateVar = 0
  const privateMethod = function (thing) {
    console.log(thing)
  }
 // public api with exposed variables and methods
  return {
    publicVar: 0,
    publicMethod(thing) {
      ++privateVar
      console.log(privateVar)
      privateMethod(thing)
    }
  }
})()

module.publicVar
module.publicMethod('hi')
console.log(module.publicMethod('hi'))
module.publicVar
console.log(module.publicVar)

**/

/** Variations **/
// a. import mixins
/**
const pkgOne = {
  version: "0.0.1",
  name: 'pkgOne'
}

const pkgTwo = {
  version: "0.0.1",
  name: 'pkgOne'
}

const mixinModule = (function (one, two) {
  function privateMethod() {
    console.log(one.name, one.version)
    console.log(two.name, two.version)
  }
  return {
    publicMethod() {
      privateMethod()
    }
  }
}(pkgOne, pkgTwo))

mixinModule.publicMethod()

**/

// b. exports

/**
const module = (function (){
  const module = {}
  const privateProperty = 'private'
  const privateMethod = function () {}
 
  module.publicProperty = 'public'
  module.publicMethod = function () {
    console.log(privateProperty)
  }
  
  return module
}())

module.publicProperty
module.publicMethod()
**/
// Augmentation
/*
var MODULE = (function (my) {
  my.publicMethod = function () {
    console.log('method')
  }
  return my
}(MODULE || {}))

MODULE.publicMethod()
*/
// Loose Augmentation
/*
var MODULE = (function (my) {
  my.publicMethod = function () {
    console.log('method')
  }
  return my
}(MODULE))

MODULE.publicMethod()
*/

// Tight Augmentation
/**
var MODULE = (function (my) {
  const oldPublicMethod = my.publicMethod
  my.publicMethod = function () { // override default behavior
    console.log('method')
  }
  return my
}(MODULE || {}))

MODULE.publicMethod()

**/
// Cloning and inheritance
/**
const MODULE = (function (old){
 const module = {} 
 for (key in old) {
   if (old.hasOwnProperty(key)) {
    module[key] = old[key]    
   }
 }
 const superMethod = old.method
 module.method = function () {
   console.log('method override')
 }
  
  return module
}(MODULE || {}))

**/

// Cross-file private state
/**
const MODULE = (function (my) {
  const _private = my._private = my._private || {}
  const _seal = my._seal = my._seal || function () {
    delete my._private
    delete my._seal
    delete my._unseal
  }
  const _unseal = my._unseal = my._unseal || function () {
    my._private = _private
    my._seal = _seal
    my._unseal = _unseal
  }
  
  return my
}(MODULE || {}))

**/


// Sub-modules
// NOTE: Use var for globals scopes especially for modules
/**
var MODULE = (function (module) {
  const ctx = this
  module.ctx = function () {
    return ctx
  }
  return module
}(MODULE || {}))


MODULE.sub = (function () {
  console.log(this)
})

console.log(MODULE)
**/

// EXAMPLE: bind and intialize
/*
function moduleFactory(module) {
  //check if window is ready
  if (module.init()) {
    module.init()
  }
  
  return module
}

const module = moduleFactory(function () {
  //private parts
   return {
     // public parts
     init() {
       console.log('initialized')
     }
   }
}())
*/

/***
The Revealing Module Pattern
- similar to the module pattern; it exposes an anonymous object with pointers to private and public parts
***/
/**
const module = function () {
  //private, public parts
  const name = 'module'
  const version = 'v0.0.1'
  
  return {
    // reveal public pointers to private functions and properties
    name,
    version
  }
}()

module.name
module.version
module.type = 'revealing module pattern'
console.log(module)
**/

/***
 The Singleton Pattern
- restricts instantiation of a class to one instance
**/
/**
const singleton = (function () {
  let instance
  const name = 'singleton'
  const version = 'v0.0.1'
  
  function init () {
    // do some interesting stuff here
    return {
      // return public methods and properties
      name,
      version
      
    }
  }
  
  return {
    getInstance() {
      if (!instance) {
        instance = init()
      }
      
      return instance
    }
  }
})()

const a = singleton.getInstance()
const b = singleton.getInstance()
console.log(a === b)
*/

// basic structure

const singleton = (function (){
  let instance
  function Singleton (options = {}) {
    this.options = options
  }
  
  const _static = {
    getInstance(options) {
      if(instance === undefined) {
        instance = new Singleton(options)
      }
      
      return instance
    }
  }
  
  return _static
})()

const a = singleton.getInstance({size: 4})
console.log(a.options.size)


