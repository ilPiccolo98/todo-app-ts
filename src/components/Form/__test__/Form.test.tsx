import React, { FormEvent } from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from "../Form";

const renderForm = (onSubmit: (e: FormEvent<HTMLElement>) => void) => {
  return render(
    <Form variant="primary" onSubmit={onSubmit} datatestid={"form"} />
  );
};

const getForm = (
  component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement
  >
): HTMLFormElement => {
  return component.getByTestId("form").childNodes[1] as HTMLFormElement;
};

const handleSubmitObject = {
  handleSubmit: (e: FormEvent<HTMLElement>) => {},
};

const handleSubmitSpy = jest.spyOn(handleSubmitObject, "handleSubmit");

describe("testing Form component", () => {
  beforeEach(() => {
    handleSubmitSpy.mockReset();
  });

  it("should call the handleSubmit event", () => {
    const component = renderForm(handleSubmitObject.handleSubmit);
    const form = getForm(component);
    fireEvent.submit(form);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
