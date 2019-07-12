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

console.log(person.mother.firstName);

ping([1, 2, 3]);
ping2([1, 2, 3]);

function ping(array) {
  console.log(a);
  var a = array[1];
  let b = array[2];
  console.log(a, b);
}
function ping2([, a, b]) {
  console.log(a, b);
}
