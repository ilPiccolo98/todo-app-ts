import React, { ChangeEvent } from "react";
import {
  render,
  fireEvent,
  RenderResult,
  screen,
} from "@testing-library/react";
import CheckBox from "../CheckBox";
import "@testing-library/jest-dom/extend-expect";

const renderCheckbox = (
  checked: boolean,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
) => {
  return render(
    <CheckBox
      variant="primary"
      label="Testing"
      onChange={onChange}
      defaultChecked={checked}
      datatestid={"checkbox"}
    />
  );
};

const getCheckbox = (
  component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement
  >
): HTMLInputElement => {
  return component.getByTestId("checkbox").childNodes[0]
    .childNodes[0] as HTMLInputElement;
};

const handleChangeObject = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => {},
};

const handleChangeSpy = jest.spyOn(handleChangeObject, "handleChange");

describe("Testing the Checkbox component", () => {
  beforeEach(() => {
    handleChangeSpy.mockReset();
  });

  it("should switch from false to true and call the change handler once", () => {
    const checked = false;
    const component = renderCheckbox(checked, handleChangeObject.handleChange);
    const checkbox = getCheckbox(component);
    fireEvent.click(checkbox);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    expect(checkbox).toHaveProperty("checked", true);
  });

  it("should switch from true to false and call the change handler once", () => {
    const checked = true;
    const component = renderCheckbox(checked, handleChangeObject.handleChange);
    const checkbox = getCheckbox(component);
    fireEvent.click(checkbox);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    expect(checkbox).toHaveProperty("checked", false);
  });
});
