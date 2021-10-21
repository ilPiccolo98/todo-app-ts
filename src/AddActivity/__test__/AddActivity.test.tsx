import React from "react";
import { Provider } from "react-redux";
import activitiesStore from "../../activities/activitiesStore";
import AddActivity from "../AddActivity";
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as actions from "../../activities/activitiesSlice";

const addActivitySpy = jest.spyOn(actions, "addActivity");
const activitiesSelectorSpy = jest.spyOn(actions, "activitiesSelector");

const renderAddActivityComponent = () => {
  return render(
    <Provider store={activitiesStore}>
      <AddActivity />
    </Provider>
  );
};

const getAddFormComponents = (
  component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement
  >
) => {
  const nameFieldAddActivity = component.getByTestId("name-field-add-activity");
  const descriptionFieldAddActivity = component.getByTestId(
    "description-field-add-activity"
  );
  const statusCheckboxAddActivity = component.getByTestId(
    "status-checkbox-add-activity"
  );
  const insertButtonAddActivity = component.getByTestId(
    "insert-button-add-activity"
  );
  return {
    nameFieldAddActivity,
    descriptionFieldAddActivity,
    statusCheckboxAddActivity,
    insertButtonAddActivity,
  };
};

describe("testing the AddActivity component", () => {
  beforeEach(() => {
    addActivitySpy.mockReset();
    activitiesSelectorSpy.mockReset().mockReturnValue([]);
  });

  it("should call the addActivity action when adding the first activity after filled in the fields and pressed the add button", async () => {
    const component = renderAddActivityComponent();
    const {
      nameFieldAddActivity,
      descriptionFieldAddActivity,
      statusCheckboxAddActivity,
      insertButtonAddActivity,
    } = getAddFormComponents(component);
    await waitFor(() => {
      fireEvent.change(nameFieldAddActivity, {
        target: {
          value: "activity1 name",
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(descriptionFieldAddActivity, {
        target: {
          value: "activity1 description",
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(statusCheckboxAddActivity);
    });
    await waitFor(() => {
      fireEvent.click(insertButtonAddActivity);
    });
    expect(addActivitySpy).toBeCalledWith({
      name: "activity1 name",
      description: "activity1 description",
      status: true,
    });
    expect(component).toMatchSnapshot();
  });

  it("should call the addActivity action when adding the second activity after filled in the fields and pressed the add button", async () => {
    activitiesSelectorSpy.mockReset().mockReturnValue([
      {
        id: 1,
        name: "work out",
        description: "after did my homework I must work out",
        status: true,
      },
    ]);
    const component = renderAddActivityComponent();
    const {
      nameFieldAddActivity,
      descriptionFieldAddActivity,
      statusCheckboxAddActivity,
      insertButtonAddActivity,
    } = getAddFormComponents(component);
    await waitFor(() => {
      fireEvent.change(nameFieldAddActivity, {
        target: {
          value: "activity2 name",
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(descriptionFieldAddActivity, {
        target: {
          value: "activity2 description",
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(statusCheckboxAddActivity);
    });
    await waitFor(() => {
      fireEvent.click(insertButtonAddActivity);
    });
    expect(addActivitySpy).toBeCalledWith({
      name: "activity2 name",
      description: "activity2 description",
      status: true,
    });
    expect(component).toMatchSnapshot();
  });
});
