import React, { HTMLAttributes } from "react";
import "./Form.css";

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  /**JSX element child to show inside the Form */
  children?: JSX.Element | JSX.Element[];
  /**Header of the Form */
  title?: string;
  /**Which style it should use */
  variant: "primary" | "secondary";
  /**Id for testing */
  datatestid?: string;
}

/**Generic Form of the todo-app  */
export const Form: React.FC<FormProps> = ({
  children,
  title,
  variant,
  ...props
}): JSX.Element => {
  return (
    <div
      className={`form ${variant}-form ${props.className}`}
      data-testid={props.datatestid}
    >
      <p>
        <b>{title}</b>
      </p>
      <form {...props} className="">
        {children}
      </form>
    </div>
  );
};

export default Form;
