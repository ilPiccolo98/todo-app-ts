import React, { HTMLAttributes } from "react";
import "./Form.css";

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  /**JSX element child to show inside the Form */
  children?: JSX.Element | JSX.Element[];
  /**Header of the Form */
  title?: string;
  /**Which style it should use */
  variant: "primary" | "secondary";
}

/**Generic Form of the todo-app  */
export const Form: React.FC<FormProps> = ({
  children,
  title,
  variant,
  ...props
}): JSX.Element => {
  return (
    <div className={`form ${variant}-form ${props.className}`}>
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
