import { Day2 } from './Day2';
import { assertThat } from './utilities.spec';

const testInput = 'A Y\nB X\nC Z';

assertThat(Day2.part1(testInput)).isEqualTo(15);
assertThat(Day2.part2(testInput)).isEqualTo(12);
