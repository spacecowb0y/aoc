interface Solutions {
  part1: number;
  part2: number;
}

export const solve = async (): Promise<{ solutions: Solutions }> => {
  const input: string[] = (
    await fetch(`https://adventofcode.com/2023/day/1/input`, {
      headers: {
        cookie: `session=${process.env.SESSION_TOKEN}`,
      },
    }).then((res) => res.text())
  ).match(/(\S*)\n/g) || [];

  const part1 = (input: string[]): number =>
    input
      .map((line) => line.split("").map(Number).filter(Boolean))
      .reduce((sum, arr) => (sum += +`${arr[0]}${arr[arr.length - 1]}`), 0);

  const part2 = (input: string[]): number =>
    input
      .map((line) =>
        ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
          .reduce(
            (acc, word, index) =>
              acc.replaceAll(word, word + (index + 1) + word),
            line
          )
          .split("")
          .map(Number)
          .filter(Boolean)
          .map((_, i, arr) => +`${arr[0]}${arr[arr.length - 1]}`)
          .reduce((_, value) => value)
      )
      .reduce((sum, value) => sum + value, 0);

  return {
    solutions: {
      part1: part1(input),
      part2: part2(input),
    },
  };
};

const solutions = await solve();
console.log(JSON.stringify(solutions));
