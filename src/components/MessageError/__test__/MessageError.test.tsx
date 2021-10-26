import React, { MouseEvent } from "react";
import { fireEvent, render } from "@testing-library/react";
import MessageError from "../MessageError";
import "@testing-library/jest-dom/extend-expect";

const renderMessageError = () => {
  return render(<MessageError size="medium">Message test</MessageError>);
};

describe("testing MessageError component", () => {
  it("should display the message 'Message test'", () => {
    const component = renderMessageError();
    expect(component.getByText(/Message/i).textContent).toBe("Message test");
    expect(component).toMatchSnapshot();
  });
});
