interface Solutions {
    part1: number;
    part2: number;
  }
  
  export const solve = async (): Promise<{ solutions: Solutions }> => {
    const input = await fetch(`https://adventofcode.com/2024/day/3/input`, {
      headers: { cookie: `session=${process.env.SESSION_TOKEN}` },
    })
      .then((res) => res.text())
      .catch(() => "");
  
    const calculate = (
      memory: string,
      enabled: boolean = true
    ): [number, number] => {
      let sum1 = 0,
        sum2 = 0;
      for (const match of memory.match(/do\(\)|don't\(\)|mul\(\d+,\d+\)/g) ||
        []) {
        if (match === "do()") enabled = true;
        else if (match === "don't()") enabled = false;
        else {
          const [x, y] = match.match(/\d+/g)!.map(Number);
          const product = x * y;
          sum1 += product;
          if (enabled) sum2 += product;
        }
      }
      return [sum1, sum2];
    };
  
    const [part1, part2] = calculate(input);
  
    return { solutions: { part1, part2 } };
  };
  
  const solutions = await solve();
  console.log(JSON.stringify(solutions));
  