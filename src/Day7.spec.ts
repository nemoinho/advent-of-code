import { Day7 } from './Day7';
import { assertThat } from './utilities.spec';

const testInput =
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`

assertThat(Day7.part1(testInput)).isEqualTo(95437);
assertThat(Day7.part2(testInput)).isEqualTo(24933642);
