let variable;

let person = {
  firstName: "anish",
  lastName: "sachdeva",
  age: 20,
  father: {
    firstName: "ajay",
    lastName: "sachdeva",
    age: 48
  },
  mother: {
    firstName: "meenu"
  }
};

let firstName = person.firstName;
console.log(person);

console.log(Object.getPrototypeOf(person));

person.firstName = 'gautam';

{
  console.log('hello - scope');
  let a = 10;
}

let a = 15;
console.log(person.mother.firstName);

ping([1, 2, 3]);
ping2([1, 2, 3]);

function ping(array) {
  console.log(a);
  var a = array[1];
  let b = array[2];
  console.log(Object.getPrototypeOf(a), b);
}

function ping2([, a, b]) {
  console.log(a, b);
}

function getArray() {
  return [1, 2, 3];
}

function getObject() {
  return {
    left: 'string',
    right: 12,
    greet: function () {
      console.log('hello there');
    }
  }
}

{
  {
    let {right} = getObject();
    console.log(right);
  }
}

class Person {
  constructor({firstName, lastName, age}) {
    this.firstName = firstName || 'gautam';
    this.lastName = lastName || '';
    this.age = age;
  }
}

let anish = new Person({
  firstName: 'anish',
  lastName: 'sachdeva',
  age: 21
});
console.log(anish.lastName, anish.age, Object.getPrototypeOf(anish.firstName));


// Lops and there scopes
let iter = 4;
while (iter-- > 0) {
  // console.log(iter);
}

do {
  // console.log(iter);
} while (iter-- > 0);

for (let i = 0 ; i < 2 ; i++) {
  // do something
}

for (let i of getArray()) {
  console.log('array ' + i);
}


// ever clasue here has its own scope
if (true) {
  let anish = 'a';
} else if (true) {
  console.log('else case', anish);
} else {

}

// every case inside a switch has its own scope
switch ('a') {
  case 'a':
    let char = 'b';
  case 'b':
}

let first, second;
({first, second} = {a: 1, b: 2});

(console.log('hello anonymous'));

console;

// instanceof sample
if (anish instanceof Person) {
  console.log('anish is human !!');
}

// super + extends keyword
class SuperHero extends Person {
  constructor(hasLaserEyes, canFly) {
    super(anish);
    this.hasLaserEyes = hasLaserEyes;
    this.canFly = canFly;
  }
}

let superman = new SuperHero(true, true);
console.log(superman);

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.

// try catch block

try {
  throw "this is my exception";
} catch (e) {
  console.log(e);
}

// complex try-catch-finally block
try {
  myroutine(); // may throw three types of exceptions
} catch (e if e instanceof TypeError) {
  // statements to handle TypeError exceptions
} catch (e if e instanceof RangeError) {
  // statements to handle RangeError exceptions
} catch (e if e instanceof EvalError) {
  // statements to handle EvalError exceptions
} catch (e) {
  // statements to handle any unspecified exceptions
  // pass exception object to error handler
} finally {
  console.log('i am in the finally block ');
}
