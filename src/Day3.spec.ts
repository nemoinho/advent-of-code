import { Day3 } from './Day3';
import { assertThat } from './utilities.spec';

const testInput =
  'vJrwpWtwJgWrhcsFMMfFFhFp\n' +
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n' +
  'PmmdzqPrVvPwwTWBwg\n' +
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n' +
  'ttgJtRGJQctTZtZT\n' +
  'CrZsJsPPZsGzwwsLwLmpwMDw\n';

assertThat(Day3.part1(testInput)).isEqualTo(157);
assertThat(Day3.part2(testInput)).isEqualTo(70);
