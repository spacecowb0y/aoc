interface Solutions {
  part1: number;
  part2: number;
}

export const solve = async (): Promise<{ solutions: Solutions }> => {
  const input: string[] = await fetch(
    `https://adventofcode.com/2023/day/3/input`,
    {
      headers: {
        cookie: `session=${process.env.SESSION_TOKEN}`,
      },
    }
  )
    .then((res) => res.text())
    .then((res) => res.trim().split("\n"));

  const part1 = (input: string[]): number => {
    const G = input.map((line) => line.split(""));
    const R = G.length;
    const C = G[0].length;

    let count = 0;
    const nums = new Map();

    for (let r = 0; r < R; r++) {
      let gears: number[][] = [];
      let n = 0;
      let hasPart = false;

      for (let c = 0; c <= C; c++) {
        if (c < C && /\d/.test(G[r][c])) {
          n = n * 10 + parseInt(G[r][c]);

          for (let rr of [-1, 0, 1]) {
            for (let cc of [-1, 0, 1]) {
              const nr = r + rr;
              const nc = c + cc;

              if (0 <= nr && nr < R && 0 <= nc && nc < C) {
                const ch = G[nr][nc];
                if (!/\d/.test(ch) && ch !== ".") {
                  hasPart = true;
                }
                if (ch === "*") {
                  gears.push([nr, nc]);
                }
              }
            }
          }
        } else if (n > 0) {
          for (const [gr, gc] of gears) {
            const key = `${gr}-${gc}`;
            if (!nums.has(key)) {
              nums.set(key, []);
            }
            nums.get(key).push(n);
          }
          if (hasPart) {
            count += n;
          }
          n = 0;
          hasPart = false;
          gears = [];
        }
      }
    }
    return count;
  };

  const part2 = (input: string[]): any => {};

  return {
    solutions: {
      part1: part1(input),
      part2: part2(input),
    },
  };
};

const solutions = await solve();
console.log(JSON.stringify(solutions));
