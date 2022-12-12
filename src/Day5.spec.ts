import { Day5 } from './Day5';
import { assertThat } from './utilities.spec';

const testInput = 
  '    [D]    \n' +
  '[N] [C]    \n' +
  '[Z] [M] [P]\n' +
  ' 1   2   3 \n' +
  '\n' +
  'move 1 from 2 to 1\n' +
  'move 3 from 1 to 3\n' +
  'move 2 from 2 to 1\n' +
  'move 1 from 1 to 2';

assertThat(Day5.part1(testInput)).isEqualTo('CMZ');
assertThat(Day5.part2(testInput)).isEqualTo('MCD');
