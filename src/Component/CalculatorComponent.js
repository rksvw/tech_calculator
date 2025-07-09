import { useState } from "react";
import CalculatorPad from "./CalculatorPad";
import CalculatorScreen from "./CalculatorScreen";

export default function CalculatorComponent() {
  const [pickValue, setPickValue] = useState(0);
  const [calculation, setCalculation] = useState("0");





  return (
    <>
      <div
        className="wrapper"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#c2c2d6",
        }}
      >
        <div
          className="card"
          style={{
            width: "320px",
            border: "2px solid #47476b",
            backgroundColor: "black",
            position: "relative",
            padding: "5px",
          }}
        >
          <CalculatorScreen pickValue={pickValue} calculation={calculation} />
          <CalculatorPad setPickValue={setPickValue} setCalculation={setCalculation} calculation={calculation} />
        </div>
      </div>
    </>
  );
}
