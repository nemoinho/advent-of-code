import { Day } from './Day';
import { sum } from './utilities';

const part1Filter = ([f1, f2, s1, s2]: number[]) =>
  (f1 <= s1 && f2 >= s2) || (f1 >= s1 && f2 <= s2);
const part2Filter = ([f1, f2, s1, s2]: number[]) =>
  (f1 >= s1 || f2 >= s1) && (s1 >= f1 || s2 >= f1);

const solve = (assignmentPairs: string, testForOverlapping: (pairs: number[]) => boolean): number =>
  assignmentPairs.split('\n')
    .filter(pair => pair.length > 0)
    .map(pair => pair.split(','))
    .map(([first, second]) => [...first.split('-'), ...second.split('-')].map(n => parseInt(n)))
    .filter(testForOverlapping)
    .map(() => 1)
    .reduce(sum);

export const Day4: Day<number> = {
  part1: (input) => solve(input, part1Filter),
  part2: (input) => solve(input, part2Filter),
}
