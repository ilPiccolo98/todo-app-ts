import React from "react";
import { render, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as actions from "../../activities/activitiesSlice";
import TableActivities from "../TableActivities";
import { Provider } from "react-redux";
import store from "../../activities/activitiesStore";

const renderTableActivity = () => {
  return render(
    <Provider store={store}>
      <TableActivities />
    </Provider>
  );
};

const getTableBody = (
  component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement
  >
): HTMLBodyElement => {
  return component.getByTestId("table-activities")
    .childNodes[0] as HTMLBodyElement;
};

const getCells = (tableBody: HTMLBodyElement, index: number) => {
  const idCell = tableBody.childNodes[index].childNodes[0];
  const nameCell = tableBody.childNodes[index].childNodes[1];
  const descriptionCell = tableBody.childNodes[index].childNodes[2];
  const statusCell = tableBody.childNodes[index].childNodes[3];
  return { idCell, nameCell, descriptionCell, statusCell };
};

describe("testing the TableActivities component", () => {
  const activitiesSelectorSpy = jest.spyOn(actions, "activitiesSelector");
  const retrievingStateSelectorSpy = jest.spyOn(
    actions,
    "retrievingStateSelector"
  );

  beforeEach(() => {
    activitiesSelectorSpy.mockReset().mockReturnValue([]);
    retrievingStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.RetrieveState.Loaded);
  });

  it("should have 1 activity", () => {
    const activitiesSelectorSpy = jest.spyOn(actions, "activitiesSelector");
    activitiesSelectorSpy.mockReset().mockReturnValue([
      {
        id: 1,
        name: "activity1",
        description: "activity1",
        status: true,
      },
    ]);
    const component = renderTableActivity();
    const tableBody = getTableBody(component);
    const { idCell, nameCell, descriptionCell, statusCell } = getCells(
      tableBody,
      1
    );
    expect(tableBody.childElementCount).toBe(2);
    expect(idCell.textContent).toBe("1");
    expect(nameCell.textContent).toBe("activity1");
    expect(descriptionCell.textContent).toBe("activity1");
    expect(statusCell.textContent).toBe("true");
    expect(activitiesSelectorSpy).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });

  it("should show the message: 'Loading...' when retrievingState === RetrieveState.Loading", () => {
    retrievingStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.RetrieveState.Loading);
    const component = renderTableActivity();
    const message = component.getByText(/Loading.../i);
    expect(message.textContent).toBe("Loading...");
    expect(component).toMatchSnapshot();
  });

  it("should show the message: 'Activities not retrieved!' when retrievingState === RetrieveState.Error", () => {
    retrievingStateSelectorSpy
      .mockReset()
      .mockReturnValue(actions.RetrieveState.Error);
    const component = renderTableActivity();
    const message = component.getByText(/Activities not retrieved!/i);
    expect(message.textContent).toBe("Activities not retrieved!");
    expect(component).toMatchSnapshot();
  });
});
