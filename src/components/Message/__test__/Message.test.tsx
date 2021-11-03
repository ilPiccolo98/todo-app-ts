import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Message from "../Message";

const renderMessage = (
  text: string,
  size: "small" | "medium" | "large",
  variant: "blue" | "green"
) => {
  return render(
    <Message size={size} variant={variant}>
      {text}
    </Message>
  );
};

describe("tesing the Message component", () => {
  it("should show the component with children='Text content'", () => {
    const component = renderMessage("Text content", "medium", "blue");
    const message = component.getByText(/Text/i);
    expect(message.textContent).toBe("Text content");
    expect(component).toMatchSnapshot();
  });
});
