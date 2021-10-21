import React from "react";
import { Provider } from "react-redux";
import activitiesStore from "../../activities/activitiesStore";
import UpdateActivity from "../UpdateActivity";
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as actions from "../../activities/activitiesSlice";

const updateActivitySpy = jest.spyOn(actions, "updateActivity");
const activitiesSelectorSpy = jest.spyOn(actions, "activitiesSelector");

const renderUpdateActivityComponent = () => {
  return render(
    <Provider store={activitiesStore}>
      <UpdateActivity />
    </Provider>
  );
};

const getUpdateFormComponents = (
  component: RenderResult<
    typeof import("c:/Users/it partner/Desktop/workspace/todo-app-ts/node_modules/@testing-library/dom/types/queries"),
    HTMLElement
  >
) => {
  const idFieldUpdateActivity = component.getByTestId(
    "id-field-update-activity"
  );
  const nameFieldUpdateActivity = component.getByTestId(
    "name-field-update-activity"
  );
  const descriptionFieldUpdateActivity = component.getByTestId(
    "description-field-update-activity"
  );
  const statusCheckboxUpdateActivity = component.getByTestId(
    "status-checkbox-update-activity"
  );
  const updateButtonUpdateActivity = component.getByTestId(
    "update-button-update-activity"
  );
  return {
    idFieldUpdateActivity,
    nameFieldUpdateActivity,
    descriptionFieldUpdateActivity,
    statusCheckboxUpdateActivity,
    updateButtonUpdateActivity,
  };
};

describe("tesing the UpdateActivity component", () => {
  beforeEach(() => {
    updateActivitySpy.mockReset();
    activitiesSelectorSpy.mockReset().mockReturnValue([
      {
        id: 1,
        name: "work out",
        description: "after did my homework I must work out",
        status: true,
      },
    ]);
  });

  it("should call the updateActivity actions to update the activity with id = 1", async () => {
    const component = renderUpdateActivityComponent();
    const {
      idFieldUpdateActivity,
      nameFieldUpdateActivity,
      descriptionFieldUpdateActivity,
      statusCheckboxUpdateActivity,
      updateButtonUpdateActivity,
    } = getUpdateFormComponents(component);
    await waitFor(() =>
      fireEvent.change(idFieldUpdateActivity, {
        target: {
          value: "1",
        },
      })
    );
    await waitFor(() =>
      fireEvent.change(nameFieldUpdateActivity, {
        target: {
          value: "updated",
        },
      })
    );
    await waitFor(() =>
      fireEvent.change(descriptionFieldUpdateActivity, {
        target: {
          value: "updated",
        },
      })
    );
    await waitFor(() => fireEvent.click(statusCheckboxUpdateActivity));
    await waitFor(() => fireEvent.click(updateButtonUpdateActivity));
    expect(updateActivitySpy).toHaveBeenCalledWith({
      id: 1,
      name: "updated",
      description: "updated",
      status: true,
    });
    expect(component).toMatchSnapshot();
  });

  it("shouldn't call the updateActivity action for a not existing activity", async () => {
    const component = renderUpdateActivityComponent();
    const {
      idFieldUpdateActivity,
      nameFieldUpdateActivity,
      descriptionFieldUpdateActivity,
      statusCheckboxUpdateActivity,
      updateButtonUpdateActivity,
    } = getUpdateFormComponents(component);
    await waitFor(() =>
      fireEvent.change(idFieldUpdateActivity, {
        target: {
          value: "10",
        },
      })
    );
    await waitFor(() =>
      fireEvent.change(nameFieldUpdateActivity, {
        target: {
          value: "updated",
        },
      })
    );
    await waitFor(() =>
      fireEvent.change(descriptionFieldUpdateActivity, {
        target: {
          value: "updated",
        },
      })
    );
    await waitFor(() => fireEvent.click(statusCheckboxUpdateActivity));
    await waitFor(() => fireEvent.click(updateButtonUpdateActivity));
    expect(updateActivitySpy).not.toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });
});
