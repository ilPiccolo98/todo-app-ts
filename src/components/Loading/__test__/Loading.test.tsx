import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Loading from "../Loading";

const renderLoading = (size: "small" | "medium" | "large") => {
  return render(<Loading size={size} />);
};

describe("testing Loading component", () => {
  it("should show the component with the content='Loading...'", () => {
    const component = renderLoading("medium");
    const loading = component.getByText(/Loading/i);
    expect(loading.textContent).toBe("Loading...");
    expect(component).toMatchSnapshot();
  });
});
