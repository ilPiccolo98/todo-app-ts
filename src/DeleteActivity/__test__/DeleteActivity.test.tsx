import React from "react";
import { Provider } from "react-redux";
import activitiesStore from "../../activities/activitiesStore";
import DeleteActivity from "../DeleteActivity";
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as actions from "../../activities/activitiesSlice";

const deleteActivitySpy = jest.spyOn(actions, "deleteActivity");
const activitiesSelectorSpy = jest.spyOn(actions, "activitiesSelector");

const renderDeleteActivityComponent = () => {
  return render(
    <Provider store={activitiesStore}>
      <DeleteActivity />
    </Provider>
  );
};

const getDeleteFormComponents = (
  component: RenderResult<
    typeof import("c:/Users/it partner/Desktop/workspace/todo-app-ts/node_modules/@testing-library/dom/types/queries"),
    HTMLElement
  >
) => {
  const idFieldDeleteActivity = component.getByTestId(
    "id-field-delete-activity"
  );
  const deleteButtonDeleteActivity = component.getByTestId(
    "delete-button-delete-activity"
  );
  return { idFieldDeleteActivity, deleteButtonDeleteActivity };
};

describe("testing the DeleteActivity component", () => {
  beforeEach(() => {
    deleteActivitySpy.mockReset();
    activitiesSelectorSpy.mockReset().mockReturnValue([
      {
        id: 1,
        name: "work out",
        description: "after did my homework I must work out",
        status: true,
      },
    ]);
  });

  it("should delete the only activity that exists", async () => {
    const component = renderDeleteActivityComponent();
    const { idFieldDeleteActivity, deleteButtonDeleteActivity } =
      getDeleteFormComponents(component);
    await waitFor(() => {
      fireEvent.change(idFieldDeleteActivity, {
        target: {
          value: "1",
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(deleteButtonDeleteActivity);
    });
    expect(deleteActivitySpy).toHaveBeenCalledWith({ id: 1 });
    expect(component).toMatchSnapshot();
  });

  it("should appear the error 'Id is required'", async () => {
    const component = renderDeleteActivityComponent();
    const { deleteButtonDeleteActivity } = getDeleteFormComponents(component);
    await waitFor(() => {
      fireEvent.click(deleteButtonDeleteActivity);
    });
    const errorComponent = component.getByText(/Id is required/i);
    expect(errorComponent.textContent).toBe("Id is required");
    expect(component).toMatchSnapshot();
  });

  it("shouldn't call the deleteActivity action for a not existing id", async () => {
    const component = renderDeleteActivityComponent();
    const { idFieldDeleteActivity, deleteButtonDeleteActivity } =
      getDeleteFormComponents(component);
    await waitFor(() => {
      fireEvent.change(idFieldDeleteActivity, {
        target: {
          value: "13",
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(deleteButtonDeleteActivity);
    });
    expect(deleteActivitySpy).not.toBeCalled();
    expect(component).toMatchSnapshot();
  });
});
