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

let num = 10.0.toExponential().trim();
num = true.toString();
let firstName = person.firstName;
console.log(person);

let str = 'test';
console.log('substring test here:', str.substring(4) === '');

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

let regXp = /ab+c/i;

{
  {
    let {right} = getObject();
    console.log(right);
  }
}

class Person {
  static logData() {
    console.log(this.prototype.firstName);
  }

  constructor({firstName, lastName, age}) {
    this.firstName = firstName || 'gautam';
    this.lastName = lastName || '';
    this.age = age;
  }
}

(() => {
  var x = 20;
  let y = 20;
  const answer = x + y;
  console.log(answer);
})();

console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
let value = new Map();
value.set(1, 'test');
value.set(2, 'blabla');
for (const entry of value.entries()) {
  console.log(entry);
}

(function() {
  var x = 20;
  var y = 20;
  var answer = x + y;
  console.log(answer);
})();

person =-2;


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

let elem = new Person('test')[0].attribute;
