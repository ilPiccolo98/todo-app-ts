import React, { HTMLAttributes } from "react";
import "./Submit.css";

export interface SubmitProps extends HTMLAttributes<HTMLInputElement> {
  /**Text of the submit input */
  children: string;
  /**Which style should it use */
  variant: "primary" | "secondary" | "tertiary";
}

/**Submit component for the todo-app */
export const Submit: React.FC<SubmitProps> = ({
  children,
  variant,
  ...props
}): JSX.Element => {
  return (
    <input
      {...props}
      className={`submit ${variant}-submit ${props.className}`}
      type={"submit"}
      value={children}
    />
  );
};

export default Submit;
