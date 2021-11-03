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
import * as actions from "../../activities/activitiesSlice";
import store from "../../activities/activitiesStore";

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

describe("testing DeleteActivity component", () => {
  const deleteStateSelectorSpy = jest.spyOn(actions, "deleteStateSelector");
  const fetchAllActivitiesSpy = jest.spyOn(actions, "fetchAllActivities");
  const activitiesSelectorSpy = jest.spyOn(actions, "activitiesSelector");
  const deleteActivitySpy = jest.spyOn(actions, "deleteActivity");
  beforeEach(() => {
    activitiesSelectorSpy.mockReset().mockReturnValue([]);
    deleteActivitySpy.mockClear();
    deleteStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.DeleteState.Null);
    fetchAllActivitiesSpy.mockClear();
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
    expect(deleteActivitySpy).toHaveBeenCalledWith(1);
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

  it("should call the fetchAllActivities action once when deleteState === DeleteState.Deleted", () => {
    deleteStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.DeleteState.Deleted);
    const component = renderDeleteActivity();
    expect(fetchAllActivitiesSpy).toHaveBeenCalledTimes(1);
    expect(component).toMatchSnapshot();
  });

  it("should show the message Activity Deleted when deleteState === DeleteState.Deleted", () => {
    deleteStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.DeleteState.Deleted);
    const component = renderDeleteActivity();
    const message = component.getByText(/Activity Deleted/i);
    expect(message.textContent).toBe("Activity Deleted");
    expect(component).toMatchSnapshot();
  });

  it("should show the message Activity Deleted when deleteState === DeleteState.Deleting", () => {
    deleteStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.DeleteState.Deleting);
    const component = renderDeleteActivity();
    const message = component.getByText(/Deleting Activity/i);
    expect(message.textContent).toBe("Deleting Activity");
    expect(component).toMatchSnapshot();
  });

  it("should show the message Activity Deleted when deleteState === DeleteState.NotDeleted", () => {
    deleteStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.DeleteState.NotDeleted);
    const component = renderDeleteActivity();
    const message = component.getByText(/Activity not deleted!/i);
    expect(message.textContent).toBe("Activity not deleted!");
    expect(component).toMatchSnapshot();
  });
});
