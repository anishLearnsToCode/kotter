import {ParserService} from "../../src/services/parser.service";
import {Scope} from "../../src/models/parser/scope/scope.construct";
import { expect } from 'chai';
import 'mocha';
import {VariableExpression} from "../../src/models/parser/expression/variable.expression";

const parser = ParserService.getService();
const globalScope = Scope.getGlobalScope();

describe ('VariableExpressionParser', () => {
  it('should parse test correctly', () => {
    const result = parser.fromVariableExpression(' test   ', globalScope);
    expect(result.target).to.equal('test');
    expect(result.attribute).to.equal(null);
    expect(result.code()).to.equal('test');
  });

  it('should parse anish.firstName correctly', () => {
    const result = parser.fromVariableExpression('  test.firstName  ', globalScope);
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
  });
});
