import React from "react";
import ButtonNumber from "./ButtonNumber";

export default function CalculatorPad({ setPickValue, setCalculation }) {
  return (
    <div>
      <ButtonNumber
        setPickValue={setPickValue}
        setCalculation={setCalculation}
      />
    </div>
  );
}
