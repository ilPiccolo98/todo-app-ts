import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import UpdateActivity from "../UpdateActivity";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import * as actions from "../../activities/activitiesSlice";
import store from "../../activities/activitiesStore";

const renderUpdateActivity = () => {
  return render(
    <Provider store={store}>
      <UpdateActivity />
    </Provider>
  );
};

const getUpdateActivityComponents = (
  component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement
  >
) => {
  const idTextField = component.getByTestId("id-updateActivity").childNodes[0]
    .childNodes[1] as HTMLElement;
  const nameTextField = component.getByTestId("name-updateActivity")
    .childNodes[0].childNodes[1] as HTMLElement;
  const descriptionTextField = component.getByTestId(
    "description-updateActivity"
  ).childNodes[0].childNodes[1] as HTMLElement;
  const statusCheckbox = component.getByTestId("status-updateActivity")
    .childNodes[0].childNodes[0] as HTMLInputElement;
  const submit = component.getByTestId(
    "submit-updateActivity"
  ) as HTMLInputElement;
  return {
    idTextField,
    nameTextField,
    descriptionTextField,
    statusCheckbox,
    submit,
  };
};

describe("testing UpdateActivity component", () => {
  const activitiesSelectorSpy = jest.spyOn(actions, "activitiesSelector");
  const updateActivitySpy = jest.spyOn(actions, "updateActivity");
  const fetchAllActivitiesSpy = jest.spyOn(actions, "fetchAllActivities");
  const updateStateSelectorSpy = jest.spyOn(actions, "updateStateSelector");

  beforeEach(() => {
    activitiesSelectorSpy.mockReset().mockReturnValue([]);
    updateActivitySpy.mockClear();
    fetchAllActivitiesSpy.mockClear();
    updateStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.UpdateState.Null);
  });

  it("should call the updateActivity actions with { id: 1, name: updated, description: updated, status: true }", async () => {
    activitiesSelectorSpy.mockReset().mockReturnValue([
      {
        id: 1,
        name: "activity1",
        description: "activity1",
        status: false,
      },
    ]);
    const component = renderUpdateActivity();
    const {
      idTextField,
      nameTextField,
      descriptionTextField,
      statusCheckbox,
      submit,
    } = getUpdateActivityComponents(component);
    await waitFor(() => {
      fireEvent.change(idTextField, {
        target: {
          value: "1",
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(nameTextField, {
        target: {
          value: "updated",
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(descriptionTextField, {
        target: {
          value: "updated",
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(statusCheckbox);
    });
    await waitFor(() => {
      fireEvent.click(submit);
    });
    expect(updateActivitySpy).toHaveBeenCalledWith({
      id: 1,
      name: "updated",
      description: "updated",
      status: true,
    });
    expect(component).toMatchSnapshot();
  });

  it("should call once the actions fetchAllActivities when updateState === UpdateState.Updated", () => {
    updateStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.UpdateState.Updated);
    const component = renderUpdateActivity();
    expect(fetchAllActivitiesSpy).toHaveBeenCalledTimes(1);
    expect(component).toMatchSnapshot();
  });

  it("should show the message Activity Deleted when updateState === UpdateState.Updated", () => {
    updateStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.UpdateState.Updated);
    const component = renderUpdateActivity();
    const message = component.getByText(/Activity Updated/i);
    expect(message.textContent).toBe("Activity Updated");
    expect(component).toMatchSnapshot();
  });

  it("should show the message Activity Deleted when updateState === UpdateState.Updating", () => {
    updateStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.UpdateState.Updating);
    const component = renderUpdateActivity();
    const message = component.getByText(/Updating Activity/i);
    expect(message.textContent).toBe("Updating Activity");
    expect(component).toMatchSnapshot();
  });

  it("should show the message Activity Deleted when updateState === UpdateState.NotUpdated", () => {
    updateStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.UpdateState.NotUpdated);
    const component = renderUpdateActivity();
    const message = component.getByText(/Activity not updated!/i);
    expect(message.textContent).toBe("Activity not updated!");
    expect(component).toMatchSnapshot();
  });
});
