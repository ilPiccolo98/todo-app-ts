import React, { MouseEvent } from "react";
import { fireEvent, render } from "@testing-library/react";
import Button from "../Button";
import "@testing-library/jest-dom/extend-expect";

const renderButton = (onClick: (e: MouseEvent) => void) => {
  return render(
    <Button variant="primary" onClick={onClick}>
      Click me!
    </Button>
  );
};

const handleClickObject = {
  handleClick: (e: MouseEvent) => {},
};

const handleClickSpy = jest.spyOn(handleClickObject, "handleClick");

describe("Testing the Button component", () => {
  beforeEach(() => {
    handleClickSpy.mockReset();
  });

  it("should catch the click of the Button", () => {
    const component = renderButton(handleClickObject.handleClick);
    const button = component.getByText(/Click me/i);
    fireEvent.click(button);
    expect(handleClickSpy).toHaveBeenCalledTimes(1);
    expect(component).toMatchSnapshot();
  });
});
