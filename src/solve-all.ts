import { solve } from './utilities';
import { Day1 } from './Day1';
import { Day2 } from './Day2';
import { Day3 } from './Day3';
import { Day4 } from './Day4';
import { Day5 } from './Day5';
import { Day6 } from './Day6';
import { Day7 } from './Day7';
import { Day8 } from './Day8';
import { Day9 } from './Day9';

export const solveAll = async(): Promise<void> => {
  let day = 1;
  await solve(day++, Day1);
  await solve(day++, Day2);
  await solve(day++, Day3);
  await solve(day++, Day4);
  await solve(day++, Day5);
  await solve(day++, Day6);
  await solve(day++, Day7);
  await solve(day++, Day8);
  await solve(day++, Day9);
};
