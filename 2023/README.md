# Advent of Code 2023

## Requirements

- [bun](https://github.com/oven-sh/bun)
- [aoc-cli](https://github.com/scarvalhojr/aoc-cli)
- [jq](https://github.com/jqlang/jq)

## Example

After setting your [session-cookie](https://github.com/scarvalhojr/aoc-cli#session-cookie-) run:

```
export SESSION_TOKEN=YOUR-TOKEN-HERE
aoc -d 1 submit 1 "$(bun day1/index.ts | jq -r .solutions.part1)"
aoc -d 1 submit 2 "$(bun day1/index.ts | jq -r .solutions.part2)"
```