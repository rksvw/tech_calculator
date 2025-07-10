export const numbersObj = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "*" },
  { id: "seven", value: "7" },
  { id: "eight", value: "8" },
  { id: "nine", value: "9" },
  { id: "subtract", value: "-" },
  { id: "four", value: "4" },
  { id: "five", value: "5" },
  { id: "six", value: "6" },
  { id: "add", value: "+" },
  { id: "one", value: "1" },
  { id: "two", value: "2" },
  { id: "three", value: "3" },
  { id: "equals", value: "=" },
  { id: "zero", value: "0" },
  { id: "decimal", value: "." },
];

export default function evaluateExpressions(
  value,
  evalString,
  operators,
  lastChar
) {
  // AC (All Clear)
  if (value === "AC") {
    return ["0", "", ""];
  }

  // Equals
  if (value === "=") {
    try {
      const result = eval(evalString);
      return [result.toString(), result.toString(), evalString + "=" + result];
    } catch (err) {
      return ["NaN", "", "Invalid Expression"];
    }
  }

  // Multiple operators logic
  if (operators.includes(value)) {
    if (operators.includes(lastChar)) {
      if (value === "-" && lastChar === "-") {
        return [value, evalString + value, evalString + value];
      }

      // Replace last operator (e.g. + + -> +|| * * -> *)
      let newExp = evalString;
      while (
        operators.includes(newExp.slice(-1)) &&
        !(newExp.slice(-2) === "*-" || newExp.slice(-2) === "/-")
      ) {
        newExp = newExp.slice(0, -1);
      }

      const updated = newExp + value;
      return [value, updated, updated];
    }

    // Normal Case: Single operator pressed
    const updated = evalString + value;
    return [value, updated, updated];
  }

  // Decimal handling
  if (value === ".") {
    const parts = evalString.split(/[\+\-\*\/]/);
    const currentNum = parts[parts.length - 1];

    // Prevent two decimals in the same number
    if (currentNum.includes(".")) return -1;

    // If starting with "." and "0."
    if (evalString === "" || operators.includes(lastChar)) {
      const updated = evalString + "0.";
      return ["0.", updated, updated];
    }
  }

  // Append value
  let newExp = evalString;

  // Prevent mulitple leading zeros like 000
  if (value === "0") {
    const parts = evalString.split(/[\+\-\*\/]/);
    const currentNum = parts[parts.length - 1];

    // If current number is only "0", block adding more zeros
    if (currentNum === "0") {
      return -1;
    }
  }

  // Prevent number like 012 -> convert to 12
  if (/[1-9]/.test(value)) {
    const parts = evalString.split(/[\+\-\*\/]/);
    const currentNum = parts[parts.length - 1];

    // If current number is only "0", block adding more zeros
    if (currentNum === "0") {
      // Remove that leading 0
      newExp = evalString.slice(0, -1);
    }
  }

  newExp += value;

  // Show only the last full number (not the expression) in pickValue
  const parts = newExp.split(/[\+\-\*\/]/);
  const currentNum = parts[parts.length - 1];

  return [currentNum, newExp, newExp];
}
