import { Day1 } from './Day1';
import { assertThat } from './utilities.spec';

const testInput = 
  '1000\n' +
  '2000\n' +
  '3000\n' +
  '\n' +
  '4000\n' +
  '\n' +
  '5000\n' +
  '6000\n' +
  '\n' +
  '7000\n' +
  '8000\n' +
  '9000\n' +
  '\n' +
  '10000';

assertThat(Day1.part1(testInput)).isEqualTo(24_000);
assertThat(Day1.part2(testInput)).isEqualTo(45_000);
