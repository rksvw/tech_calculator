import React from "react";
import ButtonNumber from "./ButtonNumber";

export default function CalculatorPad({ setPickValue, setCalculation, calculation }) {
  return (
    <div>
      <ButtonNumber
        setPickValue={setPickValue}
        setCalculation={setCalculation}
        calculation={calculation}
      />
    </div>
  );
}
