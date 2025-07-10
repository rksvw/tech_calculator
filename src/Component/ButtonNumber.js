import { useState } from "react";
import "./ButtonNumber.css";
import { numbersObj } from "../Service/ButtonService";

export default function ButtonNumber({
  pickValue,
  setPickValue, // to show on calculator screen
  setCalculation, // to show full expression or log
  calculation, // current expression (string)
}) {
  const [makeNumber, setMakeNumber] = useState(""); // input builder
  const [error, setError] = useState(""); // for future error display

  const handleClick = (e) => {
    const value = e.target.value;
    const operators = ["+", "-", "*", "/"];
    const lastChar = makeNumber.slice(-1);

    // All Clear
    if (value === "AC") {
      setMakeNumber("");
      setCalculation("");
      setPickValue("0");
      return;
    }

    // Equals
    if (value === "=") {
      try {
        const result = eval(makeNumber);
        setPickValue(result.toString());
        setCalculation(makeNumber + "=" + result);
        setMakeNumber(result.toString());
      } catch (error) {
        setPickValue("NaN");
        setCalculation("Invalid Expression");
        setMakeNumber("");
      }
      return;
    }

    // Multiple operators logic (replace previous operator unless - for negative)
    if (operators.includes(value)) {
      if (operators.includes(lastChar)) {
        if (value === "-" && lastChar !== "-") {
          setMakeNumber(makeNumber + value);
          setCalculation(makeNumber + value);
          setPickValue(value);
          return;
        }

        // Replace last operator
        let newExp = makeNumber;
        while (
          operators.includes(newExp.slice(-1)) &&
          !(newExp.slice(-2) === "*-" || newExp.slice(-2) === "/-")
        ) {
          newExp = newExp.slice(0, -1);
        }

        const updated = newExp + value;
        setMakeNumber(updated);
        setPickValue(value);
        setCalculation(updated);
        return;
      }

      // Normal case: single operator pressed
      const updated = makeNumber + value;
      setMakeNumber(updated);
      setCalculation(updated);
      setPickValue(value);
      return;
    }

    // Decimal handling
    if (value === ".") {
      const parts = makeNumber.split(/[\+\-\*\/]/);
      const currentNum = parts[parts.length - 1];

      // Prevent two decimals in the same number
      if (currentNum.includes(".")) return;

      // If starting with ".", and "0."
      if (makeNumber === "" || operators.includes(lastChar)) {
        const updated = makeNumber + "0.";
        setMakeNumber(updated);
        setCalculation(updated);
        setPickValue("0.");
        return;
      }
    }

    // Append value
    let newExp = makeNumber;

    // Prevent multiple leading zeros like 000
    if (value === "0") {
      const parts = makeNumber.split(/[\+\-\*\/]/);
      const currentNum = parts[parts.length - 1];

      // If current number is only "0", block adding more zeros
      if (currentNum === "0") {
        return;
      }
    }

    // Prevent number like 012 -> convert to 12
    if (/[1-9]/.test(value)) {
      const parts = makeNumber.split(/[\+\-\*\/]/);
      const currentNum = parts[parts.length - 1];

      // If current number is only "0", block adding more zeros
      if (currentNum === "0") {
        // Remove that leading 0
        newExp = makeNumber.slice(0, -1);
      }
    }

    newExp += value;
    setMakeNumber(newExp);
    setCalculation(newExp);

    // Show only the last full number (not the expression) in pickvalue
    const parts = newExp.split(/[\+\-\*\/]/);
    const currentNum = parts[parts.length - 1];
    setPickValue(currentNum);
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(5, 70px)",
          gap: "1px",
          maxWidth: "320px",
          margin: "auto",
          paddingTop: "5px",
        }}
      >
        {numbersObj.map((item) => {
          let style = {
            width: "100%",
            height: "100%",
            border: "none",
            backgroundColor: "#4d4d4d",
            color: "white",
            fontSize: "1.4rem",
            fontFamily: "Share Tech Mono",
          };

          if (!Number(item.value)) {
            if (item.value === "AC" || item.value === "0") {
              if (item.value === "AC") {
                style.backgroundColor = "rgb(172, 57, 57)";
              }
              style.gridColumn = "span 2";
            } else if (item.value === "=") {
              style.gridRow = "span 2";
              style.backgroundColor = "rgb(0, 68, 102)";
            } else {
              if (item.value !== ".") {
                style.backgroundColor = "rgb(102, 102, 102)";
              }
            }
          }

          return (
            <button
              id={item.id}
              value={item.value}
              style={style}
              key={item.id}
              onClick={handleClick}
            >
              {item.value}
            </button>
          );
        })}
      </div>
    </>
  );
}
