type Equation = { target: number; numbers: number[] };

interface Solutions {
  part1: number;
  part2: number;
}

export const solve = async (): Promise<{ solutions: Solutions }> => {
  const input = await fetch(`https://adventofcode.com/2024/day/7/input`, {
    headers: { cookie: `session=${process.env.SESSION_TOKEN}` },
  })
    .then((res) => res.text())
    .catch(() => "");

  const equations: Equation[] = input
    .trim()
    .split("\n")
    .map((line) => {
      const [target, nums] = line.split(": ");
      return { target: +target, numbers: nums.split(" ").map(Number) };
    });

  const evaluate = (nums: number[], target: number, ops: string[]): boolean => {
    const calc = (value: number, num: number, op: string): number =>
      op === "+"
        ? value + num
        : op === "*"
        ? value * num
        : +(value.toString() + num);

    return nums
      .slice(1)
      .reduce(
        (results, num) => {
          const newResults: number[] = [];
          results.forEach((val) =>
            ops.forEach((op) => newResults.push(calc(val, num, op)))
          );
          return newResults;
        },
        [nums[0]]
      )
      .includes(target);
  };

  const calculate = (ops: string[]): number =>
    equations.reduce(
      (sum, { target, numbers }) =>
        sum + (evaluate(numbers, target, ops) ? target : 0),
      0
    );

  return {
    solutions: {
      part1: calculate(["+", "*"]),
      part2: calculate(["+", "*", "||"]),
    },
  };
};

const solutions = await solve();
console.log(solutions);
