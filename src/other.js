// === Arrays
let a, b;
[a, b] = [1, 2];
console.log(a, b);
//=> 1 2


// Use from functions, only select from pattern
let foo = () => [1, 2, 3];

[a, b] = foo();
console.log(a, b);
// => 1 2


// Omit certain values
[a, , b] = [1, 2, 3];
console.log(a, b);
// => 1 3


// Combine with spread/rest operator (accumulates the rest of the values)
[a, ...b] = [1, 2, 3];
console.log(a, b);
// => 1 [ 2, 3 ]


// Fail-safe.
[, , , a, b] = [1, 2, 3];
console.log(a, b);
// => undefined undefined


// Swap variables easily without temp
a = 1; b = 2;
[b, a] = [a, b];
console.log(a, b);
// => 2 1


// Advance deep arrays
let c, d = 3;
[a, [b, [c, d]]];
  [a, [b, [c, d]]] = [1, [2, [[[3, 4], 5], 6]]];
console.log("a:", a, "b:", b, "c:", c, "d:", d);
// => a: 1 b: 2 c: [ [ 3, 4 ], 5 ] d: 6


// === Objects

// This is not allowed
// ({user: x});


({user: x} = {user: 5});
console.log(x);
// => 5

// Fail-safe
({user: x} = {user2: 5});
console.log(x);
// => undefined


// More values
({prop: x, prop2: y} = {prop: 5, prop2: 10});
console.log(x, y);
// => 5 10

// Short-hand syntax
let { prop, prop2} = {prop: 5, prop2: 10};
console.log(prop, prop2);
// => 5 10

// different types that are available in an object deconstructing expression
let prop6;
({prop, prop2: prop2, prop3, prop4, prop5, prop6} = {prop: false, prop2: 2, prop3: 1, prop4: 1, prop5: 1, prop6: () => 'other'});
console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', prop6());

// Equal to:
({ prop: prop, prop2: prop2} = {prop: 5, prop2: 10});
console.log(prop, prop2);
// => 5 10

// === Potential grammar hiccups

// Oops: This doesn't work:
// let a, b;
// { a, b } = {a: 1, b: 2};

// But this does work
({ a, b } = {a: 1, b: 2});
console.log(a, b);
// => 1 2

// This due to the grammar in JS.
// Starting with { implies a block scope, not an object literal.
// () converts to an expression.

// From Harmony Wiki:
// Note that object literals cannot appear in
// statement positions, so a plain object
// destructuring assignment statement
//  { x } = y must be parenthesized either
// as ({ x } = y) or ({ x }) = y.


// === Combined destructuring of objects and arrays

// Combine objects and arrays
({prop: x, prop2: [, y]} = {prop: 5, prop2: [10, 100]});
console.log(x, y);
// => 5 100


// === Nested object destructuring

// Deep objects
({
  prop: x,
  prop2: {
    prop2: {
      nested: [ , , b]
    }
  }
} = { prop: "Hello", prop2: { prop2: { nested: ["a", "b", "c"]}}});
console.log(x, b);
// => Hello c


// === Combining all to make fun happen

// All well and good, can we do more? Yes!
// Using as method parameters
foo = function ({prop: x}) {
  console.log(x);
};


// Object Expression is possible
let testObj = {
  testObj: 12
};

let anish = sachdeva = 'test';


//Array Expression is possible
// [1, 2, 3];

foo({invalid: 1});
foo({prop: 1});
// => undefined
// => 1

// === Nested advanced examples

// Can also use with the advanced example
foo = function ({
                      prop: x,
                      prop2: {
                        prop2: {
                          nested: b
                        }
                      }
                    }) {
  console.log(x, ...b);
};
foo({ prop: "Hello", prop2: { prop2: { nested: ["a", "b", "c"]}}});
// => Hello a b c


// === In combination with other ES2015 features.

// Computed property names
const name = 'fieldName';
const computedObject = { [name]: name }; // (where object is { 'fieldName': 'fieldName' })
const { [name]: nameValue } = computedObject;
console.log(nameValue);
// => fieldName



// === Rest and defaults
let ajax = function ({ url = "localhost", port: p = 80}, ...data) {
  console.log("Url:", url, "Port:", p, "Rest:", data);
};

ajax({ url: "someHost" }, "additional", "data", "hello");
// => Url: someHost Port: 80 Rest: [ 'additional', 'data', 'hello' ]

ajax({ }, "additional", "data", "hello");
// => Url: localhost Port: 80 Rest: [ 'additional', 'data', 'hello' ]

ajax({ });
// => Url: localhost Port: 80 Rest: []

// Doesn't work due to trying to destructure undefined
// ajax();
//  => Uncaught TypeError: Cannot match against 'undefined' or 'null'

// To fix this we need to have default value for parameter in function
// Note: See the `= {}` at the end, saying default empty object if the first argument is undefined.
ajax = ({ url: url = "localhost", port: p = 80} = {}) => {
  console.log("Url:", url, "Port:", p);
};

// Now this works.
ajax();
// => Url: localhost Port: 80

ajax({ });
// => Url: localhost Port: 80

ajax({ port: 8080 });
//  => Url: localhost Port: 8080

ajax({ url: "someHost", port: 8080 });
//  => Url: someHost Port: 8080


// === Similar to _.pluck
let users = [
  { user: "Name1" },
  { user: "Name2" },
  { user: "Name2" },
  { user: "Name3" }
];
let names = users.map( ({ user }) => user );
console.log(names);
// => [ 'Name1', 'Name2', 'Name2', 'Name3' ]


// === Usage in for..of loops
users = [
  { user: "Name1" },
  { user: "Name2", age: 2 },
  { user: "Name2" },
  { user: "Name3", age: 4 }
];

for (let { user, age = "DEFAULT AGE" } of users) {
  console.log(user, age);
}
// => Name1 DEFAULT AGE
// => Name2 2
// => Name2 DEFAULT AGE
// => Name3 4


() => {
  console.log('anonymous as hell');
};

// Loops example

