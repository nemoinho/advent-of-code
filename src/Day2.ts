import { Day } from './Day';
import { sum } from './utilities';

const part1SolutionMatrix = {
  'A X': 4, // Rock vs. Rock (1) => Draw (3)
  'A Y': 8, // Rock vs. Paper (2) => Win (6)
  'A Z': 3, // Rock vs. Scissors (3) => Loose (0)
  'B X': 1, // Paper vs. Rock (1) => Loose (0)
  'B Y': 5, // Paper vs. Paper (2) => Draw (3)
  'B Z': 9, // Paper vs. Scissors (3) => Win (6)
  'C X': 7, // Scissors vs. Rock (1) => Win (6)
  'C Y': 2, // Scissors vs. Paper (2) => Loose (0)
  'C Z': 6, // Scissors vs. Scissors (3) => Draw (3)
};

const part2SolutionMatrix = {
  'A X': 3, // Rock, goal Loose (0) => Scissors (3)
  'A Y': 4, // Rock, goal Draw (1) => Rock (1)
  'A Z': 8, // Rock, goal Win (6) => Paper (2)
  'B X': 1, // Paper, goal Loose (0) => Rock (1)
  'B Y': 5, // Paper, goal Draw (1) => Paper (2)
  'B Z': 9, // Paper, goal Win (6) => Scissors (3)
  'C X': 2, // Scissors, goal Loose (0) => Paper (2)
  'C Y': 6, // Scissors, goal Draw (1) => Scissors (3)
  'C Z': 7, // Scissors, goal Win (6) => Rock (1)
}

const solve = (input: string, values: Record<string, number>) =>
  input.split('\n').map(line => values[line] ?? 0).reduce(sum);

export const Day2: Day<number> = {
  part1: (input) => solve(input, part1SolutionMatrix),
  part2: (input) => solve(input, part2SolutionMatrix),
}
