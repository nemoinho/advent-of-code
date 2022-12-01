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
    )
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
