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


let iter = 4;
while (iter-- > 0) {
  // console.log(iter);
}

do {
  // console.log(iter);
} while (iter-- > 0);

let first, second;
({first, second} = {a: 1, b: 2});

(console.log('hello anonymous'));
