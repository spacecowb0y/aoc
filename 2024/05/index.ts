type Rule = [number, number];

interface Solutions {
  part1: number;
  part2: number;
}

export const solve = async (): Promise<{ solutions: Solutions }> => {
  const input = await fetch(`https://adventofcode.com/2024/day/5/input`, {
    headers: { cookie: `session=${process.env.SESSION_TOKEN}` },
  })
    .then((res) => res.text())
    .catch(() => "");

  const parseInput = (input: string) => {
    const [rulesSection, updatesSection] = input.trim().split("\n\n");
    const rules: Rule[] = rulesSection
      .split("\n")
      .map((line) => line.split("|").map(Number) as Rule);
    const updates = updatesSection
      .split("\n")
      .map((line) => line.split(",").map(Number));
    return { rules, updates };
  };

  const buildGraph = (update: number[], rules: Rule[]) => {
    const graph = new Map<number, Set<number>>();
    const inDegree = new Map<number, number>();
    const updateSet = new Set(update);

    update.forEach((page) => {
      if (!graph.has(page)) graph.set(page, new Set());
      if (!inDegree.has(page)) inDegree.set(page, 0);
    });

    rules.forEach(([x, y]) => {
      if (updateSet.has(x) && updateSet.has(y)) {
        graph.get(x)?.add(y);
        inDegree.set(y, (inDegree.get(y) || 0) + 1);
      }
    });

    return { graph, inDegree };
  };

  const topologicalSort = (update: number[], rules: Rule[]): number[] => {
    const { graph, inDegree } = buildGraph(update, rules);
    const queue = Array.from(inDegree.entries())
      .filter(([_, degree]) => degree === 0)
      .map(([node]) => node);
    const sorted: number[] = [];

    while (queue.length) {
      const node = queue.shift()!;
      sorted.push(node);
      for (const neighbor of graph.get(node) || []) {
        inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
        if (inDegree.get(neighbor) === 0) queue.push(neighbor);
      }
    }

    return sorted.length === update.length ? sorted : [];
  };

  const calculateMiddleSum = (updates: number[][], rules: Rule[]): number =>
    updates
      .map((update) => {
        const sorted = topologicalSort(update, rules);
        return sorted[Math.floor(sorted.length / 2)];
      })
      .reduce((sum, num) => sum + num, 0);

  const { rules, updates } = parseInput(input);

  const validUpdates = updates.filter((update) => {
    const sorted = topologicalSort(update, rules);
    return JSON.stringify(sorted) === JSON.stringify(update);
  });

  const invalidUpdates = updates.filter(
    (update) => !validUpdates.includes(update)
  );

  return {
    solutions: {
      part1: calculateMiddleSum(validUpdates, rules),
      part2: calculateMiddleSum(invalidUpdates, rules),
    },
  };
};

const solutions = await solve();
console.log(JSON.stringify(solutions));
