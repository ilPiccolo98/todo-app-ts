import React, { HTMLAttributes } from "react";

interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {}

const Loading: React.FC<LoadingProps> = (props): JSX.Element => {
  return <span {...props}>Loading</span>;
};

export default Loading;
