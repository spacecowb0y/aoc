import { readFileSync } from "fs";

const input: string[] = readFileSync("input", "utf-8").split("\n");

const part1: number = input
  .map((line: string) => line.split("").map(Number).filter(Boolean))
  .reduce(
    (sum: number, arr: number[]) => (sum += +`${arr[0]}${arr[arr.length - 1]}`),
    0
  );

const digits: number[] = input.map((line: string) =>
  ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    .reduce(
      (acc: string, word: string, index: number) =>
        acc.replaceAll(word, word + (index + 1) + word),
      line
    )
    .split("")
    .map(Number)
    .filter(Boolean)
    .map((_: number, i: number, arr: number[]) => +`${arr[0]}${arr[arr.length - 1]}`)
    .reduce((_: number, value: number) => value)
);

const part2: number = digits.reduce((sum: number, value: number) => sum + value, 0);

console.log({ part1, part2 });