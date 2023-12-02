interface Solutions {
    part1: number;
    part2: number;
  }
  
  export const solve = async (): Promise<{ solutions: Solutions }> => {
    const input: string[] = (
      await fetch(`https://adventofcode.com/2023/day/2/input`, {
        headers: {
          cookie: `session=${process.env.SESSION_TOKEN}`,
        },
      }).then((res) => res.text())
    ).split("\n");
  
    const part1 = (input: string[]): number => {
      const cubes = {
        red: 12,
        green: 13,
        blue: 14,
      };
      
      return input.reduce((acc, cur, i) => {
        const reg = new RegExp(/(\d+)\s(red|blue|green)/, "g");
        const arr = [...cur.matchAll(reg)];
        let add = cur ? i + 1 : 0;
        arr.forEach((el) => {
          if (Number(el[1]) > cubes[el[2]]) {
            add = 0;
          }
        });
        return acc + add;
      }, 0);
    };
  
    const part2 = (input: string[]): number =>
      input.reduce((acc, cur) => {
        const cubes = {
          red: 0,
          blue: 0,
          green: 0,
        };
  
        const reg = new RegExp(/(\d+)\s(red|blue|green)/, "g");
        const arr = [...cur.matchAll(reg)];
        arr.forEach((el) => {
          if (Number(el[1]) > cubes[el[2]]) {
            cubes[el[2]] = Number(el[1]);
          }
        });
        return acc + cubes.red * cubes.blue * cubes.green;
      }, 0);
  
    return {
      solutions: {
        part1: part1(input),
        part2: part2(input),
      },
    };
  };
  
  const solutions = await solve();
  console.log(JSON.stringify(solutions));
  