import React, { HTMLAttributes, KeyboardEvent, useState } from "react";
import "./TextField.css";

export interface TextFieldProps extends HTMLAttributes<HTMLInputElement> {
  /**Which style the TextField component should have */
  variant: "primary" | "secondary";
  /**Text of the label*/
  labelText?: string;
  /**It determins the functianality of the text field */
  type: "text" | "password" | "numbers";
  /**Name of the TextField */
  name?: string;
  /**Value that should be content in the Textfield */
  value?: any;
  /**Id for testing */
  datatestid?: string;
}

/**TextField of the todo-app application */
export const TextField: React.FC<TextFieldProps> = ({
  labelText,
  ...props
}): JSX.Element => {
  const [messageError, setMessageError] = useState<string>("");

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (props.type === "numbers" && !/[0-9]/.test(event.key)) {
      setMessageError("Text is not allowed");
      event.preventDefault();
    } else {
      setMessageError("");
    }
  };

  return (
    <div
      data-testid={props.datatestid}
      className={`${props.variant}-container`}
    >
      <label htmlFor={props.id}>
        <p className={`${props.variant}-label`}>
          <b>{labelText}</b>
        </p>
        <input
          {...props}
          onKeyPress={handleKeyPress}
          className={`textField ${props.className}`}
          name={props.name}
        />
      </label>
      <p className="error">
        <b>{messageError}</b>
      </p>
    </div>
  );
};

export default TextField;
