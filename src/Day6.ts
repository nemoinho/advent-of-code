import { Day } from './Day';
import { sum } from './utilities';

const solve = (input: string, sequenceLength: number) =>
  input.split('').findIndex((_, i) =>
    [...new Set(input.slice(i - sequenceLength, i))].length === sequenceLength);

export const Day6: Day<number> = {
  part1: (input) => solve(input, 4),
  part2: (input) => solve(input, 14),
}
