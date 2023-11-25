
type WinningCombinationsResult = [number, number[]][];

//function that shows the Winning Combinations Result
function call(lines: number[]): WinningCombinationsResult {
  const payingSymbols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const wildSymbol = 0;

  //function that says if the symbol/number its included on the 'payingSymbol' array returning a boolean
  const isPayingSymbol = (symbol: number): boolean => payingSymbols.includes(symbol);

  //function that acept that 'line' its an array of numbers returning an array of numbers or null
  const findPayLine = (line: number[]): number[] | null => {
    //variable that can be either an array of numbers or null
    let payLine: number[] | null = null;

    //loop that pass by 'line' array starting with 'i' at zero position til it found 3 consecutive elements inside 'line' array
    //if  it finds it defines the 'payLine' variable with the index of the sequence and stops the loop
    for (let i = 0; i <= line.length - 3; i++) {
      //constant that hold the current value of the index 'i' on the 'line' array
      const currentSymbol = line[i];

      //verify if 'currentSymbol' constant it's equal to 'wildsymbol' or if the 'isPayingSymbol' function is it's true
      //If it's true it'll start the next codes
      if (currentSymbol === wildSymbol || isPayingSymbol(currentSymbol)) {
        //constant that verify if the line elements are equal to 'wildSymbol' or if it's a paying symbol
        const isPayLine = line.slice(i, i + 3).every(symbol => symbol === wildSymbol || isPayingSymbol(symbol));

        //if the result is true it'll create a 'payLine' array to hold the result ans stops the loop
        if (isPayLine) {
          payLine = Array.from({ length: 3 }, (_, index) => i + index);
          break;
        }
      }
    }
    //return what's on the 'payLine' array
    return payLine;
  };
  //constant to hold the result of the combinations
  const result: WinningCombinationsResult = [];

  //function that iterates for the 'lines' array to find the pay line
  //if it finds it holds the informantion on the 'result' array
  lines.forEach((line, lineNumber) => {
    const payLine = findPayLine(line);

    //verify if 'payLine' it's different from null. If it's true than it ad a new array to 'result' variable
    if (payLine) {
      result.push([lineNumber + 1, payLine]);
    }
  });

  return result;
}
export const WinningCombinations = { call };
