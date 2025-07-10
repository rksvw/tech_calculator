import React from "react";
import ButtonNumber from "./ButtonNumber";

export default function CalculatorPad({pickValue, setPickValue, setCalculation, calculation }) {
  return (
    <div>
      <ButtonNumber
        setPickValue={setPickValue}
        setCalculation={setCalculation}
        calculation={calculation}
        pickValue={pickValue}
      />
    </div>
  );
}
