import { Day9 } from './Day9';
import { assertThat } from './utilities.spec';

const testInput = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

const largeTestInput = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`;

assertThat(Day9.part1(testInput)).isEqualTo(13);
assertThat(Day9.part2(testInput)).isEqualTo(1);
assertThat(Day9.part2(largeTestInput)).isEqualTo(36);
