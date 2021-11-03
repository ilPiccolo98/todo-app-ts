import React, { HTMLAttributes } from "react";
import "./Message.css";

export interface MessageProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
  variant: "blue" | "green";
  size: "small" | "medium" | "large";
}

const Message: React.FC<MessageProps> = ({ ...props }): JSX.Element => {
  return (
    <span
      {...props}
      className={`${props.className} message-variant-${props.variant} message-size-${props.size}`}
    >
      {props.children}
    </span>
  );
};

export default Message;
