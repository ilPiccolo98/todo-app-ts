import React, { HTMLAttributes } from "react";
import { Field } from "formik";
import "./CheckBox.css";

export interface CheckBoxProps extends HTMLAttributes<HTMLInputElement> {
  /**Label of the checkbox */
  label?: string;
  /**which style it should have */
  variant: "primary" | "secondary";
  /**Name of the CheckBox */
  name?: string;
}

/**Checkbox of the todo-app */
export const CheckBox: React.FC<CheckBoxProps> = ({ ...props }) => {
  return (
    <span className={`${props.variant}-checkbox`}>
      <label htmlFor={props.id}>
        <Field {...props} type="checkbox" name={props.name} />
        {props.label}
      </label>
    </span>
  );
};

export default CheckBox;
