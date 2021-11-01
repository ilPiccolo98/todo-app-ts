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

const activitiesSelectorSpy = jest.spyOn(actions, "activitiesSelector");
const updateActivitySpy = jest.spyOn(actions, "updateActivity");

describe("testing UpdateActivity component", () => {
  beforeEach(() => {
    activitiesSelectorSpy.mockReset().mockReturnValue([]);
    updateActivitySpy.mockReset();
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

  it.skip("shouldn't call the updateActivity actions when the activity doesn't exist", async () => {
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
    expect(updateActivitySpy).not.toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });
});
