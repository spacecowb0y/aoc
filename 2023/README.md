# Advent of Code 2023

## Requirements

- bun
- aoc-cli
- jq


## Example

```
aoc submit -d 1 1 "$(bun day1/index.ts | jq -r .solutions.part1)"
aoc submit -d 1 2 "$(bun day1/index.ts | jq -r .solutions.part2)"
```