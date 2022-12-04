const { readFileSync } = require("fs");

const inputs = readFileSync("input.txt", "utf-8").split("\n");

const format = (inputs) => {
  let formatted = inputs.map((input) => input.split(","));
  formatted = formatted.map((result) =>
    result.map((r) => r.split("-").map((i) => Number(i)))
  );

  return formatted;
};

const solve = (inputs) => {
  let count = 0;
  let results = format(inputs);
  results = results.map((result) => {
    if (
      (result[0][0] <= result[1][0] && result[0][1] >= result[1][1]) ||
      (result[1][0] <= result[0][0] && result[1][1] >= result[0][1])
    ) {
      count++;
    }
  });
  return count;
};

console.log(solve(inputs));