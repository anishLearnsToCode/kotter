import {ParserService} from "../../src/services/parser.service";
import {Scope} from "../../src/models/parser/scope/scope.construct";
import { expect } from 'chai';
import 'mocha';
import {VariableExpression} from "../../src/models/parser/expression/variable.expression";

const parser = ParserService.getService();
const globalScope = Scope.getGlobalScope();

const objectSample = `{
  firstName: 'anish',
  lastName: 'sachdeva',
  organization: 'CERN',
  func: () => {
    console.log('anonymous like crazy');
  },
  greet: function (val) {
    console.log('hey there fella');
  }
}`;

const anonymousFunctionSample = `() => {
  [, a, b, [t, g]] = getArray().args;
  ({
    prop: x,
    prop2: {
      prop2: {
        nested: [ , , b]
      }
    }
  } = { prop: "Hello", prop2: { prop2: { nested: ["a", "b", "c"]}}});
  let name = 'john doe';
}`;

describe ('VariableExpressionParser', () => {
  it('should parse test correctly', () => {
    const result = parser.fromVariableExpression(' test   ', globalScope);
    expect(result.target).to.equal('test');
    expect(result.attribute).to.equal(null);
    expect(result.code()).to.equal('test');
  });

  it('should parse anish.firstName correctly', () => {
    const result = parser.fromVariableExpression('  test .  firstName  ', globalScope);
    expect(result.target).to.equal('test');
    expect(result.code()).to.equal('test.firstName');
  });

  it('should parse anish.father.firstName correctly', () => {
    const result = parser.fromVariableExpression('anish.father.firstName  ', globalScope);
    expect(result.target).to.equal('anish');
    expect(result.code()).to.equal('anish.father.firstName');
  });

  it('should parse function invocation at the end of variable expression', () => {
    const result = parser.fromVariableExpression('  anish.getAge()  ', globalScope);
    expect(result.target).to.equal('anish');
    expect(result.code()).to.equal('anish.getAge()');
  });

  // todo func()()
  // todo un named function function(x, y) {}
});



describe('Function Invocation Expression parser should parse correctly', () => {
  it('should correctly parse foo()', () => {
    const result = parser.fromFunctionInvocationExpression('foo()  ', globalScope);
    expect(result.target).to.equal('foo');
    expect(result.args.length).to.equal(0);
    expect(result.code()).to.equal('foo()');
  });

  it('should correctly parse foo(bar)', () => {
    const result = parser.fromFunctionInvocationExpression(' foo(bar)  ', globalScope);
    expect(result.target).to.equal('foo');
    expect(result.args.length).to.equal(1);
    expect(result.code()).to.equal('foo(bar)');
  });

  it('should correctly parse foo()', () => {
    const result = parser.fromFunctionInvocationExpression('foo(bar, bar2)  ', globalScope);
    expect(result.target).to.equal('foo');
    expect(result.args.length).to.equal(2);
    expect(result.code()).to.equal('foo(bar,bar2)');
  });

  it('should correctly parse foo(bar, bar2, foo())', () => {
    const result = parser.fromFunctionInvocationExpression('foo(bar, bar2, foo())   ', globalScope);
    expect(result.target).to.equal('foo');
    expect(result.args.length).to.equal(3);
    expect(result.code()).to.equal('foo(bar,bar2,foo())');
  });

  it('should correctly parse foo(bar, bar2, test(age, name)', () => {
    const result = parser.fromFunctionInvocationExpression('foo(bar, bar2, test(age, name))  ', globalScope);
    expect(result.target).to.equal('foo');
    expect(result.args.length).to.equal(3);
    expect(result.code()).to.equal('foo(bar,bar2,test(age,name))');
  });

  it('should correctly parse foo(10)', () => {
    const result = parser.fromFunctionInvocationExpression('foo(10)   ', globalScope);
    expect(result.target).to.equal('foo');
    expect(result.args.length).to.equal(1);
    expect(result.code()).to.equal('foo(10)');
  });

  it('should correctly parse foo("test")', () => {
    const result = parser.fromFunctionInvocationExpression('foo("test")', globalScope);
    expect(result.target).to.equal('foo');
    expect(result.args.length).to.equal(1);
    expect(result.code()).to.equal('foo("test")');
  });

  it('should correctly parse numbers and string literals passed in as parameters', () => {
    const result = parser.fromFunctionInvocationExpression('foo (10, "test")  ', globalScope);
    expect(result.target).to.equal('foo');
    expect(result.args.length).to.equal(2);
    expect(result.code()).to.equal('foo(10,"test")');
  });

  it('should correctly parse functions, numbers and string literals all passed in together', () => {
    const result = parser.fromFunctionInvocationExpression('foo    (10, 20, 30, "test", \'test\', bar())', globalScope);
    expect(result.target).to.equal('foo');
    expect(result.args.length).to.equal(6);
    expect(result.code()).to.equal('foo(10,20,30,"test",\'test\',bar())');
  });

  it('should correctly parse objects passed in as arguments', () => {
    const result = parser.fromFunctionInvocationExpression(' foo  ({firstName: \'anish\', age: 21})', globalScope);
    expect(result.target).to.equal('foo');
    expect(result.args.length).to.equal(1);
    expect(result.code()).to.equal('foo({firstName:\'anish\',age:21})');
  });

  it('should correctly parse anonymous functions passed into it', () => {
    const functionInvocationExpression = `
      foo(() => {
        console.log('hello world');
      })
    `;
    const result = parser.fromFunctionInvocationExpression(functionInvocationExpression, globalScope);
    expect(result.target).to.equal('foo');
    expect(result.args.length).to.equal(1);
    expect(result.code()).to.equal(functionInvocationExpression.trim());
  });

  it('should correctly parse anonymous functions + objects passed into it', () => {
    const functionInvocationExpression = `
      foo(() => {
        console.log('hello world');
      }, {firstName: 'anish', age: 21})
    `;
    const result = parser.fromFunctionInvocationExpression(functionInvocationExpression, globalScope);
    expect(result.target).to.equal('foo');
    expect(result.args.length).to.equal(2);
    expect(result.code()).to.equal(functionInvocationExpression.trim());
  });

  describe('the group expression parser should parse all expressions of type (Expression | AssignmentExpression | Notation)', () => {
    it('should correctly parse simple Variable Expressions', () => {
      const result = parser.fromGroupExpression(' ( variable  ) ', globalScope);
      expect(result.code()).to.equal('(variable)');
    });

    it('should correctly parse multi Variable Expressions', () => {
      const result = parser.fromGroupExpression(' ( variable.mother.age   ) ', globalScope);
      expect(result.code()).to.equal('(variable.mother.age)');
    });

    it('should correctly parse function invocation expressions', () => {
      const result = parser.fromGroupExpression(' ( variable.father.getAge()   ) ', globalScope);
      expect(result.code()).to.equal('(variable.father.getAge())');
    });

    it('should correctly parse complex function invocation expressions', () => {
      const result = parser.fromGroupExpression(' ( variable.father().getAge().toString(10, 20, {}, \'test\'))   ', globalScope);
      expect(result.code()).to.equal('variable.father().getAge().toString(10, 20, {}, \'test\'))');
    });

    it('should correctly parse multiple group expressions', () => {
      const result = parser.fromGroupExpression('  (((test)))  ', globalScope);
      expect(result.code()).to.equal('(((test)))');
    });

    it('should correctly parse complex multiple group expressions', () => {
      const result = parser.fromGroupExpression('  (((foo(bar, bar(), 10, "test"))))  ', globalScope);
      expect(result.code()).to.equal('(((foo(bar,bar(),10,"test"))))');
    });

    it('should correctly parse Array Index Expressions', () => {
      const result = parser.fromGroupExpression(' ( array[0 ]  )   ', globalScope);
      expect(result.code()).to.equal('(array[0])');
    });

    it('should correctly parse assignment expressions', () => {
      const result = parser.fromGroupExpression(' ( variable = getArray()[0] )  ', globalScope);
      expect(result.code()).to.equal('(variable=getArray()[0])');
    });

    it('should correctly parse deconstructed array assignment expressions', () => {
      const result = parser.fromGroupExpression(' ( [a]= getArray()[0] )  ', globalScope);
      expect(result.code()).to.equal('([a]=getArray()[0])');
    });

    it('should correctly parse complex deconstructed array assignment expressions', () => {
      const result = parser.fromGroupExpression(' ( [, a, b, ,[, , d] , c]= getArray().args )  ', globalScope);
      expect(result.code()).to.equal('( [,a,b,,[,,d],c]=getArray().args)');
    });

    it('should correctly parse deconstructed object assignment expressions', () => {
      const result = parser.fromGroupExpression(' ( {firstName, lastName, y: x} = getObj().parameters[0] )  ', globalScope);
      expect(result.code()).to.equal('{firstName,lastName,y:x}=getObj().parameters[0])');
    });

    it('should correctly parse deep deconstructed object assignment expressions', () => {
      const objectDeconstructedExpression = `
        ({
          prop: x,
          prop2: {
            prop2: {
              nested: [ , , b]
            }
          }
        } = { prop: "Hello", prop2: { prop2: { nested: ["a", "b", "c"]}}})
      `;
      const result = parser.fromGroupExpression(objectDeconstructedExpression, globalScope);
      expect(result.code()).to.equal(objectDeconstructedExpression.trim());
    });
  });


  describe('Assignment Expression Parser Tests', () => {
    it('should correctly parse simple variable assignments', () => {
      const result = parser.fromAssignmentExpression('  variable = 10  ', globalScope);
      expect(result.code()).to.equal('variable = 10');
    });

    // todo multiple assignment expressions
    // todo DAE --> array
    // todo DAE --> complex FIE
    // todo DOE --> Object notation
    // todo DOE --> FIE having array index and properties
  });



  describe('Expression Method Parser Tests', () => {
    it('should correctly parse a variable expression', () => {
      const result = parser.fromExpression(' test   ', globalScope);
      expect(result.target).to.equal('test');
      expect(result.code()).to.equal('test');
    });

    it('should parse a complex variable expression', () => {
      const result = parser.fromExpression(' test.anish.firstName.value  ', globalScope);
      expect(result.target).to.equal('test');
      expect(result.code()).to.equal('test.anish.firstName.value');
    });

    it('should parse a function invocation expression', () => {
      const result = parser.fromExpression(' getArray().args ', globalScope);
      expect(result.target).to.equal('getArray');
      expect(result.code()).to.equal('getArray().args');
    });

    it('should parse a complex function invocation expression', () => {
      const result = parser.fromExpression(' getArray(bar, bar(), 42, "test", \'test\').args ', globalScope);
      expect(result.target).to.equal('getArray');
      expect(result.code()).to.equal('getArray(bar,bar(),42,"test",\'test\').args');
    });

    it('should parse a complex variable/function invocation expression', () => {
      const expression = `getArray(bar, bar(), 42, "test", 'test', {name: 'anish'}).args.run()   `;
      const result = parser.fromExpression(expression, globalScope);
      expect(result.target).to.equal('getArray');
      expect(result.code()).to.equal(expression.trim());
    });

    it('should parse a group expression', () => {
      const result = parser.fromExpression('()', globalScope);
      expect((result.target as VariableExpression).target).to.equal('');
      expect(result.code()).to.equal('()');
    });

    it('should parse a group expression with Variable Expression', () => {
      const result = parser.fromExpression(' ( person.firstName.value )   ', globalScope);
      expect(result.code()).to.equal('(person.firstName.value)');
    });

    it('should parse a group expression with Function Invocation Expression', () => {
      const result = parser.fromExpression(' ( person.firstName.toString().args(42, "test") )   ', globalScope);
      expect(result.code()).to.equal('(person.firstName.toString().args(42,"test")))');
    });

    // todo FIE anonymous func
    // todo FIE deconstruced args in func
    // todo object notation and array notation passed as args in function
    // todo array index expression
    // todo array index expressions with multiple indexs [0][1] etc.
    // todo array index expressions with multiple indexs and passing different expressions in them
    // todo object notation expression with anonymous functions and normal function declarations + VE + FIE
    // todo AE - normal
    // todo AE DAE
    // todo AE DOE
  });

  describe('New Statement Parser Tests', () => {
    // todo new with FIE
    // todo new with AIE
  });
});
