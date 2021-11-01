import React, { HTMLAttributes } from "react";

interface MessageProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
}

const Message: React.FC<MessageProps> = (props): JSX.Element => {
  return <span {...props}>{props.children}</span>;
};

export default Message;
