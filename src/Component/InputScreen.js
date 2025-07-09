import React from "react";
import "./InputScreen.css";

export default function InputScreen({ screen, calculation }) {
  return (
    <div
      className={screen}
      style={{
        fontFamily: "digital",
        fontWeight: "600",
        justifyContent: "right",
        alignItems: "center",
        display: "flex",
        marginTop: "10px",
      }}
    >
      {calculation}
    </div>
  );
}
