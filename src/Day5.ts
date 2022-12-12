import { Day } from './Day';
import { sum } from './utilities';

type Move = [number, number, number];
type Rearrange = (move: Move, idx: number, arr: number[][]) => void;
type Stacks = string[][];

const part1Rearrange = (stacks: Stacks): Rearrange =>
  ([i, from, to]) => {
    for (; i--; ) {
      stacks[to - 1].push(stacks[from - 1].pop()!);
    }
  };
const part2Rearrange = (stacks: Stacks): Rearrange =>
  ([i, from, to]) => {
    stacks[to - 1] = stacks[to - 1].concat(stacks[from - 1].splice(0 - i))
  };

const solve =
  (plan: string, rearrange: (stacks: Stacks) => Rearrange) => {
    const [crates, movements] = plan.split('\n\n');
    const crateLines = crates
      .split('\n')
      .slice(0, -1)
      .map(line => line.split('').filter((_, i) => ((i - 1) % 4) === 0))
      .reverse();
    const stacks: Stacks = Array.from({length: crateLines[0].length})
      .map((_, i) => crateLines.map(l => l[i]).filter(crate => crate !== ' '));
    movements.split('\n')
      .filter(l => l.length > 0)
      .map(l => Array.from(l.match(/\d+/g)!).map(n => parseInt(n)) as Move)
      .forEach(rearrange(stacks))
    return stacks.map(stack => stack.pop()).join('');
  } ;

export const Day5: Day<string> = {
  part1: (input) => solve(input, part1Rearrange),
  part2: (input) => solve(input, part2Rearrange),
}
