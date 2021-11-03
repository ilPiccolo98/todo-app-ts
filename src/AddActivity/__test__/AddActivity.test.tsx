import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import AddActivity from "../AddActivity";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import * as actions from "../../activities/activitiesSlice";
import store from "../../activities/activitiesStore";
import axios from "axios";

const renderAddActivity = () => {
  return render(
    <Provider store={store}>
      <AddActivity />
    </Provider>
  );
};

const getAddActivityComponents = (
  component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement
  >
) => {
  const nameTextField = component.getByTestId("name-addActivity").childNodes[0]
    .childNodes[1] as HTMLElement;
  const descriptionTextField = component.getByTestId("description-addActivity")
    .childNodes[0].childNodes[1] as HTMLInputElement;
  const statusCheckbox = component.getByTestId("status-addActivity")
    .childNodes[0].childNodes[0] as HTMLInputElement;
  const submit = component.getByTestId(
    "submit-addActivity"
  ) as HTMLInputElement;
  return { nameTextField, descriptionTextField, statusCheckbox, submit };
};

describe("testing AddActivity component", () => {
  const activitiesSelectorSpy = jest.spyOn(actions, "activitiesSelector");
  const addActivitySpy = jest.spyOn(actions, "addActivity");
  const fetchAllActivitiesSpy = jest.spyOn(actions, "fetchAllActivities");
  const addStateSelectorSpy = jest.spyOn(actions, "addStateSelector");
  const axiosGetSpy = jest.spyOn(axios, "get");
  const axiosPostSpy = jest.spyOn(axios, "post");

  beforeEach(() => {
    activitiesSelectorSpy.mockReset().mockReturnValue([]);
    addActivitySpy.mockClear();
    fetchAllActivitiesSpy.mockClear();
    addStateSelectorSpy.mockReset().mockReturnValue(actions.AddState.Null);
    axiosGetSpy.mockReset().mockResolvedValue({ data: { activities: [] } });
    axiosPostSpy.mockReset().mockResolvedValue({ data: { isItAdded: true } });
  });

  it("should call the addActivity action once with { id: 1, name: 'activity1', description: 'activity1', status: true, } when there is no activity", async () => {
    const component = renderAddActivity();
    const {
      nameTextField,
      descriptionTextField,
      statusCheckbox,
      submit,
    } = getAddActivityComponents(component);
    await waitFor(() =>
      fireEvent.change(nameTextField, {
        target: {
          value: "activity1",
        },
      })
    );
    await waitFor(() =>
      fireEvent.change(descriptionTextField, {
        target: {
          value: "activity1",
        },
      })
    );
    await waitFor(() => fireEvent.click(statusCheckbox));
    await waitFor(() => fireEvent.click(submit));
    expect(addActivitySpy).toHaveBeenCalledWith({
      name: "activity1",
      description: "activity1",
      status: true,
    });
    expect(component).toMatchSnapshot();
  });

  it("should call the addActivity action once with { id: 2, name: 'activity2', description: 'activity2', status: true, } when there is only already an activity", async () => {
    activitiesSelectorSpy.mockReset().mockReturnValue([
      {
        id: 1,
        name: "activity1",
        description: "activity1",
        status: true,
      },
    ]);
    const component = renderAddActivity();
    const {
      nameTextField,
      descriptionTextField,
      statusCheckbox,
      submit,
    } = getAddActivityComponents(component);
    await waitFor(() =>
      fireEvent.change(nameTextField, {
        target: {
          value: "activity2",
        },
      })
    );
    await waitFor(() =>
      fireEvent.change(descriptionTextField, {
        target: {
          value: "activity2",
        },
      })
    );
    await waitFor(() => fireEvent.click(statusCheckbox));
    await waitFor(() => fireEvent.click(submit));
    expect(addActivitySpy).toHaveBeenCalledWith({
      name: "activity2",
      description: "activity2",
      status: true,
    });
    expect(component).toMatchSnapshot();
  });

  it("shouldn't call the action addActivity when the name field is blank", async () => {
    const component = renderAddActivity();
    const {
      descriptionTextField,
      statusCheckbox,
      submit,
    } = getAddActivityComponents(component);
    await waitFor(() =>
      fireEvent.change(descriptionTextField, {
        target: {
          value: "activity1",
        },
      })
    );
    await waitFor(() => fireEvent.click(statusCheckbox));
    await waitFor(() => fireEvent.click(submit));
    expect(addActivitySpy).not.toBeCalled();
    expect(component).toMatchSnapshot();
  });

  it("shouldn't call the action addActivity when the description field is blank", async () => {
    const component = renderAddActivity();
    const { nameTextField, statusCheckbox, submit } = getAddActivityComponents(
      component
    );
    await waitFor(() =>
      fireEvent.change(nameTextField, {
        target: {
          value: "activity1",
        },
      })
    );
    await waitFor(() => fireEvent.click(statusCheckbox));
    await waitFor(() => fireEvent.click(submit));
    expect(addActivitySpy).not.toBeCalled();
    expect(component).toMatchSnapshot();
  });

  it("should call once the actions fetchAllActivities when addState === AddState.Added", () => {
    addStateSelectorSpy.mockReset().mockReturnValue(actions.AddState.Added);
    const component = renderAddActivity();
    expect(fetchAllActivitiesSpy).toHaveBeenCalledTimes(1);
    expect(component).toMatchSnapshot();
  });

  it("should show the message Activity Deleted when addState === AddState.Added", () => {
    addStateSelectorSpy.mockReset().mockReturnValue(actions.AddState.Added);
    const component = renderAddActivity();
    const message = component.getByText(/Activity Added/i);
    expect(message.textContent).toBe("Activity Added");
    expect(component).toMatchSnapshot();
  });

  it("should show the message Activity Deleted when addState === AddState.Adding", () => {
    addStateSelectorSpy.mockReset().mockReturnValue(actions.AddState.Adding);
    const component = renderAddActivity();
    const message = component.getByText(/Adding Activity/i);
    expect(message.textContent).toBe("Adding Activity");
    expect(component).toMatchSnapshot();
  });

  it("should show the message Activity Deleted when addState === AddState.NotAdded", () => {
    addStateSelectorSpy.mockReset().mockReturnValue(actions.AddState.NotAdded);
    const component = renderAddActivity();
    const message = component.getByText(/Activity not added!/i);
    expect(message.textContent).toBe("Activity not added!");
    expect(component).toMatchSnapshot();
  });
});
