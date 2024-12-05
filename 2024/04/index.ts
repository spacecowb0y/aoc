type Direction = [number, number];

interface Solutions {
  part1: number;
  part2: number;
}

export const solve = async (): Promise<{ solutions: Solutions }> => {
  const input = await fetch(`https://adventofcode.com/2024/day/4/input`, {
    headers: { cookie: `session=${process.env.SESSION_TOKEN}` },
  })
    .then((res) => res.text())
    .catch(() => "");

  const grid = input.split("\n");
  const part1 = (() => {
    let count = 0;
    const dirs: Direction[] = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        dirs.forEach(([dr, dc]) => {
          if (
            "XMAS".split("").every((char, i) => {
              const [nr, nc] = [r + dr * i, c + dc * i];
              return (
                nr >= 0 &&
                nr < grid.length &&
                nc >= 0 &&
                nc < grid[0].length &&
                grid[nr][nc] === char
              );
            })
          )
            count++;
        });
      }
    }
    return count;
  })();

  const part2 = (() => {
    const arr = grid.map((row) => row.split(""));
    let count = 0;
    for (let r = 1; r < arr.length - 1; r++) {
      for (let c = 1; c < arr[0].length - 1; c++) {
        if (arr[r][c] !== "A") continue;
        const patterns = [
          [
            [-1, -1, "M"],
            [1, 1, "S"],
          ],
          [
            [-1, -1, "S"],
            [1, 1, "M"],
          ],
          [
            [-1, 1, "M"],
            [1, -1, "S"],
          ],
          [
            [-1, 1, "S"],
            [1, -1, "M"],
          ],
        ];
        if (
          patterns
            .slice(0, 2)
            .some((p) =>
              p.every(([dr, dc, ch]) => arr[r + Number(dr)][c + Number(dc)] === ch)
            ) &&
          patterns
            .slice(2, 4)
            .some((p) =>
              p.every(([dr, dc, ch]) => arr[r + Number(dr)][c + Number(dc)] === ch)
            )
        )
          count++;
      }
    }
    return count;
  })();

  return { solutions: { part1, part2 } };
};

const solutions = await solve();
console.log(JSON.stringify(solutions));
