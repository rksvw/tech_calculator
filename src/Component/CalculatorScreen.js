import InputScreen from "./InputScreen";

export default function CalculatorScreen({ pickValue, calculation }) {
  return (
    <div className="calc_screen">
      <InputScreen screen={"formulaScreen"} calculation={calculation} />
      <InputScreen screen={"outputScreen"} calculation={pickValue} />
    </div>
  );
}
