import { Day } from './Day';
import { sum } from './utilities';

const solve = (rucksacks: string, prioritize: (rucksacks: string[]) => string[]) =>
  prioritize(rucksacks.split('\n').filter(rucksack => rucksack.length > 0))
    .map(item => item.charCodeAt(0) - 96)
    .map(item => item <= 0 ? item + 58 : item)
  .reduce(sum);

export const Day3: Day<number> = {
  part1: (input) => solve(input, (rucksacks) =>
    rucksacks
      .map(rucksack => [
        rucksack.substr(0, rucksack.length / 2).split(''),
        rucksack.substr(rucksack.length / 2).split('')
      ])
      .map(([compartment1, compartment2]) =>
        compartment1.find(item => compartment2.includes(item))!),
    ),
  part2: (input) => solve(input, (rucksacks) =>
    Array.from({length: rucksacks.length / 3})
      .map((_, i) => i * 3)
      .map(i => rucksacks[i].split('')
        .find(item => rucksacks[i+1].includes(item) && rucksacks[i+2].includes(item))!)
  ),
}
