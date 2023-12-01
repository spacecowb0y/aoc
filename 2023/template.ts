interface Solutions {
    part1: number;
    part2: number;
  }
  
  export const solve = async (): Promise<{ solutions: Solutions }> => {
    const input: string[] = (
      await fetch(`https://adventofcode.com/2023/day/#NUMBER/input`, {
        headers: {
          cookie: `session=${process.env.SESSION_TOKEN}`,
        },
      }).then((res) => res.text())
    ).match(/(\S*)\n/g) || [];
  
    const part1 = (input: string[]): any => null
    const part2 = (input: string[]): any => null
  
    return {
      solutions: {
        part1: part1(input),
        part2: part2(input),
      },
    };
  };
  
  const solutions = await solve();
  console.log(JSON.stringify(solutions));
  