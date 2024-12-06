type Direction = "^" | ">" | "v" | "<";

const MOVES = {
  "^": { dx: -1, dy: 0, next: ">" },
  ">": { dx: 0, dy: 1, next: "v" },
  v: { dx: 1, dy: 0, next: "<" },
  "<": { dx: 0, dy: -1, next: "^" },
} as const;

export const solve = async () => {
  const map = await fetch(`https://adventofcode.com/2024/day/6/input`, {
    headers: { cookie: `session=${process.env.SESSION_TOKEN}` },
  })
    .then((r) => r.text())
    .then((t) => t.trim().split("\n"));

  const rows = map.length,
    cols = map[0].length;

  const coordToKey = (x: number, y: number, dir?: Direction) =>
    dir ? (x * cols + y) * 4 + "^>v<".indexOf(dir) : x * cols + y;

  const findGuard = (m: string[]): [number, number, Direction] => {
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if ("^>v<".includes(m[r][c])) return [r, c, m[r][c] as Direction];
    return [-1, -1, "^" as Direction];
  };

  const part1 = (() => {
    let [x, y, dir]: [number, number, Direction] = findGuard(map);
    const seen = new Set([coordToKey(x, y)]);

    while (true) {
      const { dx, dy, next } = MOVES[dir];
      const [nx, ny] = [x + dx, y + dy];

      if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) break;

      if (map[nx][ny] === "#") dir = next;
      else ([x, y] = [nx, ny]), seen.add(coordToKey(x, y));
    }
    return seen.size;
  })();

  const part2 = (() => {
    const [gx, gy, gdir] = findGuard(map);
    let count = 0;

    const validPositions: [number, number][] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (map[r][c] === "." && (r !== gx || c !== gy)) {
          validPositions.push([r, c]);
        }
      }
    }

    const simulate = (m: string[][]) => {
      let [x, y, dir] = [gx, gy, gdir];
      const seen = new Set<number>();

      while (true) {
        const state = coordToKey(x, y, dir);
        if (seen.has(state)) return true;
        seen.add(state);

        const { dx, dy, next } = MOVES[dir];
        const [nx, ny] = [x + dx, y + dy];

        if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) return false;

        if (m[nx][ny] === "#") dir = next;
        else [x, y] = [nx, ny];
      }
    };

    const simGrid = map.map((row) => [...row]);
    for (const [r, c] of validPositions) {
      simGrid[r][c] = "#";
      if (simulate(simGrid)) count++;
      simGrid[r][c] = ".";
    }

    return count;
  })();

  return { solutions: { part1, part2 } };
};

const solutions = await solve();
console.log(JSON.stringify(solutions));
