import React, { HTMLAttributes } from "react";
import "./CheckBox.css";

export interface CheckBoxProps extends HTMLAttributes<HTMLInputElement> {
  /**Label of the checkbox */
  label?: string;
  /**which style it should have */
  variant: "primary" | "secondary";
  /**Name of the CheckBox */
  name?: string;
  /**Value that the checkbox should have */
  value?: any;
  /**If the Checkbox is checked or not*/
  checked?: boolean;
  /**Id for testing */
  datatestid?: string;
}

/**Checkbox of the todo-app */
export const CheckBox: React.FC<CheckBoxProps> = ({ ...props }) => {
  return (
    <span
      className={`${props.variant}-checkbox`}
      data-testid={props.datatestid}
    >
      <label htmlFor={props.id}>
        <input
          {...props}
          type="checkbox"
          name={props.name}
          checked={props.checked}
        />
        {props.label}
      </label>
    </span>
  );
};

export default CheckBox;
