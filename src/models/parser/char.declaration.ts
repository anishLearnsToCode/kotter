enum CharType { }
export type Char = string & CharType
const isChar=(str: string): str is Char => /^(.|\n)$/.test(
  str
);
