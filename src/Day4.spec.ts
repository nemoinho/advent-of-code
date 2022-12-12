import { Day4 } from './Day4';
import { assertThat } from './utilities.spec';

const testInput = 
  '2-4,6-8\n' +
  '2-3,4-5\n' +
  '5-7,7-9\n' +
  '2-8,3-7\n' +
  '6-6,4-6\n' +
  '2-6,4-8';

assertThat(Day4.part1(testInput)).isEqualTo(2);
assertThat(Day4.part2(testInput)).isEqualTo(4);
