// todo add support for continue and break

export enum Operator {
  // Increment and Decrement
  INCREMENT = '++',
  DECREMENT = '--',

  // Unary Operators
  DELETE = 'delete',
  VOID = 'void',
  TYPEOF = 'typeof',
  BITWISE_NOT = '~',
  LOGICAL_NOT = '!',

  // Arithmetic Operations
  ADDITION = '+',
  SUBTRACTION = '-',
  DIVISION = '/',
  MULTIPLICATION = '*',
  REMAINDER = '%',
  EXPONENTIAL = '**',

  // Relational Operators
  IN = 'in',
  INSTANCEOF = 'instanceof',
  LESS_THAN = '<',
  GREATER_THAN = '>',
  LESS_THAN_EQUALS = '<=',
  GREATER_THAN_EQUALS = '>=',

  // Equality Operators
  EQUALITY = '==',
  INEQUALITY = '!=',
  IDENTITY = '===',
  NON_IDENTITY = '!==',

  //Bitwise Shift Operators
  BITWISE_LEFT_SHIFT = '<<',
  BITWISE_RIGHT_SHIFT = '>>',
  BITWISE_UNSIGNED_RIGHT_SHIFT = '>>>',

  // Binary Bitwise Operator
  BITWISE_AND = '&',
  BITWISE_OR = '|',
  BITWISE_XOR = '^',

  // Binary Logical Operators
  LOGICAL_AND = '&&',
  LOGICAL_OR = '||',

  // Ternary Operator
  CONDITIONAL_TERNARY_OPERATOR = '?',

  // Spread/Rest Operator
  SPREAD = '...',

  // Assignment Operators
  ASSIGNMENT = '=',
  MULTIPLICATION_ASSIGNMENT = '*=',
  ADDITION_ASSIGNMENT = '+=',
  SUBTRACTION_ASSIGNMENT = '-=',
  DIVISION_ASSIGNMENT = '/=',
  REMAINDER_ASSIGNMENT = '%=',
  LEFT_SHIFT_ASSIGNMENT = '<<=',
  RIGHT_SHIFT_ASSIGNMENT = '>>=',
  UNSIGNED_RIGHT_SHIFT_ASSIGNMENT = '>>>=',
  BITWISE_AND_ASSIGNMENT = '&=',
  BITWISE_OR_ASSIGNMENT = '|=',
  BITWISE_XOR_ASSIGNMENT = '^='
}
