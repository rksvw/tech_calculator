import { useState } from "react";
import "./ButtonNumber.css";

export default function ButtonNumber({
  setPickValue,
  setCalculation,
  calculation,
}) {
  const [flag, setFlag] = useState(0);
  const [makeNumber, setMakeNumber] = useState("");

  const numbersObj = [
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


  const handleChange = () => {


  }

  const handleClick = (e) => {
    const value = e.target.value;
    setPickValue(value);
    setMakeNumber(makeNumber + value);
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

        onChange={handleChange}
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
