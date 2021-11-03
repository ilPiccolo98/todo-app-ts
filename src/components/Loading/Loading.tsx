import React, { HTMLAttributes } from "react";
import "./Loading.css";

export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
  size: "small" | "medium" | "large";
}

const Loading: React.FC<LoadingProps> = (props): JSX.Element => {
  return (
    <span
      {...props}
      className={`${props.className} loading-size-${props.size} loading-style`}
    >
      Loading...
    </span>
  );
};

export default Loading;
