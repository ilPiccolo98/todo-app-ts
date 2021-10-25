import React, { ChangeEvent } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TextField from "../TextField";

const renderTextField = (
  type: "text" | "numbers" | "password",
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
) => {
  return render(
    <TextField
      datatestid="textfield"
      variant="primary"
      labelText="Testing"
      type={type}
      onChange={onChange}
    />
  );
};

const getLabelTextBox = (textbox: HTMLElement): HTMLLabelElement => {
  return textbox.childNodes[0] as HTMLLabelElement;
};

const getInputTextBox = (textbox: HTMLElement): HTMLInputElement => {
  const label: HTMLLabelElement = getLabelTextBox(textbox);
  return label.childNodes[1] as HTMLInputElement;
};

const getMessageError = (textbox: HTMLElement): HTMLParagraphElement => {
  return textbox.childNodes[
    textbox.childElementCount - 1
  ] as HTMLParagraphElement;
};

const handleChangeObject = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => {},
};

const handleChangeSpy = jest.spyOn(handleChangeObject, "handleChange");

describe("Testing Textfield component", () => {
  beforeEach(() => {
    handleChangeSpy.mockReset();
  });

  it("should call the handleChange event and the value should be 'test' by using type=text", () => {
    const component = renderTextField("text", handleChangeObject.handleChange);
    const textbox = component.getByTestId("textfield");
    const input = getInputTextBox(textbox);
    fireEvent.change(input, {
      target: {
        value: "test",
      },
    });
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("test");
    expect(component).toMatchSnapshot();
  });

  it("should call the handleChange event and the value should be '123' by using type=numbers", () => {
    const component = renderTextField(
      "numbers",
      handleChangeObject.handleChange
    );
    const textbox = component.getByTestId("textfield");
    const input = getInputTextBox(textbox);
    fireEvent.change(input, {
      target: {
        value: "123",
      },
    });
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("123");
    expect(component).toMatchSnapshot();
  });

  it("should call the handleChange event and the value should be 'pass' by using type=password", () => {
    const component = renderTextField(
      "password",
      handleChangeObject.handleChange
    );
    const textbox = component.getByTestId("textfield");
    const input = getInputTextBox(textbox);
    fireEvent.change(input, {
      target: {
        value: "pass",
      },
    });
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("pass");
    expect(component).toMatchSnapshot();
  });

  it("should show the message 'Text is not allowed' if I write text when the type=numbers", () => {
    const component = renderTextField(
      "numbers",
      handleChangeObject.handleChange
    );
    const textbox = component.getByTestId("textfield");
    const input = getInputTextBox(textbox);
    fireEvent.keyPress(input, {
      key: "a",
      code: "KeyA",
      charCode: 65,
    });
    const messageError = getMessageError(textbox);
    expect(messageError.textContent).toBe("Text is not allowed");
    expect(component).toMatchSnapshot();
  });

  it("shouldn't show the message 'Text is not allowed' if I write text when the type=text", () => {
    const component = renderTextField("text", handleChangeObject.handleChange);
    const textbox = component.getByTestId("textfield");
    const input = getInputTextBox(textbox);
    fireEvent.keyPress(input, {
      key: "a",
      code: "KeyA",
      charCode: 65,
    });
    const messageError = getMessageError(textbox);
    expect(messageError.textContent).not.toBe("Text is not allowed");
    expect(component).toMatchSnapshot();
  });
});
