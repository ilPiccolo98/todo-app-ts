import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
  screen,
} from "@testing-library/react";
import AddActivity from "../AddActivity";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import * as actions from "../../activities/activitiesSlice";
import store from "../../activities/activitiesStore";

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

const activitiesSelectorSpy = jest.spyOn(actions, "activitiesSelector");
const addActivitySpy = jest.spyOn(actions, "addActivity");

describe("testing AddActivity component", () => {
  beforeEach(() => {
    activitiesSelectorSpy.mockReset().mockReturnValue([]);
    addActivitySpy.mockReset();
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
});
