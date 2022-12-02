const { readFileSync } = require("fs");

const INPUT = readFileSync("input.txt", "utf-8");

const solve = (input) => {
  let results = input.split("\n");
  results = results.map((result, index) => {
    let game = result.split(" ");

    if (game[0] === "A" && game[1] === "X") {
      return ["Draw", 4, 4];
    }
    if (game[0] === "A" && game[1] === "Y") {
      return ["I won", 1, 8];
    }
    if (game[0] === "A" && game[1] === "Z") {
      return ["Elf won", 7, 3];
    }

    if (game[0] === "B" && game[1] === "Y") {
      return ["Draw", 5, 5];
    }
    if (game[0] === "B" && game[1] === "Z") {
      return ["I won", 2, 9];
    }
    if (game[0] === "B" && game[1] === "X") {
      return ["Elf won", 8, 1];
    }

    if (game[0] === "C" && game[1] === "Z") {
      return ["Drawn", 6, 6];
    }
    if (game[0] === "C" && game[1] === "X") {
      return ["I won", 3, 7];
    }
    if (game[0] === "C" && game[1] === "Y") {
      return ["Elf won", 9, 2];
    }
  });
  return results;
};

const solve2 = (input) => {
  let results = input.split("\n");
  results = results.map((result, index) => {
    let game = result.split(" ");

    if (game[0] === "A" && game[1] === "X") {
      return ["Lose", 7, 3];
    }
    if (game[0] === "A" && game[1] === "Y") {
      return ["Draw", 4, 4];
    }
    if (game[0] === "A" && game[1] === "Z") {
      return ["Win", 1, 8];
    }

    if (game[0] === "B" && game[1] === "X") {
      return ["Lose", 8, 1];
    }
    if (game[0] === "B" && game[1] === "Y") {
      return ["Draw", 5, 5];
    }
    if (game[0] === "B" && game[1] === "Z") {
      return ["Win", 2, 9];
    }

    if (game[0] === "C" && game[1] === "X") {
      return ["Lose", 9, 2];
    }
    if (game[0] === "C" && game[1] === "Y") {
      return ["Draw", 6, 6];
    }
    if (game[0] === "C" && game[1] === "Z") {
      return ["Win", 3, 7];
    }
  });
  return results;
};

const game = solve(INPUT);
const game2 = solve2(INPUT);

let score = game.map((result) => result[2]);
let score2 = game2.map((result) => result[2]);

console.log(score.reduce((a, b) => a + b));
console.log(score2.reduce((a, b) => a + b));
