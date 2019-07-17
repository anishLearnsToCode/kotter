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
});
