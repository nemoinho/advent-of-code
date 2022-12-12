import { Day } from './Day';
import { sum } from './utilities';

const solve = (input: string, elfsToCount: number): number =>
  input.split('\n\n')
    .map((elf) => elf.split('\n')
      .filter(line => line.length > 0)
      .reduce((a, b) => a + parseInt(b), 0))
    .sort((a, b) => a < b ? 1 : -1)
    .slice(0, elfsToCount)
    .reduce(sum);

export const Day1: Day<number> = {
  part1: (input) => solve(input, 1),
  part2: (input) => solve(input, 3),
}
