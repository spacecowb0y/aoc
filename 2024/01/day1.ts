interface Solutions {
    part1: number;
    part2: number;
  }
  
  export const solve = async (): Promise<{ solutions: Solutions }> => {
    const input = await fetch(`https://adventofcode.com/2024/day/1/input`, {
      headers: { cookie: `session=${process.env.SESSION_TOKEN}` },
    })
      .then((res) => res.text())
      .catch(() => "");
  
    const { left, right } = input
      .trim()
      .split("\n")
      .reduce(
        (lists, line) => {
          const [left, right] = line.trim().split(/\s+/).map(Number);
          lists.left.push(left);
          lists.right.push(right);
          return lists;
        },
        { left: [] as number[], right: [] as number[] }
      );
  
    const part1 = [...left]
      .sort((a, b) => a - b)
      .reduce(
        (sum, left, i) =>
          sum + Math.abs(left - [...right].sort((a, b) => a - b)[i]),
        0
      );
  
    const part2 = left.reduce(
      (sum, num) =>
        sum +
        num * right.reduce((count, n) => count + (n === num ? 1 : 0), 0),
      0
    );
  
    return { solutions: { part1, part2 } };
  };
  
  // Execute and log solutions
  const solutions = await solve();
  console.log(JSON.stringify(solutions));
  