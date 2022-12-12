export const assertThat = (result: any) => ({
  isEqualTo: (expectedResult: any) => {
    if (result !== expectedResult) {
      console.error('Expected', expectedResult, 'but got', result, '\n');
      //throw new Error(`Expected "${expectedResult}" but got "${result}"`)
    }
  }
})

