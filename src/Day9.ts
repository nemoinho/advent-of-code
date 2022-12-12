import { Day } from './Day';
import {prepare, unique, pairwise, last as latestPosition} from './utilities';

const Directions = {
  R: [1, 0],
  L: [-1, 0],
  D: [0, 1],
  U: [0, -1]
} as const;

type DirectionStr = keyof typeof Directions;
type Direction = typeof Directions[DirectionStr];

type Position = {x: number, y: number};
type Segment = Array<Position>;

const parseSteps = (input: string): Direction[] =>
  prepare(input)
    .map(row => row.split(' ') as [DirectionStr, number])
    .flatMap(([direction, steps]) =>
      Array.from({length: steps}).map(() => Directions[direction]));

const addStep = (position: Position, [sx, sy]: [number, number] | readonly [number, number]) => ({x: position.x + sx, y: position.y + sy});

const calculateNextStep = (tail: Segment, head: Segment, step: Direction) => {
  if (!head) {
    tail.push(addStep(latestPosition(tail), step));
  } else {
    const distanceX = latestPosition(tail).x - latestPosition(head).x;
    const distanceY = latestPosition(tail).y - latestPosition(head).y;
    if (Math.abs(distanceX) > 1 || Math.abs(distanceY) > 1) { // is far away
      if (distanceX !== 0 && distanceY !== 0) { // is diagonally
        if (Math.abs(distanceX) > 1 && Math.abs(distanceY) > 1) {
          tail.push(addStep(latestPosition(tail), [distanceX / -2, distanceY / -2]))
        } else if (Math.abs(distanceX) > 1) {
          tail.push(addStep(latestPosition(tail), [distanceX / -2, distanceY * -1]))
        } else if (Math.abs(distanceY) > 1) {
          tail.push(addStep(latestPosition(tail), [distanceX * -1, distanceY / -2]))
        }
      } else if (Math.abs(distanceX) > 1) {
        tail.push(addStep(latestPosition(tail), [distanceX / -2, 0]))
      } else if (Math.abs(distanceY) > 1) {
        tail.push(addStep(latestPosition(tail), [0, distanceY / -2]))
      }
    }
  }
  return tail;
}

const follow2 = (steps: Direction[], segmentCount: number): number => {
  const segments = Array.from({length: segmentCount}).map(() => [{x: 0, y: 0}]);
  return steps.flatMap(step =>
    segments.map(pairwise<Segment>()).map(([head, tail]) => calculateNextStep(tail, head, step))
  )
    .pop()!
    .map(position => JSON.stringify(position))
    .filter(unique)
    .length;
}

export const Day9: Day<number> = {
  part1: input => follow2(parseSteps(input), 2),
  part2: input => follow2(parseSteps(input), 10),
}
