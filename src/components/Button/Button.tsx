import React, { HTMLAttributes, ReactNode } from "react";
import "./Button.css";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**It provides a style to the Button component */
  variant: "primary" | "secondary" | "tertiary";
  /**It provides the text to display */
  children: ReactNode;
}

/**Button component for the todo-app-ts */
export const Button: React.FC<ButtonProps> = ({
  children,
  ...props
}): JSX.Element => {
  return (
    <button
      {...props}
      className={`button ${props.variant}-button ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
