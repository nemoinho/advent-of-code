import { open } from 'node:fs/promises';
import { Day } from './Day';

export const isString = (a: any): a is string => a + '' === a;

export function sum(a: number, b: number): number;
export function sum(a: string, b: string): number;
export function sum(a: number | string, b: number | string): number {
    return (isString(a) ? parseFloat(a) : a) + (isString(b) ? parseFloat(b) : b);
}

export const readInput = async(day: number): Promise<string> => {
  const fh = await open(`${__dirname}/inputs/${day}.txt`);
  const content = await fh.readFile({encoding: 'utf-8'});
  await fh.close();
  return content;
}

export const solve = (day: number, implementation: Day<unknown>) =>
  readInput(day).then(input => {
    console.log(`The solutions for day ${day} are:`);
    console.log(`  part 1: ${implementation.part1(input)}`);
    console.log(`  part 2: ${implementation.part2(input)}`);
    console.log('');
  });

export const prepare = (input: string): string[] => input.trim().split('\n');

export const unique = <T>(item: T, idx: number, self: T[]): boolean =>
  self.indexOf(item) === idx;

export const pairwise = <T>() => (item: T, idx: number, self: T[]): [T, T] => [self[idx - 1], item];

export const last = <T>(arr: Array<T> | ReadonlyArray<T>): T => arr[arr.length - 1];

export const logStream = <T>(data: T): T => {
  console.log(data);
  return data;
}