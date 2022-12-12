import { Day8 } from './Day8';
import { assertThat } from './utilities.spec';

const testInput = `
30373
25512
65332
33549
35390
`;

assertThat(Day8.part1(testInput)).isEqualTo(21);
assertThat(Day8.part2(testInput)).isEqualTo(8);
