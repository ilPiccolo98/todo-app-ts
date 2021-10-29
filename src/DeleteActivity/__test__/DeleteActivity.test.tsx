import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import DeleteActivity from "../DeleteActivity";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import * as actions from "../../activitiesWithFunctions/activitiesSlice";
import store from "../../activitiesWithFunctions/activitiesStore";

const renderDeleteActivity = () => {
  return render(
    <Provider store={store}>
      <DeleteActivity />
    </Provider>
  );
};

const getDeleteActivityComponents = (
  component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement
  >
) => {
  const idTextField = component.getByTestId("id-deleteActivity").childNodes[0]
    .childNodes[1] as HTMLElement;
  const submit = component.getByTestId(
    "submit-deleteActivity"
  ) as HTMLInputElement;
  return { idTextField, submit };
};

const activitiesSelectorSpy = jest.spyOn(actions, "activitiesSelector");
const deleteActivitySpy = jest.spyOn(actions, "deleteActivity");

describe("testing DeleteActivity component", () => {
  beforeEach(() => {
    activitiesSelectorSpy.mockReset().mockReturnValue([]);
    deleteActivitySpy.mockReset();
  });

  it("should call the deleteActivity actions with { id: 1 }", async () => {
    activitiesSelectorSpy.mockReset().mockReturnValue([
      {
        id: 1,
        name: "activity",
        description: "activity",
        status: true,
      },
    ]);
    const component = renderDeleteActivity();
    const { idTextField, submit } = getDeleteActivityComponents(component);
    await waitFor(() => {
      fireEvent.change(idTextField, {
        target: {
          value: "1",
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(submit);
    });
    expect(deleteActivitySpy).toHaveBeenCalledWith({ id: 1 });
    expect(component).toMatchSnapshot();
  });

  it.skip("shouldn't call the deleteActivity actions when there is no activity", async () => {
    activitiesSelectorSpy.mockReset().mockReturnValue([]);
    const component = renderDeleteActivity();
    const { idTextField, submit } = getDeleteActivityComponents(component);
    await waitFor(() => {
      fireEvent.change(idTextField, {
        target: {
          value: "1",
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(submit);
    });
    expect(deleteActivitySpy).not.toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });

  it("shouldn't call the deleteActivity actions when id field is blank", async () => {
    activitiesSelectorSpy.mockReset().mockReturnValue([
      {
        id: 1,
        name: "activity",
        description: "activity",
        status: true,
      },
    ]);
    const component = renderDeleteActivity();
    const { submit } = getDeleteActivityComponents(component);
    await waitFor(() => {
      fireEvent.click(submit);
    });
    expect(deleteActivitySpy).not.toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });
});
