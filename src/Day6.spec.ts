import { Day6 } from './Day6';
import { assertThat } from './utilities.spec';

const testInput = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';

assertThat(Day6.part1(testInput)).isEqualTo(7);
assertThat(Day6.part2(testInput)).isEqualTo(19);
