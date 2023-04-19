import { useState } from "react";
import React from "react";

export function TextInputConcatenator() {
  const [concatenatedText, setConcatenatedText] = useState("");

  const handleInputChange = (event, inputIndex) => {
    const { value } = event.target;
    setConcatenatedText((prevConcatenatedText) => {
      const textArray = prevConcatenatedText.split("");
      textArray[inputIndex] = value;
      return textArray.join("");
    });
  };

  const handleConcatenateClick = () => {
    const textInputs = Array.from(
      document.querySelectorAll('input[type="text"]')
    );
    const concatenatedValue = textInputs.map((input) => input.value).join("");
    setConcatenatedText(concatenatedValue);
  };

  return (
    <div>
      <input type="text" onChange={(e) => handleInputChange(e, 0)} />
      <input type="text" onChange={(e) => handleInputChange(e, 1)} />
      <input type="text" onChange={(e) => handleInputChange(e, 2)} />
      <input type="text" onChange={(e) => handleInputChange(e, 3)} />
      <input type="text" onChange={(e) => handleInputChange(e, 4)} />
      <input type="text" onChange={(e) => handleInputChange(e, 5)} />
      <button onClick={handleConcatenateClick}>Concatenate</button>
      <p>Concatenated text: {concatenatedText}</p>
    </div>
  );
}
