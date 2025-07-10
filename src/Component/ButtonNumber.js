import { useState } from "react";
import "./ButtonNumber.css";
import evaluateExpressions, { numbersObj } from "../Service/ButtonService";

export default function ButtonNumber({
  setPickValue, // to show on calculator screen
  setCalculation, // to show full expression or log
}) {
  const [makeNumber, setMakeNumber] = useState(""); // input builder

  const handleClick = (e) => {
    const value = e.target.value;
    const operators = ["+", "-", "*", "/"];
    const lastChar = makeNumber.slice(-1);

    const payload = evaluateExpressions(value, makeNumber, operators, lastChar);

    if (payload !== -1) {
      setPickValue(payload[0]);
      setMakeNumber(payload[1]);
      setCalculation(payload[2]);
      return;
    } else {
      return;
    }
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
