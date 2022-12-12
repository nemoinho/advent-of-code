import { Day } from './Day';
import { prepare, sum } from './utilities';

type TreeView = (trees: number[]) => number;
type ViewAmount = (...views: number[]) => number;

const scanTreeGrid = (
  input: string,
  calculateView: (pivot: number) => TreeView,
  summarize: ViewAmount
): number[] =>
  prepare(input)
    .map(row => row.split('').map(n => parseInt(n)))
    .flatMap((row, y, grid) =>
      row.map((pivot, x) => {
        const view = calculateView(pivot);
        return summarize(
          view(row.slice(x + 1)),
          view(row.slice(0, x).reverse()),
          view(grid.slice(y + 1).map(r => r[x])),
          view(grid.slice(0, y).map(r => r[x]).reverse())
        );
      })
    );

export const Day8: Day<number> = {
  part1: (input) =>
    scanTreeGrid(
      input,
      pivot => (trees => trees.every(tree => tree < pivot) ? 1 : 0),
      (...views: number[]) => views.some(view => view > 0) ? 1 : 0
    ).reduce(sum),

  part2: (input) =>
    scanTreeGrid(
      input,
      pivot => (trees => trees.findIndex(tree => tree >= pivot) + 1 || trees.length),
      (...views: number[]) => views.reduce((a, b) => a * b, 1)
    ).reduce((a, b) => Math.max(a, b), 0),
}
