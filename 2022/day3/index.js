const { readFileSync } = require("fs");

const inputs = readFileSync("input.txt", "utf-8").split("\n");

const isUpperCase = (string) => /^[A-Z]*$/.test(string);

const alphabetPosition = (text) =>
  text
    .split("")
    .map((x) => "abcdefghijklmnopqrstuvwxyz".split("").indexOf(x) + 1)[0];

const solve = (input) => {
  let a = input.slice(0, input.length / 2);
  let b = input.slice(input.length / 2);

  let reg = new RegExp("[" + b + "]", "g");

  return a.match(reg)[0];
};

let results = inputs.map((input) => solve(input));

results = results.map((result) =>
  isUpperCase(result)
    ? alphabetPosition(result.toLowerCase())+26
    : alphabetPosition(result)
);

console.log(results.reduce((a, b) => a + b));