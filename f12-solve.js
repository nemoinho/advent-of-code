!function () { // Keep global scope clean by using a self-executing function
  const sum = (a, b) => a-0 + b-0;

  class Day {
    constructor(date, testInput, expectedTestResultOfPart1, expectedTestResultOfPart2, solution, part1Data, part2Data) {
      this.date = date;
      this.testInput = testInput;
      this.expectedTestResultOfPart1 = expectedTestResultOfPart1;
      this.expectedTestResultOfPart2 = expectedTestResultOfPart2;
      this.solution = solution;
      this.part1Data = part1Data;
      this.part2Data = part2Data;
    }
    expectedTestResult(part2) {
      return part2 ? this.expectedTestResultOfPart2 : this.expectedTestResultOfPart1;
    }
    data(part2) {
      return part2 ? this.part2Data : this.part1Data;
    }
  }

  const days = [
    new Day(
      1,
      '1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000',
      24000,
      45000,
      (input, elfsToCount) =>
        input.split('\n\n')
          .map((elf) => elf.split('\n').reduce((a, b) => a + b - 0, 0))
          .sort((a, b) => a < b ? 1 : -1)
          .slice(0, elfsToCount)
          .reduce(sum),
      1,
      3
    ),
    new Day(
      2,
      'A Y\nB X\nC Z',
      15,
      12,
      (input, values) => input.split('\n')
        .map(line => values[line] ?? 0)
        .reduce(sum),
      {
        'A X': 4, // Rock vs. Rock (1) => Draw (3)
        'A Y': 8, // Rock vs. Paper (2) => Win (6)
        'A Z': 3, // Rock vs. Scissors (3) => Loose (0)
        'B X': 1, // Paper vs. Rock (1) => Loose (0)
        'B Y': 5, // Paper vs. Paper (2) => Draw (3)
        'B Z': 9, // Paper vs. Scissors (3) => Win (6)
        'C X': 7, // Scissors vs. Rock (1) => Win (6)
        'C Y': 2, // Scissors vs. Paper (2) => Loose (0)
        'C Z': 6, // Scissors vs. Scissors (3) => Draw (3)
      },
      {
        'A X': 3, // Rock, goal Loose (0) => Scissors (3)
        'A Y': 4, // Rock, goal Draw (1) => Rock (1)
        'A Z': 8, // Rock, goal Win (6) => Paper (2)
        'B X': 1, // Paper, goal Loose (0) => Rock (1)
        'B Y': 5, // Paper, goal Draw (1) => Paper (2)
        'B Z': 9, // Paper, goal Win (6) => Scissors (3)
        'C X': 2, // Scissors, goal Loose (0) => Paper (2)
        'C Y': 6, // Scissors, goal Draw (1) => Scissors (3)
        'C Z': 7, // Scissors, goal Win (6) => Rock (1)
      }
    ),
    new Day(
      3,
      'vJrwpWtwJgWrhcsFMMfFFhFp\n' +
      'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n' +
      'PmmdzqPrVvPwwTWBwg\n' +
      'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n' +
      'ttgJtRGJQctTZtZT\n' +
      'CrZsJsPPZsGzwwsLwLmpwMDw\n',
      157,
      70,
      (rucksacks, prioritize) =>
        prioritize(rucksacks.split('\n').filter(rucksack => rucksack.length > 0))
          .map(item => item.charCodeAt(0) - 96)
          .map(item => item <= 0 ? item + 58 : item)
          .reduce(sum),
      (rucksacks) =>
        rucksacks
          .map(rucksack => [
            rucksack.substr(0, rucksack.length / 2).split(''),
            rucksack.substr(rucksack.length / 2).split('')
          ])
          .map(([compartment1, compartment2]) => compartment1.find(item => compartment2.includes(item))),
      (rucksacks) => {
        return Array.from({length: rucksacks.length / 3})
          .map((_, i) => i * 3)
          .map(i => rucksacks[i].split('')
            .find(item => rucksacks[i+1].includes(item) && rucksacks[i+2].includes(item)))
      }
    ),
    new Day(
      4,
      '2-4,6-8\n' +
      '2-3,4-5\n' +
      '5-7,7-9\n' +
      '2-8,3-7\n' +
      '6-6,4-6\n' +
      '2-6,4-8',
      2,
      4,
      (assignmentPairs, testForOverlapping) =>
        assignmentPairs.split('\n')
          .filter(pair => pair.length > 0)
          .map(pair => pair.split(','))
          .map(([first, second]) => [...first.split('-'), ...second.split('-')].map(n => n - 0))
          .filter(testForOverlapping)
          .map(() => 1)
          .reduce(sum),
      ([f1, f2, s1, s2]) => (f1 <= s1 && f2 >= s2) || (f1 >= s1 && f2 <= s2),
      ([f1, f2, s1, s2]) => (f1 >= s1 || f2 >= s1) && (s1 >= f1 || s2 >= f1)
    ),
    new Day(
      5,
      '    [D]    \n' +
      '[N] [C]    \n' +
      '[Z] [M] [P]\n' +
      ' 1   2   3 \n' +
      '\n' +
      'move 1 from 2 to 1\n' +
      'move 3 from 1 to 3\n' +
      'move 2 from 2 to 1\n' +
      'move 1 from 1 to 2',
      'CMZ',
      'MCD',
      (plan, rearrange) => {
        const [crates, movements] = plan.split('\n\n');
        const crateLines = crates
          .split('\n')
          .slice(0, -1)
          .map(line => line.split('').filter((_, i) => ((i - 1) % 4) === 0))
          .reverse();
        const stacks = Array.from({length: crateLines[0].length})
          .map((_, i) => crateLines.map(l => l[i]).filter(crate => crate !== ' '));
        movements.split('\n')
          .filter(l => l.length > 0)
          .map(l => Array.from(l.match(/\d+/g)))
          .forEach(rearrange(stacks))
        return stacks.map(stack => stack.pop()).join('');
      },
      (stacks) =>
        ([i, from, to]) => {
          for (; i--; ) {
            stacks[to - 1].push(stacks[from - 1].pop());
          }
        },
      (stacks) =>
        ([i, from, to]) => {
          stacks[to - 1] = stacks[to - 1].concat(stacks[from - 1].splice(0 - i))
        },
    ),
  ];

  const answer = (answer) => {
    document.forms[0]['answer'].value = answer;
    document.forms[0].submit();
  }

  const resolveDate = () => Promise.resolve(location.pathname.replace(/.*\//, ''))

    resolveDate()
      .then(date => days.find((day) => day.date === date - 0))
      .then(day => {
        // noinspection JSUnresolvedVariable
        const isPart2 = !!window.part2;
        const data = day.data(isPart2);
        const testResult = day.solution(day.testInput, data);
        const expectedTestResult = day.expectedTestResult(isPart2);
        if (testResult === expectedTestResult) {
          fetch(`https://adventofcode.com/2022/day/${day.date}/input`)
            .then(res => res.text())
            .then(input => day.solution(input, data))
            .then(answer)
        } else {
          console.warn(`Solution is wrong, expected "${expectedTestResult}" but got "${testResult}"`)
        }
      })
}()
