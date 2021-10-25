import React, { FormEvent } from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Submit from "../Submit";

const renderSubmit = (onSubmit: (e: FormEvent<HTMLInputElement>) => void) => {
  return render(
    <Submit variant="primary" onSubmit={onSubmit}>
      Submit
    </Submit>
  );
};

const getSubmit = (
  component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement
  >
): HTMLInputElement => {
  return component.getByText(/Submit/i) as HTMLInputElement;
};

const handleSubmitObject = {
  handleSubmit: (e: FormEvent<HTMLInputElement>) => {},
};

const handleSubmitSpy = jest.spyOn(handleSubmitObject, "handleSubmit");

describe("tesing the Submit component", () => {
  beforeEach(() => {
    handleSubmitSpy.mockReset();
  });

  it("should call the handleSubmit event handler", () => {
    const component = renderSubmit(handleSubmitObject.handleSubmit);
    const submit = getSubmit(component);
    fireEvent.submit(submit);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
