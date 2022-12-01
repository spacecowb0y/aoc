const { readFileSync } = require("fs");

const INPUT = readFileSync("input.txt", "utf-8");

const solve = (input) => {
  let elfs = input.split(/\n\s*\n/);
  let calories = elfs.map((elf) =>
    elf.split("\n").reduce((sum, a) => Number(sum) + Number(a), 0)
  );
  return calories.sort((a, b) => b - a);
};

const solve2 = (input) => {
  return input.slice(0, 3).reduce((sum, a) => sum + a, 0);
};

console.log(solve(INPUT)[0]);
console.log(solve2(solve(INPUT)));
