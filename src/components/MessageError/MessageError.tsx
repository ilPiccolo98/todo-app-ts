import React, { HTMLAttributes } from "react";
import "./MessageError.css";

export interface MessageErrorProps extends HTMLAttributes<HTMLSpanElement> {
  children?: string;
  size: "small" | "medium" | "large";
}

export const MessageError: React.FC<MessageErrorProps> = ({
  size,
  children,
  ...props
}): JSX.Element => {
  return (
    <span {...props} className={`message-error ${props.className} ${size}`}>
      <b>{children}</b>
    </span>
  );
};

export default MessageError;
