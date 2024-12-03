interface Solutions {
    part1: number;
    part2: number;
  }
  
  export const solve = async (): Promise<{ solutions: Solutions }> => {
    const input = await fetch(`https://adventofcode.com/2024/day/2/input`, {
      headers: { cookie: `session=${process.env.SESSION_TOKEN}` },
    })
      .then((res) => res.text())
      .catch(() => "");
  
    const parse = (input: string): number[][] =>
      input
        .trim()
        .split("\n")
        .map((line) => line.split(" ").map(Number));
  
    const isSafe = (arr: number[]): boolean =>
      arr.every((_, i) => i === 0 || Math.abs(arr[i] - arr[i - 1]) <= 3) &&
      (arr.every((_, i) => i === 0 || arr[i] > arr[i - 1]) ||
        arr.every((_, i) => i === 0 || arr[i] < arr[i - 1]));
  
    const part1 = (reports: number[][]): number => reports.filter(isSafe).length;
  
    const part2 = (reports: number[][]): number =>
      reports.reduce(
        (count, report) =>
          count +
          (isSafe(report) ||
          report.some((_, i) =>
            isSafe([...report.slice(0, i), ...report.slice(i + 1)])
          )
            ? 1
            : 0),
        0
      );
  
    const reports = parse(input);
  
    return {
      solutions: {
        part1: part1(reports),
        part2: part2(reports),
      },
    };
  };
  
  const solutions = await solve();
  console.log(JSON.stringify(solutions));
  